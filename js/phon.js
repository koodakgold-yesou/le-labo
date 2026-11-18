/* ---------- Phonétique ----------
   Real native voices: every example links to Forvo (words recorded by native speakers) and YouGlish (real YouTube clips).
   Optional quick listening uses the browser's own French voice (synthetic), off by default. */
const Phon=(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const forvo=w=>"https://forvo.com/word/"+encodeURIComponent(w.toLowerCase())+"/#fr";
  const yg=w=>"https://youglish.com/pronounce/"+encodeURIComponent(w)+"/french";
  let tab="sons", sel=null, pair=0, quiz=null;
  const LS="fr-phon-voice";
  let voiceOn=(()=>{try{return localStorage.getItem(LS)==="1";}catch(e){return false;}})();
  let frVoice=null;
  const synth=typeof window!=="undefined"&&"speechSynthesis" in window?window.speechSynthesis:null;
  function pickVoice(){if(!synth)return;const v=synth.getVoices().filter(x=>/^fr/i.test(x.lang));frVoice=v.find(x=>/fr[-_]FR/i.test(x.lang))||v[0]||null;}
  if(synth){pickVoice();synth.onvoiceschanged=()=>{pickVoice();if(location.hash==="#phonetique")render();};}
  const canSpeak=()=>!!(synth&&frVoice);
  function say(w){if(!canSpeak()||!voiceOn)return;try{synth.cancel();const u=new SpeechSynthesisUtterance(w);u.lang=frVoice.lang;u.voice=frVoice;u.rate=0.85;synth.speak(u);}catch(e){}}

  const wordHTML=w=>`<span class="pw"><b lang="fr">${esc(w)}</b>${voiceOn&&canSpeak()?`<button type="button" class="pplay" data-say="${esc(w)}" aria-label="Nghe ${esc(w)} (giọng máy)">▶</button>`:""}<a href="${forvo(w)}" target="_blank" rel="noopener" title="Người bản ngữ đọc (Forvo)">Forvo</a><a href="${yg(w)}" target="_blank" rel="noopener" title="Câu thật trong video (YouGlish)">YouGlish</a></span>`;

  /* ----- speaking practice: microphone recording (self-hosted) / dictation (in Claude) / recorded file ----- */
  let rec=null, takes=[], dictState={target:null,heard:"",live:false,err:""};
  Speech.ready.then(()=>{if(location.hash==="#phonetique")render();});
  const norm=t=>String(t||"").toLowerCase().normalize("NFC").replace(/[.,!?;:«»"()]/g," ").replace(/[’]/g,"'").replace(/\s+/g," ").trim();
  /* minimal-pair partner index: word -> {other, tip} */
  const PARTNER={};PHON_PAIRS.forEach(([a,b,ws,tip])=>ws.forEach(([x,y])=>{PARTNER[norm(x)]={other:y,ipa:a,tip};PARTNER[norm(y)]={other:x,ipa:b,tip};}));
  const has=(text,w)=>(" "+norm(text)+" ").includes(" "+norm(w)+" ");
  /* Approximate scoring: does a French recogniser hear the intended word, and how sure is it? */
  function judge(target,alts){
    if(!alts||!alts.length||!alts[0].t)return `<span class="badc">Máy không nghe được gì: nói to, rõ hơn và gần micro.</span>`;
    const top=alts[0],hit=alts.findIndex(a=>has(a.t,target));
    const pc=top.c>0?Math.round(top.c*100):null;
    const p=PARTNER[norm(target)];
    const snd=sel!==null?PHON_SOUNDS[sel]:null;
    let verdict,score;
    if(hit===0){score=pc===null?85:pc;verdict=`<span class="okc">✓ Máy nghe đúng « ${esc(target)} »</span>`;}
    else if(hit>0){score=55;verdict=`<span class="midc">≈ Gần đúng: máy phân vân, đoán « ${esc(top.t)} » trước rồi mới tới « ${esc(target)} »</span>`;}
    else{score=pc===null?25:Math.min(40,Math.round(pc*40));verdict=`<span class="badc">✗ Máy nghe thành « ${esc(top.t)} »</span>`;}
    const lvl=score>=80?["Tốt","good"]:score>=60?["Khá","mid"]:score>=40?["Cần luyện","mid"]:["Chưa đạt","bad"];
    let fix="";
    if(hit!==0){
      if(p&&has(top.t,p.other))fix=`Bạn đang đọc gần thành « ${esc(p.other)} ». ${esc(p.tip)}`;
      else if(snd&&snd.ex.includes(target))fix=`Âm /${esc(snd.ipa)}/: ${esc(snd.vn)}`;
      else fix="Nghe lại bản đọc người bản ngữ (Forvo), bắt chước khẩu hình, rồi thử lại.";
    }
    return `<span class="pscore ${lvl[1]}">${score}<small>/100 · ${lvl[0]}</small></span> ${verdict}${pc!==null&&hit===0?` <small class="sub">(độ chắc chắn ${pc}%)</small>`:""}${fix?`<br><span class="pfix">Sửa: ${fix}</span>`:""}`;
  }
  function paintDict(){const el=$("pdict");if(!el||!dictState.target)return;
    if(dictState.err){el.innerHTML=`<span class="badc">${esc(dictState.err)}</span>`;return;}
    el.innerHTML=dictState.live?`Đang nghe… <b lang="fr">${esc(dictState.heard)}</b>`:dictState.heard?`Máy nghe được: <b lang="fr">${esc(dictState.heard)}</b><br>${judge(dictState.target,[{t:dictState.heard,c:0}])}`:"";}
  function speakHTML(words){
    const mode=ENV.hosted&&ENV.hasMedia?"mic":Speech.mode()==="dict"?"dict":"file";
    return `<div class="pspeak"><p class="sub"><b>Tự luyện nói:</b> ${mode==="mic"?"bấm 🎙 rồi đọc to từ đó; máy tự dừng khi bạn nói xong, chấm điểm gần đúng, gợi ý sửa, và cho nghe lại giọng bạn để so với Forvo.":mode==="dict"?"bấm 🎙 rồi đọc to từ đó; máy nhận dạng, chấm gần đúng và gợi ý sửa (trong Claude không thu âm để nghe lại được).":"mở file ghi âm của bạn (Voice Recorder, điện thoại) để nghe và so với Forvo."}</p>
      <div class="pspk">${mode==="file"?"":words.map(w=>`<button type="button" class="pmic ${rec&&rec.word===w?"live":""} ${dictState.live&&dictState.target===w?"live":""}" data-mic="${esc(w)}"><span>🎙</span><b lang="fr">${esc(w)}</b></button>`).join("")}
        <label class="ghostbtn sm vfilebtn">Mở file ghi âm<input type="file" accept="audio/*" data-recfile="1" hidden></label></div>
      ${mode==="dict"?`<p class="pdict" id="pdict"></p>`:""}
      ${takes.length?`<ul class="ptakes">${takes.slice(0,8).map(t=>`<li><div class="ptk"><b lang="fr">${esc(t.word)}</b>${t.url?`<audio controls src="${t.url}"></audio>`:""}${t.word&&!t.file?`<a href="${forvo(t.word)}" target="_blank" rel="noopener">Nghe mẫu (Forvo)</a>`:""}</div>${t.res?`<div class="pres">${t.res}</div>`:""}</li>`).join("")}</ul>`:""}
    </div>`;
  }
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition||null;
  async function toggleRec(word){
    if(rec){const r=rec;rec=null;try{r.sr&&r.sr.stop();}catch(e){}try{r.mr.state!=="inactive"&&r.mr.stop();}catch(e){}return;}
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const mr=new MediaRecorder(stream);const chunks=[];
      const take={word,url:null,res:SR?`<span class="sub">Đang chấm…</span>`:`<span class="sub">Trình duyệt này không có nhận dạng giọng nói (dùng Chrome hoặc Edge để được chấm).</span>`};
      mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      mr.onstop=()=>{stream.getTracks().forEach(t=>t.stop());take.url=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType||"audio/webm"}));if(!takes.includes(take))takes.unshift(take);render();};
      let sr=null;
      if(SR){
        sr=new SR();sr.lang="fr-FR";sr.maxAlternatives=5;sr.interimResults=false;sr.continuous=false;
        let got=false;
        sr.onresult=e=>{got=true;const r=e.results[0];const alts=[];for(let i=0;i<r.length;i++)alts.push({t:r[i].transcript,c:r[i].confidence||0});take.res=judge(word,alts);};
        sr.onerror=e=>{if(e.error==="no-speech")take.res=judge(word,[]);else if(e.error==="not-allowed")take.res=`<span class="badc">Chưa cho phép nhận dạng giọng nói.</span>`;};
        sr.onend=()=>{if(!got&&/Đang chấm/.test(take.res))take.res=judge(word,[]);if(rec&&rec.mr===mr){rec=null;setTimeout(()=>{try{mr.state!=="inactive"&&mr.stop();}catch(e){}},250);}else render();};
      }
      rec={word,mr,sr};mr.start();if(sr){try{sr.start();}catch(e){}}render();
      setTimeout(()=>{if(rec&&rec.mr===mr){rec=null;try{sr&&sr.stop();}catch(e){}try{mr.stop();}catch(e){}}},15000);
    }catch(e){rec=null;alertBox("Không mở được micro: hãy cho phép trình duyệt dùng micro (biểu tượng ổ khoá trên thanh địa chỉ).");}
  }
  function alertBox(t){const el=document.querySelector(".pspeak .sub");if(el)el.textContent=t;}
  function startDict(word){
    if(Speech.active()){Speech.stop();return;}
    dictState={target:word,heard:"",live:true,err:""};
    Speech.start({
      onPartial:t=>{dictState.heard=t;paintDict();},
      onEnd:({text})=>{dictState.heard=text;dictState.live=false;render();paintDict();},
      onError:c=>{dictState.live=false;dictState.err=Speech.errText(c);render();paintDict();}
    });
    render();paintDict();
  }

  function soundsHTML(){
    const groups=Object.keys(PHON_GROUPS);
    const s=sel!==null?PHON_SOUNDS[sel]:null;
    return `${groups.map(g=>`<section class="pgroup"><h3>${PHON_GROUPS[g]}</h3><div class="pgrid">${PHON_SOUNDS.map((x,i)=>x.g!==g?"":`<button type="button" class="pcell ${sel===i?"on":""}" data-snd="${i}"><span class="ipa">/${esc(x.ipa)}/</span><span lang="fr">${esc(x.ex[0])}</span></button>`).join("")}</div>
      ${s&&s.g===g?`<div class="pdetail">
        <div class="pdh"><span class="ipa big">/${esc(s.ipa)}/</span><div><p class="sub">Cách viết</p><div class="pchips">${s.sp.map(x=>`<span lang="fr">${esc(x)}</span>`).join("")}</div></div></div>
        <p><b>Cách phát âm:</b> ${esc(s.vn)}</p>
        <p class="en-line"><b>So với tiếng Anh:</b> ${esc(s.en)}</p>
        <p class="sub">Nghe người bản ngữ đọc:</p><div class="pwords">${s.ex.map(wordHTML).join("")}</div>
        ${speakHTML(s.ex)}
      </div>`:""}</section>`).join("")}
      ${sel===null?`<p class="sub">Bấm vào một âm để xem cách viết, mẹo phát âm và nghe người bản ngữ đọc từ ví dụ.</p>`:""}`;
  }
  function spellHTML(){
    return `<p class="sub">Tổ hợp chữ cái và âm tương ứng. Bấm Forvo hoặc YouGlish ở từ ví dụ để nghe người thật đọc.</p>
    <div class="pspell">${PHON_SPELL.map(([sp,ipa,ex])=>`<div class="psrow"><div class="psk" lang="fr">${esc(sp)}</div><div class="psi ipa">[${esc(ipa)}]</div><div class="pse">${ex.split(", ").map(wordHTML).join("")}</div></div>`).join("")}</div>`;
  }
  function rulesHTML(){
    return `<div class="prules">${PHON_RULES.map(r=>`<section class="prule"><h3>${esc(r.t)}</h3><ul>${r.p.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="pex" lang="fr">${esc(r.ex)}</p></section>`).join("")}</div>`;
  }
  function pairsHTML(){
    const P=PHON_PAIRS[pair];
    return `<div class="pptabs">${PHON_PAIRS.map((p,i)=>`<button type="button" class="chip" data-pair="${i}" aria-pressed="${i===pair}">/${esc(p[0])}/ – /${esc(p[1])}/</button>`).join("")}</div>
    <p>${esc(P[3])}</p>
    <table class="ptable"><thead><tr><th>/${esc(P[0])}/</th><th>/${esc(P[1])}/</th></tr></thead><tbody>${P[2].map(([a,b])=>`<tr><td>${wordHTML(a)}</td><td>${wordHTML(b)}</td></tr>`).join("")}</tbody></table>
    ${speakHTML([...new Set(P[2].flat())].slice(0,8))}
    <section class="pquiz"><h3>Kiểm tra tai</h3>
      ${voiceOn&&canSpeak()?quizHTML():`<p class="sub">Phần nghe – chọn cần âm thanh phát ngay trong trang, nên chỉ dùng được với giọng máy của trình duyệt (bật ở trên). Với giọng thật: mở Forvo của từng cặp từ, nghe xen kẽ và tự đọc theo.</p>`}
    </section>`;
  }
  function quizHTML(){
    if(!quiz||quiz.pair!==pair)return `<button type="button" class="gbtn" data-pq="start">Bắt đầu (8 lượt)</button>`;
    if(quiz.i>=quiz.items.length)return `<p class="pqres"><b>${quiz.ok}/${quiz.items.length}</b> lượt đúng. ${quiz.ok>=7?"Tai bạn đã phân biệt tốt cặp âm này.":"Nghe lại các cặp từ ở trên rồi thử lần nữa."}</p><button type="button" class="ghostbtn" data-pq="start">Làm lại</button>`;
    const it=quiz.items[quiz.i];
    return `<p>Lượt ${quiz.i+1}/${quiz.items.length}: bấm nghe rồi chọn từ bạn nghe thấy.</p>
      <div class="pqrow"><button type="button" class="gbtn" data-pq="play">▶ Nghe</button>
      ${it.opts.map((w,j)=>`<button type="button" class="ghostbtn" data-pq="ans" data-j="${j}" lang="fr">${esc(w)}</button>`).join("")}</div>
      ${quiz.last?`<p class="sub">${quiz.last}</p>`:""}`;
  }
  function startQuiz(){
    const P=PHON_PAIRS[pair];const items=[];
    for(let k=0;k<8;k++){const pr=P[2][Math.floor(Math.random()*P[2].length)];const t=Math.random()<.5?0:1;items.push({opts:pr,t});}
    quiz={pair,items,i:0,ok:0,last:""};
  }

  function render(){
    const root=$("phonRoot");if(!root)return;
    const body={sons:soundsHTML,spell:spellHTML,rules:rulesHTML,pairs:pairsHTML}[tab]();
    root.innerHTML=`<div class="phpage">
      <header class="echead"><div><p class="motkick">Phonétique</p><h1>Ngữ âm tiếng Pháp</h1>
        <p class="lablede">${PHON_SOUNDS.length} âm của tiếng Pháp chuẩn, bảng chữ → âm, quy tắc nối âm và các cặp âm dễ nhầm. Giọng thật: mỗi từ ví dụ mở được bản đọc của người bản ngữ trên <b>Forvo</b> và câu nói thật trong video trên <b>YouGlish</b>.</p></div>
        <div class="phtools">
          <label class="check"><input type="checkbox" id="phVoice" ${voiceOn?"checked":""} ${canSpeak()?"":"disabled"}> Nghe nhanh bằng giọng máy của trình duyệt</label>
          <small class="sub">${canSpeak()?`Giọng: ${esc(frVoice.name)} (tổng hợp, không phải người thật)`:"Trình duyệt này không có giọng tiếng Pháp; vẫn nghe giọng thật qua Forvo, YouGlish."}</small>
        </div></header>
      <div class="lvtabs phtabs" role="tablist">${[["sons","Bảng âm"],["spell","Chữ → âm"],["rules","Quy tắc đọc"],["pairs","Cặp âm dễ nhầm"]].map(([k,l])=>`<button type="button" role="tab" aria-selected="${tab===k}" data-phtab="${k}">${l}</button>`).join("")}</div>
      <div class="phbody">${body}</div>
    </div>`;
  }

  document.addEventListener("click",e=>{
    const mic=e.target.closest("[data-mic]");
    if(mic){const w=mic.dataset.mic;if(ENV.hosted&&ENV.hasMedia)toggleRec(w);else startDict(w);return;}
    const t=e.target.closest("[data-phtab],[data-snd],[data-say],[data-pair],[data-pq]");if(!t)return;
    if(t.dataset.phtab){tab=t.dataset.phtab;render();return;}
    if(t.dataset.snd){const i=+t.dataset.snd;sel=sel===i?null:i;render();if(sel!==null)say(PHON_SOUNDS[sel].ex[0]);return;}
    if(t.dataset.say){say(t.dataset.say);return;}
    if(t.dataset.pair){pair=+t.dataset.pair;quiz=null;render();return;}
    const q=t.dataset.pq;
    if(q==="start"){startQuiz();render();return;}
    if(q==="play"&&quiz){const it=quiz.items[quiz.i];say(it.opts[it.t]);return;}
    if(q==="ans"&&quiz){const it=quiz.items[quiz.i];const j=+t.dataset.j;const ok=j===it.t;if(ok)quiz.ok++;quiz.last=(ok?"Đúng: ":"Chưa đúng: đó là ")+"« "+it.opts[it.t]+" ».";quiz.i++;render();}
  });
  document.addEventListener("change",e=>{
    const rf=e.target.closest("[data-recfile]");
    if(rf){const f=rf.files&&rf.files[0];if(f){takes.unshift({word:f.name,url:URL.createObjectURL(f),file:true});render();}return;}
    if(e.target.id!=="phVoice")return;voiceOn=e.target.checked;try{localStorage.setItem(LS,voiceOn?"1":"0");}catch(err){}render();});
  return {render};
})();
