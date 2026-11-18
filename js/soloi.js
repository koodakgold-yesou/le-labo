/* ---------- Carnet d'erreurs: personal error notebook ---------- */
const ErrLog=(()=>{
  const SPECIAL={chinh_ta:{fr:"Orthographe et accents",vn:"Chính tả, dấu"},tu_vung:{fr:"Vocabulaire, faux amis",vn:"Dùng từ, faux ami"},anh_hoa:{fr:"Anglicismes",vn:"Dịch thẳng từ tiếng Anh"},phat_am:{fr:"Prononciation",vn:"Phát âm"},khac:{fr:"Autres",vn:"Lỗi khác"}};
  const gTopics=()=>Object.values(typeof TOPICS!=="undefined"?TOPICS:{}).filter(t=>!t.culture&&!t.skill);
  const label=cat=>SPECIAL[cat]||(typeof TOPICS!=="undefined"&&TOPICS[cat])||{fr:cat,vn:""};
  function promptTail(){
    const codes=gTopics().map(t=>`${t.id} (${t.vn})`).join(", ");
    return `\n\nCuối cùng, trên một dòng riêng, viết LOI_JSON: rồi ngay sau đó là một mảng JSON hợp lệ (không markdown, không xuống dòng giữa các phần tử nếu được) liệt kê các lỗi đã sửa ở mục 2. Mỗi phần tử: {"cat":"<mã>","sai":"đoạn sai","dung":"đoạn đúng","ly_do":"giải thích rất ngắn bằng tiếng Việt"}. <mã> chọn đúng một trong: ${codes}, chinh_ta (chính tả, dấu), tu_vung (dùng từ sai, faux ami), anh_hoa (dịch thẳng từ tiếng Anh), phat_am (nghi do phát âm), khac. Nếu không có lỗi, viết LOI_JSON: []`;
  }
  const strip=t=>String(t||"").split(/\n?\s*LOI_JSON\s*:/)[0].trimEnd();
  function saveList(arr,meta){
    if(!Array.isArray(arr))return 0;
    const ok=new Set([...gTopics().map(t=>t.id),...Object.keys(SPECIAL)]);
    const list=arr.filter(e=>e&&(e.sai||e.dung)).slice(0,30).map(e=>({src:meta.src,lv:meta.lv||"",ctx:String(meta.ctx||"").slice(0,90),cat:ok.has(e.cat)?e.cat:"khac",sai:String(e.sai||"").slice(0,160),dung:String(e.dung||"").slice(0,160),why:String(e.ly_do||"").slice(0,220)}));
    if(list.length&&typeof Store!=="undefined"&&Store.addErrs)Store.addErrs(list);
    return list.length;
  }
  const codeList=()=>gTopics().map(t=>`${t.id} (${t.vn})`).join(", ")+", chinh_ta (chính tả, dấu), tu_vung (dùng từ sai, faux ami), anh_hoa (dịch thẳng từ tiếng Anh), phat_am (nghi do phát âm), khac";
  function parseAndSave(text,meta){
    const m=String(text||"").match(/LOI_JSON\s*:\s*(\[[\s\S]*\])/);if(!m)return 0;
    let arr;try{arr=JSON.parse(m[1]);}catch(e){try{arr=JSON.parse(m[1].replace(/,\s*\]/,"]"));}catch(e2){return 0;}}
    if(!Array.isArray(arr))return 0;
    const ok=new Set([...gTopics().map(t=>t.id),...Object.keys(SPECIAL)]);
    const list=arr.filter(e=>e&&(e.sai||e.dung)).slice(0,30).map(e=>({src:meta.src,lv:meta.lv||"",ctx:String(meta.ctx||"").slice(0,90),cat:ok.has(e.cat)?e.cat:"khac",sai:String(e.sai||"").slice(0,160),dung:String(e.dung||"").slice(0,160),why:String(e.ly_do||"").slice(0,220)}));
    if(list.length&&typeof Store!=="undefined"&&Store.addErrs)Store.addErrs(list);
    return list.length;
  }
  const savedNote=n=>n?`\n\n— Đã lưu ${n} lỗi vào Carnet d'erreurs.`:"";
  return {SPECIAL,label,promptTail,strip,parseAndSave,savedNote,saveList,codeList};
})();

