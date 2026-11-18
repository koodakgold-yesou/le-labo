/* ---------- Grammaire: visual layer over Progress (no questions, no grading here) ---------- */
const Library=(()=>{
  let viewMode="shelves";
  try{viewMode=localStorage.getItem("fr-lab-libview")||"shelves";}catch(e){}
  const hash=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return Math.abs(h);};
  const shelfOf=id=>SHELVES.find(s=>s.topics.includes(id));
  const chaptersOf=id=>ROADMAP.filter(c=>c.topics.includes(id));
  let glowIds=new Set();
  function markProgressed(ids){glowIds=new Set(ids);}

  function stats(){
    const all=Object.values(Progress.all());
    return {studied:all.filter(t=>t.si>=2).length,mastered:all.filter(t=>t.si>=5).length,due:all.filter(t=>t.aReviser).length,total:all.length,insufficient:all.filter(t=>t.attempts>0&&t.attempts<MASTERY_CONFIG.minForRate).length};
  }
  function spine(id){
    const t=Progress.topic(id),sh=shelfOf(id);
    const h=hash(id),height=176+(h%5)*10,width=44+(h%4)*5;
    const bands=Math.max(0,t.si-1);
    const cls=["book","c-"+sh.color,"st-"+t.state.id,t.aReviser?"due":"",glowIds.has(id)?"glow":""].join(" ");
    return `<button type="button" class="${cls}" style="--h:${height}px;--w:${width}px" data-book="${id}" aria-label="${esc(topicLabel(id))}: ${t.state.fr}${t.aReviser?", à réviser":""}">
      ${t.aReviser?'<span class="ribbon" aria-hidden="true"></span>':""}
      <span class="bands" aria-hidden="true">${"<i></i>".repeat(Math.min(bands,4))}</span>
      <span class="spine-title">${esc(topicLabel(id))}</span>
      ${t.si>=5?'<span class="star" aria-hidden="true">✦</span>':""}
    </button>`;
  }
  function shelvesHTML(){
    return SHELVES.map(sh=>`<section class="shelf" aria-label="${esc(sh.fr)}">
      <div class="plaque"><span class="pfr">${esc(sh.fr)}</span><span class="pvn">${esc(sh.vn)}</span></div>
      <div class="books">${sh.topics.map(spine).join("")}</div>
      <div class="plank" aria-hidden="true"></div>
    </section>`).join("");
  }
  function listHTML(){
    return SHELVES.map(sh=>`<section class="tlist"><h3>${esc(sh.fr)} <span>${esc(sh.vn)}</span></h3>
      <div class="trows">${sh.topics.map(id=>{const t=Progress.topic(id);return `<button type="button" class="trow" data-book="${id}">
        <span class="tdot c-${sh.color}"></span>
        <span class="tname">${esc(topicLabel(id))}<small>${esc(TOPICS[id].vn)}</small></span>
        <span class="tstate st-${t.state.id}">${t.state.fr}</span>
        <span class="tmeta">${t.attempts?`${t.distinctQ} câu · ${fmtPct(t.accAll)}`:"Chưa luyện"}</span>
        <span class="tdue">${t.aReviser?`<b>À réviser</b>`:t.due?fmtDue(t.due):""}</span>
      </button>`;}).join("")}</div></section>`).join("");
  }
  function render(){
    const root=$("libRoot");if(!root)return;
    const st=stats(),sug=Progress.suggestions();
    root.innerHTML=`
    <section class="libhero">
      <div class="lamp" aria-hidden="true"></div>
      <div class="windows" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="herotext">
        <p class="eyebrow">Grammaire</p>
        <h1>La Bibliothèque Enchantée</h1>
        <p class="tagline">Un livre, un savoir. Une révision, une lumière.</p>
        <p class="lede">Mỗi cuốn sách là một chủ điểm. Trạng thái của sách được tính từ kết quả các bài bạn đã nộp, không tự tăng theo số lần bấm.</p>
      </div>
    </section>
    <div class="libstats">
      <div class="lstat"><b>${st.studied}</b><span>chủ điểm đã học<small>từ Étudié trở lên</small></span></div>
      <div class="lstat"><b>${st.mastered}</b><span>thành thạo<small>đủ mọi tiêu chí Maîtrisé</small></span></div>
      <div class="lstat warn"><b>${st.due}</b><span>cần ôn<small>đến hạn hoặc kết quả gần đây thấp</small></span></div>
      <div class="lstat dim"><b>${st.total}</b><span>cuốn trong thư viện<small>${st.insufficient} cuốn còn thiếu dữ liệu</small></span></div>
    </div>
    <section class="today">
      <div class="today-head"><h2>Gợi ý ôn tập hôm nay</h2>${sug.length?`<button type="button" class="gbtn" data-revise="${sug.map(s=>s.t.id).join(",")}">Ôn cả ${sug.length} chủ điểm</button>`:""}</div>
      ${sug.length?`<ol class="sugg">${sug.map(s=>`<li><button type="button" class="slink" data-book="${s.t.id}">${esc(topicLabel(s.t.id))}</button><span class="why">${esc(s.why)}</span><span class="tstate st-${s.t.state.id}">${s.t.state.fr}</span><button type="button" class="gbtn sm" data-revise="${s.t.id}">Réviser</button></li>`).join("")}</ol>`
      :`<p class="sub">Chưa có gì cần ôn. Hãy học tiếp theo lộ trình ở trang Lab.</p>`}
    </section>
    <div class="libtools">
      <h2>Les rayonnages</h2>
      <div class="seg2" role="group" aria-label="Cách hiển thị">
        <button type="button" data-lv="shelves" aria-pressed="${viewMode==="shelves"}">Kệ sách</button>
        <button type="button" data-lv="list" aria-pressed="${viewMode==="list"}">Danh sách</button>
      </div>
    </div>
    <div class="legend">${STATES.map(s=>`<span class="lg st-${s.id}"><i></i>${s.fr}</span>`).join("")}<span class="lg due"><i></i>À réviser</span></div>
    <div class="library ${viewMode==="list"?"aslist":""}">
      <div class="shelfview">${shelvesHTML()}</div>
      <div class="listview">${listHTML()}</div>
    </div>`;
    if(glowIds.size)setTimeout(()=>{glowIds.clear();},4000);
  }
  function metric(label,value,expl){return `<div class="met"><span class="ml">${label}</span><b>${value}</b><small>${expl}</small></div>`;}
  function openBook(id){
    const t=Progress.topic(id),sh=shelfOf(id),C=MASTERY_CONFIG;
    const next=t.levels[t.si];
    const chs=chaptersOf(id);
    const html=`<div class="bookpanel c-${sh.color}">
      <div class="bp-cover"><p class="eyebrow">${esc(sh.fr)}</p><h2>${esc(topicLabel(id))}</h2><p class="bvn">${esc(TOPICS[id].vn)}</p>
        <ol class="ladder">${STATES.map((s,i)=>`<li class="${i<t.si?"done":i===t.si?"cur":""}">${s.fr}</li>`).join("")}</ol>
        ${t.aReviser?`<p class="duebadge">À réviser · ${esc(t.reasonReview)}</p>`:""}
      </div>
      <div class="bp-page">
        <div class="mets">
          ${metric("Completion",t.completion===null?`${t.distinctQ} câu`:Math.round(t.completion*100)+"%",t.completion===null?"Số câu khác nhau đã làm":`${t.distinctQ}/${TOPICS[id].bank} câu khác nhau trong ngân hàng`)}
          ${metric("Accuracy",fmtPct(t.rec.acc),`Câu nhận biết (trắc nghiệm): ${t.rec.n} lượt tính điểm`)}
          ${metric("Production",fmtPct(t.prod.acc),`Câu tự tạo đáp án: ${t.prod.n} lượt tính điểm`)}
          ${metric("Retention",t.reviews.length?`${t.goodReviews}/${t.reviews.length}`:"Données insuffisantes",`Lần ôn cách quãng thành công (cách ≥ ${C.review.minGapDays} ngày, ≥ ${C.review.okAcc*100}%)`)}
          ${metric("Mastery",t.state.fr,`Bậc ${t.si}/5, suy ra từ các tiêu chí bên dưới`)}
          ${metric("Prochaine révision",fmtDue(t.due),t.sessions?`${t.sessions} lần làm bài, ${t.attempts} câu`:"Chưa có lần luyện nào")}
        </div>
        <p class="note">Tỉ lệ chỉ tính tối đa ${C.perQuestionCap} lượt gần nhất của mỗi câu, cần ít nhất ${C.minForRate} lượt mới hiển thị.</p>
        ${next?`<h3>Để lên ${STATES[t.si+1].fr}</h3><ul class="checks">${next.checks.map(c=>`<li class="${c.ok?"ok":""}">${esc(c.t)}</li>`).join("")}</ul>`:`<h3>Đã đạt mọi tiêu chí</h3>`}
        <h3>Dạng bài còn yếu</h3>
        ${t.weakTypes.length?`<ul class="plain">${t.weakTypes.map(w=>`<li>${esc(TYPE_LABEL[w.type]||w.type)}: ${Math.round(w.acc*100)}% (${w.n} lượt)</li>`).join("")}</ul>`:`<p class="sub">${Object.keys(t.byType).length?"Không có dạng nào dưới 70% (cần ≥ 3 lượt mỗi dạng).":"Données insuffisantes"}</p>`}
        <h3>Lỗi gần đây</h3>
        ${t.mistakes.length?`<ul class="plain mist">${t.mistakes.map(m=>`<li><s>${esc(m.given)}</s> → <b>${esc(m.expected)}</b> <small>${esc(TYPE_LABEL[m.type]||"")}</small></li>`).join("")}</ul>`:`<p class="sub">Chưa ghi nhận lỗi ở câu tự tạo đáp án.</p>`}
        ${chs.length?`<h3>Chương liên quan trong Grammaire progressive</h3><p class="chips2">${chs.map(c=>`<button type="button" class="chiplink" data-chapter="${c.id}">${c.book==="I"?"Intermédiaire":"Avancé"} ${c.num} · ${esc(c.fr)}</button>`).join("")}</p>`:""}
        <div class="bp-actions"><button type="button" class="gbtn" data-revise="${id}">Réviser ce sujet</button><button type="button" class="ghostbtn" data-close="1">Đóng</button></div>
      </div>
    </div>`;
    Modal.open(html,"book");
  }
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-book]");if(b&&b.closest("#libRoot, #modal, #labRoot")){openBook(b.dataset.book);return;}
    const v=e.target.closest(".seg2 [data-lv]");
    if(v){viewMode=v.dataset.lv;try{localStorage.setItem("fr-lab-libview",viewMode);}catch(err){}render();}
  });
  return {render,openBook,markProgressed};
})();
