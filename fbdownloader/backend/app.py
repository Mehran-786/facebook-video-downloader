import time
import logging
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from flask_compress import Compress
import yt_dlp
import requests

# Initialize Flask & Middleware
app = Flask(__name__)
CORS(app)
compress = Compress()
compress.init_app(app)

# Configure Logging for Production Monitoring
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ==========================================
# 🧠 ADVANCED ZERO-DEPENDENCY TTL CACHE 🧠
# ==========================================
# Caches extraction results for 30 mins to prevent hitting rate limits
# and to deliver instant responses for popular videos.
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

# ==========================================
# 🚀 ROUTE 1: ADVANCED EXTRACTION ENGINE 🚀
# ==========================================
@app.route('/api/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"success": False, "error": "URL is required!"}), 400

    # 1. Check Cache First
    cached_data = video_cache.get(url)
    if cached_data:
        return jsonify(cached_data)

    # 2. Configure yt-dlp for maximum speed and stealth
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

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            logging.info(f"[EXTRACTION START] Fetching metadata for: {url}")
            info = ydl.extract_info(url, download=False)
            
            media_type = "image" if info.get('_type') == 'url_transparent' and not info.get('formats') else "video"
            
            # Default fallbacks
            video_high = info.get('url')
            video_normal = info.get('url')
            audio_high = info.get('url')
            audio_normal = info.get('url')

            formats = info.get('formats', [])

            # 3. Intelligent Format Sorting (HD vs SD mapping)
            if formats:
                # Get pre-merged formats containing both video and audio
                merged_formats = [f for f in formats if f.get('vcodec') != 'none' and f.get('acodec') != 'none']
                # Get pure audio formats
                audio_formats = [f for f in formats if f.get('vcodec') == 'none' and f.get('acodec') != 'none']

                if merged_formats:
                    # Sort by resolution height descending
                    merged_formats = sorted(merged_formats, key=lambda x: x.get('height', 0) or 0, reverse=True)
                    video_high = merged_formats[0].get('url')
                    video_normal = merged_formats[-1].get('url') if len(merged_formats) > 1 else video_high
                
                if audio_formats:
                    # Sort by audio bitrate descending
                    audio_formats = sorted(audio_formats, key=lambda x: x.get('abr', 0) or 0, reverse=True)
                    audio_high = audio_formats[0].get('url')
                    audio_normal = audio_formats[-1].get('url') if len(audio_formats) > 1 else audio_high
                else:
                    # Fallback audio to video links if no pure audio track exists
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
            video_cache.set(url, response_data)
            
            logging.info("[EXTRACTION SUCCESS] Formats successfully mapped.")
            return jsonify(response_data)

    except yt_dlp.utils.DownloadError as de:
        logging.error(f"[EXTRACTION ERROR] yt-dlp error: {str(de)}")
        return jsonify({"success": False, "error": "Could not extract video. It might be private or deleted."}), 400
    except Exception as e:
        logging.error(f"[SERVER ERROR] Unexpected error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server error during extraction."}), 500


# ==========================================
# 🌊 ROUTE 2: ADVANCED STREAMING PROXY 🌊
# ==========================================
@app.route('/api/direct', methods=['GET'])
def direct_download():
    file_url = request.args.get('url')
    file_type = request.args.get('type', 'mp4')
    
    if not file_url:
        return jsonify({"error": "URL is missing"}), 400
        
    try:
        # Pass client's Range header to the target server for Pause/Resume support
        range_header = request.headers.get('Range', None)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            'Accept-Encoding': 'identity' # Prevent gzip issues in streaming binary
        }
        
        if range_header:
            headers['Range'] = range_header

        # Timeout prevents infinite hanging. stream=True prevents loading entire file to RAM.
        req = http_session.get(file_url, stream=True, headers=headers, timeout=(5, 30))
        
        # Map response headers back to client
        resp_headers = {
            'Content-Disposition': f'attachment; filename="FVD_Media_Download.{file_type}"',
            'Accept-Ranges': 'bytes'
        }

        if 'Content-Length' in req.headers:
            resp_headers['Content-Length'] = req.headers['Content-Length']
            
        if 'Content-Range' in req.headers:
            resp_headers['Content-Range'] = req.headers['Content-Range']

        # Determine if it's a Partial Content (206) or Full (200)
        status_code = req.status_code if req.status_code in [200, 206] else 200

        # Efficient chunk generator (Yields 1MB at a time)
        def generate_chunks():
            try:
                for chunk in req.iter_content(chunk_size=1024 * 1024):
                    if chunk:
                        yield chunk
            except Exception as stream_err:
                logging.error(f"[STREAM ERROR] Connection dropped: {str(stream_err)}")

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
    # Threaded=True allows multiple concurrent users in development
    app.run(host='0.0.0.0', port=5000, threaded=True)