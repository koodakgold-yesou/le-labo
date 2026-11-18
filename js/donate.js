/* ---------- Soutenir: donation page, configured in data/donate.js ---------- */
const Donate=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const D=typeof DONATE!=="undefined"?DONATE:null;
  const on=()=>!!(D&&D.enabled&&((D.bank&&D.bank.number)||D.qr||(D.others&&D.others.length)));
  const safeUrl=u=>/^https?:\/\//i.test(String(u||""))?u:"";
  const safeImg=u=>/^(assets\/|\.\/assets\/)[\w\-./]+\.(png|jpe?g|webp|svg)$/i.test(String(u||""))||/^https:\/\//i.test(String(u||""))?u:"";
  function row(label,value,copy,raw){
    const cv=raw!=null?raw:value;
    return `<div class="dnrow"><span class="dnl">${esc(label)}</span><span class="dnv" ${copy?'data-dncopy="'+esc(cv)+'"':""}>${esc(value)}</span>${copy?`<button type="button" class="ghostbtn sm" data-dncopy="${esc(cv)}">Sao chép</button>`:""}</div>`;
  }
  function render(){
    const root=$("donateRoot");if(!root)return;
    if(!on()){root.innerHTML=`<div class="dnpage"><p class="sub">Trang ủng hộ chưa được bật.</p></div>`;return;}
    const b=D.bank||{},img=safeImg(D.qr);
    root.innerHTML=`<div class="dnpage"><div class="dncard">
      <p class="motkick">♥ Soutenir</p><h1>${esc(D.title||"Soutenir Le Labo")}</h1>
      <p class="dnmsg">${esc(D.message||"")}</p>
      <div class="dngrid">
        ${img?`<figure class="dnqr"><img src="${esc(img)}" alt="Mã QR chuyển khoản"><figcaption>Quét bằng app ngân hàng</figcaption></figure>`:""}
        <div class="dninfo">
          ${b.number?`<h3>Chuyển khoản ngân hàng</h3>${b.name?row("Ngân hàng",b.name):""}${row("Số tài khoản",b.number,true,String(b.number).replace(/\s+/g,""))}${b.holder?row("Chủ tài khoản",b.holder):""}${b.branch?row("Chi nhánh",b.branch):""}${D.transferNote?row("Nội dung",D.transferNote,true):""}`:""}
          ${(D.others||[]).length?`<h3>Cách khác</h3>${D.others.map(o=>safeUrl(o.url)?`<div class="dnrow"><span class="dnl">${esc(o.label)}</span><a class="gbtn sm" href="${esc(safeUrl(o.url))}" target="_blank" rel="noopener">Mở ${esc(o.label)}</a></div>`:row(o.label,o.value||"",!!o.value)).join("")}`:""}
          <p class="dnstatus" id="dnStatus" role="status"></p>
        </div>
      </div>
      ${D.thanks?`<p class="dnthanks">${esc(D.thanks)}</p>`:""}
      <p class="sub2">Ủng hộ là hoàn toàn tự nguyện, không mở khoá thêm tính năng nào. Hãy kiểm tra kỹ tên chủ tài khoản trước khi chuyển.</p>
    </div></div>`;
  }
  async function copy(text){
    const st=$("dnStatus");
    try{await navigator.clipboard.writeText(text);if(st)st.textContent="Đã sao chép: "+text;}
    catch(e){const el=document.querySelector(`.dnv[data-dncopy="${CSS.escape(text)}"]`);if(el){const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);}if(st)st.textContent="Trình duyệt chặn sao chép tự động: đã bôi đen sẵn, bấm Ctrl+C (hoặc giữ để sao chép trên điện thoại).";}
  }
  function paintLink(){const a=$("donateLink");if(a)a.hidden=!on();}
  document.addEventListener("click",e=>{const r=$("donateRoot");if(!r||!r.contains(e.target))return;const b=e.target.closest("button[data-dncopy]");if(b)copy(b.dataset.dncopy);});
  return {render,on,paintLink};
})();
