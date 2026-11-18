/* ---------- Modal ---------- */
const Modal=(()=>{
  let lastFocus=null;
  function open(html,kind){
    const m=$("modal");lastFocus=document.activeElement;
    m.innerHTML=`<div class="mback" data-close="1"></div><div class="mbox ${kind||""}" role="dialog" aria-modal="true"><button type="button" class="mclose" data-close="1" aria-label="Đóng">×</button>${html}</div>`;
    m.hidden=false;document.body.classList.add("modal-open");
    setTimeout(()=>{const f=m.querySelector(".mbox button:not(.mclose), .mbox [href]");(f||m.querySelector(".mclose")).focus();},30);
  }
  function close(){const m=$("modal");if(m.hidden)return;m.hidden=true;m.innerHTML="";document.body.classList.remove("modal-open");if(lastFocus&&lastFocus.focus)lastFocus.focus();}
  document.addEventListener("click",e=>{if(e.target.closest("#modal [data-close]"))close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  return {open,close};
})();

/* ---------- Lab dashboard ---------- */
const Lab=(()=>{
  const bookName=b=>b==="I"?"Intermédiaire":"Avancé";
  function reviseTopics(ids,opts={}){
    ids=[...new Set(ids)].filter(id=>TOPICS[id]);if(!ids.length)return;
    const P=Progress;
    const weak=new Set();
    ids.forEach(id=>P.topic(id).weakTypes.forEach(w=>weak.add(w.type.startsWith("read")?"read":w.type)));
    let types=[...weak].filter(t=>TYPES[t]);
    /* not enough evidence yet: mix recognition and production so both get measured */
    if(types.length<2)types=[...new Set([...types,"qcm","gap","err","tr","conj"])];
    const gram=ids.filter(id=>TOPIC[id]);
    const bankN=bankCountFor(gram,types.filter(t=>t!=="conj"));
    const src=gram.length&&bankN<6&&sample?"ai":"bank";
    const title=opts.title||(ids.length===1?`Révision — ${topicLabel(ids[0])}`:`Révision — ${ids.length} sujets`);
    location.hash="#generateur";
    prefillGenerator({topics:ids,types,count:opts.count||(ids.length>1?15:12),src,title,mode:"review"});
  }
  function ring(p){const r=22,c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="${r}" class="rbg"/><circle cx="26" cy="26" r="${r}" class="rfg" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}"/></svg><span class="rtxt">${p}%</span>`;}
  function render(){
    const root=$("labRoot");if(!root)return;
    const d=Store.get(),P=Progress,nx=P.nextChapter(),due=P.dueTopics(),studied=P.studiedTopics();
    const chState=ROADMAP.map(ch=>({ch,pct:P.chapterPct(ch),si:P.chapterState(ch)}));
    const chDone=chState.filter(x=>x.si>=2).length;
    const seg=lv=>{const l=chState.filter(x=>x.ch.lv===lv);return l.length?Math.round(l.reduce((n,x)=>n+x.pct,0)/l.length):0;};
    const all=Object.values(P.all());
    const answered=d.attempts.length;
    root.innerHTML=`
    <div class="lvbar" aria-label="Tiến độ theo trình độ">${["A2","B1","B2"].map(lv=>`<div class="lvseg"><i style="width:${seg(lv)}%"></i><span>${lv} · ${seg(lv)}%</span></div>`).join("")}</div>
    <h1 class="labtitle">Grammaire progressive, A2 → B2</h1>
    <p class="lablede">${ROADMAP.length} chương theo đúng thứ tự hai cuốn <i>Intermédiaire</i> và <i>Avancé</i>. Mỗi chương nối với các chủ điểm luyện tập; vòng tiến độ phản ánh trạng thái thật của các chủ điểm đó, và chỉ tăng khi bạn nộp bài.</p>
    <div class="tiles">
      <div class="tile"><b>${chDone}</b><span>/ ${ROADMAP.length} chương đã học</span></div>
      <div class="tile gold"><b>${all.filter(t=>t.si>=5).length}</b><span>chủ điểm thành thạo</span></div>
      <div class="tile"><b>${answered}</b><span>câu đã làm</span></div>
      <div class="tile warn"><b>${due.length}</b><span>chủ điểm cần ôn</span></div>
    </div>
    <div class="actions-grid">
      ${nx?`<button type="button" class="acard primary" data-chapter="${nx.id}"><span class="ah">Học tiếp</span><span class="as">${bookName(nx.book)} ${nx.num} · ${esc(nx.fr)}</span></button>`
         :`<div class="acard primary"><span class="ah">Đã đi hết lộ trình</span><span class="as">Mọi chương đều từ Étudié trở lên</span></div>`}
      ${typeof Mot!=="undefined"?Mot.card():""}
      ${typeof Cartes!=="undefined"?Cartes.card():""}
      ${typeof ThiThu!=="undefined"?ThiThu.card():""}
      ${typeof SoLoi!=="undefined"?SoLoi.card():""}
      <a class="acard" href="#parler"><span class="ah">Luyện nói</span><span class="as">Đọc theo câu mẫu có chấm điểm, nói tự do theo đề DELF</span></a>
      <a class="acard" href="#ecoute"><span class="ah">Luyện nghe</span><span class="as">Giọng thật theo trình độ A2 → B2, câu hỏi dạng DELF</span></a>
      <button type="button" class="acard" data-mixed="1" ${studied.length?"":"disabled"}><span class="ah">Ôn tập hỗn hợp</span><span class="as">${studied.length?`15 câu từ ${studied.length} chủ điểm đã học`:"Mở khi có ít nhất 1 chủ điểm đạt Étudié"}</span></button>
      <button type="button" class="acard" data-due="1" ${due.length?"":"disabled"}><span class="ah">Ôn hôm nay</span><span class="as">${due.length?`${due.length} chủ điểm đến hạn hoặc cần củng cố`:"Không có chủ điểm nào đến hạn"}</span></button>
      <div class="acard info timecard"><span class="ah">Thời gian học</span>
        <span class="tgrid"><span><small>Tổng cộng</small><b id="tTotal">${fmtLong(StudyTime.total())}</b></span><span><small>Hôm nay</small><b id="tToday">${fmtLong(StudyTime.today())}</b></span><span><small>7 ngày qua</small><b id="tWeek">${fmtLong(StudyTime.lastDays(7).reduce((n,d)=>n+d.sec,0))}</b></span><span><small>Liên tiếp</small><b>${P.streak()} ngày</b></span></span>
        ${weekBars()}</div>
      <a class="acard" href="#bibliotheque"><span class="ah">Grammaire</span><span class="as">Kệ sách theo chủ điểm, gợi ý ôn, lỗi thường gặp</span></a>
      <a class="acard" href="#generateur"><span class="ah">Exercices de tests</span><span class="as">Tự chọn trình độ, chủ điểm, 11 dạng bài</span></a>
      <button type="button" class="acard" data-method="1"><span class="ah">Cách học</span><span class="as">Chu trình học và cách tính trạng thái</span></button>
      <button type="button" class="acard" data-backup="1"><span class="ah">Sao lưu</span><span class="as">${Store.mode()==="cloud"?"Đã lưu vào tài khoản · xuất/nhập JSON":"Đang lưu trên trình duyệt · nên xuất JSON"}</span></button>
    </div>
    ${ROADMAP_BOOKS.map(b=>`<section class="route"><h2>${b.title} <span>${b.range}</span></h2>
      <div class="chgrid">${chState.filter(x=>x.ch.book===b.id).map(({ch,pct,si})=>`
        <button type="button" class="chcard ${nx&&nx.id===ch.id?"next":""} ${pct>0?"started":""}" data-chapter="${ch.id}">
          <span class="chlab">Chapitre ${ch.num} · ${ch.lv}</span>${nx&&nx.id===ch.id?'<span class="nextbadge">Tiếp theo</span>':""}
          <span class="chnum">${ch.num}</span>
          <span class="chfoot"><span class="chtitle">${esc(ch.fr)}<small>${esc(ch.vn)}</small></span><span class="ringwrap">${ring(pct)}</span></span>
        </button>`).join("")}</div></section>`).join("")}
    <p class="foot-note">${Store.mode()==="cloud"?"Tiến độ được lưu riêng trong tài khoản Claude của bạn.":"Tiến độ đang lưu trên trình duyệt này."} ${esc(Store.note())}</p>`;
  }
  function openChapter(id){
    const ch=ROADMAP.find(c=>c.id===id);if(!ch)return;
    Store.logEvent("chapter_open",ch.id);
    const P=Progress;
    const tps=ch.topics.map(tid=>{const t=P.topic(tid);return `<li><button type="button" class="tlink" data-book="${tid}"><span>${esc(topicLabel(tid))}</span><span class="tstate st-${t.state.id}">${t.state.fr}</span>${t.aReviser?'<span class="duechip">À réviser</span>':""}</button><small>${t.attempts?`${t.distinctQ} câu · nhận biết ${fmtPct(t.rec.acc)} · tự tạo ${fmtPct(t.prod.acc)}`:"Chưa luyện"}</small></li>`;}).join("");
    const bankN=ch.topics.reduce((n,tid)=>n+(TOPICS[tid]?TOPICS[tid].bank:0),0);
    Modal.open(`<div class="chpanel">
      <p class="eyebrow">Grammaire progressive · ${bookName(ch.book)} · chapitre ${ch.num} · ${ch.lv}</p>
      <h2>${esc(ch.fr)}</h2><p class="bvn">${esc(ch.vn)}</p>
      ${typeof Video!=="undefined"?Video.sectionHTML(ch):""}
      ${lessonHTML(ch)}
      <div class="practice-box">
        <h3>Luyện tập</h3><ul class="tlist2">${tps}</ul>
        <p class="sub">Ngân hàng có ${bankN} câu cho các chủ điểm này${bankN<8?"; chế độ Claude soạn câu mới sẽ được dùng để đủ câu":""}. Tiến độ chỉ được ghi khi bạn nộp bài ở chế độ "Làm online".</p>
        <div class="bp-actions"><button type="button" class="gbtn" data-practice="${ch.id}">Luyện chương này</button></div>
      </div>
      <div class="askbox">
        <h3>Hỏi thêm Claude</h3>
        ${sample?`<label class="sub" for="askInput">Hỏi bất cứ điều gì về chương này: thêm ví dụ, so sánh hai cấu trúc, giải thích một câu bạn làm sai…</label>
        <div class="askrow"><textarea id="askInput" rows="2" placeholder="Ví dụ: Khi nào dùng il est, khi nào dùng c'est với nghề nghiệp?"></textarea><button type="button" class="ghostbtn" data-explain="${ch.id}">Hỏi</button></div>`
        :`<p class="sub">Chỉ dùng được khi mở trang trong Claude.</p>`}
        <div class="explain" id="explainBox" hidden></div>
      </div>
    </div>`,"chapter");
    if(typeof Video!=="undefined")Video.render(ch);
  }
  function lessonHTML(ch){
    const L=LESSONS[ch.id];if(!L)return `<p class="sub">Bài giảng cho chương này chưa có.</p>`;
    const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join("");
    const table=L.t?`<div class="ltable-wrap"><table class="ltable">${L.t.map((r,i)=>`<tr>${r.map(c=>i===0&&L.t[0].length>1?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`:"";
    const showEn=enOn();
    return `<article class="lesson${showEn?" show-en":""}">
      <label class="entoggle"><input type="checkbox" class="enchk" ${showEn?"checked":""}> <span>So với tiếng Anh</span><small>Mở khi cần học song song</small></label>
      <section><h3>Dùng khi nào</h3><ul>${li(L.u)}</ul></section>
      <section><h3>Cách tạo và quy tắc</h3>${table}${L.f?`<ul>${li(L.f)}</ul>`:""}</section>
      <section><h3>Ví dụ</h3><ul class="lex">${L.x.map(([fr,vn])=>`<li><span class="fr" lang="fr">${esc(fr)}</span><span class="vn">${esc(vn)}</span></li>`).join("")}</ul></section>
      <section><h3>Lỗi hay gặp</h3><ul class="lerr">${li(L.e)}</ul></section>
      ${enHTML(ch,L)}
      ${plusHTML(ch)}
      <section><h3>Tự kiểm tra</h3><ol class="lquiz">${L.q.map(([q,a])=>`<li><span lang="fr">${esc(q)}</span> <button type="button" class="reveal" aria-expanded="false">Xem đáp án</button><b class="ans" lang="fr" hidden>${esc(a)}</b></li>`).join("")}</ol></section>
    </article>`;
  }
  function plusHTML(ch){
    const P=(typeof LESSON_PLUS!=="undefined"&&LESSON_PLUS[ch.id])||[];
    return P.map(b=>`<section class="lplus"><h3><span class="plustag">Bổ sung B2</span> ${esc(b.h)}</h3><ul>${b.f.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      ${b.x?`<ul class="lex">${b.x.map(([fr,vn])=>`<li><span class="fr" lang="fr">${esc(fr)}</span><span class="vn">${esc(vn)}</span></li>`).join("")}</ul>`:""}
      ${b.en?`<p class="plusen en-only"><b>So với tiếng Anh:</b> ${esc(b.en)}</p>`:""}</section>`).join("");
  }
  const enOn=()=>{try{return localStorage.getItem("fr-en-cmp")==="1";}catch(e){return false;}};
  function enHTML(ch,L){
    const C=(typeof EN_CMP!=="undefined"&&EN_CMP[ch.id])||null;
    const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join("");
    const body=C?`
      <div class="encols"><div class="en-same"><h4>Giống: dùng như tiếng Anh</h4><ul>${li(C.s)}</ul></div><div class="en-diff"><h4>Khác: dễ sai</h4><ul>${li(C.d)}</ul></div></div>
      <h4>Câu song song</h4><table class="enpairs"><tbody>${C.p.map(([fr,en])=>`<tr><td lang="fr">${esc(fr)}</td><td lang="en">${esc(en)}</td></tr>`).join("")}</tbody></table>
      <h4>Bẫy Anh hoá và faux ami</h4><ul class="lerr">${li(C.t)}</ul>`:"";
    return `<section class="encmp en-only"><h3>Pháp ↔ Anh</h3>${L.en?`<p class="ensum">${esc(L.en)}</p>`:""}${body}</section>`;
  }
  document.addEventListener("change",e=>{
    const c=e.target.closest(".enchk");if(!c)return;
    try{localStorage.setItem("fr-en-cmp",c.checked?"1":"0");}catch(err){}
    document.querySelectorAll(".lesson").forEach(l=>l.classList.toggle("show-en",c.checked));
    document.querySelectorAll(".enchk").forEach(x=>{x.checked=c.checked;});
  });
  function lessonText(ch){
    const L=LESSONS[ch.id];if(!L)return "";
    return ["Dùng khi nào: "+L.u.join(" "),L.t?"Bảng: "+L.t.map(r=>r.join(" | ")).join("; "):"",L.f?"Quy tắc: "+L.f.join(" "):"","Ví dụ: "+L.x.map(x=>x[0]+" ("+x[1]+")").join("; "),"Lỗi hay gặp: "+L.e.join(" "),"So với tiếng Anh: "+L.en,...((typeof LESSON_PLUS!=="undefined"&&LESSON_PLUS[ch.id])||[]).map(b=>"Bổ sung B2 – "+b.h+": "+b.f.join(" "))].filter(Boolean).join("\n");
  }
  let exCtl=null;
  async function explain(id){
    const ch=ROADMAP.find(c=>c.id===id),box=$("explainBox");if(!ch||!box||!sample)return;
    const q=($("askInput")||{}).value||"";
    if(!q.trim()){box.hidden=false;box.textContent="Hãy gõ câu hỏi của bạn vào ô bên trên.";return;}
    exCtl=new AbortController();box.hidden=false;box.textContent="Claude đang trả lời…";
    const prompt=`Bạn là gia sư tiếng Pháp cho một học viên người Việt (trình độ khoảng A2, mục tiêu DELF B2, tiếng Anh B1–B2).
Học viên đang học chương « ${ch.fr} » (${ch.vn}, trình độ ${ch.lv}). Bài giảng học viên vừa đọc:
${lessonText(ch)}

Câu hỏi của học viên:
"""${q.slice(0,1500)}"""

Trả lời bằng tiếng Việt, ngắn gọn, đúng trọng tâm câu hỏi; ví dụ tiếng Pháp kèm nghĩa tiếng Việt. Không dùng bảng markdown hay ký hiệu đậm. Nếu câu hỏi không liên quan đến tiếng Pháp, nhẹ nhàng đưa về chủ đề bài học.`;
    try{await sample(prompt,{signal:exCtl.signal,cache:false,onText:({text})=>{box.textContent=text;}});}
    catch(e){box.textContent=(e&&e.text?e.text+"\n\n":"")+(e&&e.code==="not_granted"?"Bạn chưa cho phép trang dùng Claude.":e&&e.code==="rate_limited"?"Đã chạm giới hạn lượt dùng Claude, thử lại sau.":"Chưa trả lời được lúc này, thử lại sau.");}
  }
  function openMethod(){
    const C=MASTERY_CONFIG,M=C.mastered,T=C.trained;
    Modal.open(`<div class="method"><p class="eyebrow">Cách học</p><h2>Chu trình 6 bước cho mỗi chương</h2>
      <ol class="steps">
        <li><b>Mở chương</b> ở lộ trình, đọc phần lý thuyết trong sách hoặc bấm "Nhờ Claude giảng".</li>
        <li><b>Luyện 12 câu</b> ở chế độ "Làm online". Chỉ bài nộp ở chế độ này mới được ghi tiến độ.</li>
        <li><b>Đọc phản hồi</b> từng câu; câu tự luận chưa khớp đáp án mẫu thì tự đối chiếu.</li>
        <li><b>Ôn khi đến hạn.</b> Lịch ôn giãn dần ${C.intervals.join(" → ")} ngày nếu bạn làm tốt, quay lại 1 ngày nếu dưới ${C.due.lowAcc*100}%.</li>
        <li><b>Ôn tập hỗn hợp</b> vài lần mỗi tuần để trộn các chủ điểm đã học.</li>
        <li><b>Đọc hiểu và viết</b> kiểu DELF mỗi tuần; phần viết nhờ Claude chấm.</li>
      </ol>
      <h3>Trạng thái sách được tính thế nào</h3>
      <ul class="plain">
        <li><b>Découvert</b>: đã mở chương hoặc làm ít nhất 1 câu.</li>
        <li><b>Étudié</b>: ≥ ${C.studied.distinctQ} câu khác nhau.</li>
        <li><b>Entraîné</b>: ≥ ${T.distinctQ} câu khác nhau, ≥ ${T.sessions} lần làm bài, có cả câu nhận biết và tự tạo đáp án, đúng ≥ ${T.acc*100}%.</li>
        <li><b>Retenu</b>: thêm ít nhất 1 lần ôn cách ≥ ${C.review.minGapDays} ngày với ≥ ${C.review.okAcc*100}% đúng.</li>
        <li><b>Maîtrisé</b>: ≥ ${M.distinctQ} câu, ≥ ${M.types} dạng bài, tự tạo đáp án ≥ ${M.prodAcc*100}% (tối thiểu ${M.minProd} câu), nhận biết ≥ ${M.recAcc*100}%, ${M.reviews} lần ôn cách quãng thành công, lần gần nhất cách ≥ ${M.lastGapDays} ngày.</li>
        <li><b>À réviser</b>: đã học nhưng quá hạn ôn, hoặc ${C.due.recentWindow} câu gần nhất đúng dưới ${C.due.lowAcc*100}%.</li>
      </ul>
      <p class="sub">Mỗi câu chỉ tính tối đa ${C.perQuestionCap} lượt gần nhất, nên làm lại một câu quen không làm tăng điểm mãi. Một bài nộp lại nhiều lần chỉ được ghi một lần. Một lần đạt 100% không đủ để thành Maîtrisé.</p>
    </div>`,"method");
  }
  function openBackup(){
    Modal.open(`<div class="backup"><p class="eyebrow">Sao lưu</p><h2>Dữ liệu học tập</h2>
      <p>${Store.mode()==="cloud"?"Tiến độ đang được lưu riêng trong tài khoản Claude của bạn (chỉ bạn đọc được), và có bản sao trên trình duyệt.":"Tiến độ đang lưu trên trình duyệt này. Nếu xoá dữ liệu trình duyệt hoặc đổi máy, dữ liệu sẽ mất: hãy xuất file định kỳ."}</p>
      <p class="sub">${Store.get().sessions.length} lần làm bài · ${Store.get().attempts.length} câu trả lời đã ghi.</p>
      <div class="bp-actions"><button type="button" class="gbtn" id="expBtn">Xuất file JSON</button>
      <label class="ghostbtn filebtn">Nhập file JSON (gộp, không xoá dữ liệu cũ)<input type="file" id="impFile" accept="application/json,.json"></label></div>
      <p class="sub" id="bkStatus" role="status"></p>
      <div class="bp-reset"><h3>Xoá dữ liệu học</h3><p class="sub">Dùng khi muốn bắt đầu lại từ đầu, ví dụ sau khi chạy thử. Nên xuất file JSON trước để có bản sao. Không thể hoàn tác.</p>
        <div class="bp-checks">${[["lam","Bài làm, thống kê và thời gian học"],["cards","Tiến độ thẻ từ và kết quả luyện tập"],["errs","Carnet d'erreurs"],["speak","Lịch sử luyện nói và luyện nghe"]].map(([k,l])=>`<label><input type="checkbox" class="rsChk" value="${k}" checked> ${l}</label>`).join("")}</div>
        <button type="button" class="ghostbtn danger" id="rsBtn">Xoá dữ liệu đã chọn</button></div></div>`,"backup");
    $("rsBtn").onclick=()=>{
      const parts=new Set([...document.querySelectorAll(".rsChk:checked")].map(x=>x.value));
      const b=$("rsBtn");if(!parts.size){$("bkStatus").textContent="Chưa chọn mục nào để xoá.";return;}
      if(!b.dataset.armed){b.dataset.armed="1";b.textContent="Bấm lần nữa để xác nhận xoá";setTimeout(()=>{if(b.isConnected){delete b.dataset.armed;b.textContent="Xoá dữ liệu đã chọn";}},5000);return;}
      Store.reset(parts);b.disabled=true;b.textContent="Đã xoá";$("bkStatus").textContent="Đã xoá dữ liệu đã chọn. Tải lại trang để làm mới mọi mục.";
    };
    $("expBtn").onclick=async()=>{
      if(!downloads){$("bkStatus").textContent="Tải file không khả dụng ở chế độ xem này.";return;}
      try{await downloads.save({filename:"lab-francais-"+Store.dayKey(Date.now())+".json",data:Store.exportJSON()});$("bkStatus").textContent="Đã xuất file.";}
      catch(e){$("bkStatus").textContent=e&&e.code==="declined"?"Đã huỷ.":"Không xuất được file ở chế độ xem này.";}
    };
    $("impFile").onchange=async e=>{
      const f=e.target.files[0];if(!f)return;
      try{const r=Store.importJSON(await f.text());$("bkStatus").textContent=r.changed?`Đã gộp ${r.sessions} lần làm bài từ file.`:"File không có dữ liệu mới.";}
      catch(err){$("bkStatus").textContent="File không đúng định dạng sao lưu của Lab.";}
    };
  }
  document.addEventListener("click",e=>{
    const c=e.target.closest("[data-chapter]");if(c){openChapter(c.dataset.chapter);return;}
    const p=e.target.closest("[data-practice]");if(p){const ch=ROADMAP.find(x=>x.id===p.dataset.practice);Modal.close();reviseTopics(ch.topics,{title:`Chapitre ${ch.num} — ${ch.fr}`,count:12});return;}
    const rv=e.target.closest(".reveal");if(rv){const a=rv.nextElementSibling;const open=a.hidden;a.hidden=!open;rv.setAttribute("aria-expanded",String(open));rv.textContent=open?"Ẩn":"Xem đáp án";return;}
    const x=e.target.closest("[data-explain]");if(x){explain(x.dataset.explain);return;}
    const r=e.target.closest("[data-revise]");if(r){Modal.close();reviseTopics(r.dataset.revise.split(","));return;}
    if(e.target.closest("[data-mixed]")){reviseTopics(shuffle(Progress.studiedTopics().map(t=>t.id)).slice(0,6),{title:"Révision mixte",count:15});return;}
    if(e.target.closest("[data-due]")){reviseTopics(Progress.dueTopics().map(t=>t.id).slice(0,6),{title:"Révision du jour",count:15});return;}
    if(e.target.closest("[data-method]")){openMethod();return;}
    if(e.target.closest("[data-backup]")){openBackup();return;}
  });
  return {render,reviseTopics,openChapter};
})();

/* ---------- Study time: counts each second the page is visible and in use ---------- */
const StudyTime=(()=>{
  const IDLE=120000;            // no input for 2 minutes → the clock pauses
  let lastInput=Date.now(),pending=0,active=false;
  ["pointerdown","pointermove","keydown","scroll","input","wheel","touchstart"].forEach(ev=>document.addEventListener(ev,()=>{lastInput=Date.now();},{passive:true}));
  const stored=()=>Object.values(Store.get().time).reduce((a,b)=>a+(+b||0),0);
  const total=()=>stored()+pending;
  const today=()=>(Store.get().time[Store.dayKey(Date.now())]||0)+pending;
  function lastDays(n){
    const out=[],t=Store.get().time,names=["CN","T2","T3","T4","T5","T6","T7"];
    for(let i=n-1;i>=0;i--){const d=new Date(Date.now()-i*DAY),k=Store.dayKey(d.getTime());out.push({k,label:i===0?"Hôm nay":names[d.getDay()],sec:(t[k]||0)+(i===0?pending:0)});}
    return out;
  }
  const flush=()=>{if(pending>0){const p=pending;pending=0;Store.addTime(p);}};
  setInterval(()=>{
    active=document.visibilityState==="visible"&&Date.now()-lastInput<IDLE;
    if(active)pending++;
    paint();
  },1000);
  setInterval(flush,300000);
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){flush();Store.flush();}else lastInput=Date.now();});
  window.addEventListener("pagehide",flush);
  function paint(){
    const c=$("studyClock");
    if(c){c.querySelector("b").textContent=fmtHMS(total());c.classList.toggle("paused",!active);c.title=active?"Tổng thời gian học trên Lab · đang tính":"Tổng thời gian học trên Lab · tạm dừng vì không thấy thao tác trong 2 phút";}
    const a=$("tTotal"),b=$("tToday"),w=$("tWeek");
    if(a)a.textContent=fmtLong(total());
    if(b)b.textContent=fmtLong(today());
    if(w)w.textContent=fmtLong(lastDays(7).reduce((n,d)=>n+d.sec,0));
  }
  return {total,today,lastDays,isActive:()=>active,paint};
})();
function fmtHMS(sec){sec=Math.floor(sec);const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return h+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}
function fmtLong(sec){const m=Math.floor(sec/60),h=Math.floor(m/60);if(h)return `${h} giờ ${m%60} phút`;if(m)return `${m} phút`;return `${Math.floor(sec)} giây`;}
function weekBars(){
  const days=StudyTime.lastDays(7),max=Math.max(60,...days.map(d=>d.sec));
  return `<div class="wbars" aria-label="Thời gian học 7 ngày gần nhất">${days.map(d=>`<div class="wb" title="${d.k}: ${fmtLong(d.sec)}"><i style="height:${Math.max(d.sec?6:2,Math.round(d.sec/max*100))}%"></i><span>${d.label}</span></div>`).join("")}</div>`;
}

/* ---------- Router ---------- */
const VIEWS=["lab","bibliotheque","generateur","ecoute","phonetique","parler","cartes","thithu","soloi","mot","soutenir"];
const NAV_GROUPS={home:[["lab","Accueil"]],learn:[["bibliotheque","Grammaire"],["cartes","Vocabulaire"],["phonetique","Phonétique"],["mot","Mot du jour"]],train:[["generateur","Exercices"],["ecoute","Écoute"],["parler","Parler"]],exam:[["thithu","Examen blanc"],["soloi","Carnet d'erreurs"]]};
const groupOf=v=>Object.keys(NAV_GROUPS).find(g=>NAV_GROUPS[g].some(([k])=>k===v))||"home";
const navLast=(()=>{try{return JSON.parse(localStorage.getItem("fr-nav-last")||"{}");}catch(e){return {};}})();
let prevView="lab";
function paintNav(v){
  const inGroup=Object.values(NAV_GROUPS).some(l=>l.some(([k])=>k===v));
  const g=inGroup?groupOf(v):null;
  if(g&&g!=="home"){navLast[g]=v;try{localStorage.setItem("fr-nav-last",JSON.stringify(navLast));}catch(e){}}
  if(navLast.home)delete navLast.home;
  document.querySelectorAll(".nav a[data-g]").forEach(a=>{const gg=a.dataset.g;a.setAttribute("aria-current",gg===g?"page":"false");a.setAttribute("href","#"+(gg==="home"?"lab":(navLast[gg]||NAV_GROUPS[gg][0][0])));});
  const dl=$("donateLink");if(dl){dl.setAttribute("aria-pressed",String(v==="soutenir"));dl.setAttribute("href",v==="soutenir"?"#"+prevView:"#soutenir");dl.textContent=v==="soutenir"?"✕ Đóng":"♥ Soutenir";}
  if(v!=="soutenir")prevView=v;
  const sub=$("subnav");if(!sub)return;
  if(!g||g==="home"){sub.hidden=true;sub.innerHTML="";return;}
  sub.hidden=false;sub.innerHTML=NAV_GROUPS[g].map(([k,l])=>`<a href="#${k}" aria-current="${k===v?"page":"false"}">${l}</a>`).join("");
}
function route(){
  let v=(location.hash||"#lab").slice(1);if(!VIEWS.includes(v))v="lab";
  VIEWS.forEach(x=>{$("view-"+x).hidden=x!==v;});
  paintNav(v);
  Modal.close();
  if(v==="lab")Lab.render();
  if(v==="bibliotheque")Library.render();
  if(v==="generateur")renderMiniLib();
  if(v==="mot"){Mot.reset();Mot.render();}
  if(v==="ecoute")Ecoute.render();
  if(v==="phonetique")Phon.render();
  if(v==="parler")Parler.render();
  if(v==="cartes"){Cartes.reset();Cartes.render();}
  if(v==="soloi")SoLoi.render();
  if(v==="thithu")ThiThu.render();
  if(v==="soutenir")Donate.render();
  if(typeof Donate!=="undefined")Donate.paintLink();
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
function renderSync(){const el=$("syncChip");if(!el)return;const c=Store.mode()==="cloud";el.textContent=c?"Đã lưu vào tài khoản":"Lưu trên trình duyệt";el.className="sync "+(c?"ok":"local");el.title=Store.note()||"";}
Store.subscribe(()=>{renderSync();const v=(location.hash||"#lab").slice(1);if(v==="bibliotheque")Library.render();else if(v==="generateur")renderMiniLib();else if(v==="lab")Lab.render();else if(v==="ecoute")Ecoute.render();else if(v==="soloi")SoLoi.render();});
route();renderSync();Store.init();
