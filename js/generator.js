/* ---------- Types ---------- */
const LEVELS=["A1","A2","B1","B2"];
const TYPES={
  conj:{vn:"Chia động từ",h:"Conjugaison",fr:"Conjuguez le verbe à la personne et au temps indiqués."},
  gap:{vn:"Điền vào câu",h:"Phrases à compléter",fr:"Complétez les phrases."},
  qcm:{vn:"Trắc nghiệm",h:"Questions à choix multiple",fr:"Choisissez la bonne réponse."},
  box:{vn:"Hộp từ",h:"Mots à placer",fr:"Complétez les phrases avec les mots de la boîte. Chaque mot est utilisé une fois."},
  err:{vn:"Tìm & sửa lỗi",h:"Correction d'erreurs",fr:"Chaque phrase contient une erreur. Soulignez-la et corrigez-la."},
  qu:{vn:"Đặt câu hỏi",h:"Poser des questions",fr:"Posez une question sur la partie soulignée."},
  tr:{vn:"Biến đổi câu",h:"Transformation de phrases",fr:"Transformez les phrases selon la consigne."},
  cul:{vn:"Văn hoá",h:"Culture et civilisation : le saviez-vous ?",fr:"Choisissez la bonne réponse."},
  ph:{vn:"Phát âm",h:"Phonétique",fr:"Choisissez le mot dont la partie soulignée se prononce différemment."},
  wf:{vn:"Cấu tạo từ",h:"Formation des mots",fr:"Complétez chaque phrase avec un mot formé à partir du mot entre crochets."},
  kt:{vn:"Viết lại (từ cho sẵn)",h:"Réécriture avec mot imposé",fr:"Réécrivez la phrase sans changer son sens, en utilisant le mot donné. Ne modifiez pas le mot donné."},
  ro:{vn:"Sắp xếp câu",h:"Mots dans l'ordre",fr:"Remettez les mots dans l'ordre pour former une phrase correcte."},
  ow:{vn:"Điền một từ",h:"Un mot par blanc",fr:"Complétez le texte avec UN seul mot par blanc."},
  delf:{vn:"Đọc hiểu DELF",h:"Compréhension des écrits",fr:"Lisez les documents, puis répondez aux questions en cochant la bonne réponse."},
  cloze:{vn:"Điền đoạn văn",h:"Texte à trous",fr:"Complétez le texte avec les verbes entre parenthèses, au temps qui convient."},
  read:{vn:"Đọc hiểu",h:"Compréhension écrite",fr:"Lisez le texte, puis répondez aux questions."},
  write:{vn:"Viết đoạn",h:"Production écrite",fr:""},
  oral:{vn:"Dàn ý nói",h:"Production orale",fr:""}
};
const SENT=["conj","gap","qcm","box","err","qu","tr","cul","wf","kt","ro"];
const FREE_TYPES=new Set(["qu","ph","wf","kt","ro"]);
const LVR={A1:1,A2:2,B1:3,B2:4};
const BLOCK=["cloze","ow","read","write"];
const ORDER=[...SENT,...BLOCK];
const OPEN_TYPES=new Set(["tr","qu","err","kt","ro"]);
const CONC_ORDER=["ph","qcm","conj","gap","box","cul","read","ow","cloze","wf","kt","tr","ro","err","qu","write"];
const CONC_PART={ph:1,qcm:1,conj:1,gap:1,box:1,cul:1,read:2,ow:2,cloze:2,wf:3,kt:3,tr:3,ro:3,err:3,qu:3,write:3};
const CONC_PART_NAME={1:"PHONÉTIQUE ET GRAMMAIRE",2:"COMPRÉHENSION ÉCRITE",3:"ÉCRITURE ET TRANSFORMATION"};
const FORMS={practice:{vn:"Luyện tập"},delf:{vn:"Đề DELF"}};
const CONC_TYPES=["ph","qcm","wf","kt","ro","ow","read"];
const DELF_WRITE_MIN={A2:45,B1:45,B2:60};
const TOPIC=Object.fromEntries(BANK.map(t=>[t.id,t]));

/* ---------- State ---------- */
const S={form:"practice",duration:45,delfLv:"A2",delfWrite:false,delfOral:false,b2th:new Set(Object.keys(B2_THEMES)),timer:null,levels:new Set(["A2"]),topics:new Set(),types:new Set(["conj","gap","qcm","err","qu","tr","cul","cloze","read"]),count:20,themes:new Set(Object.keys(THEMES)),cult:"mid",test:null,view:"test",marks:{},meta:{}};
BANK.filter(t=>S.levels.has(t.lv)).forEach(t=>S.topics.add(t.id));
const enOn=()=>{try{return localStorage.getItem("fr-en-cmp")==="1";}catch(e){return false;}};
let downloads=null, sample=null, aiCtl=null, wrCtl=null, orCtl=null;

