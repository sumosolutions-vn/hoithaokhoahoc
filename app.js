/* ==========================================================================
   CẤU HÌNH VIDEO THAM LUẬN — PHÁT TRIỂN KINH TẾ TẦM THẤP Ở THANH HÓA
   Bạn có thể đổi đường dẫn video bất kỳ lúc nào bằng cách thay trường `url`
   ========================================================================== */
const VIDEOS = [
  {
    code: "01",
    category: "infrastructure",
    tag: "Hạ tầng giao thông · UAV Dock tự động",
    title: "Triển khai hệ thống UAV Dock 3 tại nút giao cao tốc Ma Lâm – Giải pháp giám sát hạ tầng giao thông thông minh",
    description:
      "Thực tiễn triển khai giải pháp DJI Dock 3 tích hợp UAV của SUMO SOLUTIONS tại nút giao Ma Lâm, thuộc tuyến cao tốc Vĩnh Hảo – Phan Thiết, hướng đến tự động hóa hoạt động tuần tra, giám sát tiến độ thi công, theo dõi hiện trạng hạ tầng và hỗ trợ quản lý giao thông từ xa, góp phần nâng cao hiệu quả vận hành và tối ưu nguồn lực quản lý.",
    url: "https://www.youtube.com/watch?v=GGMmfs9GO0I",
  },
  {
    code: "02",
    category: "training",
    tag: "Đào tạo nhân lực UAV · VUTC",
    title: "Trung tâm Đào tạo UAV Việt Nam (VUTC) – Khẳng định vị thế tiên phong",
    description:
      "Phim giới thiệu Trung tâm Đào tạo UAV Việt Nam (VUTC), tiên phong chuẩn hóa đào tạo phi công điều khiển thiết bị bay không người lái, xây dựng nguồn nhân lực chất lượng cao phục vụ phát triển Kinh tế Tầm thấp (LAE) tại Việt Nam.",
    url: "https://www.youtube.com/watch?v=aV2ymR_ilpc",
  },
  {
    code: "03",
    category: "enterprise",
    tag: "Dự án tiêu biểu · Sumo Solutions",
    title: "Sumo x Samsung — Ứng dụng thực tế giải pháp UAV & Robotics",
    description:
      "Video giới thiệu thực tiễn triển khai giải pháp công nghệ UAV và Robotics của Sumo Solutions hợp tác cùng Samsung, minh họa năng lực ứng dụng công nghiệp thực tế.",
    url: "https://www.youtube.com/watch?v=M-vRU1hPscY",
  },
  {
    code: "04",
    category: "enterprise",
    tag: "Dự án tiêu biểu · Sumo Robotics",
    title: "Sumo x Nestlé — Triển khai thực tế giải pháp UAV & Robotics cho doanh nghiệp",
    description:
      "Video ghi nhận thực tiễn hợp tác triển khai giải pháp công nghệ UAV và Robotics giữa Sumo Robotics và Nestlé, minh chứng hiệu quả ứng dụng vào vận hành và chuỗi giá trị doanh nghiệp.",
    url: "https://www.youtube.com/watch?v=FPhDByZVXVc",
  },
  {
    code: "05",
    category: "infrastructure",
    tag: "Ứng dụng UAV · Lâm nghiệp & Môi trường",
    title: "Trồng Rừng Quy Nhơn — Ứng dụng UAV trong gieo trồng và phát triển bền vững",
    description:
      "Thực tiễn triển khai thiết bị bay không người lái (UAV) của Sumo Robotics hỗ trợ trồng rừng tại Quy Nhơn, mở ra hướng ứng dụng kinh tế tầm thấp trong lâm nghiệp và bảo vệ môi trường.",
    url: "https://www.youtube.com/watch?v=Y2Dp9eNiK3k",
  },
  {
    code: "06",
    category: "infrastructure",
    tag: "Ứng dụng UAV · Hàng hải & Đường thủy",
    title: "Sông Lòng Tàu – Ứng dụng UAV đa phổ trong khảo sát và giám sát hành lang đường thủy",
    description:
      "Thực tiễn triển khai giải pháp UAV tích hợp cảm biến đa phổ của SUMO SOLUTIONS trên tuyến sông Lòng Tàu, khảo sát hành lang dài khoảng 60 km, thu thập và phân tích dữ liệu NDVI, GNDVI, NDRE nhằm đánh giá sức khỏe thảm thực vật, giám sát biến động môi trường và hỗ trợ quản lý hạ tầng hàng hải với chi phí tối ưu.",
    url: "https://www.youtube.com/watch?v=didtaPL4JT4",
  },
];

function extractYouTubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split("/")[0];
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/")[2];
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      return parsed.pathname.split("/")[2];
    }
    return parsed.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

function getCleanEmbedUrl(videoId) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    color: "white",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function getThumbUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

function getFallbackThumbUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ==========================================================================
// Render Clean Video Cards
// ==========================================================================
const videoGridEl = document.getElementById("video-grid");

function buildCoverMarkup(video) {
  const id = extractYouTubeId(video.url);
  return `
    <button type="button" class="video-cover" data-play-inline="${video.code}" aria-label="Phát video ${escapeHtml(video.title)}">
      <img
        src="${getThumbUrl(id)}"
        alt="${escapeHtml(video.title)}"
        class="video-thumb"
        loading="lazy"
        onerror="this.onerror=null;this.src='${getFallbackThumbUrl(id)}';"
      />
      <span class="minimal-play-btn" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 4.8v14.4L19.5 12 7.5 4.8z"></path>
        </svg>
      </span>
    </button>
  `;
}

function renderVideos() {
  videoGridEl.innerHTML = VIDEOS
    .map((video) => {
      return `
        <article class="video-card" data-code="${video.code}">
          <div class="video-stage" data-stage="${video.code}">
            ${buildCoverMarkup(video)}
          </div>
          <div class="video-body">
            <div class="video-meta">Video ${escapeHtml(video.code)} · ${escapeHtml(video.tag)}</div>
            <h3 class="video-title">${escapeHtml(video.title)}</h3>
            <p class="video-desc">${escapeHtml(video.description)}</p>
            <div class="video-footer">
              <button type="button" class="btn btn-primary btn-sm" data-play-inline="${video.code}">
                Phát video
              </button>
              <button type="button" class="btn btn-outline btn-sm" data-open-theater="${video.code}">
                Xem toàn màn hình
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function playInlineVideo(code) {
  const video = VIDEOS.find((v) => v.code === code);
  if (!video) return;

  resetAllInlineVideos();

  const stage = videoGridEl.querySelector(`[data-stage="${code}"]`);
  if (!stage) return;

  const id = extractYouTubeId(video.url);
  stage.innerHTML = `
    <iframe
      src="${getCleanEmbedUrl(id)}"
      title="${escapeHtml(video.title)}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <button type="button" class="stop-inline-btn" data-stop-inline="${video.code}">
      Dừng phát
    </button>
  `;
}

function resetAllInlineVideos() {
  videoGridEl.querySelectorAll(".video-stage").forEach((stage) => {
    if (stage.querySelector("iframe")) {
      const code = stage.dataset.stage;
      const video = VIDEOS.find((v) => v.code === code);
      if (video) stage.innerHTML = buildCoverMarkup(video);
    }
  });
}

// ==========================================================================
// Fullscreen Video Modal
// ==========================================================================
const theaterModal = document.getElementById("theater-modal");
const theaterMeta = document.getElementById("theater-meta");
const theaterTitle = document.getElementById("theater-title");
const theaterDesc = document.getElementById("theater-desc");
const theaterPlayer = document.getElementById("theater-player");

function openTheater(code) {
  const video = VIDEOS.find((v) => v.code === code);
  if (!video) return;

  resetAllInlineVideos();
  const id = extractYouTubeId(video.url);

  theaterMeta.textContent = `Video ${video.code} · ${video.tag}`;
  theaterTitle.textContent = video.title;
  theaterDesc.textContent = video.description;
  theaterPlayer.innerHTML = `
    <iframe
      src="${getCleanEmbedUrl(id)}"
      title="${escapeHtml(video.title)}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `;

  theaterModal.hidden = false;
  theaterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeTheater() {
  theaterModal.hidden = true;
  theaterModal.setAttribute("aria-hidden", "true");
  theaterPlayer.innerHTML = "";
  document.body.style.overflow = "";
}

videoGridEl.addEventListener("click", (e) => {
  const playBtn = e.target.closest("[data-play-inline]");
  if (playBtn) {
    playInlineVideo(playBtn.dataset.playInline);
    return;
  }

  const stopBtn = e.target.closest("[data-stop-inline]");
  if (stopBtn) {
    resetAllInlineVideos();
    return;
  }

  const theaterBtn = e.target.closest("[data-open-theater]");
  if (theaterBtn) {
    openTheater(theaterBtn.dataset.openTheater);
  }
});

theaterModal.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeTheater);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !theaterModal.hidden) closeTheater();
});

