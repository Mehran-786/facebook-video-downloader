let currentLang = 'en';

const translations = {
    "en": {
        "contactBtn": '<i class="fas fa-envelope"></i> Contact Me',
        "langBtn": "Language",
        "extBtn": '<i class="fas fa-puzzle-piece"></i> Extension <span class="soon-badge" style="margin-left: 10px;">Soon</span>',
        "mainTitle": "Video Downloader",
        "tagline": "Download high-quality videos easily",
        "placeholder": "Paste video link here...",
        "processBtn": "Download",
        "f1Title": "Fast Download",
        "f1Desc": "Grab videos in seconds with our custom stealth engine",
        "f2Title": "Safe & Secure",
        "f2Desc": "No login, no tracking — your privacy matters",
        "f3Title": "All-in-One HD",
        "f3Desc": "FaceBook video downloader<br>Instagram Video downloader<br>Thread Video downloader",
        "readyTitle": "Ready to Download!",
        "infoText": "You can play the video here. Use the buttons below to download.",
        "dlVideoBtn": "Download Video",
        "dlAudioBtn": "Download Audio",
        "emptyLinkAlert": "Please paste a link first!",
        "processing": "Processing...",
        "successMsg": "✅ Link Extracted Successfully!",
        "errorNotFound": "Video not found.",
        "errorServer": "Server error. Please try again later."
    },
    "ur": {
        "contactBtn": '<i class="fas fa-envelope"></i> رابطہ کریں',
        "langBtn": "زبان",
        "extBtn": '<i class="fas fa-puzzle-piece"></i> ایکسٹینشن <span class="soon-badge" style="margin-left: 10px;">جلد</span>',
        "mainTitle": "ویڈیو ڈاؤنلوڈر",
        "tagline": "اعلیٰ معیار کی ویڈیوز آسانی سے ڈاؤنلوڈ کریں",
        "placeholder": "ویڈیو کا لنک یہاں پیسٹ کریں...",
        "processBtn": "ڈاؤنلوڈ کریں",
        "f1Title": "تیز ڈاؤنلوڈ",
        "f1Desc": "ہمارے کسٹم انجن کے ذریعے سیکنڈوں میں ویڈیو حاصل کریں",
        "f2Title": "محفوظ اور پرائیویٹ",
        "f2Desc": "کوئی لاگ ان نہیں، کوئی ٹریکنگ نہیں",
        "f3Title": "آل ان ون ایچ ڈی",
        "f3Desc": "فیس بک ویڈیو ڈاؤنلوڈر<br>انسٹاگرام ویڈیو ڈاؤنلوڈر<br>تھریڈز ویڈیو ڈاؤنلوڈر",
        "readyTitle": "ڈاؤنلوڈ کے لیے تیار!",
        "infoText": "آپ اس ویڈیو کو یہاں پلے کر سکتے ہیں۔ ڈاؤنلوڈ کے لیے نیچے دیے گئے بٹن استعمال کریں۔",
        "dlVideoBtn": "ویڈیو ڈاؤنلوڈ کریں",
        "dlAudioBtn": "آڈیو ڈاؤنلوڈ کریں",
        "emptyLinkAlert": "براہ کرم پہلے لنک پیسٹ کریں!",
        "processing": "پروسیسنگ...",
        "successMsg": "✅ لنک کامیابی سے حاصل کر لیا گیا!",
        "errorNotFound": "ویڈیو نہیں ملی۔",
        "errorServer": "سرور کا مسئلہ ہے۔ براہ کرم بعد میں کوشش کریں۔"
    },
    "hi": {
        "contactBtn": '<i class="fas fa-envelope"></i> संपर्क करें',
        "langBtn": "भाषा",
        "extBtn": '<i class="fas fa-puzzle-piece"></i> एक्सटेंशन <span class="soon-badge" style="margin-left: 10px;">जल्द ही</span>',
        "mainTitle": "वीडियो डाउनलोडर",
        "tagline": "आसानी से उच्च गुणवत्ता वाले वीडियो डाउनलोड करें",
        "placeholder": "वीडियो लिंक यहाँ पेस्ट करें...",
        "processBtn": "डाउनलोड करें",
        "f1Title": "तेज़ डाउनलोड",
        "f1Desc": "हमारे कस्टम इंजन के साथ सेकंड में वीडियो प्राप्त करें",
        "f2Title": "सुरक्षित और प्राइवेट",
        "f2Desc": "कोई लॉगिन नहीं, कोई ट्रैकिंग नहीं",
        "f3Title": "ऑल-इन-वन HD",
        "f3Desc": "फेसबुक वीडियो डाउनलोडर<br>इंस्टाग्राम वीडियो डाउनलोडर<br>थ्रेड्स वीडियो डाउनलोडर",
        "readyTitle": "डाउनलोड के लिए तैयार!",
        "infoText": "आप यहां वीडियो चला सकते हैं। डाउनलोड करने के लिए नीचे दिए गए बटन का उपयोग करें।",
        "dlVideoBtn": "वीडियो डाउनलोड करें",
        "dlAudioBtn": "ऑडियो डाउनलोड करें",
        "emptyLinkAlert": "कृपया पहले लिंक पेस्ट करें!",
        "processing": "प्रोसेसिंग...",
        "successMsg": "✅ लिंक सफलतापूर्वक प्राप्त किया गया!",
        "errorNotFound": "वीडियो नहीं मिला।",
        "errorServer": "सर्वर त्रुटि। कृपया बाद में प्रयास करें।"
    },
    "ar": { "processBtn": "تحميل", "contactBtn": '<i class="fas fa-envelope"></i> اتصل بي', "langBtn": "اللغة", "mainTitle": "محمل الفيديوهات", "tagline": "قم بتنزيل مقاطع فيديو عالية الجودة بسهولة", "placeholder": "ضع رابط الفيديو هنا...", "f1Title": "تحميل سريع", "f1Desc": "احصل على الفيديوهات في ثوانٍ", "f2Title": "آمن ومحمي", "f2Desc": "لا يتطلب تسجيل دخول ولا تتبع", "f3Title": "جودة عالية للكل", "f3Desc": "محمل فيديو فيسبوك<br>محمل فيديو انستغرام<br>محمل فيديو ثريدز", "readyTitle": "جاهز للتحميل!", "infoText": "يمكنك تشغيل الفيديو هنا.", "dlVideoBtn": "تحميل الفيديو", "dlAudioBtn": "تحميل الصوت", "emptyLinkAlert": "الرجاء لصق الرابط أولاً!", "processing": "معالجة...", "successMsg": "✅ تم استخراج الرابط بنجاح!", "errorNotFound": "لم يتم العثور على الفيديو.", "errorServer": "خطأ في الخادم." },
    "fa": { "processBtn": "دانلود", "contactBtn": '<i class="fas fa-envelope"></i> تماس با من', "langBtn": "زبان", "mainTitle": "دانلود کننده ویدیو", "tagline": "ویدیوهای با کیفیت بالا را به راحتی دانلود کنید", "placeholder": "لینک ویدیو را اینجا قرار دهید...", "f1Title": "دانلود سریع", "f1Desc": "دریافت ویدیوها در چند ثانیه", "f2Title": "امن و مطمئن", "f2Desc": "بدون نیاز به ورود", "f3Title": "همه در یک با کیفیت HD", "f3Desc": "دانلود کننده ویدیوی فیسبوک<br>دانلود اینستاگرام<br>تردز", "readyTitle": "آماده دانلود!", "infoText": "ویدیو را پخش کنید.", "dlVideoBtn": "دانلود ویدیو", "dlAudioBtn": "دانلود صدا", "emptyLinkAlert": "لطفاً ابتدا یک پیوند جای‌گذاری کنید!", "processing": "در حال پردازش...", "successMsg": "✅ موفقیت آمیز!", "errorNotFound": "پیدا نشد.", "errorServer": "خطای سرور." },
    "zh": { "processBtn": "下载", "contactBtn": '<i class="fas fa-envelope"></i> 联系我', "langBtn": "语言", "mainTitle": "视频下载器", "tagline": "轻松下载高质量视频", "placeholder": "在此粘贴视频链接...", "f1Title": "极速下载", "f1Desc": "几秒钟内获取视频", "f2Title": "安全可靠", "f2Desc": "免登录，无追踪", "f3Title": "全能高清", "f3Desc": "Facebook 视频下载器<br>Instagram 视频下载器<br>Threads 视频下载器", "readyTitle": "准备下载！", "infoText": "您可以在此处播放视频。", "dlVideoBtn": "下载视频", "dlAudioBtn": "下载音频", "emptyLinkAlert": "请先粘贴链接！", "processing": "处理中...", "successMsg": "✅ 链接提取成功！", "errorNotFound": "未找到视频。", "errorServer": "服务器错误。" },
    "ja": { "processBtn": "ダウンロード", "contactBtn": '<i class="fas fa-envelope"></i> 連絡する', "langBtn": "言語", "mainTitle": "動画ダウンローダー", "tagline": "高品質な動画を簡単にダウンロード", "placeholder": "ここに動画のリンクを貼り付けてください...", "f1Title": "高速ダウンロード", "f1Desc": "数秒で動画を取得", "f2Title": "安心・安全", "f2Desc": "ログイン不要、追跡なし", "f3Title": "オールインワンHD", "f3Desc": "Facebook 動画ダウンローダー<br>Instagram 動画ダウンローダー<br>Threads 動画ダウンローダー", "readyTitle": "ダウンロードの準備ができました！", "infoText": "ここで動画を再生できます。", "dlVideoBtn": "動画をダウンロード", "dlAudioBtn": "音声をダウンロード", "emptyLinkAlert": "最初にリンクを貼り付けてください！", "processing": "処理中...", "successMsg": "✅ リンクの抽出に成功しました！", "errorNotFound": "動画が見つかりません。", "errorServer": "サーバーエラー。" },
    "ko": { "processBtn": "다운로드", "contactBtn": '<i class="fas fa-envelope"></i> 연락하기', "langBtn": "언어", "mainTitle": "비디오 다운로더", "tagline": "고품질 비디오를 쉽게 다운로드하세요", "placeholder": "여기에 비디오 링크를 붙여넣으세요...", "f1Title": "빠른 다운로드", "f1Desc": "몇 초 만에 비디오 가져오기", "f2Title": "안전 및 보안", "f2Desc": "로그인 없음, 추적 없음", "f3Title": "올인원 HD", "f3Desc": "페이스북 비디오 다운로더<br>인스타그램 비디오 다운로더<br>스레드 비디오 다운로더", "readyTitle": "다운로드 준비 완료!", "infoText": "여기서 비디오를 재생할 수 있습니다.", "dlVideoBtn": "비디오 다운로드", "dlAudioBtn": "오디오 다운로드", "emptyLinkAlert": "먼저 링크를 붙여넣으세요!", "processing": "처리 중...", "successMsg": "✅ 링크 추출 성공!", "errorNotFound": "비디오를 찾을 수 없습니다.", "errorServer": "서버 오류." },
    "de": { "processBtn": "Download", "contactBtn": '<i class="fas fa-envelope"></i> Kontaktiere mich', "langBtn": "Sprache", "mainTitle": "Video Herunterladen", "tagline": "Laden Sie hochwertige Videos herunter", "placeholder": "Videolink hier einfügen...", "f1Title": "Schneller Download", "f1Desc": "Holen Sie sich Videos in Sekunden", "f2Title": "Sicher & Geschützt", "f2Desc": "Kein Login, kein Tracking", "f3Title": "All-in-One HD", "f3Desc": "Facebook Video Downloader<br>Instagram Video Downloader<br>Threads Video Downloader", "readyTitle": "Bereit zum Download!", "infoText": "Sie können das Video hier abspielen.", "dlVideoBtn": "Video Herunterladen", "dlAudioBtn": "Audio Herunterladen", "emptyLinkAlert": "Bitte fügen Sie zuerst einen Link ein!", "processing": "Wird bearbeitet...", "successMsg": "✅ Link erfolgreich extrahiert!", "errorNotFound": "Video nicht gefunden.", "errorServer": "Serverfehler." },
    "it": { "processBtn": "Scarica", "contactBtn": '<i class="fas fa-envelope"></i> Contattami', "langBtn": "Lingua", "mainTitle": "Scarica Video", "tagline": "Scarica facilmente video di alta qualità", "placeholder": "Incolla qui il link del video...", "f1Title": "Download Veloce", "f1Desc": "Scarica video in pochi secondi", "f2Title": "Sicuro e Protetto", "f2Desc": "Nessun accesso, nessun tracciamento", "f3Title": "All-in-One HD", "f3Desc": "Scaricatore di video Facebook<br>Scaricatore di video Instagram<br>Scaricatore di video Threads", "readyTitle": "Pronto per il Download!", "infoText": "Puoi riprodurre il video qui.", "dlVideoBtn": "Scarica Video", "dlAudioBtn": "Scarica Audio", "emptyLinkAlert": "Si prega di incollare prima un link!", "processing": "Elaborazione...", "successMsg": "✅ Link estratto con successo!", "errorNotFound": "Video non trovato.", "errorServer": "Errore del server." },
    "ms": { "processBtn": "Muat Turun", "contactBtn": '<i class="fas fa-envelope"></i> Hubungi Saya', "langBtn": "Bahasa", "mainTitle": "Pemuat Turun Video", "tagline": "Muat turun video berkualiti tinggi dengan mudah", "placeholder": "Tampal pautan video di sini...", "f1Title": "Muat Turun Pantas", "f1Desc": "Dapatkan video dalam beberapa saat", "f2Title": "Selamat & Terjamin", "f2Desc": "Tiada log masuk", "f3Title": "Semua-dalam-Satu HD", "f3Desc": "Pemuat turun video Facebook<br>Pemuat turun video Instagram<br>Pemuat turun video Threads", "readyTitle": "Sedia untuk Dimuat Turun!", "infoText": "Anda boleh memainkan video di sini.", "dlVideoBtn": "Muat Turun Video", "dlAudioBtn": "Muat Turun Audio", "emptyLinkAlert": "Sila tampal pautan dahulu!", "processing": "Memproses...", "successMsg": "✅ Pautan Berjaya Diekstrak!", "errorNotFound": "Video tidak dijumpai.", "errorServer": "Ralat pelayan." }
};

