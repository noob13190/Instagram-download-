const API = "http://http://13.60.218.41:4500/api/instagram";

const langText = {
  en: {
    title: "Instagram Downloader",
    subtitle: "Download reels & videos in HD",
    btn: "Get Video",
    alert: "Paste Instagram link"
  },
  ur: {
    title: "انسٹاگرام ویڈیو ڈاؤنلوڈر",
    subtitle: "ریلز اور ویڈیوز ڈاؤن لوڈ کریں",
    btn: "ویڈیو حاصل کریں",
    alert: "انسٹاگرام لنک پیسٹ کریں"
  }
};

function setLang(lang) {
  document.getElementById("title").innerText = langText[lang].title;
  document.getElementById("subtitle").innerText = langText[lang].subtitle;
  document.getElementById("fetchBtn").innerText = langText[lang].btn;
}

async function fetchVideo() {
  const url = document.getElementById("url").value;
  const loader = document.getElementById("loader");
  const preview = document.getElementById("preview");
  const video = document.getElementById("video");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!url) {
    alert(langText.en.alert);
    return;
  }

  loader.style.display = "block";
  preview.classList.add("hidden");

  try {
    const res = await fetch(`${API}?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    loader.style.display = "none";

    if (!data.status || !data.video) {
      alert("Video not found");
      return;
    }

    video.src = data.video;
    downloadBtn.href = data.video;

    preview.classList.remove("hidden");

    // 🔥 Auto-download
    setTimeout(() => downloadBtn.click(), 800);

  } catch (e) {
    loader.style.display = "none";
    alert("Server error");
  }
                               }
