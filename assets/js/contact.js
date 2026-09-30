(function(){
  "use strict";
  const data=window.NEXUS_DATA;
  const ui=window.NexusUI;
  document.addEventListener('DOMContentLoaded',()=>{
    const form=document.getElementById('briefBuilder'); if(!form) return;
    const output=document.getElementById('briefOutput');
    const refresh=()=>{
      const fd=new FormData(form);
      const product=fd.get('product')||'Minecraft';
      const audience=fd.get('audience')||'Sin definir';
      const size=fd.get('size')||'Sin definir';
      const note=(fd.get('note')||'').trim();
      const text=[`Consulta NexusNodes — ${product}`,`Audiencia principal: ${audience}`,`Tamaño / carga: ${size}`,note?`Contexto: ${note}`:''].filter(Boolean).join('\n');
      if(output) output.textContent=text;
    };
    form.addEventListener('input',refresh);form.addEventListener('change',refresh);refresh();
    document.getElementById('copyBrief')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(output?.textContent||'');ui?.toast?.('Brief copiado','success');}catch(_){ui?.toast?.('No se pudo copiar','warning');}});
  });
})();
