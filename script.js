// Download Button Logic
document.getElementById('downloadBtn').addEventListener('click', () => {
    const urlInput = document.getElementById('videoUrl');
    const url = urlInput.value.trim();
    const downloadBtn = document.getElementById('downloadBtn');

    if (!url) {
        alert('Please enter a valid Facebook video URL');
        return;
    }

    // Button ko update karna
    downloadBtn.textContent = 'Starting Download...';
    downloadBtn.disabled = true;

    // 🌟 Direct Browser Download Trigger
    // Hum seedha apne backend ko link bhej rahe hain GET request ke zariye
    const backendUrl = `https://fbvideodownloader.onrender.com/api/download?url=${encodeURIComponent(url)}`;
    
    // Ye line naya tab nahi kholegi, balke aapke browser ka apna Download Manager start kar degi!
    window.location.href = backendUrl;

    // 3 seconds baad button ko wapas normal kar dena
    setTimeout(() => {
        downloadBtn.textContent = 'Download';
        downloadBtn.disabled = false;
        urlInput.value = '';
    }, 3000);
});

/* TOUCH ROTATION (For Mobile Devices) */
document.querySelectorAll('.platform-btn').forEach(icon => {
    icon.addEventListener('touchstart', () => {
        icon.style.transform = "rotate(360deg) scale(1.1)";
    });

    icon.addEventListener('touchend', () => {
        setTimeout(() => {
            icon.style.transform = "rotate(0deg)";
        }, 400);
    });
});
