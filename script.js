// =========================================
// 🌟 MULTI-LANGUAGE DICTIONARY (11 Zabanain)
// =========================================
const translations = {
    "en": {
        "contactBtn": '<i class="fas fa-envelope"></i> Contact Me',
        "langBtn": "Language",
        "extBtn": '<i class="fas fa-puzzle-piece"></i> Extension <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">Soon</span>',
        "mainTitle": "Video Downloader",
        "tagline": "Download high-quality videos easily",
        "placeholder": "Paste video link here...",
        "processBtn": "Download",
        "f1Title": "Fast Download",
        "f1Desc": "Grab videos in seconds with our custom stealth engine",
        "f2Title": "Safe & Secure",
        "f2Desc": "No login, no tracking — your privacy matters",
        "f3Title": "All-in-One HD",
        "f3Desc": "Supports multiple platforms in highest available quality"
    },
    "ur": { "processBtn": "ڈاؤنلوڈ کریں", "contactBtn": '<i class="fas fa-envelope"></i> رابطہ کریں', "langBtn": "زبان", "extBtn": '<i class="fas fa-puzzle-piece"></i> ایکسٹینشن <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-right: 10px;">جلد</span>', "mainTitle": "ویڈیو ڈاؤنلوڈر", "tagline": "اعلیٰ معیار کی ویڈیوز آسانی سے ڈاؤنلوڈ کریں", "placeholder": "ویڈیو کا لنک یہاں پیسٹ کریں...", "f1Title": "تیز ڈاؤنلوڈ", "f1Desc": "ہمارے کسٹم انجن کے ذریعے سیکنڈوں میں ویڈیو حاصل کریں", "f2Title": "محفوظ اور پرائیویٹ", "f2Desc": "کوئی لاگ ان نہیں، کوئی ٹریکنگ نہیں", "f3Title": "آل ان ون ایچ ڈی", "f3Desc": "بہترین کوالٹی میں تمام پلیٹ فارمز کی سپورٹ" },
    "hi": { "processBtn": "डाउनलोड करें", "contactBtn": '<i class="fas fa-envelope"></i> संपर्क करें', "langBtn": "भाषा", "extBtn": '<i class="fas fa-puzzle-piece"></i> एक्सटेंशन <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">जल्द ही</span>', "mainTitle": "वीडियो डाउनलोडर", "tagline": "आसानी से उच्च गुणवत्ता वाले वीडियो डाउनलोड करें", "placeholder": "वीडियो लिंक यहाँ पेस्ट करें...", "f1Title": "तेज़ डाउनलोड", "f1Desc": "हमारे कस्टम इंजन के साथ सेकंड में वीडियो प्राप्त करें", "f2Title": "सुरक्षित और प्राइवेट", "f2Desc": "कोई लॉगिन नहीं, कोई ट्रैकिंग नहीं", "f3Title": "ऑल-इन-वन HD", "f3Desc": "सर्वश्रेष्ठ गुणवत्ता में सभी प्लेटफार्मों का समर्थन" },
    "ar": { "processBtn": "تحميل", "contactBtn": '<i class="fas fa-envelope"></i> اتصل بي', "langBtn": "اللغة", "extBtn": '<i class="fas fa-puzzle-piece"></i> الإضافة <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-right: 10px;">قريباً</span>', "mainTitle": "محمل الفيديوهات", "tagline": "قم بتنزيل مقاطع فيديو عالية الجودة بسهولة", "placeholder": "ضع رابط الفيديو هنا...", "f1Title": "تحميل سريع", "f1Desc": "احصل على الفيديوهات في ثوانٍ عبر محركنا الخفي", "f2Title": "آمن ومحمي", "f2Desc": "لا يتطلب تسجيل دخول ولا تتبع", "f3Title": "جودة عالية للكل", "f3Desc": "يدعم منصات متعددة بأعلى جودة ممكنة" },
    "fa": { "processBtn": "دانلود", "contactBtn": '<i class="fas fa-envelope"></i> تماس با من', "langBtn": "زبان", "extBtn": '<i class="fas fa-puzzle-piece"></i> افزونه <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-right: 10px;">بزودی</span>', "mainTitle": "دانلود کننده ویدیو", "tagline": "ویدیوهای با کیفیت بالا را به راحتی دانلود کنید", "placeholder": "لینک ویدیو را اینجا قرار دهید...", "f1Title": "دانلود سریع", "f1Desc": "دریافت ویدیوها در چند ثانیه", "f2Title": "امن و مطمئن", "f2Desc": "بدون نیاز به ورود و ردیابی", "f3Title": "همه در یک با کیفیت HD", "f3Desc": "پشتیبانی از چندین پلتفرم با بالاترین کیفیت" },
    "zh": { "processBtn": "下载", "contactBtn": '<i class="fas fa-envelope"></i> 联系我', "langBtn": "语言", "extBtn": '<i class="fas fa-puzzle-piece"></i> 扩展插件 <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">即将推出</span>', "mainTitle": "视频下载器", "tagline": "轻松下载高质量视频", "placeholder": "在此粘贴视频链接...", "f1Title": "极速下载", "f1Desc": "几秒钟内获取视频", "f2Title": "安全可靠", "f2Desc": "免登录，无追踪", "f3Title": "全能高清", "f3Desc": "支持多平台最高画质" },
    "ja": { "processBtn": "ダウンロード", "contactBtn": '<i class="fas fa-envelope"></i> 連絡する', "langBtn": "言語", "extBtn": '<i class="fas fa-puzzle-piece"></i> 拡張機能 <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">まもなく</span>', "mainTitle": "動画ダウンローダー", "tagline": "高品質な動画を簡単にダウンロード", "placeholder": "ここに動画のリンクを貼り付けてください...", "f1Title": "高速ダウンロード", "f1Desc": "数秒で動画を取得", "f2Title": "安心・安全", "f2Desc": "ログイン不要、追跡なし", "f3Title": "オールインワンHD", "f3Desc": "複数プラットフォームで最高画質をサポート" },
    "ko": { "processBtn": "다운로드", "contactBtn": '<i class="fas fa-envelope"></i> 연락하기', "langBtn": "언어", "extBtn": '<i class="fas fa-puzzle-piece"></i> 확장 프로그램 <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">곧</span>', "mainTitle": "비디오 다운로더", "tagline": "고품질 비디오를 쉽게 다운로드하세요", "placeholder": "여기에 비디오 링크를 붙여넣으세요...", "f1Title": "빠른 다운로드", "f1Desc": "몇 초 만에 비디오 가져오기", "f2Title": "안전 및 보안", "f2Desc": "로그인 없음, 추적 없음", "f3Title": "올인원 HD", "f3Desc": "최고 화질로 여러 플랫폼 지원" },
    "de": { "processBtn": "Download", "contactBtn": '<i class="fas fa-envelope"></i> Kontaktiere mich', "langBtn": "Sprache", "extBtn": '<i class="fas fa-puzzle-piece"></i> Erweiterung <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">Bald</span>', "mainTitle": "Video Herunterladen", "tagline": "Laden Sie hochwertige Videos herunter", "placeholder": "Videolink hier einfügen...", "f1Title": "Schneller Download", "f1Desc": "Holen Sie sich Videos in Sekunden", "f2Title": "Sicher & Geschützt", "f2Desc": "Kein Login, kein Tracking", "f3Title": "All-in-One HD", "f3Desc": "Unterstützt mehrere Plattformen in bester Qualität" },
    "it": { "processBtn": "Scarica", "contactBtn": '<i class="fas fa-envelope"></i> Contattami', "langBtn": "Lingua", "extBtn": '<i class="fas fa-puzzle-piece"></i> Estensione <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">Presto</span>', "mainTitle": "Scarica Video", "tagline": "Scarica facilmente video di alta qualità", "placeholder": "Incolla qui il link del video...", "f1Title": "Download Veloce", "f1Desc": "Scarica video in pochi secondi", "f2Title": "Sicuro e Protetto", "f2Desc": "Nessun accesso, nessun tracciamento", "f3Title": "All-in-One HD", "f3Desc": "Supporta più piattaforme" },
    "ms": { "processBtn": "Muat Turun", "contactBtn": '<i class="fas fa-envelope"></i> Hubungi Saya', "langBtn": "Bahasa", "extBtn": '<i class="fas fa-puzzle-piece"></i> Sambungan <span style="font-size: 10px; background: red; padding: 2px 5px; border-radius: 5px; margin-left: 10px;">Akan Datang</span>', "mainTitle": "Pemuat Turun Video", "tagline": "Muat turun video berkualiti tinggi dengan mudah", "placeholder": "Tampal pautan video di sini...", "f1Title": "Muat Turun Pantas", "f1Desc": "Dapatkan video dalam beberapa saat", "f2Title": "Selamat & Terjamin", "f2Desc": "Tiada log masuk", "f3Title": "Semua-dalam-Satu HD", "f3Desc": "Menyokong pelbagai platform" }
};