const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const boxOK=it=>it.t==="gap"&&!/\(/.test(it.q)&&it.a.length===1&&!/\s/.test(it.a[0]);
function setStatus(msg,kind=""){const el=$("status");el.textContent=msg;el.className="status"+(kind?" "+kind:"");}
const selSent=()=>SENT.filter(t=>S.types.has(t));
const selBlock=()=>BLOCK.filter(t=>S.types.has(t));

/* ---------- Builder UI ---------- */
function renderLevels(){$("levels").innerHTML=LEVELS.map(l=>`<button class="chip" type="button" data-lv="${l}" aria-pressed="${S.levels.has(l)}">${l}</button>`).join("");}
function renderTypes(){
  const chip=t=>`<button class="chip" type="button" data-ty="${t}" aria-pressed="${S.types.has(t)}">${TYPES[t].vn}</button>`;
  $("types").innerHTML=`<div class="tyrow"><span class="tylab">Câu lẻ</span><div class="chips">${SENT.map(chip).join("")}</div></div>
   <div class="tyrow"><span class="tylab">Bài dài</span><div class="chips">${BLOCK.map(chip).join("")}</div></div>`;
}
function renderForm(){
  const el=$("formSeg");if(!el)return;
  el.innerHTML=Object.entries(FORMS).map(([k,v])=>`<button type="button" data-form="${k}" aria-pressed="${S.form===k}">${v.vn}</button>`).join("");
  const opts=$("formOpts"),note=$("formNote");
  if(S.form==="concours"){
    opts.innerHTML=`<label class="inl" for="durSel">Thời gian làm bài</label><select id="durSel" class="text sm">${[30,45,60,90].map(m=>`<option value="${m}" ${S.duration===m?"selected":""}>${m} phút</option>`).join("")}</select>`;
    note.textContent="Đầu đề, cách đánh số và kết đề theo kiểu đề tuyển sinh Việt Nam. Trắc nghiệm đánh A, B, C; câu soạn bởi Claude có 4 lựa chọn A–D.";
  }else if(S.form==="delf"){
    opts.innerHTML=`<label class="inl" for="delfLv">Cấp độ</label><select id="delfLv" class="text sm">${["A2","B1","B2"].map(l=>`<option ${S.delfLv===l?"selected":""}>${l}</option>`).join("")}</select>
      <label class="check"><input type="checkbox" id="delfW" ${S.delfWrite?"checked":""}>Kèm Production écrite (Claude chấm /25)</label>
      ${S.delfLv==="B2"?`<label class="check"><input type="checkbox" id="delfO" ${S.delfOral?"checked":""}>Kèm Production orale (tài liệu + dàn ý)</label>
      <div class="b2th"><span class="tylab">Chủ đề B2</span><div class="chips" id="b2th">${Object.entries(B2_THEMES).map(([k,v])=>`<button class="chip" type="button" data-b2="${k}" aria-pressed="${S.b2th.has(k)}" title="${esc(v.vn)}">${esc(v.fr)}</button>`).join("")}</div></div>`:""}`;
    note.textContent=S.delfLv==="B2"
      ?"Compréhension des écrits theo format mới: chỉ trắc nghiệm 3 lựa chọn, chấm /25, ngưỡng loại 5/25. Đề B2 lấy 2 bài báo và 1 bài ý kiến theo các chủ đề đã chọn. Thời gian theo đề chính thức: 60 phút đọc, 60 phút viết, 30 phút chuẩn bị phần nói."
      :"Compréhension des écrits theo format mới: chỉ trắc nghiệm 3 lựa chọn, chấm /25, ngưỡng loại 5/25. Thời gian A2, B1 là thời gian gợi ý.";
  }else{opts.innerHTML="";note.textContent="Tự chọn dạng bài, chủ điểm và số câu để luyện.";}
  const hide=S.form==="delf";
  ["fTopics","fTypes","fCult","fCount"].forEach(id=>{const f=$(id);if(f)f.hidden=hide;});
  const ds=$("durSel");if(ds)ds.onchange=e=>{S.duration=+e.target.value;saveCfg();if(S.test&&S.test.form==="concours"){S.test.minutes=S.duration;renderPaper();}};
  const dl=$("delfLv");if(dl)dl.onchange=e=>{S.delfLv=e.target.value;saveCfg();renderForm();};
  const dw=$("delfW");if(dw)dw.onchange=e=>{S.delfWrite=e.target.checked;saveCfg();};
  const dO=$("delfO");if(dO)dO.onchange=e=>{S.delfOral=e.target.checked;saveCfg();};
}
document.addEventListener("click",e=>{
  const t=e.target.closest("#b2th [data-b2]");if(!t)return;
  const k=t.dataset.b2;
  if(S.b2th.has(k)){if(S.b2th.size>1)S.b2th.delete(k);}else S.b2th.add(k);
  document.querySelectorAll("#b2th [data-b2]").forEach(c=>c.setAttribute("aria-pressed",S.b2th.has(c.dataset.b2)));saveCfg();
});
document.addEventListener("click",e=>{
  const b=e.target.closest("#formSeg [data-form]");if(!b)return;
  const f=b.dataset.form;if(f===S.form)return;S.form=f;
  if(f==="concours"){S.types=new Set(CONC_TYPES);S.count=Math.max(S.count,24);$("count").value=S.count;$("countOut").textContent=S.count;}
  if(f==="delf"){const mx=[...S.levels].sort().pop()||"A2";S.delfLv=mx==="A1"?"A2":mx;}
  if(f==="practice"&&[...S.types].every(t=>CONC_TYPES.includes(t)))S.types=new Set(["conj","gap","qcm","err","qu","tr","cul","cloze","read"]);
  renderForm();renderTypes();updateAvail();saveCfg();build();
});
function renderThemes(){
  $("themes").innerHTML=Object.entries(THEMES).map(([k,v])=>`<button class="chip" type="button" data-th="${k}" aria-pressed="${S.themes.has(k)}">${v}</button>`).join("");
  document.querySelectorAll('input[name=cult]').forEach(r=>r.checked=r.value===S.cult);
}
function renderTopics(){
  const groups=LEVELS.filter(l=>S.levels.has(l));
  if(!groups.length){$("topics").innerHTML=`<p class="avail">Chọn ít nhất một trình độ.</p>`;return;}
  $("topics").innerHTML=groups.map(l=>`<div class="tgroup"><h4>${l}</h4>${BANK.filter(t=>t.lv===l).map(t=>`
    <label class="topic" for="tp-${t.id}"><input type="checkbox" id="tp-${t.id}" data-tp="${t.id}" ${S.topics.has(t.id)?"checked":""}>
    <span><span class="fr">${esc(t.fr)}</span><span class="vn">${esc(t.vn)}</span></span><span class="cnt">${t.items.length}</span></label>`).join("")}</div>`).join("");
}
function pools(){
  const P={gap:[],qcm:[],tr:[],err:[],box:[],qu:[],cul:[],ph:[],wf:[],kt:[],ro:[]};
  const maxR=Math.max(1,...[...S.levels].map(l=>LVR[l]));
  CULTURE.forEach((x,i)=>{if(S.themes.has(x.c)&&LVR[x.lv]<=maxR+1)P.cul.push({...x,t:"cul",topic:"cul-"+x.c,key:"cul:"+i});});
  for(const t of BANK){
    const on=S.topics.has(t.id)&&S.levels.has(t.lv);
    t.items.forEach((it,i)=>{
      const x={...it,lv:t.lv,topic:t.id,key:t.id+":"+i};
      if(FREE_TYPES.has(it.t)){P[it.t].push(x);return;}
      if(!on)return;
      P[it.t].push(x);
      if(boxOK(it))P.box.push({...x,t:"box"});
    });
  }
  return P;
}
function updateAvail(){
  const el=$("avail");const st=selSent();
  if(!st.length){el.textContent="Chỉ có bài dài: số câu không áp dụng.";el.className="avail";return;}
  if($("srcAi").checked||st.includes("conj")){el.textContent=`Đề sẽ có ${S.count} câu lẻ${selBlock().length?" + "+selBlock().map(t=>TYPES[t].vn.toLowerCase()).join(", "):""}.`;el.className="avail";return;}
  const P=pools();let n=0;const seen=new Set();
  for(const t of st)for(const x of P[t]){if(!seen.has(x.key)){seen.add(x.key);n++;}}
  el.textContent=n>=S.count?`Có ${n} câu phù hợp trong ngân hàng.`:`Ngân hàng chỉ có ${n} câu phù hợp. Thêm chủ điểm, bật "Chia động từ" hoặc dùng "Claude soạn câu mới".`;
  el.className="avail"+(n<S.count?" low":"");
}
function saveCfg(){try{localStorage.setItem("fr-gen-cfg3",JSON.stringify({levels:[...S.levels],topics:[...S.topics],types:[...S.types],themes:[...S.themes],cult:S.cult,count:S.count,title:$("title").value,form:S.form,duration:S.duration,delfLv:S.delfLv,delfWrite:S.delfWrite,delfOral:S.delfOral,b2th:[...S.b2th]}));}catch(e){}}
function loadCfg(){try{const c=JSON.parse(localStorage.getItem("fr-gen-cfg3")||"null");if(!c)return;
  if(Array.isArray(c.themes)){const th=c.themes.filter(k=>THEMES[k]);if(th.length)S.themes=new Set(th);}
  if(["low","mid","high"].includes(c.cult))S.cult=c.cult;
  S.levels=new Set(c.levels.filter(l=>LEVELS.includes(l)));S.topics=new Set(c.topics.filter(id=>TOPIC[id]));
  const ty=c.types.filter(t=>TYPES[t]);if(ty.length)S.types=new Set(ty);
  if(FORMS[c.form])S.form=c.form;if([30,45,60,90].includes(+c.duration))S.duration=+c.duration;if(DELF_SETS[c.delfLv])S.delfLv=c.delfLv;S.delfWrite=!!c.delfWrite;S.delfOral=!!c.delfOral;
  if(Array.isArray(c.b2th)){const b=c.b2th.filter(k=>B2_THEMES[k]);if(b.length)S.b2th=new Set(b);}
  S.count=Math.min(40,Math.max(5,+c.count||20));if(c.title)$("title").value=c.title;}catch(e){}}

$("levels").addEventListener("click",e=>{const b=e.target.closest("[data-lv]");if(!b)return;const l=b.dataset.lv;
  if(S.levels.has(l)){S.levels.delete(l);BANK.filter(t=>t.lv===l).forEach(t=>S.topics.delete(t.id));}
  else{S.levels.add(l);BANK.filter(t=>t.lv===l).forEach(t=>S.topics.add(t.id));}
  renderLevels();renderTopics();updateAvail();saveCfg();});
$("types").addEventListener("click",e=>{const b=e.target.closest("[data-ty]");if(!b)return;const t=b.dataset.ty;
  if(S.types.has(t)){if(S.types.size>1)S.types.delete(t);}else S.types.add(t);renderTypes();updateAvail();saveCfg();});
$("themes").addEventListener("click",e=>{const b=e.target.closest("[data-th]");if(!b)return;const k=b.dataset.th;
  if(S.themes.has(k)){if(S.themes.size>1)S.themes.delete(k);}else S.themes.add(k);renderThemes();updateAvail();saveCfg();});
document.querySelectorAll('input[name=cult]').forEach(r=>r.addEventListener("change",()=>{S.cult=r.value;saveCfg();}));
$("topics").addEventListener("change",e=>{const c=e.target.closest("[data-tp]");if(!c)return;c.checked?S.topics.add(c.dataset.tp):S.topics.delete(c.dataset.tp);updateAvail();saveCfg();});
$("allTopics").onclick=()=>{BANK.filter(t=>S.levels.has(t.lv)).forEach(t=>S.topics.add(t.id));renderTopics();updateAvail();saveCfg();};
$("noTopics").onclick=()=>{S.topics.clear();renderTopics();updateAvail();saveCfg();};
$("count").addEventListener("input",e=>{S.count=+e.target.value;$("countOut").textContent=S.count;updateAvail();saveCfg();});
$("title").addEventListener("input",()=>{if(S.test){S.test.title=$("title").value||"Test";renderPaper();}saveCfg();});
document.querySelectorAll('input[name=src]').forEach(r=>r.addEventListener("change",()=>{updateAvail();$("build").textContent=$("srcAi").checked?"Nhờ Claude soạn đề":"Tạo đề";}));
$("withEx").addEventListener("change",()=>{if(S.view==="key")renderPaper();});
$("withEn").checked=enOn();
$("withEn").addEventListener("change",e=>{try{localStorage.setItem("fr-en-cmp",e.target.checked?"1":"0");}catch(err){}if(S.view==="key")renderPaper();});
window.addEventListener("hashchange",()=>{$("withEn").checked=enOn();});

/* ---------- Assembly ---------- */
function prep(x){
  x={...x};
  if(x.t==="qcm"||x.t==="cul"){const idx=shuffle(x.o.map((_,i)=>i));const o=x.o;x.o=idx.map(i=>o[i]);x.a=idx.indexOf(x.a);}
  return x;
}
function quotas(types,N){const q={};types.forEach((t,i)=>q[t]=Math.floor(N/types.length)+(i<N%types.length?1:0));return q;}
const isCult=x=>!!(x.c&&S.themes.has(x.c));
function cultOrder(list){
  const bonus=S.cult==="high"?2:S.cult==="mid"?0.45:0;
  return list.map(x=>[Math.random()-(isCult(x)?bonus:0),x]).sort((a,b)=>a[0]-b[0]).map(p=>p[1]);
}
function pickBalanced(list,n,used){
  const by={};cultOrder(list).forEach(x=>{if(!used.has(x.key))(by[x.topic]=by[x.topic]||[]).push(x);});
  const L=shuffle(Object.values(by));const out=[];
  while(out.length<n&&L.some(l=>l.length)){for(const l of L){if(!l.length||out.length>=n)continue;const x=l.shift();if(used.has(x.key))continue;used.add(x.key);out.push(x);}}
  return out;
}
function tenseSet(){
  const s=new Set();
  S.topics.forEach(id=>{if(TOPIC[id]&&S.levels.has(TOPIC[id].lv))(TOPIC_TENSES[id]||[]).forEach(t=>s.add(t));});
  if(!s.size)S.levels.forEach(l=>LEVEL_TENSES[l].forEach(t=>s.add(t)));
  if(!s.size)s.add("pres");
  return [...s];
}
function genConj(n){
  const tenses=tenseSet(),verbs=Object.keys(VERBS),out=[],seen=new Set();
  let guard=0;
  while(out.length<n&&guard++<500){
    const tense=tenses[out.length%tenses.length],inf=pick(verbs),p=Math.floor(Math.random()*6),k=inf+tense+p;
    if(seen.has(k))continue;seen.add(k);
    const forms=conjugate(inf,tense)[p];
    out.push({t:"conj",inf,tense,p,a:forms,e:conjRule(inf,tense),lv:TENSES[tense].lv,topic:"conj-"+tense,key:"c:"+k});
  }
  return out;
}
function buildSentences(){
  const types=selSent();if(!types.length)return [];
  const N=S.count,P=pools(),used=new Set(),q=quotas(types,N),res={};
  const order=[...types].sort((a,b)=>(b==="box")-(a==="box"));
  let deficit=0;
  for(const t of order){if(t==="conj")continue;res[t]=pickBalanced(P[t],q[t],used);deficit+=q[t]-res[t].length;}
  if(res.box&&res.box.length===1){const b=res.box.pop();b.t="gap";(res.gap=res.gap||[]).push(b);}
  if(types.includes("conj"))res.conj=genConj(q.conj+deficit);
  else for(const t of order){if(deficit<=0)break;const more=pickBalanced(P[t],deficit,used);res[t].push(...more);deficit-=more.length;}
  return Object.values(res).flat().map(prep);
}
function parseCloze(text){
  const gaps=[];
  const html=text.replace(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,(m,a,h)=>{gaps.push({a:a.split("/").map(s=>s.trim()),h:(h||"").trim()});return "\u0000"+(gaps.length-1)+"\u0000";});
  return {parts:html,gaps};
}
function preferCult(arr){
  const cu=arr.filter(isCult);
  if(cu.length&&(S.cult==="high"||(S.cult==="mid"&&Math.random()<.5)))return cu;
  if(S.cult==="low"){const plain=arr.filter(x=>!isCult(x));if(plain.length)return plain;}
  return arr;
}
function pickCloze(){
  const lv=c=>S.levels.has(c.lv);
  let c=CLOZE.filter(c=>lv(c)&&S.topics.has(c.topic));
  if(!c.length)c=CLOZE.filter(lv);
  if(!c.length)c=CLOZE;
  c=preferCult(c);
  const x=pick(c);return {t:"cloze",title:x.title,lv:x.lv,topic:x.topic,c:x.c,...parseCloze(x.text)};
}
function pickByLevel(arr){let c=arr.filter(x=>S.levels.has(x.lv));if(!c.length)c=arr;return pick(preferCult(c));}
function pickRead(){const r=pickByLevel(READ);return {t:"read",lv:r.lv,c:r.c,title:r.title,text:r.text,qs:r.qs.map(q=>q.k==="mc"?(()=>{const idx=shuffle(q.o.map((_,i)=>i));return {...q,o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)};})():{...q})};}
function pickOW(){
  const lv=c=>S.levels.has(c.lv);
  let c=OW.filter(c=>lv(c)&&S.topics.has(c.topic));if(!c.length)c=OW.filter(lv);if(!c.length)c=OW;
  const x=pick(c);return {t:"ow",title:x.title,lv:x.lv,topic:x.topic,...parseCloze(x.text)};
}
const FEI_SUJETS={A2:"https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a2/exemples-sujets",B1:"https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b1/exemples-sujets",B2:"https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b2/exemples-sujets"};
function prepDelfQ(q){
  const idx=q.order?q.order:(q.fixed?q.o.map((_,i)=>i):shuffle(q.o.map((_,i)=>i)));
  return {s:q.s,o:idx.map(i=>q.o[i]),a:idx.indexOf(0)};
}
function pickDelf(lv){
  const set=DELF_SETS[lv];
  const exs=lv==="B2"?pickB2Exercises():lv==="A2"&&typeof A2_POOL!=="undefined"?Object.keys(A2_KINDS).map(k=>{const d=pick(A2_POOL.filter(x=>x.k===k));return {...d,title:`${A2_KINDS[k]} – ${d.title}`};}):lv==="B1"&&typeof B1_OPEN!=="undefined"?shuffle([pick(set.exercises),pick(B1_OPEN)]):set.exercises;
  return {t:"delf",lv,minutes:set.minutes,exercises:exs.map(ex=>({title:ex.title,doc:ex.doc,pov:!!ex.pov,th:ex.th,src:ex.src||"",qs:ex.qs.map(prepDelfQ)}))};
}
/* B2: two articles + one opinion set, preferring the selected themes (and different themes when possible). */
const prefTh=a=>{const s=shuffle(a);return [...s.filter(x=>S.b2th.has(x.th)),...s.filter(x=>!S.b2th.has(x.th))];};
function pickB2Exercises(){
  const arts=prefTh(DELF_B2_POOL.filter(x=>x.kind==="art"));
  const a1=arts[0],a2=arts.find(x=>x!==a1&&x.th!==a1.th&&S.b2th.has(x.th))||arts.find(x=>x!==a1);
  const pov=prefTh(DELF_B2_POOL.filter(x=>x.kind==="pov"))[0];
  return [a1,a2,pov].filter(Boolean);
}
function pickB2Write(lv){
  const w=WRITE.filter(x=>x.lv===lv);
  if(lv!=="B2")return pick(w.length?w:WRITE);
  const th=w.filter(x=>x.th&&S.b2th.has(x.th));return pick(th.length?th:w);
}
function pickOral(){const o=B2_ORAL.filter(x=>S.b2th.has(x.th));return {t:"oral",lv:"B2",...pick(o.length?o:B2_ORAL)};}
function pickWrite(){return {t:"write",...pickByLevel(WRITE)};}
function assemble(sent,blocks,title){
  const order=S.form==="concours"?CONC_ORDER:S.form==="delf"?["delf","write","oral"]:[...SENT,...BLOCK];
  const secs=[];
  for(const t of order){
    if(blocks[t])secs.push({t,block:blocks[t]});
    else if(SENT.includes(t)){const items=sent.filter(i=>i.t===t);if(items.length)secs.push({t,items});}
  }
  let n=0;
  secs.forEach(s=>{
    if(s.items)s.items.forEach(i=>i.num=++n);
    else{s.start=n+1;if(S.form==="concours")n+=secPoints(s);}
    if(s.t==="box")s.words=shuffle(s.items.map(i=>i.a[0]));
  });
  const lv=new Set(sent.map(i=>i.lv));Object.values(blocks).forEach(b=>b&&lv.add(b.lv));
  return {id:"t"+Date.now().toString(36)+Math.random().toString(36).slice(2,7),created:Date.now(),title,levels:[...lv].filter(Boolean).sort(),secs,src:$("srcAi").checked?"ai":"bank",mode:S.nextMode||"free",recorded:false,form:S.form,minutes:S.form==="delf"?(blocks.delf?blocks.delf.minutes:0)+(blocks.write?DELF_WRITE_MIN[blocks.write.lv]||60:0)+(blocks.oral?30:0):S.duration};
}
function secPoints(s){
  if(s.items)return s.items.length;
  if(s.t==="cloze"||s.t==="ow")return s.block.gaps.length;
  if(s.t==="delf")return s.block.exercises.reduce((a,e)=>a+e.qs.length,0);
  if(s.t==="read")return s.block.qs.length;
  return 0;
}
const totalPoints=()=>S.test.secs.reduce((a,s)=>a+secPoints(s),0);

