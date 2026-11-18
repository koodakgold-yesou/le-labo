/* ---------- Speech: one interface for speech-to-text ----------
   In Claude: the dictation capability. Self-hosted: the browser's Web Speech API (Chrome, Edge).
   Rec: microphone recording for playback (self-hosted only; the Claude frame blocks the microphone). */
const Speech=(()=>{
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition||null;
  let dict=null,cur=null;
  const ready=ENV.claude?(async()=>{
    try{dict=await claude.use("dictation");}catch(e){dict=null;}
    if(!dict)return;
    dict.onPartial(({text})=>{if(cur&&cur.onPartial)cur.onPartial((cur.finals.join(" ")+" "+text).trim());});
    dict.onFinal(({text})=>{if(!cur)return;cur.finals.push(text);if(cur.onPartial)cur.onPartial(cur.finals.join(" "));});
    dict.onState(({state,reason})=>{
      if(!cur)return;
      if(state==="listening"){cur.started=true;cur.onStart&&cur.onStart();}
      else if(state==="idle"){const c=cur;cur=null;
        if(!c.started){c.onError&&c.onError(reason||"error");return;}
        const t=c.finals.join(" ").trim();c.onEnd&&c.onEnd({text:t,alts:[{t,c:0}],reason});}
    });
  })():Promise.resolve();
  const mode=()=>ENV.claude?(dict?"dict":"none"):(SR?"sr":"none");
  /* call straight from a click handler */
  function start(o){
    if(cur){stop();return;}
    const m=mode();
    if(m==="dict"){
      cur={...o,finals:[],started:false};
      dict.start({language:"fr"}).catch(e=>{const c=cur;cur=null;if(c&&c.onError)c.onError(e&&e.code||"error");});
      return;
    }
    if(m==="sr"){
      const sr=new SR();sr.lang="fr-FR";sr.continuous=!!o.continuous;sr.interimResults=true;sr.maxAlternatives=o.continuous?1:5;
      cur={...o,sr,finals:[],conf:[],alts:null};
      sr.onresult=e=>{if(!cur)return;let interim="";
        for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];
          if(r.isFinal){cur.finals.push(r[0].transcript.trim());cur.conf.push(r[0].confidence||0);if(!o.continuous){cur.alts=[];for(let j=0;j<r.length;j++)cur.alts.push({t:r[j].transcript,c:r[j].confidence||0});}}
          else interim+=r[0].transcript;}
        o.onPartial&&o.onPartial((cur.finals.join(" ")+" "+interim).trim());};
      sr.onerror=e=>{if(cur)cur.err=e.error;};
      sr.onend=()=>{const c=cur;cur=null;if(!c)return;const t=c.finals.join(" ").trim();
        if(c.err&&!t&&c.err!=="no-speech"){c.onError&&c.onError(c.err);return;}
        const conf=c.conf.length?c.conf.reduce((a,b)=>a+b,0)/c.conf.length:0;
        c.onEnd&&c.onEnd({text:t,alts:c.alts&&c.alts.length?c.alts:[{t,c:conf}],conf});};
      try{sr.start();o.onStart&&o.onStart();}catch(e){cur=null;o.onError&&o.onError("start");}
      return;
    }
    o.onError&&o.onError("unsupported");
  }
  function stop(){if(!cur)return;if(cur.sr){try{cur.sr.stop();}catch(e){}}else if(dict){dict.stop().catch(()=>{});}}
  const errText=c=>({not_granted:"Bạn đã từ chối quyền dùng micro cho nhận dạng giọng nói. Bật lại trong cài đặt trình duyệt rồi tải lại trang.","not-allowed":"Trình duyệt chưa cho phép dùng micro (bấm biểu tượng ổ khoá trên thanh địa chỉ).",dismissed:"Bạn đã đóng hộp thoại xin quyền; bấm mic lần nữa để thử lại.",busy:"Micro đang bận; đợi vài giây rồi thử lại.",rate_limited:"Dùng quá nhiều lần liên tiếp; đợi một chút rồi thử lại.",unavailable:"Nhận dạng giọng nói tiếng Pháp chưa dùng được với tài khoản hoặc trình duyệt này.",upstream_error:"Micro hoặc dịch vụ nhận dạng giọng nói bị lỗi; thử lại sau ít phút.",network:"Mất kết nối tới dịch vụ nhận dạng giọng nói.",unsupported:"Trình duyệt này không có nhận dạng giọng nói: dùng Chrome hoặc Edge (hoặc app Claude Desktop khi học trong Claude).","audio-capture":"Không tìm thấy micro."}[c]||`Chưa bắt đầu được (mã lỗi: ${c}). Hãy tải lại trang rồi thử lại.`);
  return {start,stop,active:()=>!!cur,mode,errText,ready};
})();
const Rec=(()=>{
  let mr=null,stream=null,chunks=[],done=null;
  const can=()=>ENV.hosted&&ENV.hasMedia;
  async function start(){if(!can()||mr)return false;try{stream=await navigator.mediaDevices.getUserMedia({audio:true});mr=new MediaRecorder(stream);chunks=[];mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};mr.start();return true;}catch(e){mr=null;return false;}}
  function stop(){return new Promise(res=>{if(!mr){res(null);return;}mr.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const url=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType||"audio/webm"}));mr=null;res(url);};try{mr.stop();}catch(e){mr=null;res(null);}});}
  return {can,start,stop,active:()=>!!mr};
})();
