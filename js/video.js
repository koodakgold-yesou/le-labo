/* ---------- Video bài giảng (per chapter) ----------
   The artifact frame cannot embed other sites (no YouTube iframe), so:
   A. search links + pinned links with timestamp notes (stored in the account via Store),
   B. a local video file played inline (blob URL) with saved markers keyed by file name + size. */
const Video=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const LANGS={en:"EN",vi:"VI",fr:"FR"};
  const files={};               // ch -> {url, name, size}  (this session only)
  let adding=null;              // id of the item whose "add mark" form is open
  let ytOpen=null, ytStart=0;   // self-hosted only: YouTube embedded in the page

  const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const clean=t=>String(t).replace(/[«»"]/g,"").replace(/\(\d+\)/g,"").replace(/\s+/g," ").trim();
  const fmt=s=>{s=Math.max(0,Math.round(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(x).padStart(2,"0");};
  function parseTime(t){
    t=String(t||"").trim();if(!t)return null;
    if(/^\d+$/.test(t))return +t;
    const p=t.split(":").map(Number);if(p.some(isNaN)||p.length>3)return null;
    return p.reduce((a,b)=>a*60+b,0);
  }
  function ytId(url){
    try{const u=new URL(url);const h=u.hostname.replace(/^www\.|^m\./,"");
      if(h==="youtu.be")return u.pathname.slice(1).split("/")[0]||null;
      if(h==="youtube.com"||h==="music.youtube.com"){if(u.searchParams.get("v"))return u.searchParams.get("v");const m=u.pathname.match(/^\/(shorts|embed|live)\/([\w-]+)/);return m?m[2]:null;}
    }catch(e){}return null;
  }
  function atTime(v,s){
    const id=ytId(v.url);
    if(id)return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}&t=${Math.round(s)}s`;
    return v.url;
  }
  const host=url=>{try{return new URL(url).hostname.replace(/^www\./,"");}catch(e){return "";}};
  const searchURL=q=>"https://www.youtube.com/results?search_query="+encodeURIComponent(q);

  function searches(ch){
    const t=clean(ch.fr);
    return [["en","Tiếng Anh",`French grammar ${t} explained`],["vi","Tiếng Việt",`ngữ pháp tiếng Pháp ${t}`],["fr","Tiếng Pháp",`${t} grammaire française FLE`]];
  }

  function marksHTML(v,player){
    const ms=[...(v.marks||[])].sort((a,b)=>a.s-b.s);
    const list=ms.length?`<ol class="vmarks">${ms.map((m,i)=>`<li>${player
        ?`<button type="button" class="vseek" data-seek="${m.s}">${fmt(m.s)}</button>`
        :(ytId(v.url)?(ENV.hosted?`<button type="button" class="vseek" data-ytseek="${v.id}|${m.s}">${fmt(m.s)}</button>`:`<a class="vseek" href="${esc(atTime(v,m.s))}" target="_blank" rel="noopener">${fmt(m.s)}</a>`):`<span class="vseek">${fmt(m.s)}</span>`)}
        <span>${esc(m.l)}</span><button type="button" class="vx" data-vdelmark="${v.id}|${i}" aria-label="Xoá mốc">×</button></li>`).join("")}</ol>`:"";
    const form=adding===v.id?`<form class="vmarkform" data-vmarkform="${v.id}">
        <input name="t" class="vt" placeholder="mm:ss" ${player?`value="${fmt(currentTime())}"`:""} aria-label="Mốc thời gian" required>
        <input name="l" class="vl" placeholder="Nội dung (vd: Thanh mẫu)" aria-label="Nội dung mốc" required maxlength="120">
        <button class="gbtn sm">Lưu</button><button type="button" class="ghostbtn sm" data-vcancel="1">Huỷ</button></form>`
      :`<button type="button" class="vadd" data-vaddmark="${v.id}">+ Thêm mốc thời gian${player?" (tại vị trí đang xem)":""}</button>`;
    return list+form;
  }
  const currentTime=()=>{const el=$("vplayer");return el?el.currentTime:0;};

  function render(ch){
    const box=$("vidbox");if(!box)return;
    const items=Store.videos(ch.id);
    const links=items.filter(v=>v.kind==="link");
    const f=files[ch.id];
    const fileItem=f?items.find(v=>v.kind==="file"&&v.name===f.name&&v.size===f.size):null;
    const savedFiles=items.filter(v=>v.kind==="file"&&!(f&&v.name===f.name&&v.size===f.size));
    box.innerHTML=`
      <div class="vhead"><h3>Video bài giảng</h3><span class="sub">${links.length?links.length+" video đã ghim":"Chưa ghim video nào"}</span></div>
      ${f?`<div class="vplay">
          <video id="vplayer" src="${f.url}" controls preload="metadata"></video>
          <div class="vplaymeta"><b title="${esc(f.name)}">${esc(f.name)}</b><button type="button" class="ghostbtn sm" data-vclosefile="1">Đóng video</button></div>
          ${marksHTML(fileItem||{id:"file:"+ch.id,marks:[]},true)}
        </div>`:""}
      <div class="vsearch"><span class="sub">Tìm trên YouTube:</span>${searches(ch).map(([k,lbl,q])=>`<a class="vs" href="${esc(searchURL(q))}" target="_blank" rel="noopener"><b>${LANGS[k]}</b> ${lbl}</a>`).join("")}</div>
      ${links.length?`<ul class="vlist">${links.map(v=>`<li class="vitem">
          <div class="vrow"><span class="vlang">${LANGS[v.lang]||"?"}</span>
            <a class="vtitle" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.title||host(v.url)||v.url)}</a>
            <small>${esc(host(v.url))}</small>
            ${ENV.hosted&&ytId(v.url)?`<button type="button" class="ghostbtn sm" data-ytopen="${v.id}">${ytOpen===v.id?"Ẩn video":"Xem trong app"}</button>`:""}
            <button type="button" class="vx" data-vdel="${v.id}" aria-label="Bỏ ghim">×</button></div>
          ${ENV.hosted&&ytOpen===v.id&&ytId(v.url)?`<div class="ytwrap"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(ytId(v.url))}?rel=0&start=${Math.round(ytStart)}${ytStart?"&autoplay=1":""}" title="${esc(v.title||"YouTube")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`:""}
          ${marksHTML(v,false)}</li>`).join("")}</ul>`:""}
      <form class="vaddform" data-vaddlink="1">
        <input name="url" type="url" placeholder="Dán link video (YouTube…)" aria-label="Link video" required>
        <input name="title" placeholder="Tên video (không bắt buộc)" aria-label="Tên video" maxlength="140">
        <select name="lang" aria-label="Ngôn ngữ"><option value="en">EN</option><option value="vi">VI</option><option value="fr">FR</option></select>
        <button class="gbtn sm">Ghim vào chương</button>
      </form>
      <div class="vfile">
        <label class="ghostbtn sm vfilebtn">Mở video từ máy<input type="file" accept="video/*" data-vfile="1" hidden></label>
        <span class="sub">Xem file có sẵn (khoá học đã tải, bài tự quay) ngay trong app; mốc thời gian được lưu theo tên file.${savedFiles.length?" Đã có mốc cho: "+savedFiles.map(v=>esc(v.name)).join(", ")+".":""}</span>
      </div>
      <p class="vnote" id="vmsg" role="status"></p>`;
  }
  function sectionHTML(ch){adding=null;ytOpen=null;ytStart=0;return `<section class="vidbox" id="vidbox" data-ch="${ch.id}"></section>`;}
  const chOf=el=>{const b=el.closest("#vidbox");return b?ROADMAP.find(c=>c.id===b.dataset.ch):null;};
  const msg=t=>{const m=$("vmsg");if(m)m.textContent=t;};

  function fileItemFor(ch){
    const f=files[ch.id];if(!f)return null;
    return Store.videos(ch.id).find(v=>v.kind==="file"&&v.name===f.name&&v.size===f.size)
      ||{id:"vf"+uid(),ch:ch.id,kind:"file",name:f.name,size:f.size,marks:[]};
  }
  const itemById=(ch,id)=>id.startsWith("file:")?fileItemFor(ch):Store.videos(ch.id).find(v=>v.id===id);

  document.addEventListener("submit",e=>{
    const ch=chOf(e.target);if(!ch)return;
    e.preventDefault();
    const fd=new FormData(e.target);
    if(e.target.dataset.vaddlink){
      const url=String(fd.get("url")||"").trim();
      if(!/^https?:\/\//i.test(url)){msg("Link phải bắt đầu bằng http:// hoặc https://");return;}
      Store.saveVideo({id:"vl"+uid(),ch:ch.id,kind:"link",url,title:String(fd.get("title")||"").trim(),lang:fd.get("lang"),marks:[]});
      render(ch);msg("Đã ghim video vào chương.");return;
    }
    const mid=e.target.dataset.vmarkform;
    if(mid){
      const s=parseTime(fd.get("t")),l=String(fd.get("l")||"").trim();
      if(s===null){msg("Mốc thời gian viết dạng 4:03 hoặc 1:02:03.");return;}
      const v=itemById(ch,mid);if(!v)return;
      Store.saveVideo({...v,marks:[...(v.marks||[]),{s,l}]});
      adding=null;const keep=keepPlayer();render(ch);restorePlayer(keep);
    }
  });
  const keepPlayer=()=>{const p=$("vplayer");return p?{t:p.currentTime,paused:p.paused}:null;};
  function restorePlayer(k){const p=$("vplayer");if(p&&k){p.addEventListener("loadedmetadata",()=>{p.currentTime=k.t;},{once:true});}}

  document.addEventListener("click",e=>{
    const ch=chOf(e.target);if(!ch)return;
    const y=e.target.closest("[data-ytopen],[data-ytseek]");
    if(y){if(y.dataset.ytopen){ytOpen=ytOpen===y.dataset.ytopen?null:y.dataset.ytopen;ytStart=0;}else{const [id,sec]=y.dataset.ytseek.split("|");ytOpen=id;ytStart=+sec;}render(ch);return;}
    const t=e.target.closest("[data-vdel],[data-vdelmark],[data-vaddmark],[data-vcancel],[data-seek],[data-vclosefile]");if(!t)return;
    const keep=keepPlayer();
    if(t.dataset.vdel){Store.removeVideo(t.dataset.vdel);render(ch);restorePlayer(keep);msg("Đã bỏ ghim.");return;}
    if(t.dataset.vdelmark){const [id,i]=t.dataset.vdelmark.split("|");const v=itemById(ch,id);if(!v)return;const ms=[...(v.marks||[])].sort((a,b)=>a.s-b.s);ms.splice(+i,1);Store.saveVideo({...v,marks:ms});render(ch);restorePlayer(keep);return;}
    if(t.dataset.vaddmark){adding=t.dataset.vaddmark;render(ch);restorePlayer(keep);const p=$("vplayer");if(p&&keep)p.pause();setTimeout(()=>{const l=document.querySelector(".vmarkform .vl");l&&l.focus();},40);return;}
    if(t.dataset.vcancel){adding=null;render(ch);restorePlayer(keep);return;}
    if(t.dataset.seek){const p=$("vplayer");if(p){p.currentTime=+t.dataset.seek;p.play().catch(()=>{});}return;}
    if(t.dataset.vclosefile){URL.revokeObjectURL(files[ch.id].url);delete files[ch.id];render(ch);}
  });
  document.addEventListener("change",e=>{
    const inp=e.target.closest("[data-vfile]");if(!inp)return;
    const ch=chOf(inp);const file=inp.files&&inp.files[0];if(!ch||!file)return;
    if(files[ch.id])URL.revokeObjectURL(files[ch.id].url);
    files[ch.id]={url:URL.createObjectURL(file),name:file.name,size:file.size};
    adding=null;render(ch);
  });
  return {sectionHTML,render};
})();
