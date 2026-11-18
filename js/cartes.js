/* ---------- Vocabulaire: flashcards with spaced repetition ---------- */
const Cartes=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const DAY=86400000,MIN=60000;
  const LVL_ORDER=["A2","B1","VP1","VP2","B2","Mot"];
  const LVL_NAME={A2:"A2 · bộ cơ bản",B1:"B1 · bộ cơ bản",VP1:"Theo chủ đề sách · A2–B1",VP2:"Theo chủ đề sách · nâng cao (B2)",B2:"B2 (từ khoá đề nói)",Mot:"Mot du jour"};
  const LVL_NOTE={VP1:"Chủ đề và lựa chọn từ theo Vocabulaire progressif du français, niveau intermédiaire (CLE International). Câu ví dụ, nghĩa và ghi chú do Le Labo viết.",VP2:"Chủ đề và lựa chọn từ theo Vocabulaire progressif du français, niveau avancé (CLE International). Câu ví dụ, nghĩa và ghi chú do Le Labo viết."};
  const PREF_KEY="fr-cartes-prefs";
  const prefs=(()=>{try{return {dir:"fr",perNew:15,en:true,...JSON.parse(localStorage.getItem(PREF_KEY)||"{}")};}catch(e){return {dir:"fr",perNew:15,en:true};}})();
  const savePrefs=()=>{try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs));}catch(e){}};
  const isFa=(note,deckFa)=>!!deckFa||/faux ami|^≠/i.test(note||"");

  /* ----- decks ----- */
  let DECKS=null,CARD=null;
  function build(){
    if(DECKS)return;
    DECKS=[];CARD=new Map();
    const add=(deck,list)=>{
      deck.cards=list.map(([fr,en,vn,ex,note])=>{
        const id="c:"+fr.trim().toLowerCase();
        const c=CARD.get(id)||{id,fr,en,vn,ex:ex||"",note:note||"",fa:isFa(note,deck.fa)};
        if(!CARD.has(id))CARD.set(id,c);else if(!c.note&&note){c.note=note;c.fa=isFa(note,deck.fa);}
        return c;
      });
      DECKS.push(deck);
    };
    (typeof CARTES!=="undefined"?CARTES:[]).forEach(d=>add({id:d.id,lv:d.lv,fr:d.fr,vn:d.vn,fa:!!d.fa},d.c));
    if(typeof B2_ORAL!=="undefined"&&typeof B2_THEMES!=="undefined"){
      const by={};B2_ORAL.forEach(o=>(o.lex||[]).forEach(([fr,en,vn,fa])=>{(by[o.th]=by[o.th]||[]).push([fr,en,vn,"",fa||""]);}));
      Object.entries(by).forEach(([th,l])=>add({id:"b2-"+th,lv:"B2",fr:B2_THEMES[th]?B2_THEMES[th].fr:th,vn:B2_THEMES[th]?B2_THEMES[th].vn:""},l));
    }
    if(typeof MOTS!=="undefined"&&MOTS.length){
      add({id:"mots",lv:"Mot",fr:"Les mots du jour",vn:"Các từ trong mục Mot du jour"},
        MOTS.map(m=>[m.w,m.en,(m.g?m.g+" · ":"")+m.vn,(m.ex&&m.ex[0]&&m.ex[0][0])||"",""]));
    }
  }

  /* ----- scheduling (simplified SM-2) ----- */
  const st=id=>(Store.cards?Store.cards():{})[id];
  const endOfToday=()=>{const d=new Date();d.setHours(23,59,59,999);return d.getTime();};
  const dueBy=s=>!!s&&s.d<=(s.i<1?Date.now():endOfToday());
  const isDue=id=>dueBy(st(id));
  const isNew=id=>!st(id);
  function schedule(s,g,now=Date.now()){
    s=s?{...s}:{r:0,i:0,e:2.5,l:0};
    if(g===0){s.r=0;s.l=(s.l||0)+1;s.e=Math.max(1.3,s.e-0.2);s.i=0;s.d=now+10*MIN;return s;}
    if(g===1){s.i=s.r===0?0.5:Math.max(1,s.i*1.2);s.e=Math.max(1.3,s.e-0.15);}
    else if(g===2){s.i=s.r===0?1:s.r===1?3:s.i*s.e;}
    else {s.i=s.r===0?3:s.r===1?6:s.i*s.e*1.3;s.e=Math.min(3,s.e+0.15);}
    s.r+=1;s.i=Math.min(s.i,365);s.d=now+s.i*DAY;return s;
  }
  const fmtIvl=s=>{if(s.i===0)return "10 phút";if(s.i<1)return Math.round(s.i*24)+" giờ";const d=Math.round(s.i);return d<31?d+" ngày":Math.round(d/30)+" tháng";};
  const stats=cards=>{let nw=0,due=0,known=0;cards.forEach(c=>{const s=st(c.id);if(!s)nw++;else{if(dueBy(s))due++;if(s.i>=21)known++;}});return {nw,due,known,n:cards.length};};

  /* ----- session ----- */
  let S=null; // {title,queue:[card],done,again,flipped,startN}
  function start(cards,title){
    const due=cards.filter(c=>isDue(c.id)).sort((a,b)=>st(a.id).d-st(b.id).d);
    const fresh=cards.filter(c=>isNew(c.id)).slice(0,prefs.perNew);
    const q=[...due,...fresh];
    if(!q.length){S={title,queue:[],done:0,again:0,flipped:false,startN:0,empty:true};render();return;}
    S={title,queue:q,done:0,again:0,flipped:false,startN:q.length,seen:new Set()};
    render();
  }
  function grade(g){
    if(!S||!S.queue.length||!S.flipped)return;
    const c=S.queue.shift();
    Store.saveCard(c.id,schedule(st(c.id),g));
    if(g===0){S.again++;S.queue.splice(Math.min(3,S.queue.length),0,c);}else S.done++;
    S.flipped=false;render();
  }

  /* ----- practice (does not touch the schedule) ----- */
  const MODES={qcm:{t:"Trắc nghiệm",d:"Chọn nghĩa đúng trong 4 đáp án"},type:{t:"Gõ từ tiếng Pháp",d:"Nhìn nghĩa, tự gõ từ kèm mạo từ"},cloze:{t:"Điền vào câu",d:"Chọn từ còn thiếu trong câu ví dụ"},match:{t:"Ghép cặp tính giờ",d:"Ghép từ với nghĩa càng nhanh càng tốt"}};
  let P=null,pendingP=null; // {title,cards,mode,n,items,i,score,wrong,ans,...}
  const logMiss=(c,given)=>{try{if(Store.addErrs)Store.addErrs([{src:"card",cat:"tu_vung",ref:c.id,sai:String(given||"").slice(0,80),dung:c.fr}]);}catch(e){}};
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const norm=s=>String(s||"").toLowerCase().replace(/[’`´]/g,"'").replace(/\s+/g," ").replace(/\s*'\s*/g,"'").trim().replace(/[.!?]$/,"").trim();
  const noAcc=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/œ/g,"oe").replace(/æ/g,"ae");
  const ART=/^(?:(?:les|le|la|une|un|des|du|de la)\s+|l'|de l')/;
  function variants(fr){
    let base=fr.replace(/\s*\((m|f|m\/f)\)/g,"");
    const out=new Set();
    const addSuffix=s=>{const m=s.match(/^(.*?)\(([a-zàâçéèêëîïôûùüœ]{1,4})\)(.*)$/);if(m&&!/\s/.test(m[2])){addSuffix(m[1]+m[3]);addSuffix(m[1]+m[2]+m[3]);}else out.add(norm(s));};
    const expand=s=>{
      const p=s.match(/^(.*?)\s*\(([^)]{3,})\)\s*(.*)$/);           // "la faculté (la fac)"
      if(p&&/\s|^l'/.test(p[2])){expand((p[1]+" "+p[3]).trim());expand(p[2]);return;}
      const sl=s.match(/^([a-zé']+)\/([a-zé']+)\s+(.+)$/);           // "le/la colocataire"
      if(sl){expand(sl[1]+" "+sl[3]);expand(sl[2]+" "+sl[3]);return;}
      addSuffix(s);
    };
    base.split(/\s+\/\s+/).forEach(expand);
    if(base.includes(" / "))out.add(norm(base));
    return [...out].map(v=>v.replace(/\s*…\s*/g," … ").trim());
  }
  const lev=(a,b)=>{const m=a.length,n=b.length;if(Math.abs(m-n)>3)return 9;const d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n];};
  function checkTyped(card,ans){
    const a=norm(ans);if(!a)return {ok:false,kind:"empty"};
    const vs=variants(card.fr);
    if(vs.includes(a))return {ok:true};
    if(vs.some(v=>noAcc(v)===noAcc(a)))return {ok:false,kind:"accent",msg:"Đúng từ nhưng sai hoặc thiếu dấu."};
    const strip=v=>v.replace(ART,"");
    if(vs.some(v=>strip(v)===strip(a)&&strip(v)!==v))return {ok:false,kind:"article",msg:ART.test(a)?"Đúng từ nhưng sai mạo từ (sai giống).":"Đúng từ nhưng thiếu mạo từ: hãy học từ kèm le/la để nhớ giống."};
    if(vs.some(v=>lev(noAcc(v),noAcc(a))<=Math.max(1,Math.floor(v.length/8))))return {ok:false,kind:"typo",msg:"Gần đúng, còn sai chính tả."};
    return {ok:false,kind:"wrong"};
  }
  function headWord(fr){
    let h=fr.replace(/\s*\([^)]*\)/g,"").split(/\s+\/\s+|\s*…\s*/)[0].trim();
    h=h.replace(/^([a-zé']+)\/[a-zé']+\s+/,"$1 ").replace(ART,"").replace(/^(se |s')/,"");
    return h.trim();
  }
  function makeCloze(card){
    if(!card.ex)return null;
    const ex=card.ex,lo=noAcc(ex.toLowerCase());
    const h=headWord(card.fr);if(!h||h.length<3)return null;
    const hn=noAcc(h.toLowerCase());
    let i=lo.indexOf(hn);
    if(i>=0){return {pre:ex.slice(0,i),gap:ex.slice(i,i+h.length),post:ex.slice(i+h.length)};}
    const words=hn.split(/\s+/).filter(w=>w.length>=3);if(!words.length)return null;
    const key=words.sort((a,b)=>b.length-a.length)[0];
    const stem=key.slice(0,Math.max(3,key.length-(key.length>6?3:2)));
    const re=/[a-zàâçéèêëîïôûùüœ\-]+/gi;let m;
    while((m=re.exec(ex))){const w=noAcc(m[0].toLowerCase());if(w.startsWith(stem)&&w.length<=key.length+4)return {pre:ex.slice(0,m.index),gap:m[0],post:ex.slice(m.index+m[0].length)};}
    return null;
  }
  const meaning=c=>c.vn+(prefs.en?` · ${c.en}`:"");
  function startPractice(cards,title,mode,n){
    cards=cards.filter(Boolean);
    let pool=mode==="cloze"?cards.map(c=>({c,z:makeCloze(c)})).filter(x=>x.z):cards.map(c=>({c}));
    if(mode!=="match"&&pool.length<4&&mode!=="type"){P={title,cards,mode,empty:true};render();return;}
    const pickN=n==="all"?pool.length:Math.min(+n,pool.length);
    const items=shuffle(pool).slice(0,mode==="match"?Math.min(pool.length,n==="all"?pool.length:Math.max(6,+n)):pickN);
    P={title,cards,mode,n,items,i:0,score:0,wrong:[],ans:null,start:Date.now()};
    if(mode==="qcm"||mode==="cloze")items.forEach(it=>{const others=shuffle(cards.filter(c=>c.id!==it.c.id)).slice(0,3);it.opts=shuffle([it.c,...others]);});
    if(mode==="match"){P.round=0;P.rounds=[];for(let k=0;k<items.length;k+=6)P.rounds.push(items.slice(k,k+6).map(x=>x.c));if(P.rounds.length>1&&P.rounds[P.rounds.length-1].length<3){const last=P.rounds.pop();P.rounds[P.rounds.length-1].push(...last);}setupRound();P.miss=0;}
    render();
    if(mode==="type")setTimeout(()=>$("cType")?.focus(),30);
  }
  function setupRound(){const r=P.rounds[P.round];P.left=shuffle(r);P.right=shuffle(r);P.done=new Set();P.sel=null;P.bad=null;}
  function answerChoice(k){
    if(!P||P.ans!==null)return;const it=P.items[P.i];const c=it.opts[k];if(!c)return;
    P.ans=k;if(c.id===it.c.id)P.score++;else{P.wrong.push(it.c);logMiss(it.c,P.mode==="cloze"?c.fr:(prefs.dir==="fr"?c.vn:c.fr));}render();
  }
  function submitType(){
    if(!P||P.mode!=="type")return;const it=P.items[P.i];
    if(P.ans!==null){nextQ();return;}
    const v=$("cType")?.value||"";if(!v.trim())return;
    const r=checkTyped(it.c,v);P.ans={v,r};if(r.ok)P.score++;else{P.wrong.push(it.c);logMiss(it.c,v);}render();
    setTimeout(()=>$("cNext")?.focus(),30);
  }
  function recordP(){if(!P||P.saved||!P.key)return;P.saved=true;try{if(P.mode==="match")Store.savePrac(P.key+"|match",{mode:"match",ms:P.time,miss:P.miss,total:P.items.length,pct:0});else Store.savePrac(P.key+"|"+P.mode,{mode:P.mode,score:P.score,total:P.items.length,pct:Math.round(100*P.score/P.items.length)});}catch(e){}}
  function nextQ(){if(!P)return;P.i++;P.ans=null;if(P.i>=P.items.length)recordP();render();if(P.mode==="type")setTimeout(()=>$("cType")?.focus(),30);}
  function matchClick(side,id){
    if(!P||P.mode!=="match"||P.done.has(id))return;
    if(side==="l"){P.sel=id;P.bad=null;render();return;}
    if(!P.sel)return;
    if(P.sel===id){P.done.add(id);P.sel=null;P.bad=null;
      if(P.done.size===P.left.length){P.round++;if(P.round<P.rounds.length)setupRound();else{P.end=Date.now();saveBest();recordP();}}}
    else{P.miss++;const c=CARD.get(P.sel);if(c&&!P.wrong.includes(c)){P.wrong.push(c);logMiss(c,(CARD.get(id)||{}).vn);}P.bad=id;}
    render();
  }
  const BEST_KEY="fr-cartes-best";
  function saveBest(){try{const b=JSON.parse(localStorage.getItem(BEST_KEY)||"{}");const k=P.title+"|"+P.items.length;const t=P.end-P.start+P.miss*3000;P.time=t;P.prevBest=b[k];if(!b[k]||t<b[k]){b[k]=t;P.newBest=true;}localStorage.setItem(BEST_KEY,JSON.stringify(b));}catch(e){P.time=P.end-P.start+P.miss*3000;}}
  const fmtSec=ms=>(ms/1000).toFixed(1).replace(".",",")+" giây";
  const pracOf=key=>{const all=(Store.prac?Store.prac():{})||{};const out={};Object.entries(all).forEach(([k,v])=>{const [d,m]=k.split("|");if(d===key)out[m]=v;});return out;};
  const fmtAgo=ts=>{const d=Math.floor((Date.now()-ts)/DAY);return d<=0?"hôm nay":d===1?"hôm qua":d+" ngày trước";};
  function pracLine(key){const o=pracOf(key),v=Object.values(o);if(!v.length)return "";const n=v.reduce((a,x)=>a+(x.n||0),0);const last=v.sort((a,b)=>b.ts-a.ts)[0];
    return `<p class="cprac">Đã luyện ${n} lượt · gần nhất ${fmtAgo(last.ts)}: ${last.mode==="match"?"ghép cặp "+fmtSec(last.ms):`${MODES[last.mode]?MODES[last.mode].t.toLowerCase():last.mode} ${last.score}/${last.total}`}</p>`;}
  function pickerHTML(){
    const {title,cards}=P,nz=cards.filter(c=>makeCloze(c)).length;
    return `<div class="cpage">
      <div class="cbar"><button type="button" class="ghostbtn" data-chome="1">← Bộ thẻ</button><span>Luyện tập · ${esc(title)}</span><span class="cleft">${cards.length} thẻ</span></div>
      <p class="sub2">Luyện bao nhiêu cũng được. Kết quả luyện tập không thay đổi lịch ôn của thẻ.</p>
      <div class="copts"><label>Số câu <select id="cPn">${["10","20","all"].map(v=>`<option value="${v}" ${String(P.n||"10")===v?"selected":""}>${v==="all"?"Tất cả":v}</option>`).join("")}</select></label>
        <label>Chiều <select id="cDir"><option value="fr" ${prefs.dir==="fr"?"selected":""}>Pháp → Việt</option><option value="vn" ${prefs.dir==="vn"?"selected":""}>Việt → Pháp</option></select></label></div>
      <div class="pmodes">${Object.entries(MODES).map(([k,m])=>{const dis=(k==="cloze"&&nz<4)||(k!=="type"&&cards.length<4);const r=P.key?pracOf(P.key)[k]:null;return `<button type="button" class="pmode" data-pmode="${k}" ${dis?"disabled":""}><b>${m.t}</b><span>${m.d}${k==="cloze"?` · ${nz} câu`:""}</span>${r?`<small class="pmstat">${r.n} lượt · ${k==="match"?`kỷ lục ${fmtSec(r.bestMs)}`:`gần nhất ${r.score}/${r.total} · cao nhất ${r.best}%`}</small>`:""}</button>`;}).join("")}</div>
    </div>`;
  }
  function practiceHTML(){
    if(!P.mode)return pickerHTML();
    const back=`<button type="button" class="ghostbtn" data-cpback="1">← Kiểu luyện</button>`;
    if(P.empty)return `<div class="cpage"><div class="cdone"><h2>Chưa đủ thẻ cho kiểu luyện này</h2><p>Cần ít nhất 4 thẻ phù hợp.</p>${back}</div></div>`;
    const finished=P.mode==="match"?!!P.end:P.i>=P.items.length;
    if(finished){
      const head=P.mode==="match"?`<h2>Hoàn thành trong ${fmtSec(P.time)}</h2><p>${P.miss} lần ghép sai (mỗi lần cộng 3 giây).${P.newBest?" Kỷ lục mới của bạn cho bộ này!":P.prevBest?` Kỷ lục: ${fmtSec(P.prevBest)}.`:""}</p>`
        :`<h2>${P.score}/${P.items.length} câu đúng</h2><p>${P.score===P.items.length?"Tuyệt vời, không sai câu nào!":P.score/P.items.length>=0.8?"Rất tốt!":"Ôn thêm các từ dưới đây nhé."}</p>`;
      const uniq=[...new Map(P.wrong.map(c=>[c.id,c])).values()];
      return `<div class="cpage"><div class="cdone">${head}
        ${uniq.length?`<div class="pwrong"><h3>Từ cần xem lại</h3><ul>${uniq.map(c=>`<li><b lang="fr">${esc(c.fr)}</b> — ${esc(meaning(c))}${c.note?`<br><small>${c.fa?"⚠ ":""}${esc(c.note)}</small>`:""}</li>`).join("")}</ul></div>`:""}
        <div class="pend">${uniq.length>=(P.mode==="match"?1:4)||(P.mode==="type"&&uniq.length)?`<button type="button" class="gbtn" data-pwrong="1">Luyện lại các từ sai</button>`:""}<button type="button" class="ghostbtn" data-pagain="1">Luyện lượt mới</button>${back}</div></div></div>`;
    }
    const bar=`<div class="cbar">${back}<span>${esc(MODES[P.mode].t)} · ${esc(P.title)}</span><span class="cleft">${P.mode==="match"?`Lượt ${P.round+1}/${P.rounds.length}`:`Câu ${P.i+1}/${P.items.length} · đúng ${P.score}`}</span></div>
      <div class="cprog"><i style="width:${P.mode==="match"?Math.round(100*P.round/P.rounds.length):Math.round(100*P.i/P.items.length)}%"></i></div>`;
    if(P.mode==="match"){
      const L=P.left.map(c=>`<button type="button" class="mcell${P.done.has(c.id)?" done":""}${P.sel===c.id?" sel":""}" data-ml="${esc(c.id)}" lang="fr">${esc(c.fr)}</button>`).join("");
      const R=P.right.map(c=>`<button type="button" class="mcell${P.done.has(c.id)?" done":""}${P.bad===c.id?" bad":""}" data-mr="${esc(c.id)}">${esc(c.vn)}</button>`).join("");
      return `<div class="cpage">${bar}<p class="sub2">Chọn một từ tiếng Pháp ở cột trái, rồi chọn nghĩa đúng ở cột phải. Sai một lần cộng 3 giây.</p><div class="mgrid"><div class="mcol">${L}</div><div class="mcol">${R}</div></div><p class="mtimer" id="mTimer"></p></div>`;
    }
    const it=P.items[P.i],c=it.c,fr=prefs.dir==="fr";
    if(P.mode==="qcm"||P.mode==="cloze"){
      const prompt=P.mode==="cloze"?`<p class="pcloze" lang="fr">${esc(it.z.pre)}<span class="gap">${P.ans===null?"______":esc(it.z.gap)}</span>${esc(it.z.post)}</p>${P.ans===null?`<p class="sub2">Chọn từ phù hợp để điền vào chỗ trống. Từ trong câu có thể đã được chia (động từ, giống, số).</p>`:""}`
        :fr?`<p class="cw" lang="fr">${esc(c.fr)}</p>`:`<p class="cw pvn">${esc(c.vn)}</p>${prefs.en?`<p class="cen">EN · ${esc(c.en)}</p>`:""}`;
      const label=o=>P.mode==="cloze"?esc(o.fr):fr?esc(o.vn):esc(o.fr);
      const opts=it.opts.map((o,k)=>{let cls="";if(P.ans!==null){if(o.id===c.id)cls=" ok";else if(k===P.ans)cls=" bad";}
        return `<button type="button" class="popt${cls}" data-popt="${k}" ${P.ans!==null?"disabled":""}><kbd>${k+1}</kbd><span ${P.mode==="cloze"||!fr?'lang="fr"':""}>${label(o)}</span></button>`;}).join("");
      const fb=P.ans===null?"":`<div class="pfb ${it.opts[P.ans].id===c.id?"ok":"bad"}"><b>${it.opts[P.ans].id===c.id?"Chính xác!":"Chưa đúng."}</b> <span lang="fr">${esc(c.fr)}</span> — ${esc(meaning(c))}${P.mode!=="cloze"&&c.ex?`<br><i lang="fr">${esc(c.ex)}</i>`:""}${c.note?`<br><small>${c.fa?"⚠ ":""}${esc(c.note)}</small>`:""}</div>
        <button type="button" class="gbtn pnext" id="cNext" data-pnext="1">${P.i+1<P.items.length?"Câu tiếp":"Xem kết quả"} <kbd>Enter</kbd></button>`;
      return `<div class="cpage">${bar}<div class="ccard pcard">${prompt}</div><div class="popts">${opts}</div>${fb}</div>`;
    }
    // type
    const r=P.ans&&P.ans.r;
    return `<div class="cpage">${bar}<div class="ccard pcard"><p class="cw pvn">${esc(c.vn)}</p>${prefs.en?`<p class="cen">EN · ${esc(c.en)}</p>`:""}
      <form class="ptype" data-ptype="1" onsubmit="return false"><input id="cType" type="text" lang="fr" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ từ tiếng Pháp (kèm le / la nếu là danh từ)…" value="${P.ans?esc(P.ans.v):""}" ${P.ans?"readonly":""}>
      ${P.ans?"":`<div class="paccents">${"é è ê à â ç ù û ô î ï ë œ".split(" ").map(ch=>`<button type="button" data-acc="${ch}">${ch}</button>`).join("")}</div><button type="button" class="gbtn" data-psub="1">Kiểm tra <kbd>Enter</kbd></button>`}</form></div>
      ${P.ans?`<div class="pfb ${r.ok?"ok":"bad"}"><b>${r.ok?"Chính xác!":r.msg||"Chưa đúng."}</b> Đáp án: <span lang="fr">${esc(c.fr)}</span>${c.ex?`<br><i lang="fr">${esc(c.ex)}</i>`:""}${c.note?`<br><small>${c.fa?"⚠ ":""}${esc(c.note)}</small>`:""}</div>
      <button type="button" class="gbtn pnext" id="cNext" data-pnext="1">${P.i+1<P.items.length?"Câu tiếp":"Xem kết quả"} <kbd>Enter</kbd></button>`:""}
    </div>`;
  }
  let mtick=null;
  function tickTimer(){clearInterval(mtick);if(P&&P.mode==="match"&&!P.end){mtick=setInterval(()=>{const el=$("mTimer");if(!el||!P||P.end){clearInterval(mtick);return;}el.textContent="⏱ "+fmtSec(Date.now()-P.start+P.miss*3000);},100);}}

  /* ----- views ----- */
  function deckRow(d){
    const t=stats(d.cards);
    return `<div class="cdeck${d.fa?" fa":""}">
      <div class="cdh">${/^vp\d-\d+$/.test(d.id)?`<small class="cch">Chương ${+d.id.split("-")[1]}</small>`:""}<b lang="fr">${esc(d.fr)}</b><span>${esc(d.vn)}</span></div>
      <div class="cdn"><span class="cnew" title="Thẻ mới">${t.nw} mới</span><span class="cdue" title="Đến hạn hôm nay">${t.due} đến hạn</span><span class="cknown" title="Khoảng ôn từ 21 ngày trở lên">${t.known}/${t.n} đã nhớ</span></div>
      ${pracLine(d.id)}
      <div class="cdbtns"><button type="button" class="ghostbtn" data-cdeck="${d.id}" ${t.due||t.nw?"":"disabled"}>${t.due?"Ôn":"Học"}</button><button type="button" class="ghostbtn" data-cprac="${d.id}" ${d.cards.length>=4?"":"disabled"}>Luyện tập</button></div>
    </div>`;
  }
  function homeHTML(){
    const all=[...CARD.values()],t=stats(all);
    const groups=LVL_ORDER.map(lv=>({lv,ds:DECKS.filter(d=>d.lv===lv)})).filter(g=>g.ds.length);
    return `<div class="cpage">
      <header class="chead"><div><h1>Vocabulaire</h1><p class="sub2">Ôn lặp lại ngắt quãng: thẻ bạn nhớ tốt sẽ quay lại thưa dần, thẻ hay quên sẽ gặp lại sớm.</p></div>
        <div class="cdbtns"><button type="button" class="ghostbtn" data-cpracall="1" ${t.n-t.nw>=4?"":"disabled"} title="Luyện tập với mọi thẻ bạn đã học">Luyện thẻ đã học</button><button type="button" class="gbtn" data-cdue="1" ${t.due?"":"disabled"}>Ôn ${t.due} thẻ đến hạn</button></div></header>
      <div class="cstats"><span><b>${all.length}</b> thẻ</span><span><b>${t.n-t.nw}</b> đã học</span><span><b>${t.known}</b> đã nhớ lâu</span><span><b>${t.due}</b> đến hạn hôm nay</span></div>
      <div class="copts">
        <label>Chiều thẻ <select id="cDir"><option value="fr" ${prefs.dir==="fr"?"selected":""}>Pháp → Việt</option><option value="vn" ${prefs.dir==="vn"?"selected":""}>Việt → Pháp</option></select></label>
        <label>Thẻ mới mỗi lượt <select id="cNew">${[5,10,15,20,30].map(n=>`<option ${prefs.perNew===n?"selected":""}>${n}</option>`).join("")}</select></label>
        <label class="chk"><input type="checkbox" id="cEn" ${prefs.en?"checked":""}> Hiện từ tiếng Anh tương đương</label>
      </div>
      ${groups.map(g=>`<section class="cgroup"><h2>${esc(LVL_NAME[g.lv]||g.lv)} <span class="cgn">${g.ds.length} bộ · ${g.ds.reduce((a,d)=>a+d.cards.length,0)} thẻ</span></h2>${LVL_NOTE[g.lv]?`<p class="cgnote">${esc(LVL_NOTE[g.lv])}</p>`:""}<div class="cdecks">${g.ds.map(deckRow).join("")}</div></section>`).join("")}
    </div>`;
  }
  const extLinks=w=>{const q=encodeURIComponent(w.replace(/^(le|la|les|l'|un|une)\s+/i,"").replace(/\s*\(.*?\)\s*/g," ").split(/\s*[\/…]\s*/)[0].trim());
    return `<a href="https://forvo.com/word/${q}/#fr" target="_blank" rel="noopener">Nghe giọng thật (Forvo)</a><a href="https://youglish.com/pronounce/${q}/french" target="_blank" rel="noopener">Nghe trong video (YouGlish)</a>`;};
  function studyHTML(){
    if(S.empty)return `<div class="cpage"><div class="cdone"><h2>Không có thẻ nào cần học lúc này</h2><p>Bộ này chưa có thẻ đến hạn và đã hết thẻ mới trong lượt. Quay lại sau nhé.</p><button type="button" class="ghostbtn" data-chome="1">← Về danh sách bộ thẻ</button></div></div>`;
    if(!S.queue.length){
      const next=[...CARD.values()].filter(c=>{const s=st(c.id);return s&&s.d>endOfToday()&&s.d<=endOfToday()+DAY;}).length;
      return `<div class="cpage"><div class="cdone"><h2>Xong lượt ôn!</h2><p>${S.done} thẻ hoàn thành${S.again?`, ${S.again} lần bấm « Lại »`:""}. Ngày mai có ${next} thẻ đến hạn.</p><button type="button" class="ghostbtn" data-chome="1">← Về danh sách bộ thẻ</button></div></div>`;
    }
    const c=S.queue[0],s=st(c.id),fr=prefs.dir==="fr";
    const front=fr?`<p class="cw" lang="fr">${esc(c.fr)}</p>`:`<p class="cw">${esc(c.vn)}</p>${prefs.en?`<p class="cen" lang="en">EN · ${esc(c.en)}</p>`:""}`;
    const back=`<div class="cback">
        ${fr?`<p class="cvn">${esc(c.vn)}</p>${prefs.en?`<p class="cen" lang="en">EN · ${esc(c.en)}</p>`:""}`:`<p class="cw" lang="fr">${esc(c.fr)}</p>`}
        ${c.ex?`<p class="cex" lang="fr">${esc(c.ex)}</p>`:""}
        ${c.note?`<p class="cnote${c.fa?" fa":""}">${c.fa?"⚠ ":""}${esc(c.note)}</p>`:""}
        <p class="clinks">${extLinks(c.fr)}</p>
      </div>`;
    const btn=(g,lab,cls)=>`<button type="button" class="cg ${cls}" data-cg="${g}"><b>${lab}</b><span>${fmtIvl(schedule(s,g))}</span></button>`;
    const prog=S.startN?Math.round(100*S.done/S.startN):0;
    return `<div class="cpage">
      <div class="cbar"><button type="button" class="ghostbtn" data-chome="1">← Bộ thẻ</button><span>${esc(S.title)}</span><span class="cleft">Còn ${S.queue.length} thẻ</span></div>
      <div class="cprog"><i style="width:${prog}%"></i></div>
      <div class="ccard ${S.flipped?"flipped":""}">
        <span class="ctag">${s?"Ôn lại":"Thẻ mới"}</span>
        ${front}
        ${S.flipped?back:`<button type="button" class="gbtn cflip" data-cflip="1">Lật thẻ <kbd>Space</kbd></button>`}
      </div>
      ${S.flipped?`<div class="cgrades">${btn(0,"Lại","again")}${btn(1,"Khó","hard")}${btn(2,"Được","good")}${btn(3,"Dễ","easy")}</div><p class="sub2 ckeys">Phím tắt: 1 Lại · 2 Khó · 3 Được · 4 Dễ</p>`:`<p class="sub2 ckeys">Tự nhớ nghĩa${fr?" tiếng Việt":" tiếng Pháp"} trước khi lật thẻ, rồi tự chấm mức nhớ của mình.</p>`}
    </div>`;
  }
  function render(){
    const root=$("cartesRoot");if(!root)return;build();
    root.innerHTML=P?practiceHTML():S?studyHTML():homeHTML();tickTimer();
  }
  function reset(){S=null;P=pendingP;pendingP=null;}
  function openPractice(ids,title){build();const cards=ids.map(id=>CARD.get(id)).filter(Boolean);if(!cards.length)return;pendingP={title,cards,n:"all"};if(location.hash==="#cartes"){reset();render();}else location.hash="#cartes";}
  function card(){
    build();const t=stats([...CARD.values()]);
    return `<a class="acard" href="#cartes"><span class="ah">Vocabulaire</span><span class="as">${t.due?`${t.due} thẻ đến hạn hôm nay`:`${CARD.size} thẻ A2 → B2, kèm từ tiếng Anh và cảnh báo faux ami`}</span></a>`;
  }

  /* data from the account can arrive after the first render: redraw the deck list (never an open session) */
  if(typeof Store!=="undefined"&&Store.subscribe)Store.subscribe(()=>{if($("view-cartes")&&!$("view-cartes").hidden&&!S&&!(P&&P.mode))render();});
  document.addEventListener("click",e=>{
    const r=$("cartesRoot");if(!r||!r.contains(e.target))return;
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.cdeck){const d=DECKS.find(x=>x.id===b.dataset.cdeck);if(d)start(d.cards,d.fr);}
    else if(b.dataset.cdue)start([...CARD.values()],"Tất cả thẻ đến hạn");
    else if(b.dataset.chome){S=null;P=null;render();}
    else if(b.dataset.cprac){const d=DECKS.find(x=>x.id===b.dataset.cprac);if(d){P={title:d.fr,cards:d.cards,n:"10",key:d.id};render();}}
    else if(b.dataset.cpracall){P={title:"Thẻ đã học",cards:[...CARD.values()].filter(c=>st(c.id)),n:"10",key:"learned"};render();}
    else if(b.dataset.pmode){const k=P.key;startPractice(P.cards,P.title,b.dataset.pmode,P.n||"10");P.key=k;}
    else if(b.dataset.cpback){P={title:P.title,cards:P.cards,n:P.n,key:P.key};render();}
    else if(b.dataset.popt)answerChoice(+b.dataset.popt);
    else if(b.dataset.pnext)nextQ();
    else if(b.dataset.psub)submitType();
    else if(b.dataset.acc){const i=$("cType");if(i){const a=i.selectionStart??i.value.length,z=i.selectionEnd??a;i.value=i.value.slice(0,a)+b.dataset.acc+i.value.slice(z);i.focus();i.setSelectionRange(a+1,a+1);}}
    else if(b.dataset.ml)matchClick("l",b.dataset.ml);
    else if(b.dataset.mr)matchClick("r",b.dataset.mr);
    else if(b.dataset.pagain){const k=P.key;startPractice(P.cards,P.title,P.mode,P.n||"10");P.key=k;}
    else if(b.dataset.pwrong){const w=[...new Map(P.wrong.map(c=>[c.id,c])).values()];const all=P.cards;const mode=P.mode;
      const pool=mode==="type"?w:w;startPractice(pool.length>=4||mode==="type"?pool:[...pool,...shuffle(all.filter(c=>!pool.includes(c))).slice(0,4-pool.length)],P.title,mode,"all");}
    else if(b.dataset.cflip){S.flipped=true;render();}
    else if(b.dataset.cg)grade(+b.dataset.cg);
  });
  document.addEventListener("change",e=>{
    if(e.target.id==="cDir"){prefs.dir=e.target.value;savePrefs();}
    else if(e.target.id==="cNew"){prefs.perNew=+e.target.value;savePrefs();}
    else if(e.target.id==="cEn"){prefs.en=e.target.checked;savePrefs();}
    else if(e.target.id==="cPn"&&P){P.n=e.target.value;}
  });
  document.addEventListener("keydown",e=>{
    if($("view-cartes")?.hidden)return;
    if(P&&P.mode&&P.items){
      if(e.target.tagName==="BUTTON"&&(e.key==="Enter"||e.code==="Space"))return;
      if(P.mode==="type"){if(e.key==="Enter"){e.preventDefault();submitType();}return;}
      if(e.target.closest&&e.target.closest("input,select,textarea"))return;
      if((P.mode==="qcm"||P.mode==="cloze")&&P.i<P.items.length){
        if(P.ans===null&&["1","2","3","4"].includes(e.key)){e.preventDefault();answerChoice(+e.key-1);}
        else if(P.ans!==null&&(e.key==="Enter"||e.code==="Space")){e.preventDefault();nextQ();}
      }
      return;
    }
    if(!S||!S.queue||!S.queue.length)return;
    if(e.target.closest&&e.target.closest("input,select,textarea"))return;
    if(!S.flipped&&(e.code==="Space"||e.key==="Enter")){e.preventDefault();S.flipped=true;render();}
    else if(S.flipped&&["1","2","3","4"].includes(e.key)){e.preventDefault();grade(+e.key-1);}
  });
  return {render,reset,card,openPractice,_card:id=>{build();return CARD.get(id);},_schedule:schedule,_decks:()=>{build();return DECKS;},_variants:variants,_check:checkTyped,_cloze:makeCloze};
})();
