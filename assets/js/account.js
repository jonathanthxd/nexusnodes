(function(){
  const data=window.NEXUS_DATA;
  const panelUrl=data?.brand?.panelUrl||'https://panel.nexusnodes.lat';
  const money=n=>`$${Number(n).toFixed(2)}`;
  function switchTab(name){
    document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b.dataset.authTab===name));
    document.querySelectorAll('[data-auth-panel]').forEach(p=>p.hidden=p.dataset.authPanel!==name);
  }
  function renderOrder(){
    const p=new URLSearchParams(location.search); const root=document.getElementById('orderContext');
    if(!root||!p.get('product')) return;
    const node=data?.locations?.find(l=>l.id===p.get('node'));
    const product=p.get('product')==='vps'?'VPS':'Minecraft';
    root.innerHTML=`<div class="estimate-note" style="margin-bottom:16px"><i></i><span><strong style="color:#d6dae3">Configuración guardada:</strong> ${product} · ${node?node.code:'nodo'} · ${p.get('ram')||'—'} GB RAM · ${p.get('cores')||'—'} core(s) · ${p.get('storage')||'—'} GB · estimado ${p.get('estimate')?money(p.get('estimate')):'—'}/mes.</span></div>`;
    const subtitle=document.getElementById('authSubtitle'); if(subtitle) subtitle.textContent='Tu configuración está lista. Crea una cuenta para continuar con el flujo.';
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-auth-tab]').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.authTab)));
    if(location.hash==='#register'||new URLSearchParams(location.search).get('product')) switchTab('register');
    renderOrder();
    document.getElementById('loginForm')?.addEventListener('submit',e=>{e.preventDefault(); if(!e.currentTarget.reportValidity()) return; window.open(panelUrl,'_blank','noopener');});
    document.getElementById('registerForm')?.addEventListener('submit',e=>{
      e.preventDefault(); if(!e.currentTarget.reportValidity()) return;
      const pass=document.getElementById('registerPassword')?.value||''; const confirm=document.getElementById('confirmPassword')?.value||'';
      const msg=document.getElementById('registerMessage');
      if(pass!==confirm){msg.textContent='Las contraseñas no coinciden.';msg.classList.add('show');return;}
      msg.textContent='Interfaz validada. Para crear la cuenta de verdad conecta este formulario al endpoint backend descrito en README.md. Ninguna contraseña se ha enviado desde esta demo estática.';msg.classList.add('show');
    });
  });
})();
