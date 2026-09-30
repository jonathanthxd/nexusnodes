(function(){
  "use strict";
  const data=window.NEXUS_DATA; if(!data) return;
  document.addEventListener('DOMContentLoaded',()=>{
    const services=document.getElementById('serviceStatusList');
    if(services) services.innerHTML=data.services.map(s=>`<article class="status-service"><div><strong>${s.name}</strong><span>${s.detail}</span></div><span class="status-badge-good">${s.status==='operational'?'Operativo':'Revisar'}</span></article>`).join('');
    const nodes=document.getElementById('statusNodeCards');
    if(nodes) nodes.innerHTML=data.locations.map(l=>`<article class="location-card" data-code="${l.code}"><div class="location-card-head"><span class="flagbox">${l.flag}</span><div><h3>${l.city}</h3><span class="region">${l.processor}</span></div><span class="node-status"><i></i>${l.status==='operational'?'Operativo':'Revisar'}</span></div><p>${l.code} · ${l.region}</p><a class="card-inline-link" href="network.html#locations">Ver nodo →</a></article>`).join('');
    const allGood=data.services.every(s=>s.status==='operational')&&data.locations.every(l=>l.status==='operational');
    const headline=document.getElementById('overallStatusText'); if(headline)headline.textContent=allGood?'Todos los componentes marcados como operativos':'Hay componentes que requieren revisión';
    const source=document.getElementById('statusSource'); if(source)source.textContent=`Fuente manual · assets/js/data.js · web ${data.version||'3'}`;
  });
})();
