/* ---------- Progress engine: everything here is derived from Store data ---------- */
const MASTERY_CONFIG={
  minForRate:5,             // fewer attempts than this → "Données insuffisantes" for a rate
  perQuestionCap:3,         // only the latest N attempts of the same question count toward rates
  studied:{distinctQ:5},
  trained:{distinctQ:12,sessions:2,minRec:3,minProd:3,acc:0.6},
  review:{minGapDays:3,okAcc:0.8},             // a "successful spaced review"
  mastered:{distinctQ:25,types:3,minProd:10,prodAcc:0.8,minRec:5,recAcc:0.85,reviews:2,lastGapDays:7},
  due:{recentWindow:10,lowAcc:0.6},
  intervals:[1,3,7,14,30,60],                   // days, spaced-review ladder
  minItemsPerSessionForSchedule:2
};
const STATES=[
  {id:"inconnu",fr:"Inconnu",vn:"Chưa biết",pct:0},
  {id:"decouvert",fr:"Découvert",vn:"Đã mở",pct:10},
  {id:"etudie",fr:"Étudié",vn:"Đã học",pct:30},
  {id:"entraine",fr:"Entraîné",vn:"Đã luyện",pct:55},
  {id:"retenu",fr:"Retenu",vn:"Đã nhớ",pct:80},
  {id:"maitrise",fr:"Maîtrisé",vn:"Thành thạo",pct:100}
];
const REC_TYPES=new Set(["qcm","cul","ph","read-mc","read-tf"]);
const TYPE_LABEL={conj:"Chia động từ",gap:"Điền vào câu",qcm:"Trắc nghiệm",box:"Hộp từ",err:"Sửa lỗi",qu:"Đặt câu hỏi",tr:"Biến đổi câu",cul:"Văn hoá",cloze:"Điền đoạn văn","read-mc":"Đọc hiểu (trắc nghiệm)","read-tf":"Đọc hiểu (vrai/faux)","read-open":"Đọc hiểu (tự luận)",ph:"Phát âm",wf:"Cấu tạo từ",kt:"Viết lại với từ cho sẵn",ro:"Sắp xếp câu",ow:"Điền một từ"};
const DAY=86400000;

/* Topic registry: grammar topics from the bank, culture themes, reading */
const TOPICS=(()=>{
  const m={};
  BANK.forEach(t=>m[t.id]={id:t.id,fr:t.fr,vn:t.vn,lv:t.lv,bank:t.items.length});
  Object.entries(THEMES).forEach(([k,v])=>m["cul-"+k]={id:"cul-"+k,fr:{hist:"Histoire",arts:"Arts et lettres",paris:"Paris",geo:"Géographie et régions",vie:"Vie quotidienne et fêtes",franco:"Francophonie et Việt Nam"}[k],vn:v,lv:"A2",bank:CULTURE.filter(c=>c.c===k).length,culture:k});
  m.lecture={id:"lecture",fr:"Compréhension écrite",vn:"Đọc hiểu",lv:"A2",bank:READ.reduce((n,r)=>n+r.qs.length,0),skill:true};
  return m;
})();
const topicLabel=id=>TOPICS[id]?TOPICS[id].fr:id;

