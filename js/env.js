/* ---------- Environment: inside Claude (artifact) or self-hosted (GitHub Pages, Vercel…) ----------
   In Claude: Claude features (sample, db, downloads, dictation) are available; the frame blocks the
   microphone and iframes of other sites. Self-hosted: the opposite. Features switch on what is available. */
const ENV=(()=>{
  const claude=!!(window.claude&&typeof window.claude.use==="function");
  const hasMedia=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
  return {claude,hosted:!claude,hasMedia,
    /* plain browser download, used when the Claude downloads capability is absent */
    localDownloads:{save:async({filename,data})=>{
      const blob=data instanceof Blob?data:new Blob([data],{type:/\.html?$/.test(filename)?"text/html":/\.json$/.test(filename)?"application/json":"text/plain"});
      const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;
      document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);
    }}};
})();
