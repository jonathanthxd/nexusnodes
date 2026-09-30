(function(){
  "use strict";
  const data=window.NEXUS_DATA;
  const panelUrl=data?.brand?.panelUrl||'https://panel.nexusnodes.lat';
  const ui=window.NexusUI;
  const money=n=>ui?.money?ui.money(n):`$${Number(n).toFixed(2)}`;

  function switchTab(name){
    document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b.dataset.authTab===name));
    document.querySelectorAll('[data-auth-panel]').forEach(p=>p.hidden=p.dataset.authPanel!==name);
  }
  function orderFromQuery(){
    const p=new URLSearchParams(location.search);
    if(!p.get('product')) return null;
    const product=p.get('product')==='vps'?'vps':'minecraft';
    const node=data?.locations?.find(l=>l.id===p.get('node'))||data?.locations?.[0];
    const ram=Math.max(4,Number(p.get('ram'))||8),cores=Math.max(1,Number(p.get('cores'))||2),storage=Math.max(20,Number(p.get('storage'))||40);
    const rate=product==='vps'?node.vpsPerGb:node.minecraftPerGb;
    const ramCost=ram*rate,cpu=Math.max(0,cores-1)*data.pricing.cpuExtraPerCore,disk=Math.max(0,storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
    return {product,node,ram,cores,storage,total:ramCost+cpu+disk,workload:p.get('workload')||''};
  }
  function renderOrder(){
    const order=orderFromQuery(); const root=document.getElementById('orderContext'); const aside=document.getElementById('accountOrderCard');
    if(!order){if(aside)aside.hidden=true;return;}
    const label=order.product==='vps'?'VPS':'Minecraft';
    if(root) root.innerHTML=`<div class="estimate-note account-order-note"><i></i><span><strong>Configuración guardada:</strong> ${label} · ${order.node.code} · ${order.ram} GB RAM · ${order.cores} core(s) · ${order.storage} GB · estimado ${money(order.total)}/mes.</span></div>`;
    const subtitle=document.getElementById('authSubtitle'); if(subtitle) subtitle.textContent='Tu configuración está lista. Crea una cuenta para continuar con el flujo.';
    if(aside){aside.hidden=false;aside.innerHTML=`<div class="account-order-head"><span>Order draft</span><strong>${label}</strong></div><div class="account-order-node"><span class="flagbox">${order.node.flag}</span><div><strong>${order.node.code}</strong><small>${order.node.city} · ${order.node.processor}</small></div></div><div class="account-order-specs"><div><span>RAM</span><strong>${order.ram} GB</strong></div><div><span>CPU</span><strong>${order.cores}</strong></div><div><span>Disk</span><strong>${order.storage} GB</strong></div></div><div class="account-order-total"><span>Estimación mensual</span><strong>${money(order.total)}</strong></div><small class="account-order-disclaimer">* Estimación frontend. La facturación real debe validarse en backend.</small>`;}
  }
  function initPasswordStrength(){
    const input=document.getElementById('registerPassword'); const meter=document.getElementById('passwordStrength'); if(!input||!meter)return;
    const update=()=>{
      const v=input.value; let score=0;
      if(v.length>=8)score++;if(v.length>=12)score++;if(/[A-Z]/.test(v)&&/[a-z]/.test(v))score++;if(/\d/.test(v))score++;if(/[^A-Za-z0-9]/.test(v))score++;
      meter.dataset.score=String(score); meter.querySelector('span').textContent=score<=1?'Débil':score<=3?'Correcta':'Fuerte';
    }; input.addEventListener('input',update);update();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-auth-tab]').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.authTab)));
    if(location.hash==='#register'||new URLSearchParams(location.search).get('product')) switchTab('register');
    renderOrder();initPasswordStrength();
    document.getElementById('loginForm')?.addEventListener('submit',e=>{e.preventDefault(); if(!e.currentTarget.reportValidity()) return; window.open(panelUrl,'_blank','noopener');});
    document.getElementById('registerForm')?.addEventListener('submit',e=>{
      e.preventDefault(); if(!e.currentTarget.reportValidity()) return;
      const pass=document.getElementById('registerPassword')?.value||''; const confirm=document.getElementById('confirmPassword')?.value||''; const msg=document.getElementById('registerMessage');
      if(pass!==confirm){msg.textContent='Las contraseñas no coinciden.';msg.classList.add('show','error');return;}
      msg.classList.remove('error');msg.textContent='Interfaz validada. Para crear la cuenta de verdad conecta este formulario al endpoint backend descrito en README.md. Ninguna contraseña se ha enviado desde esta demo estática.';msg.classList.add('show');
    });
  });
})();