/* ---------- Claude-generated content ---------- */
function aiPrompt(q,wantCloze,wantRead){
  const lv=[...S.levels].join(", ")||"A2";
  const tps=BANK.filter(t=>S.topics.has(t.id)&&S.levels.has(t.lv)).map(t=>`${t.fr} (${t.lv})`).join("; ")||"ngữ pháp tổng hợp";
  const counts=Object.entries(q).filter(([t,n])=>n>0).map(([t,n])=>`${n} câu dạng "${t}" (${TYPES[t].vn})`).join(", ");
  return `Bạn là giáo viên tiếng Pháp soạn đề luyện cho học viên người Việt đang ôn thi DELF. Nội dung phải MỚI, không chép từ sách.
Trình độ CECRL: ${lv}. Chủ điểm ngữ pháp: ${tps}.
${counts?"Soạn: "+counts+".":"Không cần câu lẻ (items để mảng rỗng)."}
${wantCloze?"Thêm 1 đoạn văn điền từ (cloze) 80–130 từ, 8–10 chỗ trống, chủ yếu chia động từ theo các chủ điểm trên.":""}
${wantRead?"Thêm 1 bài đọc hiểu kiểu DELF đúng trình độ (A1: 60–90 từ, A2: 120–160, B1: 200–250, B2: 300–350), 5–6 câu hỏi trộn các dạng tf, mc, open.":""}
${cultLine()}
Mỗi item PHẢI có trường "topic" là đúng một id trong danh sách sau (chọn chủ điểm chính mà câu kiểm tra): ${aiTopicList()}.
${S.form==="concours"?"Đây là đề kiểu tuyển sinh: câu trắc nghiệm qcm có 4 lựa chọn. Dạng ph: 4 từ, mỗi từ đánh dấu phần gạch chân bằng [ ], đúng một từ đọc khác; chỉ dùng những trường hợp phát âm chắc chắn.":""}
Yêu cầu chung: tiếng Pháp tự nhiên, chính xác; mỗi câu chỉ một đáp án đúng rõ ràng; "e" là giải thích ngắn bằng tiếng Việt (tối đa 25 từ), nêu điểm khác tiếng Anh nếu có; "lv" là trình độ (A1/A2/B1/B2). Chỗ trống viết ___ .
Trả về CHỈ một đối tượng JSON:
{"items":[
 {"t":"qcm","lv":"B1","q":"Je pense qu'il ___ raison.","o":["a","ait","avoir"],"a":0,"e":"..."},
 {"t":"gap","lv":"A2","q":"Hier, nous ___ (aller) au musée.","a":["sommes allés","sommes allées"],"e":"..."},
 {"t":"box","lv":"A2","q":"Je vais ___ cinéma ce soir.","a":["au"],"e":"đáp án MỘT từ, câu không có ngoặc"},
 {"t":"err","lv":"B1","q":"câu có đúng một lỗi","w":"đoạn sai trích nguyên văn","a":["đoạn đã sửa"],"e":"..."},
 {"t":"qu","lv":"A2","q":"câu trần thuật","u":"phần được hỏi, trích nguyên văn","s":"từ để hỏi mở đầu, ví dụ Où","a":["câu hỏi đầy đủ (đảo ngữ)","câu hỏi đầy đủ (est-ce que)"],"e":"..."},
 {"t":"tr","lv":"B1","q":"câu gốc","i":"consigne en français","a":["câu viết lại","biến thể chấp nhận"],"e":"..."},
 {"t":"cul","c":"hist","lv":"A2","q":"câu hỏi kiến thức văn hoá bằng tiếng Pháp","o":["đúng","sai","sai"],"a":0,"e":"giải thích + thông tin thú vị bằng tiếng Việt"},
 {"t":"ph","lv":"A2","q":"-","o":["m[o]t có phần gạch chân trong ngoặc vuông","…","…","…"],"a":3,"e":"giải thích phát âm"},
 {"t":"wf","lv":"B1","q":"câu có ___","w":"TỪ GỐC VIẾT HOA","a":["từ đã biến đổi"],"e":"..."},
 {"t":"kt","lv":"B1","q":"câu gốc","k":"TỪ BẮT BUỘC","s":"phần mở đầu câu mới","a":["câu viết lại đầy đủ, bắt đầu bằng phần mở đầu"],"e":"..."},
 {"t":"ro","lv":"A2","q":"-","w":["các","từ","bị","xáo","trộn","."],"a":["câu đúng"],"e":"..."}
],
(Câu nào có bối cảnh văn hoá thì thêm trường "c" là một trong: ${Object.keys(THEMES).join(", ")}.)
"cloze":${wantCloze?'{"title":"...","lv":"A2","topic":"id chủ điểm chính","text":"... [[đáp án|động từ nguyên mẫu]] ... (biến thể đáp án cách nhau bằng /)"}':"null"},
"read":${wantRead?'{"title":"...","lv":"B1","text":"đoạn văn, xuống dòng bằng \\n","qs":[{"k":"tf","s":"nhận định","a":true,"j":"trích dẫn chứng minh từ văn bản"},{"k":"mc","s":"câu hỏi","o":["đúng","sai","sai"],"a":0},{"k":"open","s":"câu hỏi","a":["câu trả lời mẫu"]}]}':"null"}}`;
}
function aiTopicList(){
  const ids=BANK.filter(t=>S.topics.has(t.id)&&S.levels.has(t.lv)).map(t=>t.id);
  const list=ids.length?ids:BANK.filter(t=>S.levels.has(t.lv)).map(t=>t.id);
  return list.map(id=>id+"="+TOPIC[id].fr).join("; ")+"; với câu văn hoá dùng cul-hist, cul-arts, cul-paris, cul-geo, cul-vie hoặc cul-franco";
}
function cultLine(){
  const th=[...S.themes].map(k=>THEMES[k]).join(", ");
  const how={low:"thỉnh thoảng (khoảng 1/5 số câu)",mid:"khoảng một nửa số câu",high:"phần lớn số câu, kể cả đoạn văn và bài đọc"}[S.cult];
  return `Lồng ghép văn hoá Pháp và Pháp ngữ (chủ đề: ${th}) vào ${how}: dùng bối cảnh lịch sử, nghệ thuật, văn học, địa lý, lễ hội, đời sống, Pháp ngữ và quan hệ Pháp–Việt. CHỈ dùng sự kiện, ngày tháng, tên người chắc chắn đúng; nếu không chắc thì dùng bối cảnh chung, không bịa số liệu.`;
}
function hashStr(s){let h=5381;for(const c of String(s))h=((h<<5)+h+c.charCodeAt(0))|0;return (h>>>0).toString(36);}
function validItem(x){
  if(x&&(x.t==="ph"||x.t==="ro")&&typeof x.q!=="string")x.q="-";
  if(!x||typeof x!=="object"||!SENT.includes(x.t)||x.t==="conj"||typeof x.q!=="string"||!x.q.trim())return false;
  if(x.t==="ph")return Array.isArray(x.o)&&x.o.length>=3&&x.o.every(o=>typeof o==="string"&&/\[.+\]/.test(o))&&Number.isInteger(x.a)&&x.a>=0&&x.a<x.o.length;
  if(x.t==="qcm"||x.t==="cul")return Array.isArray(x.o)&&x.o.length>=2&&x.o.every(s=>typeof s==="string")&&Number.isInteger(x.a)&&x.a>=0&&x.a<x.o.length;
  if(!Array.isArray(x.a)||!x.a.length||!x.a.every(s=>typeof s==="string"&&s.trim()))return false;
  if(x.t==="gap"||x.t==="box")return x.q.includes("___");
  if(x.t==="tr")return typeof x.i==="string";
  if(x.t==="err")return typeof x.w==="string"&&x.q.includes(x.w);
  if(x.t==="qu")return typeof x.u==="string"&&x.q.includes(x.u)&&typeof x.s==="string";
  if(x.t==="wf")return x.q.includes("___")&&typeof x.w==="string";
  if(x.t==="kt")return typeof x.k==="string"&&typeof x.s==="string";
  if(x.t==="ro")return Array.isArray(x.w)&&x.w.length>=3&&x.w.every(w=>typeof w==="string");
  return false;
}
function validRead(r){
  return r&&typeof r.text==="string"&&Array.isArray(r.qs)&&r.qs.length>=3&&r.qs.every(q=>q&&typeof q.s==="string"&&(
    (q.k==="tf"&&typeof q.a==="boolean")||(q.k==="mc"&&Array.isArray(q.o)&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length)||(q.k==="open"&&Array.isArray(q.a)&&q.a.length)));
}
async function buildFromAi(){
  const types=selSent();const q=quotas(types,types.length?S.count:0);
  const conjN=q.conj||0;delete q.conj;
  const wantCloze=S.types.has("cloze"),wantRead=S.types.has("read");
  aiCtl=new AbortController();
  const raw=await sample.json(aiPrompt(q,wantCloze,wantRead),{signal:aiCtl.signal,cache:false});
  if(!raw||typeof raw!=="object")throw{code:"invalid_json"};
  const lv0=[...S.levels][0]||"A2";
  const items=(Array.isArray(raw.items)?raw.items:[]).filter(validItem).filter(x=>S.types.has(x.t)).map((x,i)=>prep({
    t:x.t,q:x.q.trim(),o:x.o,a:x.a,i:x.i,w:x.w,u:x.u,s:x.s,k:x.k,c:THEMES[x.c]?x.c:undefined,e:String(x.e||""),lv:LEVELS.includes(x.lv)?x.lv:lv0,topic:(typeof x.topic==="string"&&TOPICS[x.topic])?x.topic:(x.t==="cul"&&THEMES[x.c]?"cul-"+x.c:"ai"),key:"ai:"+hashStr(x.q)}));
  const boxes=items.filter(i=>i.t==="box");if(boxes.length===1)boxes[0].t="gap";
  const sent=[...items,...genConj(conjN)];
  const blocks={};
  if(wantCloze){const c=raw.cloze;const pc=c&&typeof c.text==="string"?parseCloze(c.text):null;
    blocks.cloze=pc&&pc.gaps.length>=4?{t:"cloze",title:String(c.title||"Texte"),lv:LEVELS.includes(c.lv)?c.lv:lv0,topic:(typeof c.topic==="string"&&TOPIC[c.topic])?c.topic:"ai",...pc}:pickCloze();}
  if(wantRead){const r=raw.read;blocks.read=validRead(r)?{t:"read",title:String(r.title||"Texte"),lv:LEVELS.includes(r.lv)?r.lv:lv0,text:r.text,qs:r.qs}:pickRead();}
  if(S.types.has("ow"))blocks.ow=pickOW();
  if(S.types.has("write"))blocks.write=pickWrite();
  return {sent,blocks};
}