// ==========================================================================
// QR Code Generator & Official Seminar Poster Exporter (1200 x 1720 px PNG)
// ==========================================================================
const qrCanvas = document.getElementById("qr-canvas");
const qrUrlInput = document.getElementById("qr-url-input");
const qrUrlDisplay = document.getElementById("qr-url-display");
const qrUrlHint = document.getElementById("qr-url-hint");
const btnCopyUrl = document.getElementById("btn-copy-url");
const btnDownloadPoster = document.getElementById("btn-download-poster");
const btnPrintPoster = document.getElementById("btn-print-poster");

function drawQrToCanvas(canvas, text, size = 260, darkColor = "#06080D", lightColor = "#FFFFFF") {
  const value = (text || "").trim() || window.location.href;
  if (typeof window.qrcode !== "function") return;

  const qr = window.qrcode(0, "M");
  qr.addData(value);
  qr.make();

  const count = qr.getModuleCount();
  const quietZone = 2;
  const totalModules = count + quietZone * 2;
  const scale = Math.max(2, Math.floor(size / totalModules));
  const actualSize = totalModules * scale;

  canvas.width = actualSize;
  canvas.height = actualSize;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = lightColor;
  ctx.fillRect(0, 0, actualSize, actualSize);

  ctx.fillStyle = darkColor;
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect((col + quietZone) * scale, (row + quietZone) * scale, scale, scale);
      }
    }
  }
}

function updateQrDisplay(url) {
  const cleanUrl = (url || "").trim();
  const target = cleanUrl || window.location.href;
  drawQrToCanvas(qrCanvas, target, 320);
  qrUrlDisplay.textContent = target;
}

async function initQrUrl() {
  const currentUrl = window.location.href.split("#")[0];
  const isFile = window.location.protocol === "file:";
  const isLocalhost =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (isFile) {
    document.getElementById("file-protocol-alert").hidden = false;
  }

  let initialUrl = currentUrl;

  if (isLocalhost) {
    try {
      const res = await fetch("/api/network-info");
      if (res.ok) {
        const info = await res.json();
        if (info.lanUrl) {
          initialUrl = info.lanUrl;
          qrUrlHint.innerHTML =
            `Đang dùng link Wi-Fi nội bộ để quét thử ngay. Khi đưa lên Internet, dán link công khai vào ô trên để tải Poster QR.` +
            `<button type="button" id="use-lan-btn">Link Wi-Fi LAN</button>`;
          document.getElementById("use-lan-btn")?.addEventListener("click", () => {
            qrUrlInput.value = info.lanUrl;
            updateQrDisplay(info.lanUrl);
            showToast("Đã khôi phục đường dẫn Wi-Fi LAN");
          });
        }
      }
    } catch {
      qrUrlHint.textContent =
        "Bạn đang xem ở localhost. Khi đưa trang web lên mạng, dán đường dẫn công khai vào ô trên để tải Poster QR.";
    }
  } else if (isFile) {
    initialUrl = "https://lae-thanhhoa.example.com";
    qrUrlHint.textContent =
      "Dán đường dẫn trang web sau khi đưa lên mạng để xuất Poster QR quét được từ điện thoại.";
  } else {
    qrUrlHint.textContent = "Poster QR đang trỏ trực tiếp tới địa chỉ trang web hiện tại.";
  }

  qrUrlInput.value = initialUrl;
  updateQrDisplay(initialUrl);
}

qrUrlInput.addEventListener("input", () => {
  updateQrDisplay(qrUrlInput.value);
});

btnCopyUrl.addEventListener("click", async () => {
  const url = qrUrlInput.value.trim() || window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    showToast("Đã sao chép đường dẫn");
  } catch {
    qrUrlInput.select();
    document.execCommand("copy");
    showToast("Đã sao chép đường dẫn");
  }
});

btnPrintPoster.addEventListener("click", () => {
  window.print();
});

