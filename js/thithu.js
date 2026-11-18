/* ---------- Thi thử: full DELF mock exam (4 tests, /100) ----------
   CO: real audio cannot play inside the Claude frame, so the learner takes an official / real-voice listening test
   (links) and enters the result. CE: auto-graded. PE and PO: Claude grades /25 against the DELF descriptors.
   The exam in progress is kept in localStorage so a reload does not lose it; finished mocks go to Store.mocks. */
const ThiThu=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const KEY="fr-mock-cur";
  const LV=["A2","B1","B2"];
  const CO_MIN={A2:25,B1:25,B2:30},PO_INFO={A2:"6–8 phút, chuẩn bị 10 phút",B1:"khoảng 15 phút, chuẩn bị 10 phút",B2:"khoảng 20 phút, chuẩn bị 30 phút"};
  const FEI={A2:"https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a2/exemples-sujets",B1:"https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b1/exemples-sujets",B2:"https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b2/exemples-sujets"};
  const TV5={A2:"https://apprendre.tv5monde.com/fr/exercices/a2-elementaire",B1:"https://apprendre.tv5monde.com/fr/exercices/b1-intermediaire",B2:"https://apprendre.tv5monde.com/fr/exercices/b2-avance"};
  const B1_INTER=["Vous partagez un appartement avec un(e) colocataire qui fait beaucoup de bruit le soir. Vous lui parlez pour trouver une solution. L'examinateur joue le rôle du colocataire.","Vous avez acheté un ordinateur qui ne fonctionne plus après une semaine. Vous retournez au magasin et demandez un remboursement. L'examinateur joue le vendeur.","Un(e) ami(e) français(e) veut venir dans votre pays pour les vacances mais hésite. Vous essayez de le/la convaincre. L'examinateur joue votre ami(e).","Votre collègue vous demande de travailler à sa place samedi. Vous ne pouvez pas. Vous refusez poliment et proposez une autre solution."];
  const SECS=[["co","Compréhension de l'oral","Nghe hiểu"],["ce","Compréhension des écrits","Đọc hiểu"],["pe","Production écrite","Viết"],["po","Production orale","Nói"]];
  let lv="A2",M=null,timerIv=null,live="",busy=false;
  const canAI=()=>typeof sample!=="undefined"&&!!sample;
  const save=()=>{try{if(M)localStorage.setItem(KEY,JSON.stringify(M));else localStorage.removeItem(KEY);}catch(e){}};
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"null");}catch(e){return null;}};
  const wc=t=>(String(t||"").match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]).length;
  const half=x=>Math.round(x*2)/2;
  const nf=v=>v==null?"—":String(v).replace(".",",");
  const fmt=s=>{s=Math.max(0,Math.round(s));const m=Math.floor(s/60),ss=s%60;return (m>=60?Math.floor(m/60)+":"+String(m%60).padStart(2,"0"):m)+":"+String(ss).padStart(2,"0");};

  /* ----- build a new mock ----- */
  function pickW(lvv,genre){const w=WRITE.filter(x=>x.lv===lvv&&(!genre||x.genre===genre));return pick(w.length?w:WRITE.filter(x=>x.lv===lvv));}
  function poParts(lvv){
    const F=typeof PARLER_FREE!=="undefined"?PARLER_FREE:{};
    if(lvv==="A2")return [
      {k:"entretien",t:"Entretien dirigé",vn:"Giới thiệu bản thân, trả lời câu hỏi về mình (không chuẩn bị)",talk:"khoảng 1 phút 30",prompt:pick(F.A2.entretien.items)},
      {k:"monologue",t:"Monologue suivi",vn:"Nói liên tục về chủ đề bốc thăm",talk:"khoảng 2 phút",prompt:pick(F.A2.monologue.items),prepGroup:1},
      {k:"interaction",t:"Exercice en interaction",vn:"Đóng vai: bạn nói phần của mình (câu hỏi, đề nghị, phản hồi)",talk:"3–4 phút",prompt:pick(F.A2.interaction.items).replace(/Claude joue/g,"L'examinateur joue"),prepGroup:1}];
    if(lvv==="B1")return [
      {k:"entretien",t:"Entretien dirigé",vn:"Nói về bản thân, học tập, công việc, sở thích, dự định (không chuẩn bị)",talk:"2–3 phút",prompt:"Parlez de vous : vos études ou votre travail, vos centres d'intérêt, vos projets pour les prochaines années."},
      {k:"interaction",t:"Exercice en interaction",vn:"Đóng vai giải quyết một tình huống (không chuẩn bị)",talk:"3–4 phút",prompt:pick(B1_INTER)},
      {k:"pointdevue",t:"Expression d'un point de vue",vn:"Nêu và bảo vệ ý kiến về vấn đề bốc thăm",talk:"5–7 phút",prompt:pick(F.B1.pointdevue.items),prepGroup:1}];
    const o=pick(B2_ORAL);
    return [
      {k:"expose",t:"Exposé",vn:"Từ tài liệu: nêu vấn đề, trình bày quan điểm có lập luận và ví dụ",talk:"5–7 phút",prompt:o.prob,doc:o.doc,docTitle:o.title,prepGroup:1},
      {k:"debat",t:"Débat",vn:"Trả lời câu hỏi phản biện của giám khảo",talk:"10–13 phút",prompt:"",dyn:true}];
  }
  function build(lvv){
    const d=pickDelf(lvv);
    const pe=lvv==="A2"?[pickW("A2","récit"),pickW("A2","message")]:[lvv==="B2"?pickW("B2"):pickW("B1")];
    return {lv:lvv,step:0,started:Date.now(),
      co:{c:"",t:"",skip:false,done:false},
      ce:{exs:d.exercises.map(e=>({title:e.title,doc:e.doc,src:e.src||"",qs:e.qs.map(q=>({s:q.s,o:q.o,a:q.a}))})),ans:{},done:false,start:0,min:d.minutes||DELF_SETS[lvv].minutes},
      pe:{tasks:pe.map(w=>({p:w.p,min:w.min,max:w.max,req:w.req||[]})),texts:pe.map(()=>""),done:false,start:0,min:DELF_WRITE_MIN[lvv]},
      po:{parts:poParts(lvv),tr:{},i:0,prep:0,prepDone:false,done:false},
      res:null};
  }

  /* ----- scoring ----- */
  const ceScore=()=>{let ok=0,n=0;M.ce.exs.forEach((e,i)=>e.qs.forEach((q,j)=>{n++;if(+M.ce.ans[i+"-"+j]===q.a)ok++;}));return {ok,n,s:n?half(25*ok/n):0};};
  const coScore=()=>{if(M.co.skip)return null;const c=+M.co.c,t=+M.co.t;return t>0&&c>=0&&c<=t?half(25*c/t):null;};
  function summary(){
    const r=M.res||{},sc={co:coScore(),ce:ceScore().s,pe:r.pe?r.pe.diem:null,po:r.po?r.po.diem:null};
    const have=Object.values(sc).filter(v=>v!=null);const total=half(have.reduce((a,b)=>a+b,0));
    const max=have.length*25;const elim=Object.entries(sc).filter(([k,v])=>v!=null&&v<5).map(([k])=>k);
    const proj=max&&max<100?Math.round(total*100/max):total;
    return {sc,total,max,proj,elim,pass:max===100?total>=50&&!elim.length:null};
  }

  /* ----- Claude grading ----- */
  const gradeShape=`Trả về CHỈ JSON: {"diem": số từ 0 đến 25 (bội số 0.5), "muc": "dưới ${"{LV}"} / ${"{LV}"} / ${"{LV}"}+", "tieu_chi": [{"ten":"tên tiêu chí bằng tiếng Việt","diem":số,"toi_da":số}], "nhan_xet": "3–5 câu tiếng Việt: điểm mạnh, điểm yếu, việc cần ưu tiên", "loi": [{"cat":"<mã>","sai":"…","dung":"…","ly_do":"giải thích ngắn tiếng Việt, ghi tên điểm ngữ pháp, nói rõ nếu câu bị Anh hoá"}]}.`;
  async function gradePE(){
    const L=M.lv;
    const tasks=M.pe.tasks.map((t,i)=>`Bài ${i+1} (${t.min}–${t.max} từ). Đề: ${t.p}\nYêu cầu: ${t.req.join("; ")}\nBài làm (${wc(M.pe.texts[i])} từ):\n"""\n${String(M.pe.texts[i]).slice(0,5000)}\n"""`).join("\n\n");
    const prompt=`Bạn là giám khảo DELF ${L} có kinh nghiệm. Chấm phần Production écrite của một học viên người Việt (tiếng Anh B1–B2) theo barème chính thức DELF ${L}${L==="A2"?" (hai bài cộng lại thành /25)":""}. Chấm nghiêm như thi thật; bài quá ngắn, lạc đề hoặc bỏ trống phải bị trừ điểm tương ứng.\n\n${tasks}\n\n${gradeShape.replace(/\{LV\}/g,L)} <mã> là một trong: ${ErrLog.codeList()}. Tối đa 15 lỗi quan trọng nhất.`;
    return await sample.json(prompt,{cache:false});
  }
  async function gradePO(){
    const L=M.lv;
    const parts=M.po.parts.map(p=>`${p.t}${p.prompt?` — sujet : ${p.prompt}`:""}${p.questions?`\nCâu hỏi của giám khảo: ${p.questions.join(" / ")}`:""}\nBản chép lời:\n"""\n${String(M.po.tr[p.k]||"(không nói)").slice(0,4000)}\n"""`).join("\n\n");
    const prompt=`Bạn là giám khảo DELF ${L}. Chấm phần Production orale của một học viên người Việt theo barème chính thức DELF ${L}. Bạn chỉ có bản chép lời do máy nhận dạng giọng nói (có thể sai vài từ do phát âm hoặc do máy), không nghe được giọng: với tiêu chí phát âm, chỉ ước lượng thận trọng từ các chỗ máy nghe lệch và nói rõ là ước lượng. Phần nói quá ngắn so với thời lượng yêu cầu phải bị trừ điểm.\n\n${parts}\n\n${gradeShape.replace(/\{LV\}/g,L)} <mã> là một trong: ${ErrLog.codeList()}. Tối đa 12 lỗi quan trọng nhất.`;
    return await sample.json(prompt,{cache:false});
  }
  const clean=r=>{if(!r||typeof r!=="object")return null;const d=half(Math.max(0,Math.min(25,+r.diem||0)));return {diem:d,muc:String(r.muc||""),tieu_chi:Array.isArray(r.tieu_chi)?r.tieu_chi.slice(0,8):[],nhan_xet:String(r.nhan_xet||""),nloi:Array.isArray(r.loi)?r.loi.length:0};};
  async function runGrading(){
    if(busy)return;busy=true;M.res=M.res||{};M.res.err="";render();
    try{
      if(!M.res.pe){const r=await gradePE();M.res.pe=clean(r);if(r&&r.loi)ErrLog.saveList(r.loi,{src:"write",lv:M.lv,ctx:"Examen blanc · "+M.pe.tasks[0].p});save();render();}
      if(!M.res.po){const r=await gradePO();M.res.po=clean(r);if(r&&r.loi)ErrLog.saveList(r.loi,{src:"oral",lv:M.lv,ctx:"Examen blanc · Production orale"});save();}
    }catch(e){M.res.err=({not_granted:"Bạn chưa cho phép trang dùng Claude.",rate_limited:"Đã chạm giới hạn lượt dùng Claude, thử lại sau.",refused:"Claude không chấm được bài này."}[e&&e.code]||"Claude chưa chấm được lúc này, bấm thử lại.");}
    busy=false;finalize();render();
  }
  function finalize(){
    if(!M||!M.res||M.res.saved)return;
    const sm=summary();if(sm.sc.pe==null||sm.sc.po==null)return;
    M.res.saved=true;save();
    try{Store.addMock({lv:M.lv,sc:sm.sc,total:sm.total,max:sm.max,proj:sm.proj,pass:sm.pass,elim:sm.elim,mins:Math.round((Date.now()-M.started)/60000)});}catch(e){}
  }

  /* ----- timers ----- */
  function tick(){
    clearInterval(timerIv);
    const el=()=>$("ttTimer");
    const sec=M&&M.step===2?M.ce:M&&M.step===3?M.pe:null;
    if(sec&&sec.start&&!sec.done){timerIv=setInterval(()=>{const left=sec.min*60-(Date.now()-sec.start)/1000;const e=el();if(e)e.textContent="⏱ còn "+fmt(left);if(e)e.classList.toggle("low",left<300);
      if(left<=0){clearInterval(timerIv);if(M.step===2){M.ce.done=true;M.step=3;save();render();}else if(M.step===3){M.pe.timeUp=true;save();render();}}},1000);}
    else if(M&&M.step===4&&M.po.prep&&!M.po.prepDone){timerIv=setInterval(()=>{const tot=M.lv==="B2"?1800:600;const left=tot-(Date.now()-M.po.prep)/1000;const e=el();if(e)e.textContent="⏱ chuẩn bị còn "+fmt(left);if(left<=0){clearInterval(timerIv);M.po.prepDone=true;save();render();}},1000);}
  }

  /* ----- views ----- */
  function homeHTML(){
    const cur=load();const hist=(Store.mocks?Store.mocks():[]).filter(m=>m.lv===lv).slice(-10).reverse();
    const ceMin=DELF_SETS[lv].minutes,peMin=DELF_WRITE_MIN[lv];
    return `<div class="ttpage">
      <header class="chead"><div><h1>Examen blanc DELF</h1><p class="sub2">Làm đủ 4 phần thi theo đúng thời gian, chấm trên thang /100. Muốn đỗ cần đạt tổng từ 50/100 và không có phần nào dưới 5/25.</p></div>
        <div class="lvtabs" role="tablist">${LV.map(k=>`<button type="button" role="tab" aria-selected="${k===lv}" data-ttlv="${k}">${k}</button>`).join("")}</div></header>
      ${cur&&!(cur.res&&cur.res.saved)?`<div class="ttresume"><div><b>Bài thi thử ${esc(cur.lv)} đang làm dở</b><span>Đang ở phần ${cur.step===0?"giới thiệu":esc(SECS[Math.min(3,cur.step-1)][2])}, bắt đầu lúc ${new Date(cur.started).toLocaleString("vi-VN",{hour:"2-digit",minute:"2-digit",day:"numeric",month:"numeric"})}</span></div><div class="cdbtns"><button type="button" class="gbtn" data-ttresume="1">Làm tiếp</button><button type="button" class="ghostbtn" data-ttdrop="1">Bỏ bài này</button></div></div>`:""}
      <table class="tttable"><thead><tr><th>Phần thi</th><th>Thời gian</th><th>Điểm</th><th>Trong app</th></tr></thead><tbody>
        <tr><td><b>Nghe hiểu</b><br><small lang="fr">Compréhension de l'oral</small></td><td>khoảng ${CO_MIN[lv]} phút</td><td>/25</td><td>Làm trên đề nghe thật (đề mẫu chính thức hoặc TV5Monde) rồi nhập kết quả, vì trong Claude không phát được âm thanh thật</td></tr>
        <tr><td><b>Đọc hiểu</b><br><small lang="fr">Compréhension des écrits</small></td><td>${ceMin} phút</td><td>/25</td><td>App tự chấm</td></tr>
        <tr><td><b>Viết</b><br><small lang="fr">Production écrite</small></td><td>${peMin} phút</td><td>/25</td><td>${lv==="A2"?"2 bài · ":""}Claude chấm theo barème</td></tr>
        <tr><td><b>Nói</b><br><small lang="fr">Production orale</small></td><td>${PO_INFO[lv]}</td><td>/25</td><td>Nói vào mic, Claude chấm từ bản chép lời</td></tr>
      </tbody></table>
      ${canAI()?"":`<p class="badc">Bạn đang mở bản tự host: phần Viết và Nói không có Claude chấm, bạn sẽ tự ước lượng điểm.</p>`}
      <div class="cdbtns"><button type="button" class="gbtn" data-ttstart="1">Bắt đầu thi thử ${lv}</button><span class="sub2">Mất khoảng ${lv==="A2"?"2":lv==="B1"?"2,5":"3"} giờ nếu làm liền. Có thể dừng giữa chừng: bài đang làm được lưu lại.</span></div>
      <section class="slsec"><h2>Lịch sử thi thử ${lv}</h2>${hist.length?`<ul class="tthist">${hist.map(m=>`<li><span class="ttdate">${new Date(m.ts).toLocaleDateString("vi-VN")}</span><b class="${m.pass?"ok":m.pass===false?"bad":""}">${nf(m.total)}/${m.max}</b>${m.max<100?` <small>(ước lượng ${m.proj}/100)</small>`:""} <span class="ttsc">${SECS.map(([k,,vn])=>`${vn} ${nf(m.sc[k])}`).join(" · ")}</span>${m.pass?`<span class="ttok">Đạt</span>`:m.pass===false?`<span class="ttko">Chưa đạt</span>`:""}</li>`).join("")}</ul>`:`<p class="sub">Chưa có lần thi thử nào ở cấp ${lv}.</p>`}</section>
    </div>`;
  }
  const bar=()=>`<div class="ttbar"><button type="button" class="ghostbtn" data-tthome="1">← Thoát (bài được lưu)</button><ol class="ttsteps">${SECS.map(([k,,vn],i)=>`<li class="${M.step===i+1?"on":M.step>i+1?"done":""}">${vn}</li>`).join("")}<li class="${M.step===5?"on":""}">Kết quả</li></ol><span id="ttTimer" class="tttimer"></span></div>`;
  function introHTML(){
    return `<div class="ttpage">${bar()}<div class="ttcard"><h2>Examen blanc DELF ${M.lv}</h2>
      <p>Bài thi gồm 4 phần theo thứ tự như thi thật. Phần Đọc và Viết có đồng hồ đếm ngược, hết giờ thì tự chuyển. Hãy làm ở nơi yên tĩnh, không tra từ điển, không xem lại bài giảng.</p>
      <ul><li>Nghe hiểu: làm trên đề nghe thật rồi nhập kết quả.</li><li>Đọc hiểu: ${M.ce.exs.length} bài, ${M.ce.min} phút.</li><li>Viết: ${M.pe.tasks.length} bài, ${M.pe.min} phút.</li><li>Nói: ${M.po.parts.length} phần, nói vào mic.</li></ul>
      <button type="button" class="gbtn" data-ttnext="1">Bắt đầu phần Nghe hiểu</button></div></div>`;
  }
  function coHTML(){
    return `<div class="ttpage">${bar()}<div class="ttcard"><h2>Nghe hiểu <small lang="fr">Compréhension de l'oral</small></h2>
      <p>Trong khung Claude app không phát được âm thanh thật, nên phần này bạn làm trên đề có giọng người thật, đúng cấp ${M.lv}:</p>
      <ul class="ttlinks"><li><a href="${FEI[M.lv]}" target="_blank" rel="noopener">Đề mẫu chính thức DELF ${M.lv} của France Éducation international</a>: làm phần Compréhension de l'oral, nghe mỗi bài 2 lần, rồi đối chiếu với đáp án (corrigé) đi kèm. Đây là cách sát thi thật nhất.</li>
        <li><a href="${TV5[M.lv]}" target="_blank" rel="noopener">Bài nghe TV5Monde cấp ${M.lv}</a>: làm vài bài và cộng số câu đúng.</li></ul>
      <div class="ttco"><label>Số câu đúng <input type="number" min="0" id="ttCoC" value="${esc(M.co.c)}"></label><label>Tổng số câu <input type="number" min="1" id="ttCoT" value="${esc(M.co.t)}"></label>
        <span class="ttco25">${coScore()!=null?`= <b>${nf(coScore())}/25</b>`:""}</span></div>
      <div class="cdbtns"><button type="button" class="gbtn" data-ttco="1">Lưu và sang phần Đọc hiểu</button><button type="button" class="ghostbtn" data-ttcoskip="1">Bỏ qua phần nghe</button></div>
      <p class="sub2">Nếu bỏ qua, kết quả cuối tính trên 75 điểm và app quy đổi ước lượng ra /100.</p></div></div>`;
  }
  function ceHTML(){
    const started=!!M.ce.start;
    if(!started)return `<div class="ttpage">${bar()}<div class="ttcard"><h2>Đọc hiểu <small lang="fr">Compréhension des écrits</small></h2><p>${M.ce.exs.length} bài đọc, trắc nghiệm 3 lựa chọn, ${M.ce.min} phút. Đồng hồ chạy ngay khi bạn bấm bắt đầu.</p><button type="button" class="gbtn" data-ttcego="1">Bắt đầu tính giờ</button></div></div>`;
    const n=M.ce.exs.reduce((a,e)=>a+e.qs.length,0),done=Object.keys(M.ce.ans).length;
    return `<div class="ttpage">${bar()}<p class="sub2">Đã trả lời ${done}/${n} câu.</p>
      ${M.ce.exs.map((e,i)=>`<section class="ttex"><h3>Exercice ${i+1} · <span lang="fr">${esc(e.title)}</span></h3><div class="ttdoc" lang="fr">${e.doc.split(/\n+/).map(p=>`<p>${esc(p)}</p>`).join("")}${e.src?`<p class="src">${e.src}</p>`:""}</div>
        <ol class="ttqs">${e.qs.map((q,j)=>`<li><p lang="fr">${esc(q.s)}</p>${q.o.map((o,k)=>`<label class="ttopt"><input type="radio" name="tt-${i}-${j}" data-ttans="${i}-${j}" value="${k}" ${String(M.ce.ans[i+"-"+j])===String(k)?"checked":""}> <span lang="fr">${esc(o)}</span></label>`).join("")}</li>`).join("")}</ol></section>`).join("")}
      <div class="cdbtns"><button type="button" class="gbtn" data-ttcedone="1">Nộp phần Đọc hiểu</button>${done<n?`<span class="sub2">Còn ${n-done} câu chưa trả lời.</span>`:""}</div></div>`;
  }
  function peHTML(){
    if(!M.pe.start)return `<div class="ttpage">${bar()}<div class="ttcard"><h2>Viết <small lang="fr">Production écrite</small></h2><p>${M.pe.tasks.length} bài, ${M.pe.min} phút. Viết trực tiếp vào ô, có đếm số từ. Không tra từ điển.</p><button type="button" class="gbtn" data-ttpego="1">Bắt đầu tính giờ</button></div></div>`;
    return `<div class="ttpage">${bar()}${M.pe.timeUp?`<p class="badc">Hết giờ. Bài viết đã khoá, bấm nộp để sang phần Nói.</p>`:""}
      ${M.pe.tasks.map((t,i)=>`<section class="ttex"><h3>${M.pe.tasks.length>1?`Exercice ${i+1}`:"Sujet"}</h3><p class="ttprompt" lang="fr">${esc(t.p)}</p>${t.req.length?`<ul class="ttreq">${t.req.map(r=>`<li lang="fr">${esc(r)}</li>`).join("")}</ul>`:""}
        <textarea class="wtext" data-ttpe="${i}" lang="fr" spellcheck="false" ${M.pe.timeUp?"readonly":""} placeholder="Écrivez ici… (${t.min} mots minimum)">${esc(M.pe.texts[i])}</textarea><p class="wcount" id="ttwc${i}">${wc(M.pe.texts[i])} mots · cần ${t.min}–${t.max}</p></section>`).join("")}
      <div class="cdbtns"><button type="button" class="gbtn" data-ttpedone="1">Nộp phần Viết</button></div></div>`;
  }
  function poHTML(){
    const P=M.po,p=P.parts[P.i];
    const groupPrep=P.parts.some(x=>x.prepGroup);
    if(p.prepGroup&&!P.prepDone){
      const grp=P.parts.filter(x=>x.prepGroup);
      return `<div class="ttpage">${bar()}<div class="ttcard"><h2>Nói · chuẩn bị</h2><p>Bạn có ${M.lv==="B2"?"30":"10"} phút chuẩn bị cho ${grp.length>1?"các phần sau":"phần sau"}. Được ghi chú ra giấy, nhưng khi nói không đọc nguyên văn.</p>
        ${grp.map(x=>`<div class="ttpart"><b lang="fr">${esc(x.t)}</b> <small>${esc(x.vn)}</small>${x.docTitle?`<h4 lang="fr">${esc(x.docTitle)}</h4><div class="ttdoc" lang="fr"><p>${esc(x.doc)}</p></div>`:""}<p class="ttprompt" lang="fr">${esc(x.prompt)}</p></div>`).join("")}
        <div class="cdbtns">${P.prep?"":`<button type="button" class="gbtn" data-ttprep="1">Bắt đầu chuẩn bị</button>`}<button type="button" class="ghostbtn" data-ttprepend="1">${P.prep?"Xong, bắt đầu nói":"Bỏ qua chuẩn bị"}</button></div></div></div>`;
    }
    const tr=P.tr[p.k]||"";
    const q=p.dyn?(p.questions||null):null;
    return `<div class="ttpage">${bar()}<div class="ttcard"><p class="sub2">Phần ${P.i+1}/${P.parts.length} · thời lượng ${esc(p.talk)}</p><h2 lang="fr">${esc(p.t)}</h2><p class="sub">${esc(p.vn)}</p>
      ${p.dyn?(q?`<ol class="ttqs2">${q.map(x=>`<li lang="fr">${esc(x)}</li>`).join("")}</ol><p class="sub2">Trả lời lần lượt từng câu hỏi như đang tranh luận với giám khảo.</p>`:`<p>${busy?"Giám khảo đang đặt câu hỏi…":"Đang chuẩn bị câu hỏi phản biện."}</p>`)
        :`<p class="ttprompt" lang="fr">${esc(p.prompt)}</p>`}
      <div class="prow"><button type="button" class="gbtn pbig ${Speech.active()?"live":""}" data-ttmic="1" ${Speech.mode()==="none"||(p.dyn&&!q)?"disabled":""}>${Speech.active()?"■ Dừng":"🎙 "+(tr?"Nói tiếp":"Bắt đầu nói")}</button></div>
      ${Speech.mode()==="none"?`<p class="badc">${esc(Speech.errText("unsupported"))} Bạn có thể gõ lại những gì định nói vào ô dưới.</p>`:""}
      ${live?`<p class="plive">Đang nghe: <span lang="fr">${esc(live)}</span></p>`:""}
      <h4>Bản chép lời <small>(máy nhận dạng; chỉ sửa khi máy nghe sai rõ ràng)</small></h4>
      <textarea class="wtext sm" data-tttr="${esc(p.k)}" lang="fr" spellcheck="false">${esc(tr)}</textarea><p class="wcount">${wc(tr)} mots</p>
      <div class="cdbtns"><button type="button" class="gbtn" data-ttponext="1" ${Speech.active()?"disabled":""}>${P.i+1<P.parts.length?"Sang phần tiếp theo":"Nộp phần Nói và xem kết quả"}</button></div></div></div>`;
  }
  function resHTML(){
    const sm=summary(),r=M.res||{};
    const row=(k,lab,vn,extra)=>{const v=sm.sc[k];return `<div class="ttrow"><div class="ttrl"><b>${vn}</b> <small lang="fr">${lab}</small></div><div class="ttrbar"><i style="width:${v==null?0:v*4}%" class="${v!=null&&v<5?"bad":v!=null&&v>=12.5?"ok":""}"></i></div><div class="ttrv">${v==null?"—":nf(v)+"/25"}</div>${extra||""}</div>`;};
    const crit=x=>x&&x.tieu_chi&&x.tieu_chi.length?`<ul class="ttcrit">${x.tieu_chi.map(c=>`<li>${esc(c.ten)}: <b>${esc(c.diem)}</b>/${esc(c.toi_da)}</li>`).join("")}</ul>`:"";
    const self=(k)=>`<label class="ttself">Tự ước lượng điểm <input type="number" min="0" max="25" step="0.5" data-ttself="${k}"> /25</label>`;
    const waiting=sm.sc.pe==null||sm.sc.po==null;
    const gap=sm.max===100?Math.max(0,50-sm.total):null;
    const weakest=Object.entries(sm.sc).filter(([,v])=>v!=null).sort((a,b)=>a[1]-b[1])[0];
    return `<div class="ttpage">${bar()}
      <div class="ttcard ttsum ${sm.pass?"pass":sm.pass===false?"fail":""}">
        <h2>Kết quả thi thử DELF ${M.lv}</h2>
        <p class="tttotal"><b>${nf(sm.total)}</b>/${sm.max}${sm.max<100&&sm.max?` <small>· quy đổi ước lượng ${sm.proj}/100 (không có ${100-sm.max} điểm phần ${sm.sc.co==null?"nghe":"còn thiếu"})</small>`:""}</p>
        ${waiting?`<p>${busy?"Claude đang chấm phần Viết và Nói…":r.err?esc(r.err):canAI()?"Đang chờ chấm phần Viết và Nói.":"Hãy tự ước lượng điểm phần Viết và Nói bên dưới."}</p>${!busy&&canAI()?`<button type="button" class="gbtn" data-ttgrade="1">${r.err?"Chấm lại":"Nhờ Claude chấm"}</button>`:""}`
          :sm.pass!=null?`<p class="ttverdict">${sm.pass?(sm.total>50?`Đạt: vượt mức đỗ ${nf(half(sm.total-50))} điểm.`:`Đạt, nhưng vừa đúng mức đỗ 50/100: chỉ cần sai thêm một chút là trượt.`):sm.elim.length?`Chưa đạt: có phần dưới 5/25 (điểm liệt): ${sm.elim.map(k=>SECS.find(s=>s[0]===k)[2]).join(", ")}.${gap?` Tổng còn thiếu ${gap} điểm so với mức đỗ 50/100.`:""}`:`Chưa đạt: còn thiếu ${gap} điểm so với mức đỗ 50/100.`}</p>`
          :`<p class="ttverdict">Ước lượng ${sm.proj}/100: ${sm.proj>=50?"có khả năng đạt":`còn thiếu khoảng ${50-sm.proj} điểm`} nếu phần nghe ở mức tương đương. Làm thêm phần nghe trên đề thật để có kết quả đầy đủ.</p>`}
      </div>
      <div class="ttcard">
        ${row("co","Compréhension de l'oral","Nghe hiểu")}
        ${row("ce","Compréhension des écrits","Đọc hiểu",`<p class="ttnote">${ceScore().ok}/${ceScore().n} câu đúng</p>`)}
        ${row("pe","Production écrite","Viết",sm.sc.pe==null&&!canAI()?self("pe"):"")}
        ${r.pe?`<div class="ttfb">${r.pe.muc?`<p><b>Mức:</b> ${esc(r.pe.muc)}</p>`:""}${crit(r.pe)}<p>${esc(r.pe.nhan_xet)}</p>${r.pe.nloi?`<p class="sub2">Đã lưu ${r.pe.nloi} lỗi vào <a href="#soloi">Carnet d'erreurs</a>.</p>`:""}</div>`:""}
        ${row("po","Production orale","Nói",sm.sc.po==null&&!canAI()?self("po"):"")}
        ${r.po?`<div class="ttfb">${r.po.muc?`<p><b>Mức:</b> ${esc(r.po.muc)}</p>`:""}${crit(r.po)}<p>${esc(r.po.nhan_xet)}</p>${r.po.nloi?`<p class="sub2">Đã lưu ${r.po.nloi} lỗi vào <a href="#soloi">Carnet d'erreurs</a>.</p>`:""}</div>`:""}
      </div>
      ${!waiting&&weakest?`<div class="ttcard"><h3>Nên ưu tiên</h3><p>Phần yếu nhất lần này là <b>${SECS.find(s=>s[0]===weakest[0])[2]}</b> (${nf(weakest[1])}/25). ${weakest[0]==="ce"?"Luyện thêm đề đọc trong Exercices (dạng DELF) và học từ vựng theo chủ đề ở Vocabulaire.":weakest[0]==="pe"?"Xem lại các lỗi trong Carnet d'erreurs, luyện viết thêm trong Exercices và học bộ thẻ Từ nối.":weakest[0]==="po"?"Luyện nói tự do và đọc đoạn văn trong Parler, mỗi ngày vài phút.":"Luyện nghe ở mục Écoute đúng cấp, nghe mỗi bài 2 lần như thi thật."}</p></div>`:""}
      <div class="cdbtns"><button type="button" class="ghostbtn" data-ttnew="1">Về trang Examen blanc</button></div></div>`;
  }
  function render(){
    const root=$("thithuRoot");if(!root)return;
    if(!M)root.innerHTML=homeHTML();
    else root.innerHTML=[introHTML,coHTML,ceHTML,peHTML,poHTML,resHTML][M.step]();
    tick();
    if(M&&M.step===4){const p=M.po.parts[M.po.i];if(p&&p.dyn&&!p.questions&&!busy&&(M.po.prepDone||!p.prepGroup))askQuestions(p);}
  }
  async function askQuestions(p){
    const ex=M.po.tr.expose||"";const doc=M.po.parts[0];
    const fallback=["Pourriez-vous préciser votre position avec un exemple concret ?","Que répondriez-vous à quelqu'un qui pense exactement le contraire ?","Selon vous, quelle solution serait réaliste dans votre pays ?"];
    if(!canAI()){p.questions=fallback;save();render();return;}
    busy=true;render();
    try{const r=await sample.json(`Bạn là giám khảo DELF B2, phần débat sau exposé. Tài liệu: « ${doc.docTitle} ». Vấn đề: ${doc.prompt}\nBản chép lời exposé của thí sinh:\n"""\n${ex.slice(0,3000)||"(thí sinh nói rất ít)"}\n"""\nĐặt 3 câu hỏi phản biện bằng tiếng Pháp, ngắn, đi vào lập luận của thí sinh (thách thức, yêu cầu ví dụ, đưa quan điểm trái ngược). Trả về CHỈ JSON: {"questions":["…","…","…"]}`,{cache:false});
      p.questions=(r&&Array.isArray(r.questions)&&r.questions.length?r.questions:fallback).slice(0,3).map(String);}
    catch(e){p.questions=fallback;}
    busy=false;save();render();
  }

  /* ----- events ----- */
  function startMic(){
    const p=M.po.parts[M.po.i];
    if(Speech.active()){Speech.stop();return;}
    live="";
    Speech.start({continuous:true,
      onPartial:t=>{live=t;const el=document.querySelector("#thithuRoot .plive span");if(el)el.textContent=t;else render();},
      onEnd:({text})=>{live="";if(text){M.po.tr[p.k]=((M.po.tr[p.k]||"")+" "+text).trim();save();}render();},
      onError:c=>{live="";alertMsg(Speech.errText(c));}});
    render();
  }
  function alertMsg(m){render();const c=document.querySelector("#thithuRoot .ttcard");if(c){const p=document.createElement("p");p.className="badc";p.textContent=m;c.prepend(p);}}
  document.addEventListener("click",e=>{
    const r=$("thithuRoot");if(!r||!r.contains(e.target))return;
    const b=e.target.closest("button");if(!b)return;const d=b.dataset;
    if(d.ttlv){lv=d.ttlv;render();}
    else if(d.ttstart){const cur=load();if(cur&&!(cur.res&&cur.res.saved)&&!b.dataset.armed){b.dataset.armed="1";b.textContent="Bài dở sẽ bị thay thế: bấm lần nữa";return;}M=build(lv);save();render();}
    else if(d.ttresume){M=load();if(M)lv=M.lv;render();}
    else if(d.ttdrop){if(!b.dataset.armed){b.dataset.armed="1";b.textContent="Bấm lần nữa để bỏ";return;}M=null;save();render();}
    else if(d.tthome||d.ttnew){if(Speech.active())Speech.stop();if(M&&M.res&&M.res.saved){M=null;save();}else M=null;clearInterval(timerIv);render();}
    else if(d.ttnext){M.step=1;save();render();}
    else if(d.ttco){const c=$("ttCoC").value,t=$("ttCoT").value;M.co.c=c;M.co.t=t;if(coScore()==null){alertMsg("Nhập số câu đúng và tổng số câu (số câu đúng không lớn hơn tổng).");return;}M.co.done=true;M.step=2;save();render();scrollTo(0,0);}
    else if(d.ttcoskip){M.co.skip=true;M.co.done=true;M.step=2;save();render();scrollTo(0,0);}
    else if(d.ttcego){M.ce.start=Date.now();save();render();}
    else if(d.ttcedone){if(!b.dataset.armed&&Object.keys(M.ce.ans).length<M.ce.exs.reduce((a,x)=>a+x.qs.length,0)){b.dataset.armed="1";b.textContent="Còn câu bỏ trống: bấm lần nữa để nộp";return;}M.ce.done=true;M.step=3;save();render();scrollTo(0,0);}
    else if(d.ttpego){M.pe.start=Date.now();save();render();}
    else if(d.ttpedone){const short=M.pe.tasks.some((t,i)=>wc(M.pe.texts[i])<t.min);if(short&&!M.pe.timeUp&&!b.dataset.armed){b.dataset.armed="1";b.textContent="Có bài chưa đủ số từ: bấm lần nữa để nộp";return;}M.pe.done=true;M.step=4;save();render();scrollTo(0,0);}
    else if(d.ttprep){M.po.prep=Date.now();save();render();}
    else if(d.ttprepend){M.po.prepDone=true;save();render();}
    else if(d.ttmic)startMic();
    else if(d.ttponext){if(M.po.i+1<M.po.parts.length){M.po.i++;save();render();scrollTo(0,0);}else{M.po.done=true;M.step=5;M.res=M.res||{};save();render();scrollTo(0,0);if(canAI())runGrading();}}
    else if(d.ttgrade)runGrading();
  });
  document.addEventListener("change",e=>{
    const r=$("thithuRoot");if(!r||!r.contains(e.target)||!M)return;
    const t=e.target;
    if(t.dataset.ttans){M.ce.ans[t.dataset.ttans]=+t.value;save();const s=document.querySelector("#thithuRoot .sub2");if(s)s.textContent=`Đã trả lời ${Object.keys(M.ce.ans).length}/${M.ce.exs.reduce((a,x)=>a+x.qs.length,0)} câu.`;}
    else if(t.dataset.ttself){M.res=M.res||{};const v=half(Math.max(0,Math.min(25,+t.value||0)));M.res[t.dataset.ttself]={diem:v,muc:"tự ước lượng",tieu_chi:[],nhan_xet:"",nloi:0};save();finalize();render();}
    else if(t.id==="ttCoC"||t.id==="ttCoT"){M.co.c=$("ttCoC").value;M.co.t=$("ttCoT").value;const el=document.querySelector(".ttco25");if(el)el.innerHTML=coScore()!=null?`= <b>${nf(coScore())}/25</b>`:"";}
  });
  document.addEventListener("input",e=>{
    const r=$("thithuRoot");if(!r||!r.contains(e.target)||!M)return;
    const t=e.target;
    if(t.dataset.ttpe!=null){const i=+t.dataset.ttpe;M.pe.texts[i]=t.value;const tk=M.pe.tasks[i];const el=$("ttwc"+i);if(el){const n=wc(t.value);el.textContent=`${n} mots · cần ${tk.min}–${tk.max}`;el.className="wcount"+(n&&n<tk.min?" low":n>tk.max*1.1?" high":"");}save();}
    else if(t.dataset.tttr){M.po.tr[t.dataset.tttr]=t.value;save();}
  });
  function card(){
    const h=Store.mocks?Store.mocks():[];const last=h[h.length-1];
    return `<a class="acard" href="#thithu"><span class="ah">Examen blanc DELF</span><span class="as">${last?`Lần gần nhất (${esc(last.lv)}): ${nf(last.total)}/${last.max}${last.pass?" · Đạt":last.pass===false?" · Chưa đạt":""}`:"Làm đủ 4 phần thi, chấm /100"}</span></a>`;
  }
  return {render,card,_build:build,_get:()=>M,_set:m=>{M=m;}};
})();
