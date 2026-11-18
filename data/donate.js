/* Trang ủng hộ (Soutenir). Điền thông tin của bạn rồi đổi enabled thành true.
   Khi enabled là false, nút ♥ và trang ủng hộ đều ẩn. */
const DONATE={
  enabled:true,
  title:"Soutenir Le Labo",
  message:"Le Labo miễn phí cho tất cả mọi người. Nếu app giúp ích cho việc học của bạn, bạn có thể ủng hộ một ly cà phê để mình có thêm thời gian duy trì và phát triển app. Cảm ơn bạn rất nhiều!",
  bank:{
    name:"TPBank",      // tên ngân hàng, ví dụ "Vietcombank"
    number:"9713 4340 613",    // số tài khoản
    holder:"NGUYEN DIEU LINH",    // tên chủ tài khoản (viết hoa không dấu như trên thẻ)
    branch:""     // chi nhánh (không bắt buộc)
  },
  qr:"assets/qr.png",          // ảnh mã QR ngân hàng của bạn, đặt trong thư mục assets, ví dụ "assets/qr.png"
  transferNote:"DONATE LE LABO",   // nội dung chuyển khoản gợi ý
  others:[
    // {label:"MoMo", value:"09xx xxx xxx"},
    // {label:"Ko-fi", url:"https://ko-fi.com/ten-cua-ban"}
  ],
  thanks:"Mọi khoản ủng hộ, dù nhỏ, đều rất ý nghĩa với mình."
};
