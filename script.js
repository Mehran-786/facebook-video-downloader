let currentLang = 'en';

const translations = {
    "en": {
        "langBtn": "Language", 
        "mainTitle": "Facebook Video Downloader HD", 
        "tagline": "Download FB Videos, Reels & Stories for Free",
        "placeholder": "Paste Facebook video link here in HD...", 
        "processBtn": "Download Video", 
        "readyTitle": "Ready to Download!",
        "infoText": "Select your preferred quality below.", 
        "dlVidHigh": "Video (HD)", "dlVidNorm": "Video (Normal)",
        "dlAudHigh": "Audio (HQ)", "dlAudNorm": "Audio (Normal)",
        "emptyLinkAlert": "Please paste a link first!", "processing": "Processing...", "successMsg": "✅ Ready!", "errorServer": "Server error."
    },
    "ur": {
        "langBtn": "زبان", 
        "mainTitle": "فیس بک ویڈیو ڈاؤنلوڈر ایچ ڈی", 
        "tagline": "فیس بک ویڈیوز، ریلز اور اسٹوریز مفت ڈاؤنلوڈ کریں",
        "placeholder": "فیس بک ویڈیو کا لنک یہاں پیسٹ کریں...", 
        "processBtn": "ویڈیو ڈاؤنلوڈ کریں", 
        "readyTitle": "ڈاؤنلوڈ کے لیے تیار!",
        "infoText": "نیچے سے اپنی پسند کی کوالٹی منتخب کریں۔",
        "dlVidHigh": "ویڈیو (ایچ ڈی)", "dlVidNorm": "ویڈیو (نارمل)",
        "dlAudHigh": "آڈیو (بہترین)", "dlAudNorm": "آڈیو (نارمل)",
        "emptyLinkAlert": "پہلے لنک پیسٹ کریں!", "processing": "پروسیسنگ...", "successMsg": "✅ تیار ہے!", "errorServer": "سرور ایرر"
    },
    "hi": {
        "langBtn": "भाषा", 
        "mainTitle": "फेसबुक वीडियो डाउनलोडर HD", 
        "tagline": "फेसबुक वीडियो, रील्स और स्टोरीज मुफ्त में डाउनलोड करें",
        "placeholder": "फेसबुक वीडियो लिंक यहाँ पेस्ट करें...", 
        "processBtn": "वीडियो डाउनलोड करें", 
        "readyTitle": "डाउनलोड के लिए तैयार!",
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
    
    document.getElementById('desktopNotifPanel')?.classList.remove('active');
    document.getElementById('mobileNotifPanel')?.classList.remove('active');
}

// Menus Logic
const desktopLangToggle = document.getElementById('desktopLangToggle');
const desktopLangMenu = document.getElementById('desktopLangMenu');
desktopLangToggle?.addEventListener('click', (e) => { 
    e.preventDefault(); 
    desktopLangMenu.classList.toggle('active'); 
    document.getElementById('desktopNotifPanel')?.classList.remove('active'); 
});

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
    const dNotifToggle = document.getElementById('desktopNotifToggle');
    const dNotifPanel = document.getElementById('desktopNotifPanel');
    if (dNotifToggle && dNotifPanel && !dNotifToggle.contains(e.target) && !dNotifPanel.contains(e.target)) {
        dNotifPanel.classList.remove('active');
    }
    
    const mNotifToggle = document.getElementById('mobileNotifToggle');
    const mNotifPanel = document.getElementById('mobileNotifPanel');
    if (mNotifToggle && mNotifPanel && !mNotifToggle.contains(e.target) && !mNotifPanel.contains(e.target)) {
        mNotifPanel.classList.remove('active');
    }
});

// Notifications Logic
function setupNotifications(toggleId, panelId) {
    const toggle = document.getElementById(toggleId);
    const panel = document.getElementById(panelId);
    
    if(toggle && panel) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            panel.classList.toggle('active');
            const dot = toggle.querySelector('.notif-dot');
            if(dot) dot.style.display = 'none';
            if(toggleId === 'desktopNotifToggle') {
                document.getElementById('desktopLangMenu')?.classList.remove('active');
            }
        });
    }
}

setupNotifications('desktopNotifToggle', 'desktopNotifPanel');
setupNotifications('mobileNotifToggle', 'mobileNotifPanel');

const expandableNotifs = document.querySelectorAll('.expandable-notif');
expandableNotifs.forEach(notif => {
    notif.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    const content = notif.querySelector('.notif-content');
    if(content) {
        content.addEventListener('click', (e) => { e.stopPropagation(); });
    }
});