const Progress=(()=>{
  let cache=null;
  Store.subscribe(()=>{cache=null;});
  const C=MASTERY_CONFIG;
  const rate=(ok,n)=>n>=C.minForRate?ok/n:null;

  function compute(){
    const d=Store.get(),now=Date.now();
    const sessById=new Map(d.sessions.map(s=>[s.id,s]));
    const byTopic={};
    d.attempts.forEach(a=>{if(!TOPICS[a.topic])return;(byTopic[a.topic]=byTopic[a.topic]||[]).push(a);});
    const opened=new Set(d.events.filter(e=>e.kind==="chapter_open").flatMap(e=>(ROADMAP.find(c=>c.id===e.ref)||{topics:[]}).topics));
    const out={};
    for(const id of Object.keys(TOPICS)){
      out[id]=topicStats(id,(byTopic[id]||[]).sort((x,y)=>x.ts-y.ts),sessById,opened.has(id),now);
    }
    return out;
  }

  function topicStats(id,att,sessById,opened,now){
    /* rates use the latest N attempts per question, so drilling one familiar item cannot inflate them */
    const byQ={};att.forEach(a=>(byQ[a.qk]=byQ[a.qk]||[]).push(a));
    const counted=Object.values(byQ).flatMap(l=>l.slice(-C.perQuestionCap));
    const rec=counted.filter(a=>a.kind==="rec"),prod=counted.filter(a=>a.kind==="prod");
    const okN=l=>l.filter(a=>a.ok).length;
    const byType={};counted.forEach(a=>{const t=byType[a.type]=byType[a.type]||{n:0,ok:0};t.n++;if(a.ok)t.ok++;});
    const distinctQ=Object.keys(byQ).length;
    /* sessions touching this topic, in order, with per-session accuracy */
    const sess={};att.forEach(a=>{const s=sess[a.sid]=sess[a.sid]||{sid:a.sid,ts:a.ts,n:0,ok:0};s.n++;if(a.ok)s.ok++;});
    const sl=Object.values(sess).sort((x,y)=>x.ts-y.ts);
    /* spaced-review replay: only sessions on a later day advance the ladder */
    let step=-1,due=null,lastTs=null;const reviews=[];
    for(const s of sl){
      if(s.n<C.minItemsPerSessionForSchedule)continue;
      const acc=s.ok/s.n,gap=lastTs===null?null:(s.ts-lastTs)/DAY;
      const isReview=gap!==null&&gap>=1;
      if(isReview)reviews.push({ts:s.ts,gap,acc,ok:acc>=C.review.okAcc&&gap>=C.review.minGapDays});
      if(lastTs===null||isReview){
        if(acc>=C.review.okAcc)step=Math.min(step+1,C.intervals.length-1);
        else if(acc<C.due.lowAcc)step=0;
        else step=Math.max(step,0);
        due=s.ts+C.intervals[step]*DAY;lastTs=s.ts;
      }
    }
    const goodReviews=reviews.filter(r=>r.ok);
    const recent=att.slice(-C.due.recentWindow),recentAcc=recent.length>=C.minForRate?okN(recent)/recent.length:null;
    const recAcc=rate(okN(rec),rec.length),prodAcc=rate(okN(prod),prod.length);
    const accAll=rate(okN(counted),counted.length);
    const types=Object.keys(byType).length;
    /* criteria ladder: each level lists its checks so the UI can explain the state */
    const T=C.trained,M=C.mastered;
    const levels=[
      {state:"decouvert",checks:[{ok:opened||att.length>0,t:"Đã mở chương hoặc làm ít nhất 1 câu"}]},
      {state:"etudie",checks:[{ok:distinctQ>=C.studied.distinctQ,t:`Làm ít nhất ${C.studied.distinctQ} câu khác nhau (${distinctQ})`}]},
      {state:"entraine",checks:[
        {ok:distinctQ>=T.distinctQ,t:`Ít nhất ${T.distinctQ} câu khác nhau (${distinctQ})`},
        {ok:sl.length>=T.sessions,t:`Luyện trong ít nhất ${T.sessions} lần làm bài (${sl.length})`},
        {ok:rec.length>=T.minRec&&prod.length>=T.minProd,t:`Có cả câu nhận biết (${rec.length}) và câu tự tạo đáp án (${prod.length})`},
        {ok:accAll!==null&&accAll>=T.acc,t:`Tỉ lệ đúng chung ≥ ${T.acc*100}% (${pctTxt(accAll)})`}]},
      {state:"retenu",checks:[{ok:goodReviews.length>=1,t:`Ít nhất 1 lần ôn cách ≥ ${C.review.minGapDays} ngày với ≥ ${C.review.okAcc*100}% đúng (${goodReviews.length})`}]},
      {state:"maitrise",checks:[
        {ok:distinctQ>=M.distinctQ,t:`Ít nhất ${M.distinctQ} câu khác nhau (${distinctQ})`},
        {ok:types>=M.types,t:`Ít nhất ${M.types} dạng bài (${types})`},
        {ok:prod.length>=M.minProd&&prodAcc!==null&&prodAcc>=M.prodAcc,t:`Tự tạo đáp án: ≥ ${M.minProd} câu, ≥ ${M.prodAcc*100}% đúng (${prod.length} câu, ${pctTxt(prodAcc)})`},
        {ok:rec.length>=M.minRec&&recAcc!==null&&recAcc>=M.recAcc,t:`Nhận biết: ≥ ${M.recAcc*100}% đúng (${pctTxt(recAcc)})`},
        {ok:goodReviews.length>=M.reviews&&goodReviews.length>0&&goodReviews[goodReviews.length-1].gap>=M.lastGapDays,t:`${M.reviews} lần ôn cách quãng thành công, lần gần nhất cách ≥ ${M.lastGapDays} ngày (${goodReviews.length})`}]}
    ];
    let si=0;for(let i=0;i<levels.length;i++){if(levels[i].checks.every(c=>c.ok))si=i+1;else break;}
    const state=STATES[si];
    const overdue=due!==null&&now>due;
    const lowRecent=recentAcc!==null&&recentAcc<C.due.lowAcc;
    const aReviser=si>=2&&(overdue||lowRecent);
    const weakTypes=Object.entries(byType).filter(([t,v])=>v.n>=3&&v.ok/v.n<0.7).map(([t,v])=>({type:t,acc:v.ok/v.n,n:v.n}));
    const mistakes=att.filter(a=>!a.ok&&a.kind==="prod"&&a.given).slice(-3).reverse().map(a=>({given:a.given,expected:a.expected,type:a.type}));
    return {id,state,si,levels,attempts:att.length,distinctQ,sessions:sl.length,rec:{n:rec.length,acc:recAcc},prod:{n:prod.length,acc:prodAcc},
      accAll,byType,types,reviews,goodReviews:goodReviews.length,lastActivity:att.length?att[att.length-1].ts:null,due,overdue,recentAcc,
      aReviser,reasonReview:aReviser?(overdue?"Đã đến hạn ôn":"Kết quả gần đây dưới 60%"):"",weakTypes,mistakes,
      completion:TOPICS[id]&&TOPICS[id].bank?Math.min(1,distinctQ/TOPICS[id].bank):null};
  }
  const pctTxt=v=>v===null?"chưa đủ dữ liệu":Math.round(v*100)+"%";
  function all(){if(!cache)cache=compute();return cache;}
  const topic=id=>all()[id];
  function chapterPct(ch){const ts=ch.topics.map(topic).filter(Boolean);if(!ts.length)return 0;return Math.round(ts.reduce((n,t)=>n+t.state.pct,0)/ts.length);}
  function chapterState(ch){const ts=ch.topics.map(topic).filter(Boolean);return ts.length?Math.min(...ts.map(t=>t.si)):0;}
  function nextChapter(){return ROADMAP.find(ch=>chapterState(ch)<2)||null;}
  function dueTopics(){return Object.values(all()).filter(t=>t.aReviser).sort((a,b)=>(a.due||0)-(b.due||0));}
  function studiedTopics(){return Object.values(all()).filter(t=>t.si>=2);}
  function recentTopics(n){return Object.values(all()).filter(t=>t.lastActivity).sort((a,b)=>b.lastActivity-a.lastActivity).slice(0,n);}
  function suggestions(){
    const out=[],seen=new Set();
    for(const t of dueTopics()){if(out.length>=3)break;out.push({t,why:t.reasonReview});seen.add(t.id);}
    for(const t of Object.values(all()).filter(t=>t.weakTypes.length&&!seen.has(t.id))){if(out.length>=3)break;out.push({t,why:"Còn yếu ở "+t.weakTypes.map(w=>TYPE_LABEL[w.type]||w.type).join(", ")});seen.add(t.id);}
    const nx=nextChapter();
    if(nx&&out.length<3)for(const id of nx.topics){if(out.length>=3||seen.has(id))continue;out.push({t:topic(id),why:`Chương tiếp theo: ${nx.book==="I"?"Intermédiaire":"Avancé"} ${nx.num}`});seen.add(id);}
    return out;
  }
  function streak(){
    const d=Store.get();const days=new Set(d.sessions.map(s=>Store.dayKey(s.ts)));
    Object.entries(d.time).forEach(([k,v])=>{if(v>=120)days.add(k);});
    let n=0,t=Date.now();
    if(!days.has(Store.dayKey(t)))t-=DAY;
    while(days.has(Store.dayKey(t))){n++;t-=DAY;}
    return n;
  }
  function todayMinutes(){return Math.round((Store.get().time[Store.dayKey(Date.now())]||0)/60);}
  /* compare snapshot before/after a session to describe what changed */
  function snapshotStates(ids){const o={};ids.forEach(id=>{const t=topic(id);if(t)o[id]={si:t.si,aReviser:t.aReviser};});return o;}
  return {all,topic,chapterPct,chapterState,nextChapter,dueTopics,studiedTopics,recentTopics,suggestions,streak,todayMinutes,snapshotStates,pctTxt};
})();
const fmtPct=v=>v===null||v===undefined?"Données insuffisantes":Math.round(v*100)+"%";
function fmtDue(ts){
  if(!ts)return "Chưa có lịch";
  const d=Math.round((ts-Date.now())/DAY);
  if(d<0)return `Quá hạn ${-d} ngày`;if(d===0)return "Hôm nay";if(d===1)return "Ngày mai";return `Sau ${d} ngày`;
}