function changeLanguage(lang) {
    const keys = document.querySelectorAll("[data-key]");
    keys.forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === "INPUT") {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }

    document.getElementById('langMenu').classList.remove('active');
    document.getElementById('sidebar').classList.remove('active');
}

// SIDEBAR TOGGLE
const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');

menuIcon.addEventListener('click', () => { sidebar.classList.add('active'); });
closeBtn.addEventListener('click', () => { sidebar.classList.remove('active'); });
langToggle.addEventListener('click', (e) => { e.preventDefault(); langMenu.classList.toggle('active'); });

// =========================================
// 🌟 MAIN DOWNLOADING & PLAYER LOGIC 🌟
// =========================================
const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const statusMessage = document.getElementById('statusMessage');

// Elements inside Result Card
const resultCard = document.getElementById('resultCard');
const videoPreview = document.getElementById('videoPreview');
const imagePreview = document.getElementById('imagePreview');
const btnDownloadVideo = document.getElementById('btnDownloadVideo');
const btnDownloadAudio = document.getElementById('btnDownloadAudio');

downloadBtn.addEventListener('click', async () => {
    const url = videoUrlInput.value.trim();
    
    if (!url) {
        alert("Bhai, pehle link toh paste karo!");
        return;
    }

    // Processing State
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = "Processing... <i class='fas fa-spinner fa-spin'></i>";
    downloadBtn.disabled = true;
    
    // Hide previous results & stop video if playing
    resultCard.style.display = "none";
    statusMessage.style.display = "none";
    videoPreview.pause();
    videoPreview.removeAttribute('src'); 

    try {
        // 🌟 AAPKI RENDER API WALA LINK 🌟
        const backendUrl = `https://fbvideodownloader.onrender.com/api/download?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(backendUrl);
        const data = await response.json();

        if (data.success && data.link) {
            // Card Show Karo
            resultCard.style.display = "block";
            
            // 🌟 1. VIDEO PREVIEW PLAYER 🌟
            if (data.type === "image" || data.link.includes('.jpg') || data.link.includes('.png')) {
                // Agar tasveer hai toh Image dikhao
                videoPreview.style.display = "none";
                imagePreview.style.display = "block";
                imagePreview.src = data.link;
            } else {
                // Agar Video hai toh choti screen (Player) mein lagao
                imagePreview.style.display = "none";
                videoPreview.style.display = "block";
                videoPreview.src = data.link;
            }

            // 🌟 2. BUTTONS KI SETTING 🌟
            btnDownloadVideo.href = data.link;

            // Audio Button Logic (Aapke naye app.py se audio_url aayega)
            if(data.audio_url) {
                btnDownloadAudio.href = data.audio_url;
                btnDownloadAudio.style.display = "flex";
            } else if(data.type === "image") {
                // Agar sirf picture hai toh Audio ka button hide kar do
                btnDownloadAudio.style.display = "none";
            } else {
                // Agar backend audio alag nahi deta, toh same link lagta hai
                btnDownloadAudio.href = data.link;
                btnDownloadAudio.style.display = "flex";
            }

        } else {
            statusMessage.style.display = "block";
            statusMessage.style.color = "#ff4757"; 
            statusMessage.innerHTML = "❌ Error: " + (data.error || "Video nahi mili.");
        }
    } catch (error) {
        statusMessage.style.display = "block";
        statusMessage.style.color = "#ff4757";
        statusMessage.innerHTML = "❌ Server error. Kya aapka Render backend 'Live' hai?";
    } finally {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
});
