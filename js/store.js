/* ---------- Store: raw learning data (sessions, attempts, events, study time) ----------
   Only raw facts are stored; progress, states and schedules are derived in progress.js.
   Persistence: the viewer's private db subtree when available, mirrored in localStorage.
   Schema
     Session  {id, ts, src, mode, topics[], n, total, score, updated}
     Attempt  {sid, qk, topic, type, kind:"rec"|"prod", ok, near, self, given, expected, ts}
     Event    {id, kind:"chapter_open", ref, ts}
     time     {"YYYY-MM-DD": seconds}
     Video    {id, ch, kind:"link"|"file", url, title, lang, name, size, marks:[{s,l}], upd, del}
     Listen   {id, lv, unit, title, src:"claude"|"manual", score, total, ts, upd}                */
const Store=(()=>{
  const SCHEMA=1, LS="fr-lab-data", PER_CHUNK=15;
  let data=empty(), db=null, uid=null, mode="local", note="";
  const subs=new Set();
  function empty(){return {schema:SCHEMA,created:Date.now(),sessions:[],attempts:[],events:[],time:{},videos:[],listens:[],speaks:[],cards:{},errs:[],prac:{},mocks:[]};}
  function migrate(d){
    if(!d||typeof d!=="object")return empty();
    const out={schema:SCHEMA,created:d.created||Date.now(),sessions:Array.isArray(d.sessions)?d.sessions:[],attempts:Array.isArray(d.attempts)?d.attempts:[],events:Array.isArray(d.events)?d.events:[],time:d.time&&typeof d.time==="object"?d.time:{},videos:Array.isArray(d.videos)?d.videos.filter(v=>v&&v.id&&v.ch):[],listens:Array.isArray(d.listens)?d.listens.filter(l=>l&&l.id&&l.lv):[],speaks:Array.isArray(d.speaks)?d.speaks.filter(l=>l&&l.id&&l.lv):[],cards:d.cards&&typeof d.cards==='object'&&!Array.isArray(d.cards)?d.cards:{},errs:Array.isArray(d.errs)?d.errs.filter(e=>e&&e.id):[],prac:d.prac&&typeof d.prac==='object'&&!Array.isArray(d.prac)?d.prac:{},mocks:Array.isArray(d.mocks)?d.mocks.filter(m=>m&&m.id):[]};
    /* future schema changes: transform here when d.schema < SCHEMA */
    out.sessions=out.sessions.filter(s=>s&&s.id);out.attempts=out.attempts.filter(a=>a&&a.sid&&a.qk&&a.topic);
    return out;
  }
  const emit=()=>subs.forEach(f=>{try{f();}catch(e){console.error(e);}});
  function loadLocal(){try{return migrate(JSON.parse(localStorage.getItem(LS)||"null"));}catch(e){return empty();}}
  function saveLocal(){try{localStorage.setItem(LS,JSON.stringify(data));}catch(e){}}
  function merge(a,b){
    const out=empty();out.created=Math.min(a.created||Date.now(),b.created||Date.now());
    const S=new Map();[...a.sessions,...b.sessions].forEach(s=>{const o=S.get(s.id);if(!o||(s.updated||s.ts)>(o.updated||o.ts))S.set(s.id,s);});
    out.sessions=[...S.values()].sort((x,y)=>x.ts-y.ts);
    const A=new Map();[...a.attempts,...b.attempts].forEach(t=>{const k=t.sid+"|"+t.qk;const o=A.get(k);if(!o||(t.upd||0)>(o.upd||0))A.set(k,t);});
    out.attempts=[...A.values()].sort((x,y)=>x.ts-y.ts);
    const E=new Map();[...a.events,...b.events].forEach(e=>{const o=E.get(e.id);if(!o||e.ts<o.ts)E.set(e.id,e);});
    out.events=[...E.values()];
    const V=new Map();[...(a.videos||[]),...(b.videos||[])].forEach(v=>{const o=V.get(v.id);if(!o||(v.upd||0)>(o.upd||0))V.set(v.id,v);});
    out.videos=[...V.values()];
    const L=new Map();[...(a.listens||[]),...(b.listens||[])].forEach(l=>{const o=L.get(l.id);if(!o||(l.upd||0)>(o.upd||0))L.set(l.id,l);});
    out.listens=[...L.values()].sort((x,y)=>x.ts-y.ts);
    const SP=new Map();[...(a.speaks||[]),...(b.speaks||[])].forEach(l=>{if(!SP.has(l.id))SP.set(l.id,l);});
    out.speaks=[...SP.values()].sort((x,y)=>x.ts-y.ts).slice(-400);
    const ER=new Map();[...(a.errs||[]),...(b.errs||[])].forEach(e=>{const o=ER.get(e.id);if(!o||(e.upd||0)>(o.upd||0))ER.set(e.id,e);});out.errs=[...ER.values()].sort((x,y)=>x.ts-y.ts).slice(-600);
    const MK=new Map();[...(a.mocks||[]),...(b.mocks||[])].forEach(m=>{const o=MK.get(m.id);if(!o||(m.upd||0)>(o.upd||0))MK.set(m.id,m);});out.mocks=[...MK.values()].sort((x,y)=>x.ts-y.ts).slice(-60);
    out.prac={...(a.prac||{})};Object.entries(b.prac||{}).forEach(([k,v])=>{const o=out.prac[k];if(!o||(v.ts||0)>(o.ts||0))out.prac[k]=v;});
    out.cards={...(a.cards||{})};Object.entries(b.cards||{}).forEach(([k,v])=>{const o=out.cards[k];if(!o||(v.u||0)>(o.u||0))out.cards[k]=v;});
    for(const src of [a.time,b.time])for(const [d,v] of Object.entries(src||{}))out.time[d]=Math.max(out.time[d]||0,+v||0);
    return out;
  }
  const fingerprint=d=>d.sessions.length+":"+d.attempts.length+":"+d.events.length+":"+d.attempts.reduce((n,a)=>n+(a.upd||0),0)%1e9+":"+Object.values(d.time).reduce((n,v)=>n+v,0)+":"+(d.videos||[]).reduce((n,v)=>n+(v.upd||0)%1e6,0)+":"+(d.listens||[]).length+":"+(d.speaks||[]).length+":"+Object.values(d.cards||{}).reduce((n,c)=>n+(c.u||0)%1e6,0)+":"+(d.errs||[]).reduce((n,e)=>n+(e.upd||0)%1e6,0)+":"+Object.values(d.prac||{}).reduce((n,x)=>n+(x.ts||0)%1e6,0)+":"+(d.mocks||[]).length;

  /* ----- remote (db) ----- */
  const base=()=>"data/users/"+uid;
  function withTimeout(p,ms){return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej({code:"timeout"}),ms))]);}
  async function readRemote(){
    const meta=await withTimeout(db.doc(base()+"/meta").get(),10000);
    if(!meta.exists)return null;
    const m=meta.data();const chunks=+m.chunks||0;const d=empty();
    d.created=m.created||Date.now();d.events=m.events||[];d.time=m.time||{};d.videos=m.videos||[];d.listens=m.listens||[];d.speaks=m.speaks||[];d.cards=m.cards||{};d.errs=m.errs||[];d.prac=m.prac||{};d.mocks=m.mocks||[];
    for(let i=0;i<chunks;i++){
      const c=await withTimeout(db.doc(base()+"/chunk"+i).get(),10000);
      if(c.exists){const b=c.data();d.sessions.push(...(b.sessions||[]));d.attempts.push(...(b.attempts||[]));}
    }
    return migrate(d);
  }
  let writing=false,pending=false,lastWritten={};
  async function writeRemote(){
    if(!db||!uid)return;
    if(writing){pending=true;return;}
    writing=true;
    try{
      const ss=[...data.sessions].sort((x,y)=>x.ts-y.ts);
      const chunks=Math.ceil(ss.length/PER_CHUNK);
      for(let i=0;i<chunks;i++){
        const part=ss.slice(i*PER_CHUNK,(i+1)*PER_CHUNK);const ids=new Set(part.map(s=>s.id));
        const body={sessions:part,attempts:data.attempts.filter(a=>ids.has(a.sid))};
        const sig=JSON.stringify(body);
        if(lastWritten["c"+i]!==sig){await db.doc(base()+"/chunk"+i).set(body);lastWritten["c"+i]=sig;}
      }
      const meta={schema:SCHEMA,created:data.created,chunks,events:data.events,time:data.time,videos:data.videos,listens:data.listens,speaks:data.speaks,cards:data.cards,errs:data.errs,prac:data.prac,mocks:data.mocks};
      const ms=JSON.stringify(meta);
      if(lastWritten.meta!==ms){await db.doc(base()+"/meta").set(meta);lastWritten.meta=ms;}
      if(mode==="cloud"&&note){note="";emit();}
    }catch(e){
      note=e&&e.code==="quota_exceeded"?"Kho dữ liệu đã đầy. Hãy xuất file sao lưu.":"Chưa đồng bộ được lên kho dữ liệu; tiến độ vẫn được giữ trên trình duyệt này.";emit();
    }finally{writing=false;if(pending){pending=false;writeRemote();}}
  }
  let saveTimer=null;
  function persist(){saveLocal();clearTimeout(saveTimer);saveTimer=setTimeout(writeRemote,600);}

  async function init(){
    data=loadLocal();emit();
    try{
      if(!window.claude||!window.claude.use)throw 0;
      db=await claude.use("db");const user=await claude.use("user");
      uid=user?await user.id():null;
      if(!db||!uid)throw 0;
      const remote=await readRemote();
      const merged=remote?merge(remote,data):data;
      const changed=!remote||fingerprint(merged)!==fingerprint(remote);
      data=merged;mode="cloud";saveLocal();emit();
      if(changed)writeRemote();
    }catch(e){
      db=db&&uid?db:null;mode="local";
      note=e&&e.code==="timeout"?"Chưa kết nối được kho dữ liệu; tiến độ đang lưu tạm trên trình duyệt này.":"";
      emit();
    }
  }

  /* ----- public API ----- */
  function hasSession(id){return data.sessions.some(s=>s.id===id);}
  function addSession(session,attempts){
    if(hasSession(session.id))return false;
    const now=Date.now();
    data.sessions.push({...session,updated:now});
    attempts.forEach(a=>data.attempts.push({...a,sid:session.id,ts:session.ts,upd:now}));
    persist();emit();return true;
  }
  function markSelfCorrect(sid,qk){
    const a=data.attempts.find(x=>x.sid===sid&&x.qk===qk);
    if(!a||a.ok)return false;
    a.ok=true;a.self=true;a.upd=Date.now();
    const s=data.sessions.find(x=>x.id===sid);
    if(s){s.score=(s.score||0)+1;s.updated=Date.now();}
    persist();emit();return true;
  }
  function logEvent(kind,ref){
    const id=kind+":"+ref;
    if(data.events.some(e=>e.id===id))return;
    data.events.push({id,kind,ref,ts:Date.now()});persist();emit();
  }
  function addTime(sec){
    if(sec<=0)return;
    const d=dayKey(Date.now());data.time[d]=(data.time[d]||0)+Math.round(sec);
    persist();
  }
  const videos=ch=>data.videos.filter(v=>v.ch===ch&&!v.del).sort((x,y)=>(x.ts||0)-(y.ts||0));
  function saveVideo(v){
    const now=Date.now(),i=data.videos.findIndex(x=>x.id===v.id);
    const item={...(i>=0?data.videos[i]:{ts:now}),...v,upd:now};
    if(i>=0)data.videos[i]=item;else data.videos.push(item);
    persist();emit();return item;
  }
  function removeVideo(id){const v=data.videos.find(x=>x.id===id);if(!v)return;v.del=true;v.marks=[];v.upd=Date.now();persist();emit();}
  function addListen(l){const now=Date.now();data.listens.push({...l,id:"ls"+now.toString(36)+Math.random().toString(36).slice(2,6),ts:now,upd:now});persist();emit();}
  function addErrs(list){const now=Date.now();(list||[]).forEach((e,i)=>data.errs.push({...e,id:"er"+now.toString(36)+i+Math.random().toString(36).slice(2,5),ts:now,upd:now}));if(data.errs.length>600)data.errs=data.errs.slice(-600);persist();emit();}
  function setErr(id,patch){const e=data.errs.find(x=>x.id===id);if(!e)return;Object.assign(e,patch,{upd:Date.now()});persist();emit();}
  function reset(parts){
    const e=empty();
    if(parts.has("lam")){data.sessions=[];data.attempts=[];data.events=e.events;data.time=e.time;data.mocks=[];}
    if(parts.has("cards")){data.cards={};data.prac={};}
    if(parts.has("errs"))data.errs=[];
    if(parts.has("speak")){data.speaks=[];data.listens=e.listens;}
    lastWritten={};persist();emit();
  }
  function addMock(m){const now=Date.now();data.mocks.push({...m,id:"mk"+now.toString(36),ts:now,upd:now});if(data.mocks.length>60)data.mocks=data.mocks.slice(-60);persist();emit();}
  function savePrac(key,r){const o=data.prac[key]||{n:0};data.prac[key]={...o,...r,n:(o.n||0)+1,best:Math.max(o.best||0,r.pct||0),bestMs:r.ms?Math.min(o.bestMs||Infinity,r.ms):o.bestMs,ts:Date.now()};persist();emit();}
  function saveCard(id,st){data.cards[id]={...st,u:Date.now()};persist();emit();}
  function addSpeak(l){const now=Date.now();data.speaks.push({...l,id:"sp"+now.toString(36)+Math.random().toString(36).slice(2,6),ts:now});if(data.speaks.length>400)data.speaks=data.speaks.slice(-400);persist();emit();}
  function removeListen(id){data.listens=data.listens.filter(l=>l.id!==id);persist();emit();}
  function dayKey(ts){const d=new Date(ts);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
  function exportJSON(){return JSON.stringify({app:"fr-lab",exported:new Date().toISOString(),...data},null,1);}
  function importJSON(text){
    const incoming=migrate(JSON.parse(text));
    const before=fingerprint(data);data=merge(data,incoming);
    persist();emit();
    return {sessions:incoming.sessions.length,attempts:incoming.attempts.length,changed:before!==fingerprint(data)};
  }
  return {init,subscribe:f=>{subs.add(f);return()=>subs.delete(f);},get:()=>data,mode:()=>mode,note:()=>note,
    hasSession,addSession,markSelfCorrect,logEvent,addTime,dayKey,videos,saveVideo,removeVideo,listens:()=>data.listens,addListen,removeListen,speaks:()=>data.speaks,addSpeak,cards:()=>data.cards,saveCard,errs:()=>data.errs,addErrs,setErr,prac:()=>data.prac,savePrac,reset,mocks:()=>data.mocks,addMock,exportJSON,importJSON,flush:()=>{saveLocal();writeRemote();}};
})();