function changeLanguage(lang) {
    currentLang = lang; 
    
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

    // Dono menus close kar do (Desktop + Mobile)
    document.getElementById('desktopLangMenu')?.classList.remove('active');
    document.getElementById('mobileLangMenu')?.classList.remove('active');
    document.getElementById('sidebar')?.classList.remove('active');
}

// =========================================
// 🌟 DESKTOP DROPDOWN LOGIC 🌟
// =========================================
const desktopLangToggle = document.getElementById('desktopLangToggle');
const desktopLangMenu = document.getElementById('desktopLangMenu');

desktopLangToggle?.addEventListener('click', (e) => { 
    e.preventDefault(); 
    desktopLangMenu.classList.toggle('active'); 
});

// =========================================
// 🌟 MOBILE SIDEBAR & DROPDOWN LOGIC 🌟
// =========================================
const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const mobileLangToggle = document.getElementById('mobileLangToggle');
const mobileLangMenu = document.getElementById('mobileLangMenu');

menuIcon?.addEventListener('click', () => { sidebar.classList.add('active'); });
closeBtn?.addEventListener('click', () => { sidebar.classList.remove('active'); });

mobileLangToggle?.addEventListener('click', (e) => { 
    e.preventDefault(); 
    mobileLangMenu.classList.toggle('active'); 
});