async function buildDelfAi(lv){
  const spec={A2:"2 tài liệu ngắn (thư/email, thông báo), mỗi tài liệu 5–6 câu hỏi; văn bản 80–150 từ",
              B1:"2 tài liệu (một bài báo 200–250 từ, một trang diễn đàn 3 ý kiến), mỗi tài liệu 5–6 câu hỏi",
              B2:"3 bài: bài 1 và 2 là bài báo nghị luận 280–350 từ, mỗi bài 6 câu hỏi; bài 3 gồm ý kiến của 3 người về một chủ đề, 5 câu dạng « Qui… ? » với 3 lựa chọn là tên 3 người (đặt \"pov\":true)"}[lv];
  aiCtl=new AbortController();
  const raw=await sample.json(`Soạn một đề luyện phần Compréhension des écrits DELF ${lv} theo format mới của France Éducation International: chỉ có câu trắc nghiệm, mỗi câu đúng 3 lựa chọn, một đáp án đúng, không có câu Vrai/Faux hay câu tự luận.
Cấu trúc: ${spec}. Văn bản tiếng Pháp tự nhiên, nội dung mới (không chép tài liệu có sẵn), ${lv==="B2"?"chủ đề xã hội lấy trong các chủ đề sau: "+[...S.b2th].map(k=>B2_THEMES[k].fr).join(", ")+" (mỗi bài một chủ đề khác nhau nếu có thể)":"chủ đề đời sống, xã hội, văn hoá phù hợp trình độ"}. Câu hỏi bám sát văn bản, có câu về ý chính, chi tiết và (B1, B2) quan điểm của tác giả.
Trả về CHỈ JSON: {"exercises":[{"title":"...","doc":"văn bản, xuống dòng bằng \\n","pov":false,"qs":[{"s":"câu hỏi","o":["đáp án đúng","sai","sai"]}]}]} — đáp án đúng LUÔN đặt ở vị trí đầu tiên (trang sẽ tự xáo trộn), trừ bài pov: giữ thứ tự tên cố định và thêm "a" là chỉ số đáp án đúng.`,{signal:aiCtl.signal,cache:false});
  const exs=(raw&&Array.isArray(raw.exercises)?raw.exercises:[]).filter(e=>e&&typeof e.doc==="string"&&Array.isArray(e.qs)&&e.qs.length>=3);
  const out=exs.map(e=>({title:String(e.title||"Document"),doc:e.doc,pov:!!e.pov,qs:e.qs.filter(q=>q&&typeof q.s==="string"&&Array.isArray(q.o)&&q.o.length===3).map(q=>e.pov&&Number.isInteger(q.a)?{s:q.s,o:q.o,a:Math.min(2,Math.max(0,q.a))}:prepDelfQ({s:q.s,o:q.o}))})).filter(e=>e.qs.length);
  if(!out.length)throw{code:"invalid_json"};
  if(lv==="B2"&&out.length<3){const have=new Set(out.map(e=>e.pov?"pov":"art"));pickB2Exercises().forEach(x=>{if(out.length<3&&!have.has(x.kind)){out.push({title:x.title,doc:x.doc,pov:!!x.pov,qs:x.qs.map(prepDelfQ)});have.add(x.kind);}});}
  return {t:"delf",lv,minutes:DELF_SETS[lv].minutes,exercises:out};
}

/* ---------- Build ---------- */
async function build(){
  const title=$("title").value.trim()||"Test de grammaire";
  S.marks={};S.meta={};S.qinfo={};S.libTopics=null;S.libStatus=null;$("result").classList.add("hidden");
  stopTimer();S.timer=null;
  if(S.form==="delf"){
    const lv=S.delfLv,blocks={};
    if($("srcAi").checked&&sample){
      const btn=$("build");btn.disabled=true;setStatus("Claude đang soạn đề DELF… thường mất 30–90 giây.");
      try{blocks.delf=await buildDelfAi(lv);setStatus("Claude đã soạn xong đề đọc hiểu. Claude có thể nhầm ở chi tiết nhỏ.","ok");}
      catch(e){blocks.delf=pickDelf(lv);setStatus(e&&e.code==="cancelled"?"Đã dừng.":"Claude chưa soạn được; đang dùng đề có sẵn trong ngân hàng.","err");}
      finally{btn.disabled=false;}
    }else{blocks.delf=pickDelf(lv);setStatus(`Đề DELF ${lv}: ${blocks.delf.exercises.length} bài đọc, ${secPoints({t:"delf",block:blocks.delf})} câu trắc nghiệm${S.delfWrite?" + đề viết":""}${lv==="B2"&&S.delfOral?" + đề nói":""}.`);}
    if(S.delfWrite)blocks.write={t:"write",...pickB2Write(lv)};
    if(lv==="B2"&&S.delfOral)blocks.oral=pickOral();
    S.test=assemble([],blocks,title);renderPaper();return;
  }
  if($("srcAi").checked&&sample){
    const btn=$("build");btn.disabled=true;$("reshuffle").disabled=true;
    setStatus(`Claude đang soạn đề… thường mất 30–90 giây.`);
    try{
      const {sent,blocks}=await buildFromAi();
      if(!sent.length&&!Object.keys(blocks).length){setStatus("Claude chưa trả về nội dung hợp lệ. Bấm lại để thử lần nữa.","err");return;}
      S.test=assemble(sent,blocks,title);
      setStatus(`Claude đã soạn xong. Claude có thể nhầm ở chi tiết nhỏ: nếu thấy đáp án lạ, hãy hỏi lại trong chat.`,"ok");
      renderPaper();
    }catch(e){
      const m={not_granted:"Bạn chưa cho phép trang dùng Claude. Hãy dùng ngân hàng có sẵn.",rate_limited:"Đã chạm giới hạn lượt dùng Claude, thử lại sau ít phút.",cancelled:"Đã dừng.",invalid_json:"Claude trả về sai định dạng. Bấm lại để thử lần nữa.",session_expired:"Phiên đăng nhập đã hết hạn, hãy đăng nhập lại."};
      setStatus(m[e&&e.code]||"Không soạn được đề lúc này. Thử lại hoặc dùng ngân hàng có sẵn.","err");
      if(e&&(e.code==="not_granted"||e.code==="sampling_disabled"))disableAi("Không khả dụng với tài khoản này.");
    }finally{btn.disabled=false;$("reshuffle").disabled=false;}
    return;
  }
  const sent=buildSentences();
  const blocks={};
  if(S.types.has("cloze"))blocks.cloze=pickCloze();
  if(S.types.has("ow"))blocks.ow=pickOW();
  if(S.types.has("read"))blocks.read=pickRead();
  if(S.types.has("write"))blocks.write=pickWrite();
  if(!sent.length&&!Object.keys(blocks).length){setStatus("Không có câu nào khớp lựa chọn. Thử thêm chủ điểm hoặc dạng câu.","err");return;}
  S.test=assemble(sent,blocks,title);
  setStatus(`Đề gồm ${S.test.secs.length} phần · ${totalPoints()} điểm${blocks.write?" + phần viết":""}.`);
  renderPaper();
}
function disableAi(msg){$("srcAi").disabled=true;$("srcAi").checked=false;$("srcBank").checked=true;$("aiNote").textContent=msg;$("build").textContent="Tạo đề";updateAvail();}