btnDownloadPoster.addEventListener("click", async () => {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const targetUrl = qrUrlInput.value.trim() || window.location.href;
  const poster = document.createElement("canvas");
  const W = 1200;
  const H = 1720;
  poster.width = W;
  poster.height = H;
  const ctx = poster.getContext("2d");

  // Luxury Black & Gold Poster matching sumosolutions.vn
  ctx.fillStyle = "#06080D";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#FACC15";
  ctx.fillRect(0, 0, W, 16);
  ctx.fillRect(0, H - 16, W, 16);

  ctx.strokeStyle = "rgba(250, 204, 21, 0.45)";
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 52, W - 96, H - 104);

  // Transparent dark-mode logo directly on black poster (no white box)
  try {
    const logoImg = await loadImage("assets/logo-sumo-robotics-dark.png");
    const maxW = 520;
    const maxH = 124;
    const ratio = Math.min(maxW / logoImg.naturalWidth, maxH / logoImg.naturalHeight);
    const drawW = logoImg.naturalWidth * ratio;
    const drawH = logoImg.naturalHeight * ratio;
    ctx.drawImage(logoImg, (W - drawW) / 2, 104 + (124 - drawH) / 2, drawW, drawH);
  } catch {
    ctx.fillStyle = "#FACC15";
    ctx.font = "800 44px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SUMO ROBOTICS", W / 2, 182);
  }

  ctx.textAlign = "center";

  // Seminar Kicker & Organizers
  ctx.fillStyle = "#FACC15";
  ctx.font = "700 24px 'Be Vietnam Pro', sans-serif";
  ctx.fillText("HỘI THẢO KHOA HỌC · THỨ BẢY, 28/11/2026", W / 2, 304);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 22px 'Be Vietnam Pro', sans-serif";
  ctx.fillText("Học viện Chính trị quốc gia Hồ Chí Minh – Tỉnh ủy Thanh Hóa", W / 2, 346);

  // Main Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 50px 'Be Vietnam Pro', sans-serif";
  ctx.fillText("PHÁT TRIỂN KINH TẾ TẦM THẤP", W / 2, 430);
  ctx.fillText("Ở THANH HÓA", W / 2, 496);

  // Subtitle
  ctx.fillStyle = "#FACC15";
  ctx.font = "600 23px 'Be Vietnam Pro', sans-serif";
  ctx.fillText("ỨNG DỤNG ƯU TIÊN, THỂ CHẾ VÀ CƠ HỘI CHO DOANH NGHIỆP ĐỊA PHƯƠNG", W / 2, 554);

  // Gold divider
  ctx.fillStyle = "#FACC15";
  ctx.fillRect(W / 2 - 56, 590, 112, 4);

  // Pure white QR Box with Gold Border (guaranteed fast camera scanning)
  const qrSize = 620;
  const qrOffscreen = document.createElement("canvas");
  drawQrToCanvas(qrOffscreen, targetUrl, qrSize, "#06080D", "#FFFFFF");

  const boxSize = 680;
  const boxX = (W - boxSize) / 2;
  const boxY = 640;

  roundRect(ctx, boxX, boxY, boxSize, boxSize, 20);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = "#FACC15";
  ctx.lineWidth = 6;
  ctx.stroke();

  const innerOffset = (boxSize - qrOffscreen.width) / 2;
  ctx.drawImage(qrOffscreen, boxX + innerOffset, boxY + innerOffset);

  // Footer CTA
  ctx.fillStyle = "#FACC15";
  ctx.font = "700 33px 'Be Vietnam Pro', sans-serif";
  ctx.fillText("Quét mã QR để xem video tham luận", W / 2, 1404);

  ctx.fillStyle = "#CBD5E1";
  ctx.font = "600 24px 'Be Vietnam Pro', sans-serif";
  ctx.fillText("Công ty TNHH Sumo Robotics", W / 2, 1456);

  const urlPillW = 760;
  const urlPillH = 54;
  const urlPillX = (W - urlPillW) / 2;
  const urlPillY = 1504;
  roundRect(ctx, urlPillX, urlPillY, urlPillW, urlPillH, 10);
  ctx.fillStyle = "#111622";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#E2E8F0";
  ctx.font = "500 22px Consolas, monospace";
  const shortUrl = targetUrl.length > 52 ? targetUrl.slice(0, 49) + "..." : targetUrl;
  ctx.fillText(shortUrl, W / 2, urlPillY + 35);

  triggerDownload(poster.toDataURL("image/png"), "poster-qr-kinh-te-tam-thap-thanh-hoa.png");
  showToast("Đã tải nguyên Poster QR Hội thảo (PNG)");
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function triggerDownload(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

renderVideos();
initQrUrl();
