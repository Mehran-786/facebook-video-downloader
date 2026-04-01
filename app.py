from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
# CORS allow karega taake Vercel wala frontend is Render wale backend se baat kar sake
CORS(app)

@app.route('/api/download', methods=['GET'])
def download_video():
    # Frontend se aane wala user ka link
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"error": "Link dena zaroori hai!"}), 400

    # yt-dlp ki Khufiya Settings (Engine Config)
    ydl_opts = {
        'format': 'best', # Sab se achi quality nikalna
        'quiet': True,    # Server par faltu logs band rakhna
        'no_warnings': True,
        'noplaylist': True, # Agar playlist ho toh sirf 1 video uthana
    }

    try:
        # Engine ko start karna
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # JADOO YAHAN HAI: download=False ka matlab hai file save mat karo, sirf direct link chura kar lao!
            info = ydl.extract_info(video_url, download=False)
            
            # Asal direct mp4 ya media link
            media_link = info.get('url')
            
            if media_link:
                # Check karna ke Video hai ya Photo (Images ke liye bhi kuch hadd tak kaam karega)
                media_type = "video" if ".mp4" in media_link.lower() else "image"
                return jsonify({"success": True, "type": media_type, "link": media_link})
            else:
                return jsonify({"error": "Video ka asil link nahi mil saka."}), 404

    except Exception as e:
        # Agar Facebook ne block kiya ya video private hui
        return jsonify({"error": "Video private hai ya link galat hai."}), 500

if __name__ == '__main__':
    # Local testing ke liye server run karna
    app.run(debug=True)