// Close desktop dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (desktopLangToggle && desktopLangMenu) {
        if (!desktopLangToggle.contains(e.target) && !desktopLangMenu.contains(e.target)) {
            desktopLangMenu.classList.remove('active');
        }
    }
});


// =========================================
// 🌟 MAIN LOGIC (WITH DIRECT DOWNLOAD) 🌟
// =========================================
const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const statusMessage = document.getElementById('statusMessage');

const resultCard = document.getElementById('resultCard');
const videoPreview = document.getElementById('videoPreview');
const imagePreview = document.getElementById('imagePreview');
const btnDownloadVideo = document.getElementById('btnDownloadVideo');
const btnDownloadAudio = document.getElementById('btnDownloadAudio');

const RENDER_BASE_URL = "https://fbvideodownloader.onrender.com";

downloadBtn.addEventListener('click', async () => {
    const url = videoUrlInput.value.trim();
    
    if (!url) {
        alert(translations[currentLang] ? translations[currentLang].emptyLinkAlert : "Please paste a link first!");
        return;
    }

    const originalText = downloadBtn.innerHTML;
    const procText = translations[currentLang] ? translations[currentLang].processing : "Processing...";
    downloadBtn.innerHTML = procText + " <i class='fas fa-spinner fa-spin'></i>";
    downloadBtn.disabled = true;
    
    resultCard.style.display = "none";
    statusMessage.style.display = "none";
    videoPreview.pause();
    videoPreview.removeAttribute('src'); 

    try {
        const backendUrl = `${RENDER_BASE_URL}/api/download?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(backendUrl);
        const data = await response.json();

        if (data.success && data.link) {
            resultCard.style.display = "block";
            
            if (data.type === "image" || data.link.includes('.jpg') || data.link.includes('.png')) {
                videoPreview.style.display = "none";
                imagePreview.style.display = "block";
                imagePreview.src = data.link;
            } else {
                imagePreview.style.display = "none";
                videoPreview.style.display = "block";
                videoPreview.src = data.link; 
            }

            btnDownloadVideo.removeAttribute("target");
            btnDownloadAudio.removeAttribute("target");

            const directVideoUrl = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.link)}&type=mp4`;
            btnDownloadVideo.href = directVideoUrl;

            if(data.audio_url) {
                const directAudioUrl = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.audio_url)}&type=mp3`;
                btnDownloadAudio.href = directAudioUrl;
                btnDownloadAudio.style.display = "flex";
            } else if(data.type === "image") {
                btnDownloadAudio.style.display = "none";
            } else {
                const directAudioFallback = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.link)}&type=mp3`;
                btnDownloadAudio.href = directAudioFallback;
                btnDownloadAudio.style.display = "flex";
            }

            statusMessage.style.display = "block";
            statusMessage.style.color = "#4ade80"; 
            statusMessage.innerHTML = translations[currentLang] ? translations[currentLang].successMsg : "✅ Success!";

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
