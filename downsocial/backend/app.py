# Monkey-patching for gevent asynchronous workers (must be done before other imports)
import os
try:
    from gevent import monkey
    monkey.patch_all()
    print("[GEVENT] Monkey patching applied successfully.")
except ImportError:
    print("[GEVENT] gevent not found, running without monkey patching.")

import time
import logging
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from flask_compress import Compress
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix
import yt_dlp
import requests

# Initialize Flask & Middleware
app = Flask(__name__)

# Apply ProxyFix to correctly get client IP behind reverse proxies (like Render load balancers)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_port=1)

# ==========================================
# 🛡️ 1. STRICT CORS POLICY (SECURITY) 🛡️
# ==========================================
# Ab koi aur domain aapki API chori nahi kar sakti. Sirf aapki website allow hai.
CORS(app, resources={r"/api/*": {"origins": ["https://downsocial.net", "https://www.downsocial.net"]}})

compress = Compress()
compress.init_app(app)

# ==========================================
# 🛑 2. RATE LIMITING (ANTI-DDoS & SPAM PROTECTION) 🛑
# ==========================================
# Ye server ko bot attacks aur spam se bachayega. Ek waqt me bohot requests aane par crash nahi hoga.
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["5000 per day", "100 per minute"],
    storage_uri="memory://" # High traffic ke liye memory cache use ho raha hai
)

# Configure Logging for Production Monitoring
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ==========================================
# 🚀 3. ADVANCED ZERO-DEPENDENCY TTL CACHE 🚀
# ==========================================
# Caches extraction results for 30 mins to prevent hitting rate limits
class SimpleTTLCache:
    def __init__(self, ttl_seconds=1800):
        self.cache = {}
        self.ttl = ttl_seconds

    def get(self, key):
        if key in self.cache:
            entry = self.cache[key]
            if time.time() - entry['timestamp'] < self.ttl:
                logging.info(f"[CACHE HIT] Serving from memory: {key}")
                return entry['data']
            else:
                del self.cache[key] # Expired
        return None

    def set(self, key, value):
        self.cache[key] = {'data': value, 'timestamp': time.time()}

video_cache = SimpleTTLCache(ttl_seconds=1800)

# Reusable session for faster TCP connection pooling during streaming
http_session = requests.Session()
# Optimize connection pool for high concurrency
adapter = requests.adapters.HTTPAdapter(pool_connections=200, pool_maxsize=500)
http_session.mount("http://", adapter)
http_session.mount("https://", adapter)


def resolve_facebook_share_url(url):
    """
    Resolves and un-shortens Facebook /share/ URLs and other redirects
    using requests before passing them to yt-dlp.
    """
    if not url:
        return url

    # Identify if URL is a Facebook share / short link
    is_share_link = any(pattern in url for pattern in [
        "/share/", 
        "fb.watch", 
        "fb.gg", 
        "facebook.com/share"
    ])

    if is_share_link:
        try:
            logging.info(f"[UNSHORTENER] Resolving shortened URL: {url}")
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            }
            # stream=True gets headers only, preventing downloading the full page body
            with requests.get(url, headers=headers, allow_redirects=True, stream=True, timeout=10) as r:
                resolved_url = r.url
                logging.info(f"[UNSHORTENER] Successfully un-shortened: {url} -> {resolved_url}")
                return resolved_url
        except Exception as e:
            logging.error(f"[UNSHORTENER ERROR] Failed to un-shorten URL: {str(e)}")
    return url