const SoLoi=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const DAY=86400000;
  const SRC={ex:"Bài tập",write:"Bài viết",oral:"Bài nói",read:"Đọc theo mẫu",card:"Vocabulaire"};
  let period=30,tab="gram";
  const inPeriod=ts=>period===0||ts>=Date.now()-period*DAY;
  const w=ts=>ts>=Date.now()-14*DAY?1:0.5;
  const chapterFor=topic=>typeof ROADMAP!=="undefined"?ROADMAP.find(ch=>(ch.topics||[]).includes(topic)):null;
  const fmtD=ts=>new Date(ts).toLocaleDateString("vi-VN",{day:"numeric",month:"numeric"});

  function collect(){
    const d=Store.get(),cats={};
    const add=(cat,src,ts,ex)=>{const c=cats[cat]=cats[cat]||{cat,n:0,score:0,src:{},ex:[],last:0};c.n++;c.score+=w(ts);c.src[src]=(c.src[src]||0)+1;c.last=Math.max(c.last,ts);if(ex)c.ex.push({...ex,ts});};
    (d.attempts||[]).forEach(a=>{if(a.ok||a.self||!inPeriod(a.ts||0))return;if(typeof TOPICS==="undefined"||!TOPICS[a.topic]||TOPICS[a.topic].culture||TOPICS[a.topic].skill)return;
      add(a.topic,"ex",a.ts||0,a.given&&a.expected?{sai:a.given,dung:a.expected,why:a.near?"Gần đúng, kiểm tra lại dấu.":""}:null);});
    (d.errs||[]).forEach(e=>{if(e.done||e.src==="card"||e.src==="read"||!inPeriod(e.ts))return;add(e.cat,e.src,e.ts,{sai:e.sai,dung:e.dung,why:e.why,id:e.id,src:e.src});});
    const tot={};(d.attempts||[]).forEach(a=>{if(inPeriod(a.ts||0))tot[a.topic]=(tot[a.topic]||0)+1;});
    Object.values(cats).forEach(c=>{c.tot=tot[c.cat]||0;c.ex.sort((x,y)=>y.ts-x.ts);});
    return Object.values(cats).sort((a,b)=>b.score-a.score||b.last-a.last);
  }
  function vocab(){
    const d=Store.get(),m=new Map();
    const C=typeof Cartes!=="undefined"?Cartes._card:null;
    Object.entries(d.cards||{}).forEach(([id,s])=>{if(s&&s.l)m.set(id,{id,n:s.l*1,last:s.u||0});});
    (d.errs||[]).forEach(e=>{if(e.src!=="card"||e.done||!inPeriod(e.ts))return;const o=m.get(e.ref)||{id:e.ref,n:0,last:0};o.n++;o.last=Math.max(o.last,e.ts);m.set(e.ref,o);});
    return [...m.values()].map(x=>({...x,c:C?C(x.id):null})).filter(x=>x.c).sort((a,b)=>b.n-a.n||b.last-a.last);
  }
  function pron(){
    const m=new Map();
    (Store.get().errs||[]).forEach(e=>{if(e.src!=="read"||e.done||!inPeriod(e.ts))return;const k=e.dung.toLowerCase();const o=m.get(k)||{w:e.dung,n:0,heard:{},ctx:e.ctx,last:0};o.n++;if(e.sai)o.heard[e.sai]=(o.heard[e.sai]||0)+1;o.last=Math.max(o.last,e.ts);m.set(k,o);});
    return [...m.values()].sort((a,b)=>b.n-a.n||b.last-a.last);
  }
  const exLine=e=>`<li>${e.sai?`<s lang="fr">${esc(e.sai)}</s> → `:""}<b lang="fr">${esc(e.dung)}</b>${e.why?` <small>${esc(e.why)}</small>`:""}${e.src&&e.src!=="ex"?` <span class="slsrc">${esc(SRC[e.src]||e.src)} · ${fmtD(e.ts)}</span>`:""}${e.id?` <button type="button" class="linkbtn sm" data-sldone="${e.id}" title="Ẩn lỗi này khỏi sổ">Đã khắc phục</button>`:""}</li>`;
  function actions(cat){
    const t=typeof TOPICS!=="undefined"&&TOPICS[cat],ch=chapterFor(cat);
    return `${t&&t.bank?`<button type="button" class="gbtn sm" data-revise="${cat}">Ôn 10 câu</button>`:""}${ch?`<button type="button" class="ghostbtn sm" data-chapter="${ch.id}">Học lại chương ${esc(ch.num)}</button>`:""}`;
  }
  function topCard(c,i){
    const L=ErrLog.label(c.cat);
    return `<div class="sltop"><span class="slrank">${i+1}</span><div class="slbody">
      <h3><span lang="fr">${esc(L.fr)}</span>${L.vn?` <small>${esc(L.vn)}</small>`:""}</h3>
      <p class="slmeta">${c.n} lỗi: ${Object.entries(c.src).map(([k,v])=>`${SRC[k]||k} ${v}`).join(" · ")}${c.src.ex&&c.tot?` (sai ${c.src.ex}/${c.tot} câu bài tập)`:""} · gần nhất ${fmtD(c.last)}</p>
      ${c.ex.length?`<ul class="slex">${c.ex.slice(0,2).map(exLine).join("")}</ul>`:""}
      <div class="slact">${actions(c.cat)}</div></div></div>`;
  }
  function gramHTML(cats){
    if(!cats.length)return `<p class="sub">Chưa có lỗi ngữ pháp nào trong khoảng thời gian này.</p>`;
    return `<div class="sllist">${cats.map(c=>{const L=ErrLog.label(c.cat);return `<details class="slrow"><summary><b lang="fr">${esc(L.fr)}</b>${L.vn?` <span>${esc(L.vn)}</span>`:""}<em>${c.n} lỗi</em></summary>
      ${c.ex.length?`<ul class="slex">${c.ex.slice(0,8).map(exLine).join("")}</ul>`:`<p class="sub">Các lỗi này đến từ câu trắc nghiệm nên không có câu sai cụ thể.</p>`}<div class="slact">${actions(c.cat)}</div></details>`;}).join("")}</div>`;
  }
  function vocabHTML(v){
    if(!v.length)return `<p class="sub">Chưa có từ nào bạn hay quên. Từ bị bấm « Lại » khi ôn thẻ, hoặc làm sai khi luyện tập, sẽ hiện ở đây.</p>`;
    return `<div class="slact top"><button type="button" class="gbtn sm" data-slcards="1">Luyện ${Math.min(v.length,30)} từ hay sai nhất</button></div>
      <ul class="slvoc">${v.slice(0,60).map(x=>`<li><b lang="fr">${esc(x.c.fr)}</b> — ${esc(x.c.vn)} <em>${x.n} lần</em>${x.c.note&&x.c.fa?`<br><small>⚠ ${esc(x.c.note)}</small>`:""}</li>`).join("")}</ul>`;
  }
  function pronHTML(p){
    if(!p.length)return `<p class="sub">Chưa có dữ liệu. Khi bạn đọc theo câu mẫu ở mục Parler, những từ máy không nhận ra sẽ được ghi lại ở đây.</p>`;
    return `<p class="sub2">Máy nhận dạng giọng nói có thể nghe nhầm, nên đây là gợi ý để luyện, không phải kết luận chắc chắn.</p><ul class="slvoc">${p.slice(0,40).map(x=>{const h=Object.entries(x.heard).sort((a,b)=>b[1]-a[1])[0];return `<li><b lang="fr">${esc(x.w)}</b> <em>${x.n} lần</em>${h?` · máy nghe thành « ${esc(h[0])} »`:""} · <a href="https://forvo.com/word/${encodeURIComponent(x.w.replace(/'$/,""))}/#fr" target="_blank" rel="noopener">nghe giọng thật</a></li>`;}).join("")}</ul>`;
  }
  function wrHTML(){
    const list=(Store.get().errs||[]).filter(e=>(e.src==="write"||e.src==="oral")&&!e.done&&inPeriod(e.ts)).sort((a,b)=>b.ts-a.ts);
    if(!list.length)return `<p class="sub">Chưa có lỗi nào từ bài viết hay bài nói. Khi Claude chấm bài viết (Exercices, đề DELF) hoặc nhận xét bài nói tự do (Parler), các lỗi sẽ được lưu vào đây.</p>`;
    return `<ul class="slex big">${list.slice(0,80).map(e=>exLine(e).replace("<li>",`<li><span class="slcat">${esc(ErrLog.label(e.cat).vn||ErrLog.label(e.cat).fr)}</span> `)).join("")}</ul>`;
  }
  function render(){
    const root=$("soloiRoot");if(!root)return;
    const cats=collect(),top=cats.slice(0,3),v=vocab(),p=pron();
    const tabs=[["gram",`Ngữ pháp (${cats.length})`],["wr","Bài viết & nói"],["voc",`Từ vựng (${v.length})`],["pron",`Phát âm (${p.length})`]];
    root.innerHTML=`<div class="slpage">
      <header class="chead"><div><h1>Carnet d'erreurs</h1><p class="sub2">Tự gom lỗi từ bài tập ngữ pháp, bài viết và bài nói được Claude chấm, thẻ từ hay quên và từ đọc chưa chuẩn.</p></div>
        <label class="slper">Khoảng thời gian <select id="slPer">${[[7,"7 ngày"],[30,"30 ngày"],[0,"Tất cả"]].map(([k,l])=>`<option value="${k}" ${period===k?"selected":""}>${l}</option>`).join("")}</select></label></header>
      <section class="slsec"><h2>Lỗi lặp lại nhiều nhất</h2>
        ${top.length?`<div class="sltops">${top.map(topCard).join("")}</div>`:`<p class="sub">Chưa có lỗi nào được ghi nhận. Hãy làm vài bài trong Exercices hoặc nhờ Claude chấm một bài viết.</p>`}</section>
      <div class="lvtabs sltabs" role="tablist">${tabs.map(([k,l])=>`<button type="button" role="tab" aria-selected="${tab===k}" data-sltab="${k}">${l}</button>`).join("")}</div>
      <section class="slsec">${tab==="gram"?gramHTML(cats):tab==="voc"?vocabHTML(v):tab==="pron"?pronHTML(p):wrHTML()}</section>
    </div>`;
  }
  function card(){
    const top=collect().slice(0,2);
    return `<a class="acard" href="#soloi"><span class="ah">Carnet d'erreurs</span><span class="as">${top.length?"Hay sai nhất: "+top.map(c=>esc(ErrLog.label(c.cat).vn||ErrLog.label(c.cat).fr)).join(", "):"Gom lỗi từ mọi bài làm để biết nên ôn gì"}</span></a>`;
  }
  document.addEventListener("click",e=>{
    const r=$("soloiRoot");if(!r||!r.contains(e.target))return;
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.sltab){tab=b.dataset.sltab;render();}
    else if(b.dataset.sldone){Store.setErr(b.dataset.sldone,{done:true});render();}
    else if(b.dataset.slcards){const ids=vocab().slice(0,30).map(x=>x.id);if(typeof Cartes!=="undefined")Cartes.openPractice(ids,"Từ hay sai (Carnet d'erreurs)");}
  });
  document.addEventListener("change",e=>{if(e.target.id==="slPer"){period=+e.target.value;render();}});
  return {render,card,_collect:collect};
})();