// Expandable Boxes Logic
const expandableBoxes = document.querySelectorAll('.expandable-box');
const featuresContainer = document.getElementById('featuresContainer');

expandableBoxes.forEach(box => {
    box.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        expandableBoxes.forEach(b => {
            b.classList.remove('active');
            const btnText = b.querySelector('.more-details-text');
            const icon = b.querySelector('.more-details-btn i');
            if(btnText) btnText.innerText = "More Details";
            if(icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });

        if (!isActive) {
            this.classList.add('active');
            featuresContainer.classList.add('has-active-box');

            const btnText = this.querySelector('.more-details-text');
            const icon = this.querySelector('.more-details-btn i');
            if(btnText) btnText.innerText = "Show Less";
            if(icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        } else {
            featuresContainer.classList.remove('has-active-box');
        }
    });

    const content = box.querySelector('.blog-content');
    if(content) {
        content.addEventListener('click', (e) => { e.stopPropagation(); });
    }
});

// FAQ Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// READ MORE BUTTON LOGIC
const readMoreHowToBtn = document.getElementById('readMoreHowTo');
const howToHiddenContent = document.getElementById('howToHiddenContent');

if(readMoreHowToBtn && howToHiddenContent) {
    readMoreHowToBtn.addEventListener('click', () => {
        howToHiddenContent.classList.toggle('expanded');
        readMoreHowToBtn.classList.toggle('expanded');
        
        if(howToHiddenContent.classList.contains('expanded')) {
            readMoreHowToBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
        } else {
            readMoreHowToBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
        }
    });
}

// =========================================
// 🌟 NEW: OVERLAY MODAL LOGIC (FOOTER BUTTONS) 🌟
// =========================================
const pageOverlay = document.getElementById('pageOverlay');
const closeOverlayBtn = document.getElementById('closeOverlayBtn');
const overlayContent = document.getElementById('overlayContent');

const footerAboutBtn = document.getElementById('footerAboutBtn');
const footerContactBtn = document.getElementById('footerContactBtn');
const footerPrivacyBtn = document.getElementById('footerPrivacyBtn');

const templateAbout = document.getElementById('templateAbout').innerHTML;
const templateContact = document.getElementById('templateContact').innerHTML;
const templatePrivacy = document.getElementById('templatePrivacy').innerHTML;

function openOverlay(htmlContent) {
    overlayContent.innerHTML = htmlContent;
    pageOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Peche wala page scroll na ho
    overlayContent.scrollTop = 0; // Scroll reset
}

function closeOverlay() {
    pageOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Scroll wapis allow karo
}

if(footerAboutBtn) footerAboutBtn.addEventListener('click', (e) => { e.preventDefault(); openOverlay(templateAbout); });
if(footerContactBtn) footerContactBtn.addEventListener('click', (e) => { e.preventDefault(); openOverlay(templateContact); });
if(footerPrivacyBtn) footerPrivacyBtn.addEventListener('click', (e) => { e.preventDefault(); openOverlay(templatePrivacy); });

if(closeOverlayBtn) closeOverlayBtn.addEventListener('click', closeOverlay);

// Agar user window ke bahar click kare toh bhi band ho jaye
pageOverlay.addEventListener('click', (e) => {
    if(e.target === pageOverlay) closeOverlay();
});


// =========================================
// 🌟 MAIN DOWNLOAD LOGIC 🌟
// =========================================
const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const statusMessage = document.getElementById('statusMessage');
const resultCard = document.getElementById('resultCard');
const videoPreview = document.getElementById('videoPreview');
const imagePreview = document.getElementById('imagePreview');

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
            
            if (data.type === "image") {
                videoPreview.style.display = "none";
                imagePreview.style.display = "block";
                imagePreview.src = data.video_high;
            } else {
                imagePreview.style.display = "none";
                videoPreview.style.display = "block";
                videoPreview.src = data.video_normal || data.video_high;
            }

            btnVidHigh.href = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.video_high)}&type=mp4`;
            btnVidNorm.href = `${RENDER_BASE_URL}/api/direct?url=${encodeURIComponent(data.video_normal)}&type=mp4`;
            
            if (data.type === "image") {
                btnAudHigh.style.display = "none";
                btnAudNorm.style.display = "none";
                btnVidNorm.style.display = "none";
                btnVidHigh.innerHTML = '<i class="fas fa-image"></i> Download Image';
            } else {
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