/* ---------- Rendering ---------- */
const L="abcdef";
const lab=i=>S.test&&S.test.form!=="practice"?"ABCDEF"[i]+".":L[i]+")";
const fmtPh=o=>esc(o).replace(/\[([^\]]+)\]/g,"<u>$1</u>");
const inp=(id,cls="",ph="")=>`<input class="fill ${cls}" id="${id}" aria-label="Câu trả lời" ${ph?`placeholder="${esc(ph)}"`:""} autocomplete="off" autocapitalize="off" spellcheck="false">`;
function blank(q,mode,id){
  const parts=esc(q).split(/_{2,}/);
  if(mode!=="online")return parts.join('<span class="blank"></span>');
  return parts.map((p,i)=>i<parts.length-1?p+inp(id):p).join("");
}
const exText=it=>it.e?(it.c?"Le saviez-vous ? ":"")+it.e:"";
const enSpan=it=>enOn()&&it.en?`<span class="ex en"><b>EN</b> ${esc(it.en)}</span>`:"";
const exSpan=it=>($("withEx").checked&&it.e?`<span class="ex">${esc(exText(it))}</span>`:"")+enSpan(it);
const pronOf=it=>(it.tense==="subj"?"que ":"")+PRON[it.p];
function keyAnswer(it){
  if(it.t==="qcm"||it.t==="cul")return `${lab(it.a)} ${esc(it.o[it.a])}`;
  if(it.t==="err")return `<span class="orig">« ${esc(it.w)} »</span> → ${esc(it.a[0])}`;
  if(it.t==="ph")return `${lab(it.a)} ${fmtPh(it.o[it.a])}`;
  if(it.t==="qu"||it.t==="tr"||it.t==="kt"||it.t==="ro")return it.a.slice(0,2).map(esc).join("<br>");
  return it.a.map(esc).join(" / ");
}
function sentHTML(it,mode){
  const n=`<span class="n">${S.test&&S.test.form==="concours"?"Question "+it.num+".":it.num+"."}</span>`,id="s"+it.num;
  if(mode==="key")return `<li class="q">${n}<div><span class="a">${keyAnswer(it)}</span>${exSpan(it)}</div></li>`;
  let body="";
  if(it.t==="conj"){
    body=`<p><b>${esc(it.inf)}</b> · ${esc(pronOf(it))} · <i>${TENSES[it.tense].fr}</i> → ${mode==="online"?inp("ans-"+id,"sm"):'<span class="blank"></span>'}</p>`;
  }else if(it.t==="qcm"||it.t==="cul"){
    const opts=it.o.map((o,i)=>mode==="online"
      ?`<li><label><input type="radio" name="ans-${id}" value="${i}"><span class="l">${lab(i)}</span> ${esc(o)}</label></li>`
      :`<li><span class="l">${lab(i)}</span> ${esc(o)}</li>`).join("");
    body=`<p>${blank(it.q,"print")}${it.t==="cul"?` <span class="theme">${esc(THEMES[it.c]||"")}</span>`:""}</p><ol class="opts">${opts}</ol>`;
  }else if(it.t==="gap"||it.t==="box"){
    body=`<p>${blank(it.q,mode,"ans-"+id)}</p>`;
  }else if(it.t==="tr"){
    body=`<p>${esc(it.q)}</p><p class="ins">→ ${esc(it.i)}</p>`+(mode==="online"?inp("ans-"+id,"wide"):`<div class="wline"></div>`);
  }else if(it.t==="err"){
    body=`<p>${esc(it.q)}</p>`+(mode==="online"?inp("ans-"+id,"wide","Viết phần đã sửa, hoặc cả câu đúng"):`<div class="wline"></div>`);
  }else if(it.t==="ph"){
    body=`<ol class="opts phopts">${it.o.map((o,i)=>mode==="online"?`<li><label><input type="radio" name="ans-${id}" value="${i}"><span class="l">${lab(i)}</span> ${fmtPh(o)}</label></li>`:`<li><span class="l">${lab(i)}</span> ${fmtPh(o)}</li>`).join("")}</ol>`;
  }else if(it.t==="wf"){
    body=`<p>${blank(it.q,mode,"ans-"+id)} <b class="wfbase">[${esc(it.w)}]</b></p>`;
  }else if(it.t==="kt"){
    body=`<p>${esc(it.q)} <b class="kw">(${esc(it.k)})</b></p>`+(mode==="online"?`<p class="ins">→ ${esc(it.s)} …</p>`+inp("ans-"+id,"wide",it.s+" …"):`<p class="ins qline">→ ${esc(it.s)} <span class="blank long"></span></p>`);
  }else if(it.t==="ro"){
    body=`<p class="ro">${it.w.map(esc).join(" / ")}</p>`+(mode==="online"?inp("ans-"+id,"wide"):`<div class="wline"></div>`);
  }else if(it.t==="qu"){
    const sent=esc(it.q).replace(esc(it.u),`<u>${esc(it.u)}</u>`);
    body=`<p>${sent}</p>`+(mode==="online"?`<p class="ins">→ ${esc(it.s)} …?</p>`+inp("ans-"+id,"wide",it.s+" … ?"):`<p class="ins qline">→ ${esc(it.s)} <span class="blank long"></span> ?</p>`);
  }
  return `<li class="q" data-key="${id}">${n}<div>${body}</div></li>`;
}
function clozeHTML(b,mode,sec){
  const pre=b.t==="ow"?"o":"c",base=S.test.form==="concours"?sec.start:1;
  const text=esc(b.parts).replace(/\u0000(\d+)\u0000/g,(m,k)=>{
    k=+k;const g=b.gaps[k],num=base+k;
    if(mode==="key")return `<b class="gn">(${num})</b> <span class="a">${g.a.map(esc).join(" / ")}</span>`;
    return `<b class="gn">(${num})</b> ${mode==="online"?inp("ans-"+pre+k,"sm"):'<span class="blank"></span>'}${g.h?` <span class="hint">(${esc(g.h)})</span>`:""}`;
  }).replace(/\n/g,"<br>");
  return `<div class="passage cloze"><h4>${esc(b.title)}${b.c&&THEMES[b.c]?` <span class="theme">${esc(THEMES[b.c])}</span>`:""}</h4><p>${text}</p></div><div class="fbslot" data-key="${pre}"></div>`;
}
function delfHTML(b,mode){
  return b.exercises.map((ex,e)=>{
    const qs=ex.qs.map((q,k)=>{
      const id="d"+e+"_"+k,n=`<span class="n">${k+1}.</span>`;
      if(mode==="key")return `<li class="q">${n}<div><span class="a">${lab(q.a)} ${esc(q.o[q.a])}</span></div></li>`;
      const opts=q.o.map((o,i)=>mode==="online"?`<li><label><input type="radio" name="ans-${id}" value="${i}"><span class="l">${lab(i)}</span> ${esc(o)}</label></li>`:`<li><span class="cb">☐</span><span class="l">${lab(i)}</span> ${esc(o)}</li>`).join("");
      return `<li class="q" data-key="${id}">${n}<div><p>${esc(q.s)}</p><ol class="opts delfopts">${opts}</ol></div></li>`;
    }).join("");
    return `<div class="dex"><h4 class="dexh">Exercice ${e+1} <span class="pts">(${ex.qs.length} questions)</span></h4>${ex.pov&&mode!=="key"?'<p class="consigne">Lisez les opinions, puis indiquez à quelle personne correspond chaque affirmation.</p>':""}
      ${mode==="key"?"":`<div class="passage"><h4>${esc(ex.title)}${ex.th&&B2_THEMES[ex.th]?` <span class="theme">${esc(B2_THEMES[ex.th].fr)}</span>`:""}</h4>${ex.doc.split(/\n+/).map(p=>`<p>${esc(p)}</p>`).join("")}${ex.src?`<p class="src">${ex.src}</p>`:""}</div>`}
      <ol class="qs">${qs}</ol></div>`;
  }).join("");
}
function readHTML(b,mode){
  const passage=`<div class="passage"><h4>${esc(b.title)}${b.c&&THEMES[b.c]?` <span class="theme">${esc(THEMES[b.c])}</span>`:""}</h4>${b.text.split(/\n+/).map(p=>`<p>${esc(p)}</p>`).join("")}</div>`;
  const base=S.test.form==="concours"&&b._start?b._start:1;
  const qs=b.qs.map((q,k)=>{
    const id="r"+k,n=`<span class="n">${S.test.form==="concours"?"Question "+(base+k)+".":(k+1)+"."}</span>`;
    if(mode==="key"){
      const a=q.k==="tf"?`${q.a?"Vrai":"Faux"} — « ${esc(q.j||"")} »`:q.k==="mc"?`${lab(q.a)} ${esc(q.o[q.a])}`:q.a.map(esc).join("<br>");
      return `<li class="q">${n}<div><span class="a">${a}</span></div></li>`;
    }
    let body=`<p>${esc(q.s)}</p>`;
    if(q.k==="tf"){
      body+=mode==="online"
        ?`<div class="tfrow"><label><input type="radio" name="ans-${id}" value="1"> Vrai</label><label><input type="radio" name="ans-${id}" value="0"> Faux</label></div>`
        :`<div class="tfrow"><span>☐ Vrai</span><span>☐ Faux</span></div><p class="ins">Justification : <span class="blank long"></span></p>`;
    }else if(q.k==="mc"){
      body+=`<ol class="opts">${q.o.map((o,i)=>mode==="online"?`<li><label><input type="radio" name="ans-${id}" value="${i}"><span class="l">${lab(i)}</span> ${esc(o)}</label></li>`:`<li><span class="l">${lab(i)}</span> ${esc(o)}</li>`).join("")}</ol>`;
    }else body+=mode==="online"?inp("ans-"+id,"wide"):`<div class="wline"></div>`;
    return `<li class="q" data-key="${id}">${n}<div>${body}</div></li>`;
  }).join("");
  return passage+`<ol class="qs">${qs}</ol>`;
}
function writeHTML(b,mode){
  const head=`<p class="wprompt">${esc(b.p)}</p><p class="ins">${b.min}–${b.max} mots. Critères :</p><ul class="req">${b.req.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>`;
  if(mode==="key")return head+`<p class="ins">Bài viết tự do, không có đáp án cố định. Ở chế độ "Làm online", bấm "Nhờ Claude chấm" để được sửa lỗi và ước tính điểm theo thang DELF /25.</p>`;
  if(mode==="online")return head+`<textarea class="wtext" id="wr-text" aria-label="Bài viết" spellcheck="false" placeholder="Écrivez ici…"></textarea>
    <div class="wbar"><span class="wcount" id="wr-count">0 mot</span><span class="wbtns"><button type="button" class="wbtn" id="wr-stop" hidden>Dừng</button><button type="button" class="wbtn go" id="wr-ask">Nhờ Claude chấm</button></span></div>
    <div class="wfb" id="wr-fb" hidden></div>`;
  const lines=Math.max(5,Math.ceil(b.max/11));
  return head+Array.from({length:lines},()=>'<div class="wline"></div>').join("");
}
const ORAL_STEPS=[["Thème du document","Ce document traite de…"],["Problématique","Une question ouverte : Faut-il… ? Peut-on… ?"],["Plan annoncé","D'abord… ensuite… enfin…"],["Arguments et exemples","2 ou 3 arguments, chacun avec un exemple"],["Conclusion et ouverture","Réponse claire + une question pour élargir"]];
function oralHTML(b,mode){
  const doc=`<div class="passage"><h4>${esc(b.title)} <span class="theme">${esc(B2_THEMES[b.th].fr)}</span></h4><p>${esc(b.doc)}</p></div>`;
  if(mode==="key"){
    const L=b.lex.map(([fr,en,vn,fa])=>`<li><span class="fr" lang="fr">${esc(fr)}</span> — <i lang="en">${esc(en)}</i> — ${esc(vn)}${fa?`<br><span class="fa">⚠ ${esc(fa)}</span>`:""}</li>`).join("");
    return `<div class="okey">
      <p class="ins">Gợi ý tham khảo, không phải đáp án duy nhất. Bạn có thể bảo vệ quan điểm ngược lại, miễn là lập luận chặt chẽ.</p>
      <h4>Problématique possible</h4><p>${esc(b.prob)}</p>
      <h4>Introduction modèle</h4><p lang="fr">« Le document que j'ai tiré s'intitule <i>${esc(b.title)}</i>. Il aborde la question suivante : ${esc(b.prob.replace(/ \?$/,""))} ? Dans un premier temps, je reconnaîtrai les arguments de ceux qui pensent le contraire ; dans un second temps, j'expliquerai pourquoi je suis plutôt favorable à l'idée selon laquelle… »</p>
      <div class="ocols"><div><h4>Pistes « oui »</h4><ul>${b.pour.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><h4>Pistes « non »</h4><ul>${b.contre.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
      <h4>Plan possible</h4><ol class="oplan"><li><b>Concession :</b> Certes, … <i>(idée : ${esc(b.contre[0])})</i></li><li><b>Argument 1 :</b> Néanmoins, … <i>(idée : ${esc(b.pour[0])})</i>. En effet… + exemple</li><li><b>Argument 2 :</b> De surcroît, … <i>(idée : ${esc(b.pour[1])})</i>. À titre d'exemple…</li><li><b>Conclusion :</b> En somme… Une question se pose alors : … ?</li></ol>
      <h4>Lexique utile</h4><ul class="olex">${L}</ul>
      <h4>Phrases pour le débat</h4><ul><li lang="fr">Je comprends votre point de vue, mais je ne le partage pas entièrement.</li><li lang="fr">Si je peux me permettre, je reviendrais sur ce que vous venez de dire…</li><li lang="fr">C'est un argument intéressant ; toutefois, il me semble que…</li></ul>
    </div>`;
  }
  const cons=`<p class="consigne">Préparation : 30 minutes. Dégagez le thème et la problématique du document, puis présentez votre point de vue de manière argumentée, sous la forme d'un exposé structuré de quelques minutes. Vous défendrez ensuite votre opinion lors d'un débat avec l'examinateur.</p>`;
  if(mode==="online")return cons+doc+`<p class="ins">Ghi dàn ý hoặc viết ra bài nói của bạn (bằng tiếng Pháp), rồi nhờ Claude nhận xét như giám khảo.</p>
    <textarea class="wtext" id="or-text" aria-label="Dàn ý bài nói" spellcheck="false" placeholder="Introduction : …&#10;Concession : Certes, …&#10;Argument 1 : …&#10;Argument 2 : …&#10;Conclusion : …"></textarea>
    <div class="wbar"><span class="wcount" id="or-count">0 mot</span><span class="wbtns"><button type="button" class="wbtn" id="or-stop" hidden>Dừng</button><button type="button" class="wbtn go" id="or-ask">Nhờ Claude nhận xét</button></span></div>
    <div class="wfb" id="or-fb" hidden></div>`;
  return cons+doc+`<table class="ogrid"><tbody>${ORAL_STEPS.map(([h,t])=>`<tr><th>${esc(h)}<small>${esc(t)}</small></th><td><div class="wline"></div><div class="wline"></div></td></tr>`).join("")}</tbody></table>`;
}
function headHTML(mode){
  const T=S.test,P=totalPoints(),lv=T.levels.join(" · ")||"A2";
  if(T.form==="concours")return `<div class="vnhead"><div><b>LE LABO DE FRANÇAIS</b><span>ĐỀ LUYỆN TẬP</span></div><div><b>${mode==="key"?"HƯỚNG DẪN CHẤM · ĐÁP ÁN":"ĐỀ LUYỆN THI TUYỂN SINH"}</b><span>MÔN: TIẾNG PHÁP · Trình độ ${esc(lv)}</span><i>Thời gian làm bài: ${T.minutes} phút (không kể thời gian giao đề)</i></div></div>
    ${mode==="key"?"":`<div class="cand"><span>Họ và tên thí sinh: <i></i></span><span>Số báo danh: <i class="sh"></i></span><span>Ngày sinh: <i></i></span><span>Phòng thi: <i class="sh"></i></span></div>`}
    ${T.title&&T.title!=="Test de grammaire"?`<p class="vtitle">${esc(T.title)}</p>`:""}`;
  if(T.form==="delf"){const d=T.secs.find(x=>x.t==="delf"),w=T.secs.some(x=>x.t==="write"),o=T.secs.some(x=>x.t==="oral");const L2=d?d.block.lv:lv;
    const parts=[d?"Compréhension des écrits":"",w?"Production écrite":"",o?"Production orale":""].filter(Boolean);
    const lbl=parts.length>1?parts.slice(0,-1).join(", ")+" et "+parts[parts.length-1].toLowerCase():parts[0]||"";
    return `<div class="vnhead delf"><div><b>DELF ${esc(L2)}</b><span>Sujet d'entraînement · Le Labo</span></div><div><b>${mode==="key"?"Corrigé":esc(lbl)}</b><span>Durée : ${T.minutes>=60?Math.floor(T.minutes/60)+" h"+(T.minutes%60?" "+(T.minutes%60):""):T.minutes+" min"}${o?" (dont 30 min de préparation orale)":""}</span><i>Note : ……… / ${25*parts.length}</i></div></div>
    ${mode==="key"?"":`<div class="cand"><span>Code candidat : <i></i></span><span>Nom, prénom : <i></i></span></div>`}
    <p class="delfnote">Sujet d'entraînement rédigé par Le Labo au format du DELF ${esc(L2)}. Ce n'est pas un sujet officiel. Sujets officiels : <a href="${FEI_SUJETS[L2]||FEI_SUJETS.A2}" target="_blank" rel="noopener">France Éducation international, DELF ${esc(L2)}, exemples de sujets</a>.</p>`;}
  return null;
}
function timerHTML(){
  const T=S.test;if(T.form==="practice")return "";
  const t=S.timer||{left:T.minutes*60,running:false};
  return `<div class="timerbar" id="timerBar"><span>Thời gian làm bài: <b id="tmLeft">${fmtClock(t.left)}</b></span>${t.running?'<span class="sub2">Đang tính giờ: hết giờ bài sẽ tự nộp.</span>':`<button type="button" id="tmStart">Bắt đầu tính giờ</button><span class="sub2">Không bắt buộc: bạn vẫn có thể làm không giới hạn thời gian.</span>`}</div>`;
}
const fmtClock=sec=>{sec=Math.max(0,Math.floor(sec));return Math.floor(sec/60)+":"+String(sec%60).padStart(2,"0");};
function startTimer(){
  if(!S.test)return;
  if(!S.timer||!S.timer.running){S.timer={left:S.test.minutes*60,running:true,id:S.test.id};}
  clearInterval(S.timerIv);
  S.timerIv=setInterval(()=>{
    if(!S.timer||!S.timer.running||!S.test||S.timer.id!==S.test.id){clearInterval(S.timerIv);return;}
    S.timer.left--;
    const el=$("tmLeft");if(el){el.textContent=fmtClock(S.timer.left);el.classList.toggle("warn",S.timer.left<=300);}
    if(S.timer.left<=0){S.timer.running=false;clearInterval(S.timerIv);if(S.view==="online"){setStatus("Hết giờ: bài đã được nộp tự động.","err");grade();}}
  },1000);
  renderPaper();
}
function stopTimer(){if(S.timer)S.timer.running=false;clearInterval(S.timerIv);}
function paperHTML(mode){
  const T=S.test;const roman=["I","II","III","IV","V","VI","VII","VIII","IX","X"];const P=totalPoints();
  const special=headHTML(mode);
  const head=special||`<div class="ph"><div class="ph-top"><span class="ph-lv">Niveau ${T.levels.join(" · ")||"—"}</span><span>${mode==="key"?"Corrigé":"Français langue étrangère"}</span></div>
    <h2>${esc(T.title)}${mode==="key"?" — Corrigé":""}</h2>
    ${mode==="key"?"":`<div class="ph-fields"><span>Nom : <i></i></span><span>Date : <i></i></span><span>Note : <i class="short"></i> / ${P}${T.secs.some(s=>s.t==="write")?" + écrit /25":""}</span></div>`}</div>`;
  let part=0,ex=0;
  const partCount={};T.secs.forEach(s=>{const p=CONC_PART[s.t];partCount[p]=(partCount[p]||0)+secPoints(s);});
  const secs=T.secs.map((s,k)=>{
    const pts=secPoints(s);
    let h,cons;
    if(T.form==="concours"){
      const p=CONC_PART[s.t];let ph="";
      if(p!==part){part=p;ph=`<h3 class="vpart">PARTIE ${roman[p-1]}. ${CONC_PART_NAME[p]}${partCount[p]?` (${partCount[p]} QUESTIONS)`:""}</h3>`;}
      ex++;
      h=ph+`<p class="vtask"><b>Exercice ${ex}.</b> ${mode==="key"?esc(TYPES[s.t].h):esc(TYPES[s.t].fr||TYPES[s.t].h)}</p>`;cons="";
      if(s.t==="read")s.block._start=s.start;
    }else if(T.form==="delf"){
      h=`<h3>${TYPES[s.t].h} <span class="pts">(25 points)</span></h3>`;
      cons=mode==="key"||s.t==="oral"?"":`<p class="consigne">${s.t==="delf"?TYPES.delf.fr:"Vous traiterez le sujet suivant."}</p>`;
    }else{
      h=`<h3>Partie ${roman[k]}. ${TYPES[s.t].h}${pts?` <span class="pts">(${pts} point${pts>1?"s":""})</span>`:s.t==="write"?' <span class="pts">(/25)</span>':""}</h3>`;
      cons=mode==="key"||!TYPES[s.t].fr?"":`<p class="consigne">${TYPES[s.t].fr}</p>`;
    }
    let body="";
    if(s.items){
      const box=s.t==="box"&&mode!=="key"?`<div class="box">${s.words.map(esc).join("<span>·</span>")}</div>`:"";
      body=box+`<ol class="qs${s.t==="conj"&&mode!=="key"?" cols":""}">${s.items.map(i=>sentHTML(i,mode)).join("")}</ol>`;
    }else if(s.t==="cloze"||s.t==="ow")body=clozeHTML(s.block,mode,s);
    else if(s.t==="delf")body=delfHTML(s.block,mode);
    else if(s.t==="read")body=readHTML(s.block,mode);
    else if(s.t==="oral")body=oralHTML(s.block,mode);
    else body=writeHTML(s.block,mode);
    return `<section class="sec${mode==="key"?" key":""}">${h}${cons}${body}</section>`;
  }).join("");
  const foot=T.form==="concours"?`<div class="vnend">---------- HẾT ----------</div><p class="vnnote">(Thí sinh không được sử dụng tài liệu. Cán bộ coi thi không giải thích gì thêm.)</p>`:T.form==="delf"?`<div class="vnend">Fin de l'épreuve</div>`:"";
  return (mode==="online"?timerHTML():"")+head+secs+(mode==="online"?foot+`<div class="submitrow"><button class="again" type="button" id="resetBtn">Xoá bài làm</button><button class="go" type="button" id="submitBtn">Nộp bài</button></div>`:(foot||`<div class="foot">${P} points</div>`));
}
function renderPaper(){
  if(!S.test)return;
  $("paper").innerHTML=paperHTML(S.view);
  $("paper").className="paper form-"+S.test.form;
  const tb=$("tmStart");if(tb)tb.onclick=startTimer;
  if(S.view==="online"){
    $("submitBtn").onclick=grade;
    $("resetBtn").onclick=()=>{S.marks={};$("result").classList.add("hidden");renderPaper();};
    wireWriting();wireOral();
  }else $("result").classList.add("hidden");
}
function setView(v){S.view=v;["test","key","online"].forEach(x=>$("tab-"+x).setAttribute("aria-selected",x===v));S.marks={};renderPaper();}
["test","key","online"].forEach(v=>$("tab-"+v).onclick=()=>setView(v));

