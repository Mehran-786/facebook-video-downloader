document.getElementById('downloadBtn').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');
    const downloadButton = document.getElementById('downloadLink');
    const imagePreview = document.getElementById('imagePreview'); // Naya image preview

    if (!url) {
        alert("Please paste a Facebook video link!");
        return;
    }

    // Processing animation show karein
    resultDiv.style.display = 'block';
    downloadButton.style.display = 'none';
    if(imagePreview) imagePreview.style.display = 'none';
    resultDiv.innerHTML = '<p style="color: yellow;">Processing... Please wait ⏳</p>';

    try {
        // Aapka live Render Backend URL
        const backendUrl = `https://fbvideodownloader.onrender.com/api/download?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(backendUrl);
        const result = await response.json();

        if (result.success) {
            resultDiv.innerHTML = '<p style="color: #00ff88;">Ready to Download! 🎉</p>';
            downloadButton.style.display = 'inline-block';
            
            // Agar Video aayi hai
            if (result.type === "video") {
                if(imagePreview) imagePreview.style.display = "none";
                downloadButton.innerText = "Download Video 🎬";
                downloadButton.onclick = () => {
                    window.open(result.link, '_blank');
                };
            } 
            // Agar Photo aayi hai
            else if (result.type === "image") {
                if(imagePreview) {
                    imagePreview.src = result.link;
                    imagePreview.style.display = "block"; 
                }
                downloadButton.innerText = "Download Image 📸";
                downloadButton.onclick = () => {
                    window.open(result.link, '_blank');
                };
            }
        } else {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${result.error}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Failed to connect to server!</p>`;
    }
});
// =========================================
// 🌟 NAYA SIDEBAR MENU KA LOGIC 🌟
// =========================================

const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');

// 3-Line Icon dabane par Menu kholo
menuIcon.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// X Icon dabane par Menu band karo
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Language dabane par uski list kholo/band karo
langToggle.addEventListener('click', (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    langMenu.classList.toggle('active');
});
