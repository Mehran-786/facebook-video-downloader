from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
# CORS allow karta hai ke aapki Vercel website Render se baat kar sake
CORS(app) 

@app.route('/api/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"success": False, "error": "Bhai, URL dena zaroori hai!"}), 400

    # yt-dlp ki Khufiya Settings + Fake Browser Identity
    ydl_opts = {
        'format': 'b[ext=mp4]/best', # Pehle se mix hui video lao
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True, # Agar 4 tasweerein hain toh sirf pehli lao
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Sec-Fetch-Mode': 'navigate'
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Video ki sari information nikalna bina download kiye
            info = ydl.extract_info(url, download=False)
            
            # Check karna ke tasveer hai ya video
            media_type = "image" if info.get('_type') == 'url_transparent' and not info.get('formats') else "video"
            
            # 1. Asal Video Link
            video_url = info.get('url')
            
            # 2. Asal Audio Link Nikalne ki Logic
            audio_url = None
            formats = info.get('formats', [])
            for f in formats:
                # Aisa format dhoondo jisme video na ho (vcodec='none') aur sirf audio ho (acodec!='none')
                if f.get('vcodec') == 'none' and f.get('acodec') != 'none':
                    audio_url = f.get('url')
            
            # Agar kisi wajah se sirf audio nahi milti, toh video wale link ko hi audio bana do
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

if __name__ == '__main__':
    # Render ke liye host 0.0.0.0 zaroori hai
    app.run(host='0.0.0.0', port=5000)
