const QRCode = require("qrcode");
const fs = require("fs");
const os = require("os");
const path = require("path");

function getLanIp() {
  const nets = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        candidates.push(net.address);
      }
    }
  }
  return (
    candidates.find((ip) => ip.startsWith("192.168.")) ||
    candidates.find((ip) => ip.startsWith("10.")) ||
    candidates[0] ||
    "127.0.0.1"
  );
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function buildPoster() {
  const PORT = Number(process.env.PORT) || 3000;
  const targetUrl = process.argv[2] || `http://${getLanIp()}:${PORT}`;
  const logoPath = path.join(__dirname, "assets", "logo-sumo-robotics-dark.png");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");

  const qrSvgRaw = await QRCode.toString(targetUrl, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "H",
    color: {
      dark: "#06080D",
      light: "#FFFFFF",
    },
  });

  const vbMatch = qrSvgRaw.match(/viewBox="([^"]+)"/);
  const viewBox = vbMatch ? vbMatch[1] : "0 0 41 41";
  const qrInner = qrSvgRaw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const shortUrl = targetUrl.length > 52 ? targetUrl.slice(0, 49) + "..." : targetUrl;

  const posterSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1720" viewBox="0 0 1200 1720">
  <!-- Black & Gold Seminar Poster matching sumosolutions.vn -->
  <rect width="1200" height="1720" fill="#06080D"/>
  <rect x="0" y="0" width="1200" height="16" fill="#FACC15"/>
  <rect x="0" y="1704" width="1200" height="16" fill="#FACC15"/>
  <rect x="48" y="52" width="1104" height="1616" fill="none" stroke="#FACC15" stroke-opacity="0.45" stroke-width="3"/>

  <!-- Transparent Dark-Mode Logo directly on black -->
  <image href="data:image/png;base64,${logoBase64}" x="340" y="106" width="520" height="120" preserveAspectRatio="xMidYMid meet"/>

  <!-- Seminar Header -->
  <text x="600" y="304" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="2" fill="#FACC15">HỘI THẢO KHOA HỌC · THỨ BẢY, 28/11/2026</text>
  <text x="600" y="346" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94A3B8">Học viện Chính trị quốc gia Hồ Chí Minh – Tỉnh ủy Thanh Hóa</text>

  <!-- Main Title -->
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="800" fill="#FFFFFF">PHÁT TRIỂN KINH TẾ TẦM THẤP</text>
  <text x="600" y="496" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="800" fill="#FFFFFF">Ở THANH HÓA</text>

  <!-- Subtitle -->
  <text x="600" y="554" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#FACC15">ỨNG DỤNG ƯU TIÊN, THỂ CHẾ VÀ CƠ HỘI CHO DOANH NGHIỆP ĐỊA PHƯƠNG</text>
  <rect x="544" y="590" width="112" height="4" fill="#FACC15"/>

  <!-- White QR Frame with Gold Border -->
  <rect x="260" y="640" width="680" height="680" rx="20" fill="#FFFFFF" stroke="#FACC15" stroke-width="6"/>
  <svg x="290" y="670" width="620" height="620" viewBox="${viewBox}">
    ${qrInner}
  </svg>

  <!-- Footer -->
  <text x="600" y="1404" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="33" font-weight="700" fill="#FACC15">Quét mã QR để xem 04 video tham luận</text>
  <text x="600" y="1456" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600" fill="#CBD5E1">Công ty TNHH Sumo Robotics</text>
  <rect x="220" y="1504" width="760" height="54" rx="10" fill="#111622" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="2"/>
  <text x="600" y="1539" text-anchor="middle" font-family="Consolas, monospace" font-size="22" font-weight="500" fill="#E2E8F0">${escapeXml(shortUrl)}</text>
</svg>`;

  const outputPath = path.join(__dirname, "poster-qr-lae.svg");
  fs.writeFileSync(outputPath, posterSvg, "utf8");
  console.log(`Đã xuất Poster QR nền đen – vàng tại: ${outputPath}`);
  console.log(`Đường dẫn mã hóa: ${targetUrl}`);
}

buildPoster().catch((err) => {
  console.error("Lỗi khi xuất poster QR:", err);
  process.exit(1);
});
