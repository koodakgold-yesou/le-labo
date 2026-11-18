# Le Labo de français

Web tự học tiếng Pháp từ A2 đến DELF B2: lộ trình ngữ pháp 79 chương, Générateur đề, đề DELF, luyện nghe (Écoute), ngữ âm (Phonétique), Mot du jour, video bài giảng theo chương.

Đây là web tĩnh (HTML, CSS, JavaScript thuần), **không cần build**, không cần cài thư viện.

## Chạy ở hai nơi

| Tính năng | Trong Claude (artifact) | Tự host (Vercel, GitHub Pages) |
|---|---|---|
| Bài giảng, bài tập, đề có sẵn, Écoute, Phonétique | Có | Có |
| Claude soạn đề mới, chấm bài viết, nhận xét dàn ý, ô hỏi thêm | Có | Không |
| Lưu tiến độ | Vào tài khoản Claude | Trên trình duyệt (localStorage) |
| Thu âm micro, nghe lại giọng mình | Không (chỉ nhận dạng giọng nói thành chữ) | Có |
| Chấm phát âm gần đúng và gợi ý sửa | Có (không nghe lại được) | Có, trên Chrome hoặc Edge |
| Xem YouTube ngay trong app | Không (mở tab mới) | Có |
| Tải HTML, PDF, sao lưu JSON | Có | Có |

Web tự nhận biết đang chạy ở đâu (file `js/env.js`) và bật hoặc tắt tính năng tương ứng.

## Chuyển tiến độ từ Claude sang bản tự host

1. Trong bản Claude: Lab → thẻ **Sao lưu** → **Xuất file JSON**.
2. Trong bản tự host: Lab → **Sao lưu** → **Nhập file JSON**.

## Đưa lên GitHub

1. Tạo tài khoản tại https://github.com (nếu chưa có).
2. Bấm **New repository**, đặt tên (ví dụ `le-labo`), chọn Public hoặc Private, bấm **Create repository**.
3. Trong trang repository mới, bấm **uploading an existing file**.
4. Giải nén file zip, kéo **toàn bộ nội dung bên trong** (file `index.html` và các thư mục `css`, `js`, `data`) vào trang. `index.html` phải nằm ở thư mục gốc của repository, không nằm trong thư mục con.
5. Bấm **Commit changes**.

## Host bằng Vercel

1. Vào https://vercel.com, chọn **Sign up** → **Continue with GitHub**.
2. Bấm **Add New… → Project**, chọn repository `le-labo`, bấm **Import**.
3. Ở mục **Framework Preset** chọn **Other**. Không cần điền Build Command hay Output Directory.
4. Bấm **Deploy**. Khoảng 30 giây sau sẽ có địa chỉ dạng `le-labo.vercel.app`.
5. Từ đó, mỗi lần cập nhật file trên GitHub, Vercel tự đăng lại bản mới.

Micro chỉ hoạt động trên địa chỉ `https://` (Vercel có sẵn). Lần đầu bấm 🎙, trình duyệt sẽ hỏi quyền dùng micro.

## Cấu trúc thư mục

```
index.html        Khung trang, CSS của đề in
css/app.css       Giao diện
js/env.js         Nhận biết môi trường (Claude hay tự host)
js/store.js       Lưu dữ liệu học
js/progress.js    Tính tiến độ, lịch ôn
js/generator.js   Générateur đề
js/library.js     Ma Bibliothèque
js/lab.js         Dashboard, chương, điều hướng
js/video.js       Video bài giảng theo chương
js/ecoute.js      Luyện nghe theo trình độ
js/phon.js        Ngữ âm
js/mot.js         Mot du jour
data/*.js         Nội dung: ngân hàng câu, bài giảng, đề DELF, từ vựng, nguồn nghe
```

## Nguồn và giấy phép nội dung

- Phần lớn bài đọc, bài tập và đề DELF luyện tập do Le Labo tự soạn. Đây không phải đề thi chính thức. Đề mẫu chính thức nằm trên trang của France Éducation international, và trong app chỉ có link dẫn sang đó.
- `data/opensets.js`:
  - **B2:** các bài "En bref" của Vie publique (DILA), dùng theo Licence Ouverte 2.0. Mỗi bài ghi nguồn và ngày đăng, nội dung giữ nguyên, không sửa. Câu hỏi do Le Labo soạn.
  - **B1:** các bài phỏng theo Vikidia (CC BY-SA 3.0). Phần văn bản phỏng theo và câu hỏi đi kèm được phát hành theo giấy phép CC BY-SA 3.0.
- `data/cartes_vp*.js`: các bộ thẻ chia theo chủ đề chương của bộ sách *Vocabulaire progressif du français* (CLE International), gồm cuốn trình độ trung cấp và cuốn nâng cao. Từ sách chỉ lấy chủ đề và cách chọn từ. Toàn bộ câu ví dụ, nghĩa tiếng Việt, nghĩa tiếng Anh và ghi chú do Le Labo tự viết, không chép nội dung từ sách.

## Trang ủng hộ (Soutenir)

Thông tin ủng hộ nằm trong file `data/donate.js`. Cách bật trang:

1. Điền tên ngân hàng, số tài khoản và tên chủ tài khoản. Có thể thêm MoMo hoặc link Ko-fi vào mục `others`.
2. Nếu có ảnh mã QR ngân hàng: đặt ảnh vào thư mục `assets`, ví dụ `assets/qr.png`, rồi ghi đường dẫn đó vào `qr`.
3. Đổi `enabled:false` thành `enabled:true`.

Khi trang đã bật, nút ♥ Soutenir hiện trên thanh trên cùng của app. Khi `enabled` là `false`, cả nút lẫn trang đều ẩn.
