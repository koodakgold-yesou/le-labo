/* ---------- Parler: read-aloud scoring and free speaking ----------
   Read-aloud: a model sentence from the exam texts and lessons; speech-to-text hears the learner; words are aligned
   with the model, misheard words are flagged with a likely cause. Free speaking: transcript + Claude feedback. */
const Parler=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const LVL={A2:[4,14],B1:[8,24],B2:[12,35]};
  const PLV={A2:[18,40],B1:[30,60],B2:[45,90]};
  let tab="lire", lv=(()=>{try{return localStorage.getItem("fr-parler-lv")||"A2";}catch(e){return "A2";}})(), src="all", len=(()=>{try{return localStorage.getItem("fr-parler-len")||"s";}catch(e){return "s";}})();
  let cur=null, res=null, live="", recUrl=null, busy=false, aiBox="", gen=[], err="";
  let free={part:null,prompt:null,text:"",live:"",timer:0,tid:null,turns:[],fb:"",busy:false};

  /* ----- sentence bank ----- */
  const splitS=t=>String(t).replace(/\n+/g," ").split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Ý«"])/).map(x=>x.replace(/^[^«]*?:\s*«\s*/,"").replace(/^«\s*|\s*»$/g,"").trim()).filter(Boolean);
  const words=t=>tok(t).length;
  const BANK=(()=>{
    const out=[],seen=new Set();
    const add=(fr,lvv,from,vn)=>{fr=String(fr).trim();if(!fr||/\d/.test(fr)||/[_()\[\]→=]/.test(fr)||seen.has(fr))return;const n=words(fr);const [a,b]=LVL[lvv]||LVL.B1;if(n<a||n>b)return;seen.add(fr);out.push({fr,lv:lvv,from,vn:vn||""});};
    ROADMAP.forEach(ch=>{const L=LESSONS[ch.id];if(L&&L.x)L.x.forEach(([fr,vn])=>add(fr,ch.lv,"lesson",vn));});
    Object.values(typeof LESSON_PLUS!=="undefined"?LESSON_PLUS:{}).flat().forEach(b=>(b.x||[]).forEach(([fr,vn])=>add(fr,"B2","lesson",vn)));
    if(typeof MOTS!=="undefined")MOTS.forEach(m=>m.ex.forEach(([fr,vn])=>add(fr,"A2","lesson",vn)));
    ["A2","B1"].forEach(L=>DELF_SETS[L].exercises.forEach(e=>splitS(e.doc).forEach(s=>add(s,L,"exam"))));
    READ.forEach(r=>{if(r.lv!=="A1")splitS(r.text).forEach(s=>add(s,r.lv,"exam"));});
    if(typeof DELF_B2_POOL!=="undefined")DELF_B2_POOL.filter(e=>!e.src).forEach(e=>splitS(e.doc).forEach(s=>add(s,"B2","exam")));
    if(typeof B2_ORAL!=="undefined")B2_ORAL.forEach(o=>splitS(o.doc).forEach(s=>add(s,"B2","exam")));
    /* passages: consecutive sentences of one exam text, grouped to the level's length */
    const pass=(doc,lvv)=>{const [a,b]=PLV[lvv];const ss=splitS(doc).filter(x=>!/\d/.test(x)&&!/[_()\[\]→=]/.test(x));let buf=[],n=0;
      const flush=()=>{if(n>=a&&n<=b){const fr=buf.join(" ");if(!seen.has(fr)){seen.add(fr);out.push({fr,lv:lvv,from:"exam",kind:"p"});}}buf=[];n=0;};
      ss.forEach(x=>{const k=words(x);if(k>b){flush();return;}if(n+k>b)flush();buf.push(x);n+=k;if(n>=a+Math.round((b-a)/3))flush();});flush();};
    ["A2","B1"].forEach(L=>DELF_SETS[L].exercises.forEach(e=>pass(e.doc,L)));
    if(typeof A2_POOL!=="undefined")A2_POOL.forEach(e=>pass(e.doc,"A2"));
    if(typeof B1_OPEN!=="undefined")B1_OPEN.forEach(e=>pass(e.doc,"B1"));
    READ.forEach(r=>{if(r.lv==="A2"||r.lv==="B1"||r.lv==="B2")pass(r.text,r.lv);});
    if(typeof DELF_B2_POOL!=="undefined")DELF_B2_POOL.filter(e=>!e.src).forEach(e=>pass(e.doc,"B2"));
    if(typeof B2_ORAL!=="undefined")B2_ORAL.forEach(o=>pass(o.doc,"B2"));
    return out;
  })();
  const pool=()=>[...BANK,...gen].filter(x=>x.lv===lv&&(len==="p"?x.kind==="p":x.kind!=="p")&&(len==="p"||src==="all"||x.from===src));
  function next(){const p=pool();if(!p.length){cur=null;return;}let n;do{n=p[Math.floor(Math.random()*p.length)];}while(p.length>1&&n===cur);cur=n;res=null;live="";aiBox="";err="";if(recUrl){URL.revokeObjectURL(recUrl);recUrl=null;}}

  /* ----- alignment and scoring ----- */
  function tok(t){return String(t||"").toLowerCase().normalize("NFC").replace(/[’`]/g,"'").replace(/([a-zà-ÿœ])'(?=[a-zà-ÿœh])/g,"$1' ").replace(/[^a-zà-ÿœæç' -]/g," ").replace(/-/g," ").split(/\s+/).filter(Boolean);}
  function align(a,b){ /* LCS on tokens */
    const n=a.length,m=b.length,D=Array.from({length:n+1},()=>new Array(m+1).fill(0));
    for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)D[i][j]=a[i]===b[j]?D[i+1][j+1]+1:Math.max(D[i+1][j],D[i][j+1]);
    const out=[];let i=0,j=0,pend=[];
    while(i<n){
      if(j<m&&a[i]===b[j]){out.push({w:a[i],ok:true});i++;j++;}
      else if(j<m&&D[i][j+1]>=D[i+1][j]&&D[i][j+1]>D[i+1][j+1]){j++;}   /* extra word heard */
      else{const heard=j<m&&D[i+1][j+1]===D[i][j]?b[j]:"";out.push({w:a[i],ok:false,heard});if(heard)j++;i++;}
    }
    return out;
  }
  const PAIRW={};PHON_PAIRS.forEach(([a,b,ws,tip])=>ws.forEach(([x,y])=>{PAIRW[x]={o:y,tip};PAIRW[y]={o:x,tip};}));
  function cause(w,h){
    if(!h)return "Máy không nghe ra từ này: đọc rõ hơn, đừng nuốt âm; chú ý nối âm với từ bên cạnh.";
    if(PAIRW[w]&&PAIRW[w].o===h)return PAIRW[w].tip;
    const has=(s,re)=>re.test(s);
    if(has(w,/(^|[^oae])u/)&&has(h,/ou/))return "/y/ bị đọc thành /u/: giữ lưỡi như « i » và chu tròn môi.";
    if(has(w,/ou/)&&has(h,/(^|[^oae])u(?!n)/))return "/u/ bị đọc thành /y/: « ou » đọc như « u » tiếng Việt.";
    if(has(w,/(an|en|am|em)/)&&has(h,/(on|om)/))return "/ɑ̃/ bị đọc thành /ɔ̃/: mở miệng hơn, không tròn môi.";
    if(has(w,/(on|om)/)&&has(h,/(an|en)/))return "/ɔ̃/ bị đọc thành /ɑ̃/: tròn môi, lưỡi lùi sau.";
    if(has(w,/(in|ain|ein|un)/)&&has(h,/(an|en)/))return "/ɛ̃/ bị đọc thành /ɑ̃/: miệng dẹt hơn.";
    if(has(w,/(é|er$|ez$)/)&&has(h,/(ait|ais|è)/))return "/e/ bị đọc thành /ɛ/: khép miệng hơn, như « ê ».";
    if(["le","de","ce","je","me","te","se","ne"].includes(w)&&h===w+"s")return "/ə/ bị đọc thành /e/: « le, de, je » đọc « ơ » nhẹ, khác « les, des ».";
    if(has(w,/ch/)&&has(h,/[jg]/))return "/ʃ/ bị đọc thành /ʒ/: « ch » không rung dây thanh.";
    if(has(w,/r/)&&!has(h,/r/))return "Âm /ʁ/ bị mất: đọc « r » xát ở cuống họng, đừng bỏ.";
    if(w.length>3&&h.length>3&&w.slice(0,3)===h.slice(0,3))return "Phần cuối từ chưa chuẩn: chú ý đuôi từ (âm câm hay âm được đọc).";
    return "Máy nghe nhầm sang từ khác: nghe lại mẫu ở Forvo, đọc chậm và rõ từng âm.";
  }
  function grade(target,heard,conf){
    const al=align(tok(target),tok(heard));
    const ok=al.filter(x=>x.ok).length,n=al.length||1;
    let score=Math.round(100*ok/n);
    if(conf>0&&score>0)score=Math.round(score*(0.85+0.15*Math.min(1,conf)));
    return {al,score,ok,n,heard};
  }
  const forvo=w=>"https://forvo.com/word/"+encodeURIComponent(w.replace(/'$/,""))+"/#fr";

  /* ----- views ----- */
  function lireHTML(){
    if(!cur)next();
    if(!cur)return `<p class="sub">Chưa có câu cho lựa chọn này.</p>`;
    const mode=Speech.mode();
    const words=res?res.al.map(x=>x.ok?`<span class="pk ok">${esc(x.w)}</span>`:`<span class="pk bad" title="${esc(cause(x.w,x.heard))}">${esc(x.w)}${x.heard?`<small>${esc(x.heard)}</small>`:"<small>—</small>"}</span>`).join(" "):"";
    const errs=res?res.al.filter(x=>!x.ok):[];
    return `<div class="pcard">
      <div class="pmeta"><span class="ectag">${cur.from==="exam"?"Đề thi":cur.from==="gen"?"Claude soạn":"Bài giảng"}</span><span class="ectag">${lv}</span><span class="ectag">${tok(cur.fr).length} từ</span></div>
      <p class="psent${cur.kind==="p"?" ppass":""}" lang="fr">${esc(cur.fr)}</p>${cur.kind==="p"&&!res?`<p class="sub2">Đọc liền mạch cả đoạn, chú ý ngắt nghỉ ở dấu phẩy và dấu chấm. Đọc xong bấm « ■ Dừng » để máy chấm.</p>`:""}${cur.vn?`<p class="sub">${esc(cur.vn)}</p>`:""}
      <div class="prow">
        <button type="button" class="gbtn pbig ${Speech.active()?"live":""}" data-pmic="1" ${mode==="none"?"disabled":""}>${Speech.active()?"■ Dừng":(cur.kind==="p"?"🎙 Đọc đoạn này":"🎙 Đọc câu này")}</button>
        <button type="button" class="ghostbtn" data-pnext="1">Câu khác</button>
      </div>
      ${mode==="none"?`<p class="badc">${esc(Speech.errText("unsupported"))}</p>`:""}
      ${err?`<p class="badc">${esc(err)}</p>`:""}
      ${live?`<p class="plive">Máy đang nghe: <b lang="fr">${esc(live)}</b></p>`:""}
      ${res?`<div class="pres2">
        <div class="pscore ${res.score>=80?"good":res.score>=50?"mid":"bad"}">${res.score}<small>/100 · ${res.score>=90?"Rất tốt":res.score>=80?"Tốt":res.score>=60?"Khá":res.score>=40?"Cần luyện":"Chưa đạt"}</small></div>
        <p class="sub">${res.ok}/${res.n} từ được nhận đúng. Máy nghe được: « ${esc(res.heard||"…")} »</p>
        <div class="pwords2" lang="fr">${words}</div>
        ${errs.length?`<h4>Cần sửa</h4><ul class="pfixes">${errs.slice(0,cur.kind==="p"?10:6).map(x=>`<li><b lang="fr">${esc(x.w)}</b>${x.heard?` → máy nghe « ${esc(x.heard)} »`:""}: ${esc(cause(x.w,x.heard))} <a href="${forvo(x.w)}" target="_blank" rel="noopener">Nghe mẫu</a></li>`).join("")}</ul>`:`<p class="okc">Máy nhận đúng toàn bộ. Đọc lại nhanh hơn một chút cho tự nhiên.</p>`}
        ${recUrl?`<p class="sub">Giọng của bạn:</p><audio controls src="${recUrl}"></audio>`:""}
        ${typeof sample!=="undefined"&&sample?`<button type="button" class="ghostbtn sm" data-pai="1" ${busy?"disabled":""}>Nhờ Claude nhận xét kỹ hơn</button>`:""}
        ${aiBox?`<div class="explain">${esc(aiBox)}</div>`:""}
      </div>`:""}
    </div>
    <p class="sub pnote">Cách chấm: máy chuyển giọng bạn thành chữ rồi so từng từ với câu mẫu. Từ nào máy nghe sai là từ người Pháp dễ nghe nhầm. Đây là chấm gần đúng, không chấm từng âm như giáo viên.</p>`;
  }
  function freeHTML(){
    const sets=lv==="B2"?{b2:{t:"Présenter et défendre un point de vue",time:"khoảng 20 phút (độc thoại + tranh luận)",prep:1800,vn:"Từ một tài liệu ngắn, nêu vấn đề và bảo vệ quan điểm",items:B2_ORAL.map(o=>o.title+" — "+o.prob)}}:PARLER_FREE[lv];
    const canAI=typeof sample!=="undefined"&&!!sample;
    if(!free.part)return `<div class="pfparts">${Object.entries(sets).map(([k,p])=>`<button type="button" class="ecunit" data-fpart="${k}"><b lang="fr">${esc(p.t)}</b><span>${esc(p.vn)}</span><small>${esc(p.time)}${p.prep?` · chuẩn bị ${p.prep/60} phút`:" · không chuẩn bị"}</small></button>`).join("")}</div>
      <p class="sub">${canAI?"Claude nhận xét theo thang mô tả năng lực DELF và sửa lỗi.":"Bản tự host: có bản chép lời và bản ghi âm để tự nghe lại; nhận xét của Claude chỉ có khi mở trang trong Claude."}</p>`;
    const p=sets[free.part];
    const inter=free.part==="interaction";
    return `<div class="pcard">
      <div class="pmeta"><button type="button" class="ghostbtn sm" data-fback="1">← Chọn phần khác</button><span class="ectag">${lv} · ${esc(p.t)}</span><span class="ectag">${esc(p.time)}</span></div>
      ${free.prompt===null?`<p>Bốc thăm 2 đề, chọn 1 (giống phòng thi).</p><button type="button" class="gbtn" data-fdraw="1">Bốc thăm</button>${free.drawn?`<div class="pfdraw">${free.drawn.map(i=>`<button type="button" class="ecunit" data-fpick="${i}"><span lang="fr">${esc(p.items[i])}</span></button>`).join("")}</div>`:""}`
      :`<p class="psent small" lang="fr">${esc(p.items[free.prompt])}</p>
        ${p.prep?`<div class="prow"><button type="button" class="ghostbtn sm" data-fprep="1">${free.tid?"Dừng đồng hồ":"Bắt đầu chuẩn bị "+p.prep/60+" phút"}</button><span id="ftimer" class="ftimer">${free.timer?fmt(free.timer):""}</span></div>`:""}
        ${inter&&free.turns.length?`<div class="pturns">${free.turns.map(t=>`<p class="${t.r}"><b>${t.r==="me"?"Bạn":"Claude"}:</b> <span lang="fr">${esc(t.t)}</span></p>`).join("")}</div>`:""}
        <div class="prow"><button type="button" class="gbtn pbig ${Speech.active()?"live":""}" data-fmic="1" ${Speech.mode()==="none"?"disabled":""}>${Speech.active()?"■ Dừng":inter?"🎙 Nói lượt của bạn":"🎙 Bắt đầu nói"}</button>
          ${(free.text||free.turns.length)&&canAI?`<button type="button" class="ghostbtn" data-ffb="1" ${free.busy?"disabled":""}>${inter?"Kết thúc và nhận xét":"Nhờ Claude nhận xét"}</button>`:""}</div>
        ${free.live?`<p class="plive">Đang nghe: <span lang="fr">${esc(free.live)}</span></p>`:""}
        ${free.text&&!inter?`<h4>Bản chép lời</h4><p class="ptrans" lang="fr">${esc(free.text)}</p>`:""}
        ${recUrl&&tab==="libre"?`<audio controls src="${recUrl}"></audio>`:""}
        ${free.fb?`<div class="explain">${esc(free.fb)}</div>`:""}`}
    </div>`;
  }
  const fmt=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
  function histHTML(){
    const h=Store.speaks().filter(x=>x.lv===lv&&x.kind===(len==="p"?"readp":"read"));
    if(!h.length)return "";
    const last=h.slice(-10),avg=Math.round(last.reduce((n,x)=>n+x.score,0)/last.length);
    return `<section class="phist"><h3>Đọc ${len==="p"?"đoạn":"câu"} mẫu ${lv}: trung bình 10 lần gần nhất <b>${avg}/100</b> (${h.length} ${len==="p"?"đoạn":"câu"} đã đọc)</h3></section>`;
  }
  function render(){
    const root=$("parlerRoot");if(!root)return;
    root.innerHTML=`<div class="phpage">
      <header class="echead"><div><p class="motkick">Parler</p><h1>Luyện nói</h1>
        <p class="lablede">Đọc theo câu mẫu lấy từ đề thi và bài giảng, máy nghe và chấm từng từ; hoặc nói tự do theo đề thi nói DELF. ${ENV.claude?"Trong Claude: nhận dạng giọng nói và nhận xét của Claude (không nghe lại được giọng mình).":"Bản tự host: nhận dạng giọng nói của Chrome/Edge và nghe lại giọng mình."}</p></div>
        <div class="lvtabs" role="tablist">${["A2","B1","B2"].map(k=>`<button type="button" role="tab" aria-selected="${k===lv}" data-plv="${k}">${k}</button>`).join("")}</div></header>
      <div class="prow"><div class="lvtabs phtabs">${[["lire","Đọc theo câu mẫu"],["libre","Nói tự do"]].map(([k,l])=>`<button type="button" role="tab" aria-selected="${tab===k}" data-ptab="${k}">${l}</button>`).join("")}</div>
        ${tab==="lire"?`<div class="pptabs">${[["s","Câu"],["p","Đoạn văn"]].map(([k,l])=>`<button type="button" class="chip" data-plen="${k}" aria-pressed="${len===k}">${l}</button>`).join("")}<span class="ppsep"></span>${len==="p"?"":[["all","Tất cả"],["exam","Câu trong đề thi"],["lesson","Câu trong bài giảng"]].map(([k,l])=>`<button type="button" class="chip" data-psrc="${k}" aria-pressed="${src===k}">${l}</button>`).join("")}${typeof sample!=="undefined"&&sample?`<button type="button" class="chip" data-pgen="1">${busy?"Claude đang soạn…":len==="p"?"+ Claude soạn đoạn mới":"+ Claude soạn 5 câu mới"}</button>`:""}</div>`:""}</div>
      ${tab==="lire"?lireHTML()+histHTML():freeHTML()}
    </div>`;
  }

  /* ----- actions ----- */
  async function startRead(){
    if(Speech.active()){Speech.stop();return;}
    res=null;live="";aiBox="";err="";
    const target=cur.fr;
    Speech.start({continuous:cur.kind==="p",
      onStart:()=>{},
      onPartial:t=>{live=t;const el=document.querySelector(".plive b");if(el)el.textContent=t;else render();},
      onEnd:async({text,alts,conf})=>{
        let best=grade(target,text,conf);
        (alts||[]).forEach(a=>{const g=grade(target,a.t,a.c);if(g.score>best.score)best=g;});
        res=best;live="";
        if(Rec.active())recUrl=await Rec.stop();
        Store.addSpeak({kind:cur.kind==="p"?"readp":"read",lv,score:res.score,text:target.slice(0,120)});
        if(Store.addErrs&&res.score>0){const miss=res.al.filter(x=>!x.ok&&x.w&&x.w.length>1).slice(0,8).map(x=>({src:"read",cat:"phat_am",lv,sai:x.heard||"",dung:x.w,ctx:target.slice(0,90)}));if(miss.length)Store.addErrs(miss);}
        render();
      },
      onError:async c=>{live="";if(Rec.active())await Rec.stop();res=null;err=Speech.errText(c);render();}
    });
    if(Rec.can())Rec.start();
    render();
  }
  async function aiRead(){
    if(busy||!res)return;busy=true;aiBox="Claude đang xem kết quả…";render();
    const wrong=res.al.filter(x=>!x.ok).map(x=>`${x.w}${x.heard?" (máy nghe: "+x.heard+")":" (không nghe ra)"}`).join("; ");
    try{await sample(`Học viên người Việt (trình độ ${lv}, tiếng Anh B1–B2) đọc to câu mẫu tiếng Pháp. Bộ nhận dạng giọng nói tiếng Pháp nghe được câu khác với mẫu.
Câu mẫu: « ${cur.fr} »
Máy nghe được: « ${res.heard} »
Các từ lệch: ${wrong||"không có"}.
Dựa vào các chỗ lệch này, hãy đoán lỗi phát âm có khả năng nhất (người Việt hay gặp) và cách sửa khẩu hình cụ thể, bằng tiếng Việt, ngắn gọn (tối đa 120 từ), không dùng markdown đậm. Nêu cả liaison hoặc enchaînement cần chú ý trong câu này. Nói rõ đây là suy đoán từ kết quả nhận dạng, không phải nghe trực tiếp.`,{cache:false,onText:({text})=>{aiBox=text;const el=document.querySelector(".pres2 .explain");if(el)el.textContent=text;}});}
    catch(e){aiBox="Claude chưa trả lời được, thử lại sau.";}
    busy=false;render();
  }
  async function genSentences(){
    if(busy)return;busy=true;render();
    try{
      const raw=len==="p"?await sample.json(`Soạn 2 đoạn văn tiếng Pháp để luyện đọc to cho học viên trình độ ${lv}, văn phong như tài liệu trong đề DELF ${lv} (bài báo ngắn, thư, thông báo)${lv==="B2"?", chủ đề: "+Object.values(B2_THEMES).map(t=>t.fr).join(", "):""}. Mỗi đoạn ${PLV[lv][0]}–${PLV[lv][1]} từ, gồm vài câu nối với nhau tự nhiên, không chứa chữ số (viết số bằng chữ), có liaison và âm khó cho người Việt. Trả về CHỈ JSON: {"items":[{"fr":"...","vn":"tóm tắt nghĩa tiếng Việt một câu"}]}`,{cache:false}):await sample.json(`Soạn 5 câu tiếng Pháp để luyện đọc to cho học viên trình độ ${lv}, theo các chủ đề thường gặp trong đề DELF ${lv}${lv==="B2"?" ("+Object.values(B2_THEMES).map(t=>t.fr).join(", ")+")":""}. Mỗi câu ${LVL[lv][0]}–${LVL[lv][1]} từ, tự nhiên, không chứa chữ số (viết số bằng chữ), có ít nhất một âm khó cho người Việt (u/ou, âm mũi, r, liaison). Trả về CHỈ JSON: {"items":[{"fr":"...","vn":"nghĩa tiếng Việt"}]}`,{cache:false});
      (raw&&raw.items||[]).forEach(x=>{if(x&&x.fr)gen.push({fr:String(x.fr),vn:String(x.vn||""),lv,from:"gen",kind:len==="p"?"p":undefined});});
      const g=gen.filter(x=>x.lv===lv&&(len==="p")===(x.kind==="p"));if(g.length){cur=g[g.length-1];res=null;}
    }catch(e){}
    busy=false;render();
  }
  function startFree(){
    if(Speech.active()){Speech.stop();return;}
    free.live="";
    Speech.start({continuous:true,
      onPartial:t=>{free.live=t;const el=document.querySelector(".plive span");if(el)el.textContent=t;else render();},
      onEnd:async({text})=>{free.live="";if(Rec.active())recUrl=await Rec.stop();
        if(free.part==="interaction"){if(text){free.turns.push({r:"me",t:text});render();await reply();}}
        else{free.text=(free.text+" "+text).trim();render();}},
      onError:async c=>{free.live="";if(Rec.active())await Rec.stop();free.fb=Speech.errText(c);render();}
    });
    if(Rec.can())Rec.start();
    render();
  }
  const sets=()=>lv==="B2"?{b2:{t:"Point de vue B2",items:B2_ORAL.map(o=>o.title+" — "+o.prob)}}:PARLER_FREE[lv];
  async function reply(){
    if(typeof sample==="undefined"||!sample)return;
    const p=sets()[free.part].items[free.prompt];
    free.busy=true;
    try{const t=await sample(`Bạn là giám khảo DELF ${lv} đang đóng vai trong phần « exercice en interaction ». Tình huống: ${p}
Hãy trả lời bằng tiếng Pháp, ngắn (1–3 câu), tự nhiên, ở trình độ ${lv}, đúng vai của bạn; đặt câu hỏi hoặc đưa thông tin để học viên tiếp tục. Không sửa lỗi lúc này.
Hội thoại đến giờ:
${free.turns.map(x=>(x.r==="me"?"Học viên: ":"Giám khảo: ")+x.t).join("\n")}
Chỉ trả về lời thoại của bạn.`,{cache:false});
      free.turns.push({r:"ai",t:String(t&&t.text||t||"").trim()});}
    catch(e){free.fb="Claude chưa trả lời được.";}
    free.busy=false;render();
  }
  async function freeFeedback(){
    const p=sets()[free.part],prompt=p.items[free.prompt];
    const said=free.part==="interaction"?free.turns.map(x=>(x.r==="me"?"Học viên: ":"Giám khảo: ")+x.t).join("\n"):free.text;
    free.busy=true;free.fb="Claude đang nhận xét…";render();
    const crit={A2:"hoàn thành nhiệm vụ của phần thi; mạch lạc (câu đơn nối bằng từ nối cơ bản); phép lịch sự cơ bản (chào, cảm ơn, tu/vous) nếu là đóng vai; từ vựng đủ cho chủ đề quen thuộc; ngữ pháp các cấu trúc đơn giản",B1:"hoàn thành nhiệm vụ; trình bày ý kiến có lý do và ví dụ; mạch lạc với từ nối; từ vựng; ngữ pháp và các thì",B2:"nêu vấn đề và quan điểm; lập luận có ví dụ; nhượng bộ và phản bác; mạch lạc; từ vựng phong phú; ngữ pháp phức tạp"}[lv];
    try{const out=await sample(`Bạn là giám khảo DELF ${lv}, phần Production orale (${p.t}). Học viên người Việt, tiếng Anh B1–B2.
Đề: ${prompt}
Bản chép lời do máy nhận dạng giọng nói (có thể sai vài từ vì phát âm hoặc vì máy):
"""
${said.slice(0,5000)}
"""
Trả lời bằng tiếng Việt, ngắn gọn, không dùng markdown đậm, theo cấu trúc:
1. Mức ước tính: dưới ${lv} / ${lv} / ${lv}+ theo các tiêu chí: ${crit}. Mỗi tiêu chí 1 câu.
2. Sửa lỗi: từng lỗi dạng « sai » → « đúng », giải thích ngắn và ghi tên điểm ngữ pháp; chỉ ra câu bị "Anh hóa" nếu có. Từ nào có vẻ do máy nghe nhầm vì phát âm thì nói đó có thể là lỗi phát âm.
3. Gợi ý nói tự nhiên hơn: 2–3 câu, chỉ cao hơn trình độ hiện tại một bậc.
4. Một việc nên luyện tiếp.${typeof ErrLog!=="undefined"?ErrLog.promptTail():""}`,{cache:false,onText:({text})=>{free.fb=typeof ErrLog!=="undefined"?ErrLog.strip(text):text;const el=document.querySelector(".pcard .explain");if(el)el.textContent=free.fb;}});
      if(typeof ErrLog!=="undefined"){const full=String(out&&out.text!=null?out.text:out||"");const n=ErrLog.parseAndSave(full,{src:"oral",lv,ctx:prompt});free.fb=ErrLog.strip(full)+ErrLog.savedNote(n);}
      Store.addSpeak({kind:"free",lv,score:0,text:prompt.slice(0,120)});}
    catch(e){free.fb="Claude chưa nhận xét được, thử lại sau.";}
    free.busy=false;render();
  }

  document.addEventListener("click",e=>{
    const t=e.target.closest("[data-plv],[data-ptab],[data-psrc],[data-plen],[data-pgen],[data-pmic],[data-pnext],[data-pai],[data-fpart],[data-fback],[data-fdraw],[data-fpick],[data-fprep],[data-fmic],[data-ffb]");if(!t)return;
    if(t.dataset.plv){lv=t.dataset.plv;try{localStorage.setItem("fr-parler-lv",lv);}catch(err){}cur=null;res=null;free={part:null,prompt:null,text:"",live:"",timer:0,tid:null,turns:[],fb:"",busy:false};render();return;}
    if(t.dataset.ptab){tab=t.dataset.ptab;render();return;}
    if(t.dataset.psrc){src=t.dataset.psrc;cur=null;render();return;}
    if(t.dataset.plen){len=t.dataset.plen;try{localStorage.setItem("fr-parler-len",len);}catch(err){}cur=null;res=null;render();return;}
    if(t.dataset.pgen){genSentences();return;}
    if(t.dataset.pmic){startRead();return;}
    if(t.dataset.pnext){next();render();return;}
    if(t.dataset.pai){aiRead();return;}
    if(t.dataset.fpart){free.part=t.dataset.fpart;free.prompt=null;free.drawn=null;render();return;}
    if(t.dataset.fback){clearInterval(free.tid);free={part:null,prompt:null,text:"",live:"",timer:0,tid:null,turns:[],fb:"",busy:false};render();return;}
    if(t.dataset.fdraw){const n=sets()[free.part].items.length;const a=Math.floor(Math.random()*n);let b=Math.floor(Math.random()*n);if(n>1)while(b===a)b=Math.floor(Math.random()*n);free.drawn=n>1?[a,b]:[a];render();return;}
    if(t.dataset.fpick){free.prompt=+t.dataset.fpick;free.text="";free.turns=[];free.fb="";render();return;}
    if(t.dataset.fprep){if(free.tid){clearInterval(free.tid);free.tid=null;render();return;}free.timer=sets()[free.part].prep||600;free.tid=setInterval(()=>{free.timer--;const el=$("ftimer");if(el)el.textContent=fmt(Math.max(0,free.timer));if(free.timer<=0){clearInterval(free.tid);free.tid=null;render();}},1000);render();return;}
    if(t.dataset.fmic){startFree();return;}
    if(t.dataset.ffb){freeFeedback();}
  });
  Speech.ready.then(()=>{if(location.hash==="#parler")render();});
  return {render,_grade:grade,_bank:()=>BANK};
})();
