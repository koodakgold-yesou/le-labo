/* ---------- Mot du jour ---------- */
const Mot=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const EPOCH=Date.UTC(2026,0,1);
  const dayNum=(d=new Date())=>Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-EPOCH)/86400000);
  const idxFor=n=>((n%MOTS.length)+MOTS.length)%MOTS.length;
  const dateOf=n=>new Date(EPOCH+n*86400000);
  const fmtDate=n=>{const t=dateOf(n).toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"numeric",year:"numeric",timeZone:"UTC"});return t.charAt(0).toUpperCase()+t.slice(1);};
  let offset=0, ctl=null;
  const seen=()=>{try{return new Set(JSON.parse(localStorage.getItem("fr-mots-seen")||"[]"));}catch(e){return new Set();}};
  function markSeen(w){try{const s=seen();if(!s.has(w)){s.add(w);localStorage.setItem("fr-mots-seen",JSON.stringify([...s]));}}catch(e){}}
  const today=()=>MOTS[idxFor(dayNum())];

  function card(){
    const m=today();
    return `<a class="acard motcard" href="#mot"><span class="ah">Mot du jour</span><span class="motw" lang="fr">${esc(m.w)}</span><span class="as">${esc(m.hook)}</span></a>`;
  }

  function render(){
    const root=$("motRoot");if(!root)return;
    const n=dayNum()+offset,m=MOTS[idxFor(n)];
    markSeen(m.w);
    const s=seen();
    const past=Array.from({length:14},(_,k)=>dayNum()-k).map(d=>({d,m:MOTS[idxFor(d)]}));
    root.innerHTML=`
    <div class="motpage">
      <div class="motnav">
        <button type="button" class="ghostbtn" data-mot="-1">← Hôm trước</button>
        <span class="motdate">${offset===0?"Hôm nay · ":""}${esc(fmtDate(n))}</span>
        <button type="button" class="ghostbtn" data-mot="1" ${offset>=0?"disabled":""}>Hôm sau →</button>
        ${offset!==0?`<button type="button" class="ghostbtn" data-mot="0">Về hôm nay</button>`:""}
      </div>
      <article class="mot">
        <header class="mothead">
          <p class="motkick">Mot du jour</p>
          <h1 lang="fr">${esc(m.w)}</h1>
          <p class="motmeta"><span class="motg">${esc(m.g)}</span> ${esc(m.vn)} <span class="moten">EN · ${esc(m.en)}</span></p>
        </header>
        <div class="motpron">${m.ipa?`<span class="motipa" lang="fr">/${esc(m.ipa)}/</span>`:""}
          <a class="ghostbtn sm" href="https://forvo.com/word/${encodeURIComponent(m.w)}/#fr" target="_blank" rel="noopener">🔊 Nghe giọng thật (Forvo)</a>
          <a class="ghostbtn sm" href="https://youglish.com/pronounce/${encodeURIComponent(m.w)}/french" target="_blank" rel="noopener">▶ Nghe trong video (YouGlish)</a>
          ${m.ptip?`<p class="motptip">${esc(m.ptip)}</p>`:""}</div>
        <div class="mothook"><b>Le saviez-vous ?</b> ${esc(m.hook)}</div>
        <section><h3>Hành trình của từ</h3>
          <ol class="mottl">${m.tl.map(([era,t])=>`<li><span class="era">${esc(era)}</span><p>${esc(t)}</p></li>`).join("")}</ol>
        </section>
        <section class="motlink"><h3>Pháp ↔ Anh</h3><p>${esc(m.note)}</p></section>
        <section><h3>Dùng trong câu</h3>
          <ul class="lex">${m.ex.map(([fr,vn])=>`<li><span class="fr" lang="fr">${esc(fr)}</span><span class="vn">${esc(vn)}</span></li>`).join("")}</ul>
        </section>
        <section><h3>Họ từ</h3><div class="motfam">${m.fam.map(f=>`<span lang="fr">${esc(f)}</span>`).join("")}</div></section>
        <section class="ask-box"><h3>Tò mò thêm?</h3>
          <p class="sub">Hỏi Claude về từ này: một thành ngữ, từ cùng gốc, cách phát âm… Claude chỉ nên nói điều chắc chắn, nhưng vẫn có thể nhầm; nguồn gốc từ có nhiều giả thuyết thì hãy coi là tham khảo.</p>
          <div class="askrow"><input type="text" id="motAsk" class="text" placeholder="Ví dụ: Có thành ngữ nào với « ${esc(m.w)} » không?"><button type="button" class="gbtn" id="motAskBtn">Hỏi</button></div>
          <div class="explain" id="motAns" hidden></div>
        </section>
      </article>
      <aside class="motside">
        <div class="motcount"><b>${s.size}</b> / ${MOTS.length} từ đã khám phá</div>
        <h3>14 ngày qua</h3>
        <ul class="motarch">${past.map(({d,m:x})=>`<li><button type="button" data-motday="${d-dayNum()}" class="${d===n?"on":""}"><span lang="fr">${esc(x.w)}</span><small>${esc(dateOf(d).toLocaleDateString("vi-VN",{day:"numeric",month:"numeric",timeZone:"UTC"}))}</small></button></li>`).join("")}</ul>
      </aside>
    </div>`;
    const btn=$("motAskBtn");
    if(btn){
      if(typeof sample==="undefined"||!sample){btn.disabled=true;btn.title="Chỉ dùng được khi mở trang trong Claude.";}
      btn.onclick=()=>ask(m);
      $("motAsk").onkeydown=e=>{if(e.key==="Enter")ask(m);};
    }
  }
  async function ask(m){
    const q=$("motAsk").value.trim(),box=$("motAns");
    if(!q){box.hidden=false;box.textContent="Hãy gõ câu hỏi trước.";return;}
    if(typeof sample==="undefined"||!sample)return;
    ctl=new AbortController();box.hidden=false;box.textContent="Claude đang trả lời…";
    const prompt=`Bạn là người kể chuyện về từ nguyên tiếng Pháp cho một học viên người Việt (trình độ A2, mục tiêu DELF B2, tiếng Anh B1–B2).
Từ đang học: « ${m.w} » (${m.g}, nghĩa: ${m.vn}). Ghi chú sẵn có: ${m.hook} ${m.tl.map(t=>t[0]+": "+t[1]).join(" ")}
Câu hỏi: """${q.slice(0,800)}"""
Trả lời bằng tiếng Việt, ngắn gọn (tối đa 150 từ), không dùng markdown đậm. Chỉ nêu điều chắc chắn; nếu nguồn gốc còn tranh luận thì nói rõ là giả thuyết. Ví dụ tiếng Pháp ở mức A2–B1, kèm nghĩa tiếng Việt; nếu có từ tiếng Anh cùng gốc thì nêu, và cảnh báo nếu là faux ami.`;
    try{await sample(prompt,{signal:ctl.signal,cache:false,onText:({text})=>{box.textContent=text;}});}
    catch(e){box.textContent=(e&&e.text?e.text+"\n\n":"")+({cancelled:"(Đã dừng.)",not_granted:"Bạn chưa cho phép trang dùng Claude.",rate_limited:"Đã chạm giới hạn lượt dùng Claude, thử lại sau."}[e&&e.code]||"Không trả lời được lúc này.");}
  }
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-mot]");
    if(b){const v=+b.dataset.mot;offset=v===0?0:Math.min(0,offset+v);render();window.scrollTo(0,0);return;}
    const d=e.target.closest("[data-motday]");
    if(d){offset=+d.dataset.motday;render();window.scrollTo(0,0);}
  });
  return {render,card,today,reset:()=>{offset=0;}};
})();
