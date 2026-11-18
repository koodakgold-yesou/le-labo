/* ---------- Écoute: levelled listening with real voices ----------
   Real audio comes from the learner: a file opened from the computer (played via blob URL),
   or a source listened to in another tab. Claude writes DELF-style questions from a pasted transcript. */
const Ecoute=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const NQ={A2:6,B1:8,B2:10};
  const KIND={official:"Chính thức",video:"Video",podcast:"Podcast",radio:"Radio",exercise:"Bài tập"};
  let lv=(()=>{try{return localStorage.getItem("fr-ecoute-lv")||"A2";}catch(e){return "A2";}})();
  if(!ECOUTE_LEVELS[lv])lv="A2";
  let W=null;   // workspace state for the open unit
  let ctl=null;

  const unitOf=id=>{for(const L of Object.keys(ECOUTE_LEVELS)){const u=ECOUTE_LEVELS[L].units.find(x=>x.id===id);if(u)return {u,L};}return null;};
  const pct=(s,t)=>t?Math.round(100*s/t):0;
  const shuffleQ=q=>{const idx=[0,1,2].sort(()=>Math.random()-.5);return {...q,o:idx.map(i=>q.o[i]),a:idx.indexOf(0)};};
  function stats(L){
    const all=Store.listens().filter(x=>x.lv===L);
    const last=all.slice(-5);const avg=last.length?Math.round(last.reduce((n,x)=>n+pct(x.score,x.total),0)/last.length):null;
    return {n:all.length,avg,ready:all.length>=5&&avg>=70,all};
  }
  const fmt=s=>{s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");};

  /* ----- page ----- */
  function render(){
    const root=$("ecouteRoot");if(!root)return;
    const L=ECOUTE_LEVELS[lv],st=stats(lv);
    const next={A2:"B1",B1:"B2"}[lv];
    root.innerHTML=`
    <div class="ecpage">
      <header class="echead">
        <div><p class="motkick">Écoute</p><h1>Luyện nghe theo trình độ</h1>
        <p class="lablede">Giọng người thật: đề mẫu chính thức, radio, podcast, phóng sự. Nghe trong app (mở file từ máy) hoặc ở tab khác, rồi làm câu hỏi dạng DELF do Claude soạn từ bản chép lời.</p></div>
        <div class="lvtabs" role="tablist">${Object.keys(ECOUTE_LEVELS).map(k=>`<button type="button" role="tab" aria-selected="${k===lv}" data-eclv="${k}">${k}<small>${ECOUTE_LEVELS[k].fr}</small></button>`).join("")}</div>
      </header>
      <section class="eclevel">
        <div class="ecfmt"><h3>Phần nghe DELF ${lv}</h3><p>${esc(L.format)}</p><p class="sub"><b>Mục tiêu:</b> ${esc(L.goal)}</p></div>
        <div class="ecstats">
          <div class="tile"><b>${st.n}</b><span>bài đã làm</span></div>
          <div class="tile ${st.avg>=70?"gold":""}"><b>${st.avg===null?"–":st.avg+"%"}</b><span>trung bình 5 bài gần nhất</span></div>
          <p class="sub">${st.ready?(next?`Bạn đã ổn định ở ${lv}: có thể thử dần nguồn ${next}.`:"Bạn đã ổn định ở B2."):`Mục tiêu: ít nhất 5 bài, trung bình từ 70% trở lên${next?` thì chuyển sang ${next}`:""}.`}</p>
        </div>
      </section>
      <h2 class="ech2">Các dạng bài nghe ${lv}</h2>
      <div class="ecunits">${L.units.map((u,i)=>{const done=st.all.filter(x=>x.unit===u.id);const a=done.length?Math.round(done.reduce((n,x)=>n+pct(x.score,x.total),0)/done.length):null;
        return `<button type="button" class="ecunit" data-ecunit="${u.id}"><span class="ecnum">${i+1}</span><b lang="fr">${esc(u.t)}</b><span>${esc(u.vn)}</span><small>${done.length?`${done.length} bài · ${a}%`:"Chưa luyện"}</small></button>`;}).join("")}</div>
      <h2 class="ech2">Nguồn giọng thật cho ${lv}</h2>
      <ul class="ecsrc">${L.sources.map(k=>{const s=ECOUTE_SOURCES[k];return `<li><a href="${esc(s.url)}" target="_blank" rel="noopener"><b>${esc(s.name)}</b></a><span class="ectag k-${s.kind}">${KIND[s.kind]}</span><p>${esc(s.what)}</p><small>Bản chép lời: ${esc(s.tr)}</small></li>`;}).join("")}</ul>
      <section class="ecmanual">
        <h3>Ghi điểm bài làm ngoài app</h3>
        <p class="sub">Làm đề mẫu chính thức hoặc bài trên TV5Monde xong thì ghi điểm vào đây để tính tiến độ.</p>
        <form class="ecmform" data-ecmanual="1">
          <input name="title" placeholder="Tên bài (vd: Đề mẫu A2 số 1)" required maxlength="120">
          <input name="score" type="number" min="0" step="0.5" placeholder="Điểm" required>
          <span>/</span><input name="total" type="number" min="1" step="0.5" value="25" required>
          <button class="gbtn sm">Ghi</button>
        </form>
      </section>
      ${st.all.length?`<section><h3>Lịch sử ${lv}</h3><ul class="echist">${st.all.slice(-10).reverse().map(x=>`<li><span>${new Date(x.ts).toLocaleDateString("vi-VN")}</span><b>${esc(x.title||"")}</b><span class="${pct(x.score,x.total)>=70?"ok":pct(x.score,x.total)>=50?"mid":"bad"}">${x.score}/${x.total}</span></li>`).join("")}</ul></section>`:""}
    </div>`;
  }

  /* ----- unit panel ----- */
  function openUnit(id){
    const f=unitOf(id);if(!f)return;const {u,L}=f;
    if(!W||W.unit!==id){if(W&&W.file)URL.revokeObjectURL(W.file.url);W={unit:id,lv:L,file:null,mode:"luyen",plays:0,tr:"",quiz:null,ans:{},done:false,a:null,b:null,rate:1};}
    Modal.open(`<div class="chpanel ecpanel">
      <p class="eyebrow">Écoute · ${L} · ${esc(ECOUTE_LEVELS[L].fr)}</p>
      <h2 lang="fr">${esc(u.t)}</h2><p class="bvn">${esc(u.vn)}</p>
      <div class="eccols">
        <section><h3>Chiến lược nghe</h3><ul>${u.tips.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></section>
        <section><h3>Từ khoá hay gặp</h3><ul class="eckw">${u.kw.map(([fr,en,vn])=>`<li><span lang="fr">${esc(fr)}</span><i lang="en">${esc(en)}</i><span>${esc(vn)}</span></li>`).join("")}</ul></section>
      </div>
      <p class="sub">Nguồn gợi ý: ${ECOUTE_LEVELS[L].sources.map(k=>`<a href="${esc(ECOUTE_SOURCES[k].url)}" target="_blank" rel="noopener">${esc(ECOUTE_SOURCES[k].name)}</a>`).join(" · ")}</p>
      <div id="ewk" class="ewk"></div>
    </div>`,"chapter");
    renderWork();
  }

  function playerHTML(){
    const f=W.file;if(!f)return "";
    const tag=f.video?"video":"audio";
    const thi=W.mode==="thi";
    return `<div class="ecplayer">
      <div class="ecmodes" role="group" aria-label="Chế độ nghe">
        <button type="button" data-ecmode="luyen" aria-pressed="${!thi}">Luyện</button>
        <button type="button" data-ecmode="thi" aria-pressed="${thi}">Thi (tối đa 2 lần)</button>
        <span class="ecfname" title="${esc(f.name)}">${esc(f.name)}</span>
      </div>
      <${tag} id="ecmedia" src="${f.url}" preload="metadata" ${thi?"":"controls"} ${f.video?'playsinline':''}></${tag}>
      ${thi?`<div class="ecthi"><button type="button" class="gbtn" id="ecplay" ${W.plays>=2&&!W.playing?"disabled":""}>${W.playing?"Tạm dừng":W.plays>=2?"Đã nghe 2 lần":"Nghe lần "+(W.plays+1)}</button><span id="ecclock">0:00</span><span class="sub">Lần nghe: ${Math.min(W.plays,2)}/2 · không tua được, giống phòng thi</span></div>`
        :`<div class="ectools">
          <button type="button" class="ghostbtn sm" data-ecskip="-5">⟲ 5s</button><button type="button" class="ghostbtn sm" data-ecskip="5">5s ⟳</button>
          <span class="sub">Tốc độ</span>${[0.75,0.9,1,1.25].map(r=>`<button type="button" class="chip" data-ecrate="${r}" aria-pressed="${W.rate===r}">${r}×</button>`).join("")}
          <button type="button" class="ghostbtn sm" data-ecab="a">${W.a!==null?"A "+fmt(W.a):"Đặt A"}</button><button type="button" class="ghostbtn sm" data-ecab="b" ${W.a===null?"disabled":""}>${W.b!==null?"B "+fmt(W.b):"Đặt B"}</button>
          ${W.a!==null?`<button type="button" class="ghostbtn sm" data-ecab="x">Bỏ lặp</button>`:""}
        </div>`}
    </div>`;
  }

  function renderWork(){
    const box=$("ewk");if(!box||!W)return;
    const canAI=typeof sample!=="undefined"&&!!sample;
    let quizHTML="";
    if(W.quiz){
      const qs=W.quiz.questions;
      quizHTML=`<section class="ecquiz"><h3>Câu hỏi (${qs.length})</h3>
        <ol>${qs.map((q,i)=>`<li class="${W.done?(W.ans[i]===q.a?"ok":"bad"):""}"><p lang="fr">${esc(q.q)}</p>
          ${q.o.map((o,j)=>`<label class="ecopt ${W.done&&j===q.a?"right":""}"><input type="radio" name="eq${i}" value="${j}" ${W.ans[i]===j?"checked":""} ${W.done?"disabled":""}> <span lang="fr">${esc(o)}</span></label>`).join("")}
          ${W.done&&q.ev?`<p class="ecev">Trong bài: « ${esc(q.ev)} »</p>`:""}</li>`).join("")}</ol>
        ${W.done?resultHTML():`<button type="button" class="gbtn" data-ecsubmit="1">Nộp bài</button>`}
      </section>`;
    }
    box.innerHTML=`
      <h3 class="ewkh">Bài luyện</h3>
      <div class="ecstep"><b>1. Nguồn nghe</b>
        <div class="ecsrcrow"><label class="ghostbtn sm vfilebtn">${W.file?"Đổi file":"Mở audio / video từ máy"}<input type="file" accept="audio/*,video/*" data-ecfile="1" hidden></label>
        <span class="sub">${W.file?"":"Hoặc nghe ở tab khác từ các nguồn gợi ý phía trên."}</span></div>
        ${playerHTML()}
      </div>
      <div class="ecstep"><b>2. Bản chép lời</b>
        ${W.quiz?`<p class="sub">${W.done?"Bản chép lời hiện bên dưới, có đánh dấu chỗ chứa đáp án.":"Đã ẩn bản chép lời để bạn nghe và làm bài. Nghe xong mới nộp."}</p>`
          :`<p class="sub">Dán bản chép lời của bài bạn sắp nghe (RFI, TV5Monde, podcast…). Đừng đọc trước: bấm nút là bản chép lời sẽ được ẩn đi.</p>
          <textarea class="wtext ectr" id="ectr" spellcheck="false" placeholder="Dán transcript tiếng Pháp vào đây…">${esc(W.tr)}</textarea>
          <div class="wbar"><span class="sub" id="ecmsg"></span><button type="button" class="gbtn" data-ecgen="1" ${canAI?"":"disabled title='Chỉ dùng được khi mở trang trong Claude'"}>Claude soạn ${NQ[W.lv]} câu hỏi DELF ${W.lv}</button></div>`}
      </div>
      ${quizHTML}
      ${W.done?`<section class="ectrshow"><h3>Bản chép lời</h3><div class="ectrtext">${markTranscript()}</div></section>
        ${W.quiz.vocab&&W.quiz.vocab.length?`<section><h3>Từ vựng trong bài</h3><ul class="eckw">${W.quiz.vocab.map(v=>`<li><span lang="fr">${esc(v.fr)}</span><i lang="en">${esc(v.en||"")}</i><span>${esc(v.vn||"")}${v.fa?` <em class="fa">⚠ ${esc(v.fa)}</em>`:""}</span></li>`).join("")}</ul></section>`:""}
        <button type="button" class="ghostbtn" data-ecnew="1">Làm bài mới</button>`:""}`;
    wireMedia();
  }
  function resultHTML(){
    const qs=W.quiz.questions,ok=qs.filter((q,i)=>W.ans[i]===q.a).length;
    const p=pct(ok,qs.length);
    return `<div class="ecres ${p>=70?"ok":p>=50?"mid":"bad"}"><b>${ok}/${qs.length}</b> câu đúng (${p}%) · quy đổi ≈ ${Math.round(p/4)}/25 điểm phần nghe. ${p>=70?"Tốt, bài này vừa sức.":p>=50?"Gần đạt: nghe lại phần sai với transcript.":"Bài này còn khó: nghe lại ở chế độ Luyện, tốc độ 0.9×, rồi thử bài khác cùng cấp."}</div>`;
  }
  function markTranscript(){
    const raw=W.tr;const evs=(W.quiz.questions||[]).map(q=>q.ev).filter(e=>e&&e.length>3);
    const low=raw.toLowerCase();const spans=[];
    evs.forEach(e=>{const i=low.indexOf(e.toLowerCase().trim());if(i>=0)spans.push([i,i+e.trim().length]);});
    spans.sort((a,b)=>a[0]-b[0]);
    let out="",pos=0;
    spans.forEach(([a,b])=>{if(a<pos)return;out+=esc(raw.slice(pos,a))+"<mark>"+esc(raw.slice(a,b))+"</mark>";pos=b;});
    out+=esc(raw.slice(pos));
    return out.replace(/\n/g,"<br>");
  }

  /* ----- media wiring ----- */
  function wireMedia(){
    const m=$("ecmedia");if(!m)return;
    m.playbackRate=W.rate;
    m.addEventListener("timeupdate",()=>{
      if(W.mode==="luyen"&&W.a!==null&&W.b!==null&&m.currentTime>=W.b)m.currentTime=W.a;
      const c=$("ecclock");if(c)c.textContent=fmt(m.currentTime)+(isFinite(m.duration)?" / "+fmt(m.duration):"");
    });
    if(W.mode==="thi"){
      m.addEventListener("ended",()=>{W.playing=false;m.currentTime=0;renderWork();});
      m.addEventListener("seeking",()=>{if(Math.abs(m.currentTime-(W.lastT||0))>1.5)m.currentTime=W.lastT||0;});
      m.addEventListener("timeupdate",()=>{W.lastT=m.currentTime;});
    }
  }

  async function generate(){
    const ta=$("ectr"),msg=$("ecmsg");
    const tr=(ta.value||"").trim();W.tr=tr;
    if(tr.split(/\s+/).length<40){msg.textContent="Bản chép lời quá ngắn (cần ít nhất khoảng 40 từ).";return;}
    if(typeof sample==="undefined"||!sample)return;
    const f=unitOf(W.unit),u=f.u;
    msg.textContent="Claude đang soạn câu hỏi… (15–40 giây)";
    ta.style.filter="blur(5px)";
    ctl=new AbortController();
    try{
      const raw=await sample.json(`Bạn là người soạn đề DELF. Từ bản chép lời một tài liệu nghe giọng thật dưới đây, soạn ${NQ[W.lv]} câu hỏi phần Compréhension de l'oral DELF ${W.lv} theo format mới của France Éducation international: chỉ trắc nghiệm, mỗi câu đúng 3 lựa chọn, một đáp án đúng.
Dạng tài liệu: ${u.doc}. Trình độ học viên: ${W.lv}.
Yêu cầu: câu hỏi và lựa chọn bằng tiếng Pháp, theo thứ tự xuất hiện trong bài; câu đầu hỏi ý chung (chủ đề, tình huống hoặc người nói); các câu sau hỏi chi tiết${W.lv==="A2"?" cụ thể (số, giờ, địa điểm, người, việc cần làm)":W.lv==="B1"?" và ý kiến, cảm xúc của người nói":" , quan điểm, thái độ, lập luận và ý ngầm"}. Đáp án đúng diễn đạt lại bằng từ khác khi có thể; lựa chọn sai phải hợp lý (nhắc thông tin có trong bài nhưng không trả lời đúng câu hỏi). Chỉ hỏi điều thật sự có trong bài.
Với mỗi câu, "ev" là một đoạn trích NGUYÊN VĂN ngắn (dưới 20 từ) trong bản chép lời chứa đáp án.
Thêm "vocab": 6–8 từ hoặc cụm hữu ích trong bài, với nghĩa tiếng Anh ("en"), nghĩa tiếng Việt ("vn"), và "fa" là cảnh báo ngắn bằng tiếng Việt nếu là faux ami với tiếng Anh (để trống nếu không).
Trả về CHỈ JSON: {"questions":[{"q":"...","o":["đáp án đúng","sai","sai"],"ev":"..."}],"vocab":[{"fr":"...","en":"...","vn":"...","fa":""}]} — đáp án đúng LUÔN ở vị trí đầu (trang sẽ xáo trộn).
Bản chép lời:
"""
${tr.slice(0,12000)}
"""`,{signal:ctl.signal,cache:false});
      const qs=(raw&&Array.isArray(raw.questions)?raw.questions:[]).filter(q=>q&&typeof q.q==="string"&&Array.isArray(q.o)&&q.o.length===3).map(q=>shuffleQ({q:q.q,o:q.o.map(String),ev:typeof q.ev==="string"?q.ev:""}));
      if(qs.length<3)throw{code:"invalid_json"};
      const vocab=(raw&&Array.isArray(raw.vocab)?raw.vocab:[]).filter(v=>v&&v.fr).slice(0,10);
      W.quiz={questions:qs,vocab};W.ans={};W.done=false;
      renderWork();
    }catch(e){
      ta.style.filter="";
      msg.textContent=e&&e.code==="cancelled"?"Đã dừng.":({not_granted:"Bạn chưa cho phép trang dùng Claude.",rate_limited:"Đã chạm giới hạn lượt dùng Claude, thử lại sau."}[e&&e.code]||"Claude chưa soạn được câu hỏi, thử lại nhé.");
    }
  }
  function submit(){
    const qs=W.quiz.questions;
    qs.forEach((q,i)=>{const r=document.querySelector(`input[name="eq${i}"]:checked`);if(r)W.ans[i]=+r.value;});
    const missing=qs.filter((q,i)=>W.ans[i]===undefined).length;
    if(missing&&!W.confirm){W.confirm=true;const b=document.querySelector("[data-ecsubmit]");if(b)b.textContent=`Còn ${missing} câu chưa chọn. Bấm lần nữa để nộp`;return;}
    W.done=true;W.confirm=false;
    const ok=qs.filter((q,i)=>W.ans[i]===q.a).length;
    const f=unitOf(W.unit);
    Store.addListen({lv:W.lv,unit:W.unit,title:(W.file?W.file.name:f.u.t),src:"claude",score:ok,total:qs.length});
    renderWork();
  }

  /* ----- events ----- */
  document.addEventListener("click",e=>{
    const t=e.target.closest("[data-eclv],[data-ecunit],[data-ecmode],[data-ecskip],[data-ecrate],[data-ecab],[data-ecgen],[data-ecsubmit],[data-ecnew],#ecplay");if(!t)return;
    if(t.dataset.eclv){lv=t.dataset.eclv;try{localStorage.setItem("fr-ecoute-lv",lv);}catch(err){}render();return;}
    if(t.dataset.ecunit){openUnit(t.dataset.ecunit);return;}
    const m=$("ecmedia");
    if(t.dataset.ecmode){W.mode=t.dataset.ecmode;W.plays=0;W.playing=false;W.a=W.b=null;renderWork();return;}
    if(t.dataset.ecskip&&m){m.currentTime=Math.max(0,m.currentTime+ +t.dataset.ecskip);return;}
    if(t.dataset.ecrate){W.rate=+t.dataset.ecrate;if(m)m.playbackRate=W.rate;document.querySelectorAll("[data-ecrate]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.ecrate===W.rate));return;}
    if(t.dataset.ecab){const k=t.dataset.ecab;if(k==="x"){W.a=W.b=null;}else if(m){if(k==="a"){W.a=m.currentTime;W.b=null;}else if(m.currentTime>W.a){W.b=m.currentTime;}}const keep=m?m.currentTime:0;const was=m&&!m.paused;renderWork();const n=$("ecmedia");if(n){n.addEventListener("loadedmetadata",()=>{n.currentTime=keep;if(was)n.play().catch(()=>{});},{once:true});}return;}
    if(t.id==="ecplay"&&m){
      if(W.playing){m.pause();W.playing=false;t.textContent="Tiếp tục";return;}
      if(m.currentTime<0.5){if(W.plays>=2)return;W.plays++;}
      m.play().then(()=>{W.playing=true;t.textContent="Tạm dừng";const s=t.parentElement.querySelector(".sub");if(s)s.textContent=`Lần nghe: ${W.plays}/2 · không tua được, giống phòng thi`;}).catch(()=>{});
      return;
    }
    if(t.dataset.ecgen){generate();return;}
    if(t.dataset.ecsubmit){submit();return;}
    if(t.dataset.ecnew){const file=W.file;W={unit:W.unit,lv:W.lv,file,mode:W.mode,plays:0,tr:"",quiz:null,ans:{},done:false,a:null,b:null,rate:W.rate};renderWork();}
  });
  document.addEventListener("change",e=>{
    const inp=e.target.closest("[data-ecfile]");if(!inp||!W)return;
    const file=inp.files&&inp.files[0];if(!file)return;
    if(W.file)URL.revokeObjectURL(W.file.url);
    W.file={url:URL.createObjectURL(file),name:file.name,video:/^video\//.test(file.type)};W.plays=0;W.playing=false;W.a=W.b=null;
    renderWork();
  });
  document.addEventListener("input",e=>{if(e.target.id==="ectr"&&W)W.tr=e.target.value;});
  document.addEventListener("submit",e=>{
    if(!e.target.dataset.ecmanual)return;e.preventDefault();
    const fd=new FormData(e.target);const score=+fd.get("score"),total=+fd.get("total");
    if(!(total>0)||score<0||score>total)return;
    Store.addListen({lv,unit:"manual",title:String(fd.get("title")||"").trim(),src:"manual",score,total});
    render();
  });
  return {render};
})();
