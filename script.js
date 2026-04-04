let currentLang = 'en';

const translations = {
    "en": {
        "langBtn": "Language", "mainTitle": "Video Downloader", "tagline": "Download high-quality videos easily",
        "placeholder": "Paste video link here...", "processBtn": "Download", "readyTitle": "Ready to Download!",
        "infoText": "Select your preferred quality below.", 
        // 🌟 Naye 4 Buttons ke Translations 🌟
        "dlVidHigh": "Video (HD)", "dlVidNorm": "Video (Normal)",
        "dlAudHigh": "Audio (HQ)", "dlAudNorm": "Audio (Normal)",
        "emptyLinkAlert": "Please paste a link first!", "processing": "Processing...", "successMsg": "✅ Ready!", "errorServer": "Server error."
    },
    "ur": {
        "langBtn": "زبان", "mainTitle": "ویڈیو ڈاؤنلوڈر", "tagline": "آسانی سے ویڈیوز ڈاؤنلوڈ کریں",
        "placeholder": "ویڈیو کا لنک یہاں پیسٹ کریں...", "processBtn": "ڈاؤنلوڈ کریں", "readyTitle": "ڈاؤنلوڈ کے لیے تیار!",
        "infoText": "نیچے سے اپنی پسند کی کوالٹی منتخب کریں۔",
        "dlVidHigh": "ویڈیو (ایچ ڈی)", "dlVidNorm": "ویڈیو (نارمل)",
        "dlAudHigh": "آڈیو (بہترین)", "dlAudNorm": "آڈیو (نارمل)",
        "emptyLinkAlert": "پہلے لنک پیسٹ کریں!", "processing": "پروسیسنگ...", "successMsg": "✅ تیار ہے!", "errorServer": "سرور ایرر"
    },
    "hi": {
        "langBtn": "भाषा", "mainTitle": "वीडियो डाउनलोडर", "tagline": "आसानी से वीडियो डाउनलोड करें",
        "placeholder": "वीडियो लिंक यहाँ पेस्ट करें...", "processBtn": "डाउनलोड करें", "readyTitle": "डाउनलोड के लिए तैयार!",
        "infoText": "नीचे से अपनी पसंद की क्वालिटी चुनें।",
        "dlVidHigh": "वीडियो (HD)", "dlVidNorm": "वीडियो (Normal)",
        "dlAudHigh": "ऑडियो (HQ)", "dlAudNorm": "ऑडियो (Normal)",
        "emptyLinkAlert": "पहले लिंक पेस्ट करें!", "processing": "प्रोसेसिंग...", "successMsg": "✅ तैयार!", "errorServer": "सर्वर त्रुटि"
    }
};

function changeLanguage(lang) {
    currentLang = lang; 
    const keys = document.querySelectorAll("[data-key]");
    keys.forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === "INPUT") element.placeholder = translations[lang][key];
            else element.innerHTML = translations[lang][key];
        }
    });

    if (lang === 'ur') document.body.setAttribute('dir', 'rtl');
    else document.body.setAttribute('dir', 'ltr');

    document.getElementById('desktopLangMenu')?.classList.remove('active');
    document.getElementById('mobileLangMenu')?.classList.remove('active');
    document.getElementById('sidebar')?.classList.remove('active');
}

// Menus Logic
const desktopLangToggle = document.getElementById('desktopLangToggle');
const desktopLangMenu = document.getElementById('desktopLangMenu');
desktopLangToggle?.addEventListener('click', (e) => { e.preventDefault(); desktopLangMenu.classList.toggle('active'); });

const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const mobileLangToggle = document.getElementById('mobileLangToggle');
const mobileLangMenu = document.getElementById('mobileLangMenu');

menuIcon?.addEventListener('click', () => { sidebar.classList.add('active'); });
closeBtn?.addEventListener('click', () => { sidebar.classList.remove('active'); });
mobileLangToggle?.addEventListener('click', (e) => { e.preventDefault(); mobileLangMenu.classList.toggle('active'); });

document.addEventListener('click', (e) => {
    if (desktopLangToggle && desktopLangMenu && !desktopLangToggle.contains(e.target) && !desktopLangMenu.contains(e.target)) {
        desktopLangMenu.classList.remove('active');
    }
});

// 🌟 MAIN DOWNLOAD LOGIC 🌟
const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const statusMessage = document.getElementById('statusMessage');
const resultCard = document.getElementById('resultCard');
const videoPreview = document.getElementById('videoPreview');
const imagePreview = document.getElementById('imagePreview');

// Naye 4 Buttons
const btnVidHigh = document.getElementById('btnVidHigh');
const btnVidNorm = document.getElementById('btnVidNorm');
const btnAudHigh = document.getElementById('btnAudHigh');
const btnAudNorm = document.getElementById('btnAudNorm');

const RENDER_BASE_URL = "https://fbvideodownloader.onrender.com";

downloadBtn.addEventListener('click', async () => {
    const url = videoUrlInput.value.trim();
    if (!url) { alert(translations[currentLang]?.emptyLinkAlert || "Link required!"); return; }

    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = (translations[currentLang]?.processing || "Processing...") + " <i class='fas fa-spinner fa-spin'></i>";
    downloadBtn.disabled = true;
    
    resultCard.style.display = "none";
    statusMessage.style.display = "none";
    videoPreview.pause();
    videoPreview.removeAttribute('src'); 

    try {
        const backendUrl = `${RENDER_BASE_URL}/api/download?url=${encodeURIComponent(url)}`;
        const response = await fetch(backendUrl);
        const data = await response.json();

        if (data.success) {
            resultCard.style.display = "block";
            
            // Preview Logic
            if (data.type === "image") {
                videoPreview.style.display = "none";
                imagePreview.style.display = "block";
                imagePreview.src = data.video_high; // Images use video_high parameter
            } else {
                imagePreview.style.display = "none";
                videoPreview.style.display = "block";
                videoPreview.src = data.video_normal || data.video_high; // Preview ke liye normal load tez hota hai
            }

            // 🌟 4 Buttons ke Direct Links Generate Karna 🌟
            btnVidHigh.href = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.video_high)}&type=mp4`;
            btnVidNorm.href = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.video_normal)}&type=mp4`;
            
            if (data.type === "image") {
                // Agar Image hai toh Audio buttons chupa do
                btnAudHigh.style.display = "none";
                btnAudNorm.style.display = "none";
                btnVidNorm.style.display = "none"; // Image ki sirf ek quality kaafi hai
                btnVidHigh.innerHTML = '<i class="fas fa-image"></i> Download Image';
            } else {
                // Video ke case mein charon buttons dikhao
                btnAudHigh.style.display = "flex";
                btnAudNorm.style.display = "flex";
                btnVidNorm.style.display = "flex";
                btnVidHigh.innerHTML = '<i class="fas fa-video"></i> <span data-key="dlVidHigh">Video (HD)</span>';
                
                btnAudHigh.href = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.audio_high)}&type=mp3`;
                btnAudNorm.href = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.audio_normal)}&type=mp3`;
            }

            statusMessage.style.display = "block";
            statusMessage.style.color = "#4ade80"; 
            statusMessage.innerHTML = translations[currentLang]?.successMsg || "✅ Success!";

        } else {
            statusMessage.style.display = "block";
            statusMessage.style.color = "#ff4757"; 
            statusMessage.innerHTML = "❌ " + (data.error || "Error");
        }
    } catch (error) {
        statusMessage.style.display = "block";
        statusMessage.style.color = "#ff4757";
        statusMessage.innerHTML = "❌ Server error.";
    } finally {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
});
