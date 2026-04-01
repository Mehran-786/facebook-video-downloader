from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
# CORS allow karega taake Vercel wala frontend is Render wale backend se baat kar sake
CORS(app)

@app.route('/api/download', methods=['GET'])
def download_video():
    # Frontend se aane wala user ka link
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"error": "insert a video link!"}), 400

    # Aapki bheji hui Nayi API ki Details
    api_url = "https://free-facebook-downloader.p.rapidapi.com/external-api/facebook-video-downloader"
    
    # URL jo API ko check karna hai
    querystring = {"url": video_url}
    
    # Nayi API ka zaroori payload
    payload = {
        "key1": "value",
        "key2": "value"
    }
    
    # Aapki API Key aur Headers
    headers = {
        "x-rapidapi-key": "2380a40defmsh5f5045b09c43624p1e4234jsnb9a4a71f37cd",
        "x-rapidapi-host": "free-facebook-downloader.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    try:
        # API ko request bhejna (JSON payload ke sath)
        response = requests.post(api_url, json=payload, headers=headers, params=querystring)
        data = response.json()

        # Naye JSON format ke mutabiq link nikalna
        if data.get("success") == True and "links" in data:
            links = data["links"]
            
            # Pehle High Quality dhoondo, na mile toh Low Quality le lo
            media_link = links.get("Download High Quality") or links.get("Download Low Quality")
            
            if media_link:
                # Check karna ke Video hai ya Photo (Image)
                media_type = "video" if ".mp4" in media_link.lower() else "image"
                return jsonify({"success": True, "type": media_type, "link": media_link})
            else:
                return jsonify({"error": "video link not found."}), 404
        else:
            return jsonify({"error": "video not found."}), 404

    except Exception as e:
        return jsonify({"error": f"Server Error: {str(e)}"}), 500

if __name__ == '__main__':
    # Local testing ke liye server run karna
    app.run(debug=True)
