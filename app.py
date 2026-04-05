from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import yt_dlp
import requests

app = Flask(__name__)
# Frontend ko allow karne ke liye CORS
CORS(app) 

@app.route('/api/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"success": False, "error": "Bhai, koi URL toh do!"}), 400

    # yt-dlp ki advanced settings for better speed and quality
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'format': 'best',
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Sec-Fetch-Mode': 'navigate'
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Video ki information extract karna bina download kiye
            info = ydl.extract_info(url, download=False)
            
            # Check type (Video hai ya Image/Post)
            media_type = "image" if info.get('_type') == 'url_transparent' and not info.get('formats') else "video"
            
            formats = info.get('formats', [])
            
            # =========================================
            # 🌟 1. VIDEO QUALITY FILTERING (HD vs Normal)
            # =========================================
            # Aise formats nikalna jinme audio aur video dono hon (Pre-merged)
            videos = [f for f in formats if f.get('vcodec') != 'none' and f.get('acodec') != 'none' and 'mp4' in f.get('ext', 'mp4')]
            
            # Agar merged na milein toh koi bhi video format le lo
            if not videos: 
                videos = [f for f in formats if f.get('vcodec') != 'none' and 'mp4' in f.get('ext', 'mp4')]
                
            # Resolution (Height) ke hisaab se chotay se barray mein sort karna
            videos = sorted(videos, key=lambda x: x.get('height') or 0)
            
            if videos:
                video_high = videos[-1].get('url')   # Sab se aakhiri yani Highest Quality (HD)
                video_normal = videos[0].get('url')  # Sab se pehla yani Lowest Quality (Normal/SD)
            else:
                video_high = info.get('url')
                video_normal = info.get('url')

            # =========================================
            # 🌟 2. AUDIO QUALITY FILTERING (HD vs Normal)
            # =========================================
            # Aise formats nikalna jinme sirf audio ho
            audios = [f for f in formats if f.get('vcodec') == 'none' and f.get('acodec') != 'none']
            
            # Bitrate ke hisaab se sort karna
            audios = sorted(audios, key=lambda x: x.get('abr') or 0)
            
            if audios:
                audio_high = audios[-1].get('url')
                audio_normal = audios[0].get('url')
            else:
                audio_high = video_high # Agar audio alag na mile toh video wala link hi bhej do
                audio_normal = video_normal

            return jsonify({
                "success": True,
                "type": media_type,
                "video_high": video_high,
                "video_normal": video_normal,
                "audio_high": audio_high,
                "audio_normal": audio_normal,
                "thumbnail": info.get('thumbnail'),
                "title": info.get('title', 'Facebook_Video')
            })

    except Exception as e:
        return jsonify({"success": False, "error": "Yeh video private hai ya link galat hai."}), 500


# =========================================
# 🌟 DIRECT DOWNLOAD PROXY (Forcing the download)
# =========================================
@app.route('/api/direct', methods=['GET'])
def direct_download():
    file_url = request.args.get('url')
    file_type = request.args.get('type', 'mp4')
    
    if not file_url:
        return "URL is missing", 400
        
    try:
        range_header = request.headers.get('Range', None)
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'}
        if range_header: 
            headers['Range'] = range_header

        # File ko chunk by chunk stream karna taake server par load na pare
        req = requests.get(file_url, stream=True, headers=headers)
        
        resp_headers = {
            'Content-Disposition': f'attachment; filename="MediaNet_Download.{file_type}"',
            'Accept-Ranges': 'bytes'
        }

        if 'Content-Length' in req.headers: resp_headers['Content-Length'] = req.headers['Content-Length']
        if 'Content-Range' in req.headers: resp_headers['Content-Range'] = req.headers['Content-Range']

        return Response(
            stream_with_context(req.iter_content(chunk_size=1024 * 1024)), 
            status=req.status_code,
            content_type=req.headers.get('content-type', f'video/{file_type}'),
            headers=resp_headers
        )
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    # Render ya kisi bhi cloud platform par host karne ke liye 0.0.0.0 zaroori hai
    app.run(host='0.0.0.0', port=5000)
