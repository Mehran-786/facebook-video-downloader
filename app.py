from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/download', methods=['GET'])
def download_video():
    video_url = request.args.get('url')
    
    if not video_url:
        return jsonify({"error": "Link nahi mila! Please ek valid URL dalein."}), 400

    # RapidAPI Endpoint aur Details
    api_url = "https://facebook-media-downloader1.p.rapidapi.com/get_media"
    payload = {"url": video_url}
    
    headers = {
        "x-rapidapi-key": "2380a40defmsh5f5045b09c43624p1e4234jsnb9a4a71f37cd",
        "x-rapidapi-host": "facebook-media-downloader1.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    try:
        # API ko request bhejna
        response = requests.post(api_url, json=payload, headers=headers)
        data = response.json()
        
        # JSON se exact MP4 file ka link nikalna
        direct_link = data.get("direct_media_url")

        if direct_link:
            # Jaise hi link mile, user ko us direct video file par bhej do
            return redirect(direct_link)
        else:
            return jsonify({"error": "Video nahi mili. Shayad post private hai ya link galat hai."}), 404

    except Exception as e:
        return jsonify({"error": f"Server Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)