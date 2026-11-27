# Hội nghị Báo cáo Khoa học & Tham luận LAE — SUMO ROBOTICS

Landing page tổng hợp **04 video YouTube** chuyên đề Kinh tế Tầm thấp (LAE) kèm hệ thống **tạo & tải mã QR** trực tiếp.

## 1. Cách chạy xem thử trên máy tính & quét QR bằng điện thoại cùng Wi-Fi
```bash
node server.js
```
- Mở trên máy tính: `http://localhost:5500/`
- Mở trên điện thoại (cùng Wi-Fi): `http://192.168.1.29:5500/`
- File mã QR đã xuất sẵn: `qr-code-lae.png` và `qr-code-lae.svg`

## 2. Cách thay 4 link YouTube chính thức của hội nghị
Mở file `app.js`, tìm mảng `VIDEOS` ở đầu file và thay `youtubeId` (11 ký tự sau `v=` trong đường dẫn YouTube), `title` và `description`.

## 3. Đưa trang web lên mạng (để ai có Internet cũng quét được QR)
Toàn bộ trang là HTML/CSS/JS tĩnh (`index.html`, `styles.css`, `app.js`, `assets/`), bạn có thể kéo thả thư mục này lên **Netlify Drop** (`https://app.netlify.com/drop`), **Cloudflare Pages**, **Vercel** hoặc **GitHub Pages**.
Sau khi có link công khai (ví dụ `https://hoi-nghi-lae.netlify.app`):
1. Mở trang web đó -> mã QR trên trang **tự động cập nhật theo link công khai**, chỉ cần nhấn **Tải Poster QR Có Logo (.PNG)** để in/trình chiếu.
2. Hoặc chạy lệnh:
   ```bash
   node generate-qr.js https://hoi-nghi-lae.netlify.app
   ```
