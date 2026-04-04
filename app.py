from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import yt_dlp
import requests

app = Flask(__name__)
CORS(app) 

@app.route('/api/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"success": False, "error": "Bhai, URL dena zaroori hai!"}), 400

    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            media_type = "image" if info.get('_type') == 'url_transparent' and not info.get('formats') else "video"
            
            formats = info.get('formats', [])
            
            # 🌟 1. VIDEO QUALITY FILTERING 🌟
            # Pre-merged videos (jinme audio bhi ho) nikal rahe hain
            videos = [f for f in formats if f.get('vcodec') != 'none' and f.get('acodec') != 'none' and 'mp4' in f.get('ext', 'mp4')]
            if not videos: # Agar merged na milein toh normal videos le lo
                videos = [f for f in formats if f.get('vcodec') != 'none' and 'mp4' in f.get('ext', 'mp4')]
                
            # Height (Resolution) ke hisaab se sort karna
            videos = sorted(videos, key=lambda x: x.get('height') or 0)
            
            if videos:
                video_high = videos[-1].get('url') # Sab se aakhiri (Highest)
                video_normal = videos[0].get('url') # Sab se pehli (Lowest/Normal)
            else:
                video_high = info.get('url')
                video_normal = info.get('url')

            # 🌟 2. AUDIO QUALITY FILTERING 🌟
            audios = [f for f in formats if f.get('vcodec') == 'none' and f.get('acodec') != 'none']
            # Bitrate (Quality) ke hisaab se sort karna
            audios = sorted(audios, key=lambda x: x.get('abr') or 0)
            
            if audios:
                audio_high = audios[-1].get('url')
                audio_normal = audios[0].get('url')
            else:
                audio_high = video_high
                audio_normal = video_normal

            return jsonify({
                "success": True,
                "type": media_type,
                "video_high": video_high,
                "video_normal": video_normal,
                "audio_high": audio_high,
                "audio_normal": audio_normal,
                "thumbnail": info.get('thumbnail')
            })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/direct', methods=['GET'])
def direct_download():
    file_url = request.args.get('url')
    file_type = request.args.get('type', 'mp4')
    
    if not file_url:
        return "URL is missing", 400
        
    try:
        range_header = request.headers.get('Range', None)
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'}
        if range_header: headers['Range'] = range_header

        req = requests.get(file_url, stream=True, headers=headers)
        
        resp_headers = {
            'Content-Disposition': f'attachment; filename="FVD_Media.{file_type}"',
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
    app.run(host='0.0.0.0', port=5000)
