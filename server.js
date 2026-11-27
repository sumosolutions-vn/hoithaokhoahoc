const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

function getLanIp() {
  const nets = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        candidates.push({ name, address: net.address });
      }
    }
  }
  const preferred =
    candidates.find((c) => c.address.startsWith("192.168.")) ||
    candidates.find((c) => c.address.startsWith("10.")) ||
    candidates[0];
  return preferred ? preferred.address : "127.0.0.1";
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  if (urlPath === "/api/network-info") {
    const ip = getLanIp();
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        lanIp: ip,
        port: PORT,
        lanUrl: `http://${ip}:${PORT}`,
        localUrl: `http://localhost:${PORT}`,
      })
    );
    return;
  }

  let filePath = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(ROOT))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(resolved, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(resolved).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(resolved).pipe(res);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  const ip = getLanIp();
  console.log("====================================================");
  console.log("  Hội nghị Báo cáo Khoa học & Tham luận LAE Server");
  console.log(`  Local:  http://localhost:${PORT}`);
  console.log(`  Wi-Fi:  http://${ip}:${PORT}`);
  console.log("====================================================");
});
