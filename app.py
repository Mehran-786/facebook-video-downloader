from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/download', methods=['GET'])
def download_video():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "Link dena zaroori hai!"}), 400

    # Yahan Aapki Nayi API ka Link aur Headers aayenge
    api_url = "YOUR_NEW_API_URL_HERE"
    querystring = {"url": url}
    headers = {
        "x-rapidapi-key": "YOUR_NEW_RAPIDAPI_KEY_HERE",
        "x-rapidapi-host": "YOUR_NEW_RAPIDAPI_HOST_HERE"
    }

    try:
        response = requests.get(api_url, headers=headers, params=querystring)
        data = response.json()

        # NOTE: Nayi API ke hisab se "media_url" wala naam change karna par sakta hai
        # Farz karein nayi API direct link ko 'url' ya 'link' kehti hai
        media_link = data.get("direct_media_url") # Isay nayi API ke hisab se set karein
        
        if media_link:
            # Check karein ke yeh Video hai ya Image
            if ".mp4" in media_link.lower():
                media_type = "video"
            else:
                media_type = "image"

            return jsonify({"success": True, "type": media_type, "link": media_link})
        else:
            return jsonify({"error": "Media nahi mila. Link private ho sakta hai."}), 404

    except Exception as e:
        return jsonify({"error": "Server mein koi masla aa gaya."}), 500

if __name__ == '__main__':
    app.run(debug=True)
