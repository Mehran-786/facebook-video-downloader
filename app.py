from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import yt_dlp
import requests

app = Flask(__name__)
CORS(app) 

# --- Purana Link Nikaalne Wala Route ---
@app.route('/api/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"success": False, "error": "Bhai, URL dena zaroori hai!"}), 400

    ydl_opts = {
        'format': 'b[ext=mp4]/best',
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Sec-Fetch-Mode': 'navigate'
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            media_type = "image" if info.get('_type') == 'url_transparent' and not info.get('formats') else "video"
            video_url = info.get('url')
            
            audio_url = None
            formats = info.get('formats', [])
            for f in formats:
                if f.get('vcodec') == 'none' and f.get('acodec') != 'none':
                    audio_url = f.get('url')
            
            if not audio_url:
                audio_url = video_url

            return jsonify({
                "success": True,
                "type": media_type,
                "link": video_url,
                "audio_url": audio_url
            })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ==========================================
# 🌟 NAYA ROUTE: DIRECT DOWNLOAD WITH RESUME SUPPORT 🌟
# ==========================================
@app.route('/api/direct', methods=['GET'])
def direct_download():
    file_url = request.args.get('url')
    file_type = request.args.get('type', 'mp4')
    
    if not file_url:
        return "URL is missing", 400
        
    try:
        # Browser ki taraf se aane wali 'Range' header ko pakarna
        range_header = request.headers.get('Range', None)
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'}
        
        # Agar browser Resume karne ki koshish kar raha hai toh header aage pass karo
        if range_header:
            headers['Range'] = range_header

        req = requests.get(file_url, stream=True, headers=headers)
        
        # Response headers set karna
        resp_headers = {
            'Content-Disposition': f'attachment; filename="FVD_Media.{file_type}"',
            'Accept-Ranges': 'bytes' # Browser ko batana ke pause/resume support hai
        }

        # Agar Content-Length mili hai (file size), toh wo bhi pass kar do
        if 'Content-Length' in req.headers:
            resp_headers['Content-Length'] = req.headers['Content-Length']
            
        # Agar Content-Range mili hai (resume ke waqt), toh pass karo
        if 'Content-Range' in req.headers:
            resp_headers['Content-Range'] = req.headers['Content-Range']

        status_code = req.status_code

        return Response(
            stream_with_context(req.iter_content(chunk_size=1024 * 1024)), # 1MB chunks
            status=status_code,
            content_type=req.headers.get('content-type', f'video/{file_type}'),
            headers=resp_headers
        )
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
