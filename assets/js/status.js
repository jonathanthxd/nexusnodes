(function(){
  const data=window.NEXUS_DATA; if(!data) return;
  document.addEventListener('DOMContentLoaded',()=>{
    const services=document.getElementById('serviceStatusList');
    if(services) services.innerHTML=data.services.map(s=>`<article class="status-service"><div><strong>${s.name}</strong><span>${s.detail}</span></div><span class="status-badge-good">Operativo</span></article>`).join('');
    const nodes=document.getElementById('statusNodeCards');
    if(nodes) nodes.innerHTML=data.locations.map(l=>`<article class="location-card" data-code="${l.code}"><div class="location-card-head"><span class="flagbox">${l.flag}</span><div><h3>${l.city}</h3><span class="region">${l.processor}</span></div><span class="node-status"><i></i>Operativo</span></div><p>${l.code} · ${l.region}</p></article>`).join('');
  });
})();