/* ---------- Grading ---------- */
const norm=s=>String(s||"").normalize("NFC").toLowerCase().replace(/[’`´]/g,"'").replace(/[«»"]/g,"").replace(/\s*'\s*/g,"'").replace(/\s*-\s*/g,"-").replace(/\s*([,;:!?.])\s*/g,"$1 ").replace(/\s+/g," ").replace(/[\s.!?]+$/,"").trim();
const bare=s=>norm(s).normalize("NFD").replace(/[̀-ͯ]/g,"");
function compare(acc,v){
  if(!String(v||"").trim())return "empty";
  if(acc.some(a=>norm(a)===norm(v)))return "ok";
  if(acc.some(a=>bare(a)===bare(v)))return "near";
  return "bad";
}
function accepted(it){
  if(it.t==="err")return it.a.flatMap(a=>[a,it.q.replace(it.w,a)]);
  if(it.t==="conj"){const pr=PRON[it.p];return it.a.flatMap(f=>[f,elide(pr,f),...(it.tense==="subj"?["que "+elide(pr,f),"qu'"+pr+" "+f]:[])]);}
  return it.a;
}
const val=id=>{const el=$(id);return el?el.value:"";};
const radio=name=>{const r=document.querySelector(`input[name="${name}"]:checked`);return r?r.value:null;};
function fbBox(el,state,html,selfable){
  if(!el)return;
  el.classList.remove("ok","bad","near","self");el.classList.add(state);
  el.querySelector(":scope > .fb")?.remove();
  const d=document.createElement("div");d.className="fb";d.innerHTML=html+(selfable?` <button type="button" class="selfok" data-self="${el.dataset.key}">Tôi trả lời đúng</button>`:"");
  el.appendChild(d);
}
const label={ok:"<b>Đúng.</b>",near:"<b>Gần đúng: kiểm tra lại dấu.</b>",bad:"<b>Chưa đúng.</b>",empty:"<b>Bỏ trống.</b>",self:"<b>Chưa khớp đáp án mẫu.</b> Câu của bạn có thể vẫn đúng, hãy tự đối chiếu."};
function topicName(t){if(!t)return "";if(t.startsWith("cul-"))return "Văn hoá – "+(THEMES[t.slice(4)]||"");if(t==="ai")return "Câu Claude soạn";if(t.startsWith("conj-"))return "Chia động từ – "+TENSES[t.slice(5)].fr;return TOPIC[t]?.fr||t;}
const plain=h=>{const d=document.createElement("div");d.innerHTML=h;return d.textContent.replace(/\s+/g," ").trim();};
const topicOf=it=>it.t==="conj"?CONJ_TOPIC[it.tense]:it.topic;
const cut=s=>String(s||"").slice(0,90);
function grade(){
  S.marks={};S.meta={};S.qinfo={};
  for(const s of S.test.secs){
    if(s.items)for(const it of s.items){
      const key="s"+it.num,li=document.querySelector(`.q[data-key="${key}"]`);
      let st,given="";
      if(it.t==="qcm"||it.t==="cul"||it.t==="ph"){const r=radio("ans-"+key);given=r;st=r===null?"empty":(+r===it.a?"ok":"bad");}
      else{
        let v=val("ans-"+key);
        if((it.t==="qu"||it.t==="kt")&&v.trim()&&!norm(v).startsWith(norm(it.s)))v=it.s+" "+v;
        st=compare(accepted(it),v);
        if(st==="bad"&&OPEN_TYPES.has(it.t))st="self";
      }
      S.marks[key]=st==="empty"?"bad":st;S.meta[key]=topicName(it.topic);
      const right=keyAnswer(it).replace(/<br>/g," · ");
      S.qinfo[key]={qk:it.key,topic:topicOf(it),type:it.t,kind:REC_TYPES.has(it.t)?"rec":"prod",given:cut(it.t==="qcm"||it.t==="cul"||it.t==="ph"?(given!==null&&given!==""&&given!==undefined?it.o[+given]:""):val("ans-"+key)),expected:cut(plain(right)),near:st==="near",empty:st==="empty"};
      fbBox(li,st==="empty"?"bad":st,`${label[st]}${st!=="ok"?" Đáp án: "+right+".":""}${it.e?" "+(it.c?"<b>Le saviez-vous ?</b> "+esc(it.e):esc(it.e)):""}${enOn()&&it.en?` <span class="ennote"><b>EN</b> ${esc(it.en)}</span>`:""}`,st==="self");
    }
    else if(s.t==="cloze"||s.t==="ow"){
      const wrong=[],pre=s.t==="ow"?"o":"c",base=S.test.form==="concours"?s.start:1;
      s.block.gaps.forEach((g,k)=>{
        const el=$("ans-"+pre+k);const st=compare(g.a,el?el.value:"");
        if(el){el.classList.remove("ok","bad","near");el.classList.add(st==="empty"?"bad":st);}
        S.marks[pre+k]=st==="ok"?"ok":(st==="near"?"near":"bad");S.meta[pre+k]=topicName(s.block.topic)||TYPES[s.t].h;
        S.qinfo[pre+k]={qk:(s.t==="ow"?"ow:":"cz:")+s.block.title+":"+k,topic:s.block.topic,type:s.t,kind:"prod",given:cut(el?el.value:""),expected:cut(g.a[0]),near:st==="near",empty:st==="empty"};
        if(st!=="ok")wrong.push(`(${base+k}) ${g.a.map(esc).join(" / ")}${st==="near"?" (sai dấu)":""}`);
      });
      const slot=document.querySelector(`.fbslot[data-key="${pre}"]`);
      if(slot)slot.innerHTML=`<div class="fb ${wrong.length?"":"okb"}">${wrong.length?"<b>Đáp án các chỗ chưa đúng:</b> "+wrong.join(" · "):"<b>Đúng hết!</b>"}</div>`;
    }
    else if(s.t==="delf"){
      s.block.exercises.forEach((ex,e)=>ex.qs.forEach((q,k)=>{
        const key="d"+e+"_"+k,li=document.querySelector(`.q[data-key="${key}"]`);
        const r=radio("ans-"+key);const st=r===null?"empty":(+r===q.a?"ok":"bad");
        S.marks[key]=st==="empty"?"bad":st;S.meta[key]="Compréhension des écrits · exercice "+(e+1);
        S.qinfo[key]={qk:"dl:"+s.block.lv+":"+ex.title+":"+k,topic:"lecture",type:"read-mc",kind:"rec",given:cut(r===null?"":q.o[+r]),expected:cut(q.o[q.a]),near:false,empty:st==="empty"};
        fbBox(li,st==="empty"?"bad":st,`${label[st]}${st!=="ok"?" Đáp án: "+lab(q.a)+" "+esc(q.o[q.a])+".":""}`,false);
      }));
    }
    else if(s.t==="read"){
      s.block.qs.forEach((q,k)=>{
        const key="r"+k,li=document.querySelector(`.q[data-key="${key}"]`);let st;
        if(q.k==="tf"){const r=radio("ans-"+key);st=r===null?"empty":((r==="1")===q.a?"ok":"bad");}
        else if(q.k==="mc"){const r=radio("ans-"+key);st=r===null?"empty":(+r===q.a?"ok":"bad");}
        else{st=compare(q.a,val("ans-"+key));if(st==="bad")st="self";}
        S.marks[key]=st==="empty"?"bad":st;S.meta[key]="Compréhension écrite";
        S.qinfo[key]={qk:"rd:"+s.block.title+":"+k,topic:"lecture",type:"read-"+q.k,kind:q.k==="open"?"prod":"rec",given:cut(q.k==="open"?val("ans-"+key):""),expected:cut(q.k==="tf"?(q.a?"Vrai":"Faux"):q.k==="mc"?q.o[q.a]:q.a[0]),near:st==="near",empty:st==="empty"};
        const right=q.k==="tf"?`${q.a?"Vrai":"Faux"}. Justification : « ${esc(q.j||"")} »`:q.k==="mc"?`${lab(q.a)} ${esc(q.o[q.a])}`:q.a.map(esc).join(" · ");
        fbBox(li,st==="empty"?"bad":st,`${label[st]} ${q.k==="tf"||st!=="ok"?"Đáp án: "+right+".":""}`,st==="self");
      });
    }
  }
  stopTimer();
  recordProgress();
  summary(true);
}
/* ---------- Progress hook: one recorded session per generated test ---------- */
function recordProgress(){
  const T=S.test;
  /* unanswered items are not attempts: they are left out of the record */
  const entries=Object.entries(S.qinfo).filter(([k,q])=>q.topic&&TOPICS[q.topic]&&q.qk&&!q.empty);
  const topics=[...new Set(entries.map(([k,q])=>q.topic))];
  S.libBefore=Progress.snapshotStates(topics);S.libTopics=topics;
  if(T.recorded||Store.hasSession(T.id)){T.recorded=true;S.libStatus="already";return;}
  if(!entries.length){S.libStatus="none";return;}
  const attempts=entries.map(([k,q])=>({qk:q.qk,topic:q.topic,type:q.type,kind:q.kind,ok:S.marks[k]==="ok",near:!!q.near,self:false,given:q.given,expected:q.expected}));
  const score=attempts.filter(a=>a.ok).length;
  Store.addSession({id:T.id,ts:Date.now(),src:T.src,mode:T.mode,topics,n:attempts.length,total:attempts.length,score},attempts);
  T.recorded=true;S.libStatus="new";
  Library.markProgressed(topics.filter(id=>Progress.topic(id).si>(S.libBefore[id]||{si:0}).si));
}
function libraryProgressHTML(){
  if(S.libStatus==="none")return `<div class="libprog"><h4>Votre bibliothèque progresse</h4><p class="sub">Chưa có câu nào được trả lời nên không ghi tiến độ. Câu bỏ trống không được tính là một lượt làm.</p></div>`;
  if(!S.libTopics||!S.libTopics.length)return "";
  if(S.libStatus==="already")return `<div class="libprog"><h4>Votre bibliothèque progresse</h4><p class="sub">Bài này đã được ghi nhận lúc nộp lần đầu, nên lần nộp lại không được tính thêm. Tạo đề mới để ghi thêm tiến độ.</p></div>`;
  const rows=S.libTopics.map(id=>{
    const t=Progress.topic(id),b=S.libBefore[id]||{si:0};
    const sess=Object.entries(S.qinfo).filter(([k,q])=>q.topic===id&&!q.empty);
    const n=sess.length,ok=sess.filter(([k])=>S.marks[k]==="ok").length;
    const prod=sess.filter(([k,q])=>q.kind==="prod"),pOk=prod.filter(([k])=>S.marks[k]==="ok").length;
    let msg,cls="";
    if(t.si>b.si){msg=t.si===5?"tous les critères de maîtrise sont réunis":`progression enregistrée (${STATES[b.si].fr} → ${t.state.fr})`;cls="up";}
    else if(n>=2&&ok/n<0.6){msg="révision recommandée";cls="warn";}
    else if(prod.length>=2&&pOk/prod.length<0.6){msg="production à renforcer";cls="warn";}
    else if(t.attempts<MASTERY_CONFIG.minForRate){msg="progression enregistrée · données encore insuffisantes";}
    else msg="progression enregistrée";
    return `<li class="${cls}"><b>${esc(topicLabel(id))}</b> — ${msg} <span class="sub">(${ok}/${n} trong bài này · trạng thái: ${t.state.fr})</span></li>`;
  }).join("");
  return `<div class="libprog"><h4>Votre bibliothèque progresse</h4><ul>${rows}</ul>${Store.mode()==="local"?'<p class="sub">Tiến độ đang lưu trên trình duyệt này. Hãy xuất file sao lưu định kỳ ở trang Lab.</p>':""}<a class="linkbtn" href="#bibliotheque">Mở Grammaire →</a></div>`;
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-self]");if(!b)return;
  const key=b.dataset.self;S.marks[key]="ok";
  if(S.test&&S.test.recorded&&S.libStatus==="new"&&S.qinfo&&S.qinfo[key])Store.markSelfCorrect(S.test.id,S.qinfo[key].qk);
  const li=document.querySelector(`.q[data-key="${key}"]`);if(li){li.classList.remove("self","bad","near");li.classList.add("ok");}
  b.remove();summary(false);
});
function summary(scroll){
  const keys=Object.keys(S.marks);if(!keys.length)return;
  const N=keys.length,score=keys.filter(k=>S.marks[k]==="ok").length,self=keys.filter(k=>S.marks[k]==="self").length;
  const sur20=Math.round(score/N*40)/2,pct=Math.round(score/N*100);
  const weak={};keys.forEach(k=>{if(S.marks[k]!=="ok"&&S.meta[k])weak[S.meta[k]]=(weak[S.meta[k]]||0)+1;});
  const w=Object.entries(weak).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const r=$("result");r.classList.remove("hidden");
  let examLine="";
  if(S.test.form==="delf"){
    const dk=keys.filter(k=>k.startsWith("d")),ds=dk.filter(k=>S.marks[k]==="ok").length;
    const s25=dk.length?Math.round(ds/dk.length*50)/2:0;
    examLine=`<div class="examline"><b>Compréhension des écrits : ${String(s25).replace(".",",")} / 25</b> · ${s25>=5?"đạt ngưỡng tối thiểu 5/25 của phần này":"<span class=\"bad\">dưới ngưỡng loại 5/25</span>"}. Để có bằng DELF cần tổng 50/100 trên cả 4 phần thi.${S.test.secs.some(x=>x.t==="write")?" Phần viết: bấm « Nhờ Claude chấm » để có điểm ước tính /25.":""}${S.test.secs.some(x=>x.t==="oral")?" Phần nói: bấm « Nhờ Claude nhận xét » dưới dàn ý, rồi tập nói thành tiếng và bấm giờ.":""}</div>`;
  }else if(S.test.form==="concours"){
    examLine=`<div class="examline"><b>Điểm thang 10: ${String(Math.round(score/N*20)/2).replace(".",",")}</b> (${score}/${N} câu đúng${self?", chưa tính các câu tự luận bạn chưa tự đối chiếu":""}).</div>`;
  }
  r.innerHTML=`<div class="big">${score}<small> / ${N}</small></div>
    <div><div style="font-weight:600">${pct>=80?"Rất tốt!":pct>=50?"Đạt, nhưng còn vài lỗ hổng.":"Cần ôn lại các chủ điểm bên dưới."}</div>
    <div class="sub">Thang 20 kiểu Pháp: <b>${String(sur20).replace(".",",")}/20</b> · ${pct}%${self?` · ${self} câu tự luận chưa khớp đáp án mẫu: tự đối chiếu, nếu đúng thì bấm "Tôi trả lời đúng"`:""}</div></div>
    <div class="meter"><i style="width:${pct}%"></i></div>${examLine}
    ${w.length?`<div class="weak">Phần sai nhiều nhất:<ul>${w.map(([k,v])=>`<li>${esc(k)}: ${v} câu</li>`).join("")}</ul></div>`:""}
    ${libraryProgressHTML()}`;
  if(scroll)r.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
}

/* ---------- Writing feedback with Claude ---------- */
function wireWriting(){
  const ta=$("wr-text");if(!ta)return;
  const sec=S.test.secs.find(s=>s.t==="write");const b=sec.block;
  const cnt=()=>{const n=(ta.value.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]).length;const el=$("wr-count");el.textContent=`${n} mot${n>1?"s":""} · cần ${b.min}–${b.max}`;el.className="wcount"+(n&&n<b.min?" low":n>b.max*1.1?" high":"");return n;};
  ta.addEventListener("input",cnt);cnt();
  const ask=$("wr-ask"),stop=$("wr-stop"),fb=$("wr-fb");
  if(!sample){ask.disabled=true;ask.title="Chỉ dùng được khi mở trang trong Claude.";return;}
  stop.onclick=()=>wrCtl?.abort();
  ask.onclick=async()=>{
    const text=ta.value.trim();
    if(cnt()<10){fb.hidden=false;fb.textContent="Hãy viết ít nhất vài câu trước khi nhờ chấm.";return;}
    wrCtl=new AbortController();ask.disabled=true;stop.hidden=false;fb.hidden=false;fb.textContent="Claude đang đọc bài…";
    const prompt=`Bạn là giám khảo DELF ${b.lv}. Chấm bài production écrite của một học viên người Việt (trình độ hiện tại khoảng A2, mục tiêu DELF B2, tiếng Anh khoảng B1–B2).
Đề bài: ${b.p}
Độ dài yêu cầu: ${b.min}–${b.max} từ. Tiêu chí: ${b.req.join("; ")}.
${b.lv==="A2"?"Đối chiếu thang mô tả năng lực DELF A2 (dưới A2 / A2 / A2+): hoàn thành nhiệm vụ (bài kể: kể được sự việc, trải nghiệm và nêu cảm nhận; bài thư: có đủ các hành động lời nói đề yêu cầu), mạch lạc (câu đơn nối bằng từ nối cơ bản hoặc theo trình tự thời gian), phù hợp ngữ cảnh giao tiếp (chào, tu/vous, lời kết), từ vựng, ngữ pháp và chính tả. Nói rõ bài đang ở mức nào và cần gì để lên A2+.\n":""}Bài làm:
"""
${text.slice(0,6000)}
"""
Trả lời bằng tiếng Việt, ngắn gọn, đúng cấu trúc sau, không dùng markdown đậm/nghiêng:
1. Điểm ước tính: x/25 theo barème DELF ${b.lv}, kèm nhận xét 1 câu cho mỗi tiêu chí chính (hoàn thành nhiệm vụ, từ vựng, ngữ pháp, mạch lạc).
2. Sửa lỗi: liệt kê từng lỗi dạng « sai » → « đúng », giải thích ngắn bằng tiếng Việt và ghi tên điểm ngữ pháp. Nếu câu bị "Anh hóa" (dịch thẳng từ tiếng Anh) thì nói rõ.
3. Gợi ý diễn đạt tự nhiên hơn: 2–3 câu, chỉ cao hơn trình độ của bài một bậc.
4. Hai lỗi cần ưu tiên khắc phục.
Không viết lại toàn bộ bài.${typeof ErrLog!=="undefined"?ErrLog.promptTail():""}`;
    try{
      const out=await sample(prompt,{signal:wrCtl.signal,cache:false,onText:({text})=>{fb.textContent=typeof ErrLog!=="undefined"?ErrLog.strip(text):text;}});
      if(typeof ErrLog!=="undefined"){const full=String(out&&out.text!=null?out.text:out||"");const n=ErrLog.parseAndSave(full,{src:"write",lv:b.lv,ctx:b.p});fb.textContent=ErrLog.strip(full)+ErrLog.savedNote(n);}
    }catch(e){
      if(e&&e.code==="cancelled"){fb.textContent=(typeof ErrLog!=="undefined"?ErrLog.strip(e.text||""):(e.text||""))+"\n\n(Đã dừng.)";}
      else{fb.textContent=(e&&e.text?e.text+"\n\n":"")+({not_granted:"Bạn chưa cho phép trang dùng Claude.",rate_limited:"Đã chạm giới hạn lượt dùng Claude, thử lại sau.",refused:"Claude không chấm được bài này."}[e&&e.code]||"Không chấm được lúc này, thử lại sau.");}
    }finally{ask.disabled=false;stop.hidden=true;}
  };
}

/* ---------- Oral outline feedback with Claude ---------- */
function wireOral(){
  const ta=$("or-text");if(!ta)return;
  const b=S.test.secs.find(s=>s.t==="oral").block;
  const cnt=()=>{const n=(ta.value.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]).length;$("or-count").textContent=`${n} mot${n>1?"s":""}`;return n;};
  ta.addEventListener("input",cnt);cnt();
  const ask=$("or-ask"),stop=$("or-stop"),fb=$("or-fb");
  if(!sample){ask.disabled=true;ask.title="Chỉ dùng được khi mở trang trong Claude.";return;}
  stop.onclick=()=>orCtl?.abort();
  ask.onclick=async()=>{
    const text=ta.value.trim();
    if(cnt()<15){fb.hidden=false;fb.textContent="Hãy viết dàn ý (ít nhất phần mở bài và hai luận điểm) trước khi nhờ nhận xét.";return;}
    orCtl=new AbortController();ask.disabled=true;stop.hidden=false;fb.hidden=false;fb.textContent="Claude đang đọc dàn ý…";
    const prompt=`Bạn là giám khảo phần Production orale DELF B2 (trình bày và bảo vệ quan điểm từ một tài liệu ngắn). Học viên người Việt, trình độ hiện tại khoảng A2–B1, mục tiêu B2, tiếng Anh B1–B2.
Tài liệu: « ${b.title} » — ${b.doc}
Dưới đây là dàn ý hoặc bài nói học viên chuẩn bị (viết ra giấy):
"""
${text.slice(0,5000)}
"""
Trả lời bằng tiếng Việt, ngắn gọn, đúng cấu trúc sau, không dùng markdown đậm/nghiêng:
1. Nhận xét theo tiêu chí phần độc thoại DELF B2: nêu được chủ đề và vấn đề (problématique); bố cục rõ, có báo trước dàn ý; luận điểm có giải thích và ví dụ; từ nối; từ vựng; ngữ pháp. Mỗi tiêu chí 1 câu. Không cho điểm số vì phần nói còn phụ thuộc phát âm và tương tác.
2. Sửa lỗi: liệt kê từng lỗi dạng « sai » → « đúng », giải thích ngắn bằng tiếng Việt và ghi tên điểm ngữ pháp. Nếu câu bị "Anh hóa" thì nói rõ.
3. Gợi ý diễn đạt tự nhiên hơn: 2–3 câu, chỉ cao hơn trình độ của bài một bậc.
4. Ba câu giám khảo có thể hỏi ở phần débat để phản biện quan điểm của học viên (bằng tiếng Pháp, kèm nghĩa tiếng Việt).
Không viết lại toàn bộ bài.`;
    try{await sample(prompt,{signal:orCtl.signal,cache:false,onText:({text})=>{fb.textContent=text;}});}
    catch(e){
      if(e&&e.code==="cancelled"){fb.textContent=(e.text||"")+"\n\n(Đã dừng.)";}
      else{fb.textContent=(e&&e.text?e.text+"\n\n":"")+({not_granted:"Bạn chưa cho phép trang dùng Claude.",rate_limited:"Đã chạm giới hạn lượt dùng Claude, thử lại sau.",refused:"Claude không nhận xét được bài này."}[e&&e.code]||"Không nhận xét được lúc này, thử lại sau.");}
    }finally{ask.disabled=false;stop.hidden=true;}
  };
}

/* ---------- Downloads ---------- */
const fileBase=()=>($("title").value.trim()||"test-francais").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/gi,"d").replace(/[^\w\- ]+/g,"").trim().replace(/\s+/g,"-").toLowerCase()||"test-francais";
function printBody(withKey){const f="form-"+S.test.form;return `<div class="paper print ${f}">${paperHTML("test")}</div>`+(withKey?`<div class="page-break"></div><div class="paper print ${f}">${paperHTML("key")}</div>`:"");}
function savePaperHTML(withKey){
  const css=$("paper-css").textContent;
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>${esc(S.test.title)}</title><link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"><style>body{margin:0;background:#fff}${css}.paper.print{margin:0 auto}@media print{@page{size:A4;margin:12mm}.paper.print{width:auto;padding:0}}</style></head><body>${printBody(withKey)}</body></html>`;
}
async function doSave(filename,data){
  try{await downloads.save({filename,data});setStatus("Đã lưu "+filename+".","ok");}
  catch(e){if(e&&e.code==="declined")setStatus("Đã huỷ tải xuống.");else if(e&&e.code==="rate_limited")setStatus("Đang có một hộp thoại tải xuống mở, thử lại sau giây lát.","err");else setStatus("Không tải được file ở chế độ xem này.","err");}
}
$("dlHtml").onclick=async()=>{if(!S.test||!downloads)return;await doSave(fileBase()+".html",savePaperHTML($("withKey").checked));};
$("dlPdf").onclick=async()=>{
  if(!S.test||!downloads)return;
  if(!window.html2pdf){setStatus("Không tải được thư viện PDF. Hãy dùng \"Tải HTML\" rồi in ra PDF từ trình duyệt.","err");return;}
  const btn=$("dlPdf");btn.disabled=true;setStatus("Đang tạo PDF…");
  const host=document.createElement("div");
  host.style.cssText="position:fixed;left:-10000px;top:0;width:794px;background:#fff";
  host.innerHTML=printBody($("withKey").checked);
  document.body.appendChild(host);
  try{
    try{await document.fonts.ready;}catch(e){}
    const blob=await html2pdf().set({margin:[10,8,12,8],image:{type:"jpeg",quality:.95},html2canvas:{scale:2,backgroundColor:"#ffffff"},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},pagebreak:{mode:["css","legacy"],before:".page-break",avoid:[".q",".box",".ph",".passage"]}}).from(host).outputPdf("blob");
    await doSave(fileBase()+".pdf",blob);
  }catch(e){setStatus("Tạo PDF thất bại. Hãy dùng \"Tải HTML\" rồi in ra PDF.","err");}
  finally{host.remove();btn.disabled=false;}
};