# ==========================================
# 🎯 ROUTE 1: ADVANCED EXTRACTION ENGINE 🎯
# ==========================================
@app.route('/api/download', methods=['GET'])
@limiter.limit("15 per minute") # Ek user 1 minute me 15 se zyada videos extract nahi kar sakta
def download_video():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"success": False, "error": "URL is required!"}), 400

    # Resolve shortened/share URLs to final destination URLs
    resolved_url = resolve_facebook_share_url(url)

    # Check Cache First with resolved URL
    cached_data = video_cache.get(resolved_url)
    if cached_data:
        return jsonify(cached_data)

    # Configure yt-dlp for maximum speed and stealth
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'nocheckcertificate': True,
        'extract_flat': False,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Sec-Fetch-Mode': 'navigate'
        }
    }

    # Integrate cookies.txt if it exists to bypass walls and IP blockades
    cookie_paths = [
        os.path.join(os.path.dirname(__file__), 'cookies.txt'),
        'cookies.txt',
        'backend/cookies.txt'
    ]
    for cp in cookie_paths:
        if os.path.exists(cp):
            ydl_opts['cookiefile'] = cp
            logging.info(f"[COOKIES] Loaded cookies from: {cp}")
            break
    else:
        logging.warning("[COOKIES] No cookies.txt found. Proceeding without authentication cookies.")

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            logging.info(f"[EXTRACTION START] Fetching metadata for: {resolved_url}")
            info = ydl.extract_info(resolved_url, download=False)
            
            if not info:
                raise Exception("Empty metadata received from yt-dlp")

            media_type = "image" if info.get('_type') == 'url_transparent' and not info.get('formats') else "video"
            
            # Default fallbacks
            video_high = info.get('url')
            video_normal = info.get('url')
            audio_high = info.get('url')
            audio_normal = info.get('url')

            formats = info.get('formats', [])

            # Intelligent Format Sorting (HD vs SD mapping)
            if formats:
                merged_formats = [f for f in formats if f.get('vcodec') != 'none' and f.get('acodec') != 'none']
                audio_formats = [f for f in formats if f.get('vcodec') == 'none' and f.get('acodec') != 'none']

                if merged_formats:
                    merged_formats = sorted(merged_formats, key=lambda x: x.get('height', 0) or 0, reverse=True)
                    video_high = merged_formats[0].get('url')
                    video_normal = merged_formats[-1].get('url') if len(merged_formats) > 1 else video_high
                
                if audio_formats:
                    audio_formats = sorted(audio_formats, key=lambda x: x.get('abr', 0) or 0, reverse=True)
                    audio_high = audio_formats[0].get('url')
                    audio_normal = audio_formats[-1].get('url') if len(audio_formats) > 1 else audio_high
                else:
                    audio_high = video_high
                    audio_normal = video_normal

            response_data = {
                "success": True,
                "type": media_type,
                "title": info.get('title', 'Facebook Media'),
                "thumbnail": info.get('thumbnail', ''),
                "duration": info.get('duration', 0),
                "video_high": video_high,
                "video_normal": video_normal,
                "audio_high": audio_high,
                "audio_normal": audio_normal
            }

            # Save to memory cache
            video_cache.set(resolved_url, response_data)
            
            logging.info("[EXTRACTION SUCCESS] Formats successfully mapped.")
            return jsonify(response_data)

    except yt_dlp.utils.DownloadError as de:
        logging.error(f"[EXTRACTION ERROR] yt-dlp error: {str(de)}")
        return jsonify({"success": False, "error": "Could not extract video. It might be private or deleted."}), 400
    except Exception as e:
        logging.error(f"[SERVER ERROR] Unexpected error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server error during extraction."}), 500


# ==========================================
# ⚡ ROUTE 2: ADVANCED STREAMING PROXY ⚡
# ==========================================
@app.route('/api/direct', methods=['GET'])
@limiter.limit("20 per minute") # Proxy bandwidth abuse rokne ke liye limit
def direct_download():
    file_url = request.args.get('url')
    file_type = request.args.get('type', 'mp4')
    
    timestamp_id = request.args.get('t', str(int(time.time())))
    
    if not file_url:
        return jsonify({"error": "URL is missing"}), 400
        
    try:
        range_header = request.headers.get('Range', None)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            'Accept-Encoding': 'identity'
        }
        
        if range_header:
            headers['Range'] = range_header

        # Timeout limits set to prevent infinite hanging
        req = http_session.get(file_url, stream=True, headers=headers, timeout=(5, 30))
        
        resp_headers = {
            'Content-Disposition': f'attachment; filename="FB_Video_{timestamp_id}.{file_type}"',
            'Accept-Ranges': 'bytes'
        }

        if 'Content-Length' in req.headers:
            resp_headers['Content-Length'] = req.headers['Content-Length']
            
        if 'Content-Range' in req.headers:
            resp_headers['Content-Range'] = req.headers['Content-Range']

        status_code = req.status_code if req.status_code in [200, 206] else 200

        # Efficient chunk generator (Yields 1MB at a time to save RAM)
        def generate_chunks():
            try:
                for chunk in req.iter_content(chunk_size=1024 * 1024):
                    if chunk:
                        yield chunk
            except Exception as stream_err:
                logging.error(f"[STREAM ERROR] Connection dropped: {str(stream_err)}")
            finally:
                req.close()
                logging.info("[PROXY STREAM] Closed downstream connection")

        return Response(
            stream_with_context(generate_chunks()), 
            status=status_code,
            content_type=req.headers.get('content-type', f'video/{file_type}'),
            headers=resp_headers
        )
        
    except requests.exceptions.Timeout:
        logging.warning("[PROXY TIMEOUT] Target server took too long.")
        return jsonify({"error": "Request timed out. Target server is too slow."}), 504
    except requests.exceptions.RequestException as re:
        logging.error(f"[PROXY ERROR] Request failed: {str(re)}")
        return jsonify({"error": "Failed to connect to media server."}), 502
    except Exception as e:
        logging.error(f"[PROXY UNKNOWN ERROR] {str(e)}")
        return jsonify({"error": "An unexpected error occurred during stream."}), 500

# Basic Health Check
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "active", "service": "Facebook Video Downloader API API v2.0"}), 200

if __name__ == '__main__':
    # ⚠️ WARNING FOR PRODUCTION ⚠️
    # Ye app.run sirf development/testing ke liye hai.
    # max requests ke liye apne paid server par GUNICORN aur GEVENT use karein.
    # Command: gunicorn -k gevent -w 8 --worker-connections 1000 -b 0.0.0.0:5000 app:app
    app.run(host='0.0.0.0', port=5000, threaded=True)