$("build").onclick=build;
$("reshuffle").onclick=build;


/* ---------- Reading comfort: size and font (screen only; PDF keeps print settings) ---------- */
const READER={fs:16,font:"serif"};
try{const r=JSON.parse(localStorage.getItem("fr-gen-reader")||"null");if(r){READER.fs=Math.min(22,Math.max(14,+r.fs||16));READER.font=r.font==="sans"?"sans":"serif";}}catch(e){}
function applyReader(){
  const p=$("paper");p.style.setProperty("--pfs",READER.fs+"px");p.classList.toggle("sans",READER.font==="sans");
  $("fsVal").textContent=READER.fs;$("fsDown").disabled=READER.fs<=14;$("fsUp").disabled=READER.fs>=22;$("pfont").value=READER.font;
  try{localStorage.setItem("fr-gen-reader",JSON.stringify(READER));}catch(e){}
}
$("fsDown").onclick=()=>{READER.fs=Math.max(14,READER.fs-1);applyReader();};
$("fsUp").onclick=()=>{READER.fs=Math.min(22,READER.fs+1);applyReader();};
$("pfont").onchange=e=>{READER.font=e.target.value;applyReader();};
applyReader();

/* ---------- Prefill from Lab / Bibliothèque (reuses this generator, no second engine) ---------- */
function bankCountFor(topics,types){
  const P=pools();let n=0;
  for(const t of types)if(P[t])n+=P[t].filter(x=>topics.includes(x.topic)).length;
  return n;
}
function prefillGenerator(cfg){
  S.form="practice";
  const topics=(cfg.topics||[]).filter(id=>TOPIC[id]);
  const cultThemes=(cfg.topics||[]).filter(id=>id.startsWith("cul-")).map(id=>id.slice(4));
  const wantsLecture=(cfg.topics||[]).includes("lecture");
  const lv=new Set(topics.map(id=>TOPIC[id].lv));
  if(cfg.levels)cfg.levels.forEach(l=>lv.add(l));
  if(!lv.size)lv.add("A2");
  S.levels=lv;S.topics=new Set(topics);
  let types=cfg.types&&cfg.types.length?cfg.types.filter(t=>TYPES[t]):["gap","qcm","err","tr","conj"];
  if(cultThemes.length){S.themes=new Set(cultThemes);types=[...new Set([...types.filter(t=>t!=="conj"),"cul"])];}
  if(!topics.some(id=>TOPIC_TENSES[id]))types=types.filter(t=>t!=="conj");
  if(wantsLecture)types=[...new Set([...types,"read"])];
  if(!types.length)types=["qcm","gap"];
  S.types=new Set(types);
  S.count=Math.max(5,Math.min(40,cfg.count||12));
  $("count").value=S.count;$("countOut").textContent=S.count;
  if(cfg.title)$("title").value=cfg.title;
  const useAi=cfg.src==="ai"&&sample&&!$("srcAi").disabled;
  $("srcAi").checked=!!useAi;$("srcBank").checked=!useAi;
  $("build").textContent=useAi?"Nhờ Claude soạn đề":"Tạo đề";
  S.nextMode=cfg.mode||"review";
  renderForm();renderLevels();renderTypes();renderThemes();renderTopics();updateAvail();saveCfg();
  build().then(()=>{S.nextMode="free";setView("online");});
}
function renderMiniLib(){
  const el=$("miniLib");if(!el)return;
  const rec=Progress.recentTopics(3),due=Progress.dueTopics();
  const chips=rec.length?rec.map(t=>`<button type="button" class="mchip st-${t.state.id}${t.aReviser?" due":""}" data-rev="${t.id}" title="Ôn chủ điểm này">${esc(topicLabel(t.id))}<small>${t.state.fr}${t.aReviser?" · à réviser":""}</small></button>`).join(""):`<span class="sub">Chưa có dữ liệu. Nộp một bài ở chế độ "Làm online" để bắt đầu ghi tiến độ.</span>`;
  el.innerHTML=`<span class="mtitle">Ma bibliothèque</span>${chips}${due.length?`<button type="button" class="mdue" data-revall="1">${due.length} chủ điểm cần ôn</button>`:""}<a class="mlink" href="#bibliotheque">Mở thư viện →</a>`;
}
document.addEventListener("click",e=>{
  const r=e.target.closest("[data-rev]");
  if(r&&r.closest("#miniLib")){Lab.reviseTopics([r.dataset.rev]);return;}
  if(e.target.closest("#miniLib [data-revall]"))Lab.reviseTopics(Progress.dueTopics().map(t=>t.id));
});
Store.subscribe(renderMiniLib);

/* ---------- Init ---------- */
loadCfg();
$("count").value=S.count;$("countOut").textContent=S.count;
renderForm();renderLevels();renderTypes();renderThemes();renderTopics();updateAvail();
document.querySelectorAll(".dl").forEach(b=>b.disabled=true);
build();

(async()=>{
  if(!window.claude||!window.claude.use){
    downloads=ENV.localDownloads;document.querySelectorAll(".dl").forEach(b=>{b.disabled=false;b.title="";});
    disableAi("Bản tự host: tính năng Claude soạn đề và chấm bài chỉ có khi mở trang trong Claude.");return;}
  try{downloads=await claude.use("downloads");}catch(e){downloads=null;}
  document.querySelectorAll(".dl").forEach(b=>{b.disabled=!downloads;if(!downloads)b.title="Tải file không khả dụng ở chế độ xem này.";});
  try{sample=await claude.use("sample");}catch(e){sample=null;}
  if(sample){$("aiNote").textContent="Mỗi lần ra đề mới hoàn toàn, dùng lượt Claude của bạn.";if(S.view==="online")wireWriting();}
  else disableAi("Không khả dụng ở chế độ xem này.");
})();
