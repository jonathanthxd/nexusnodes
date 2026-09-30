(function(){
  const data = window.NEXUS_DATA;
  if(!data) return;
  const money = n => `$${Number(n).toFixed(2)}`;
  const tierLabel = {value:'Value',balanced:'Balanced',latam:'LATAM',performance:'Performance'};
  document.addEventListener('DOMContentLoaded',()=>{
    const list=document.getElementById('networkRegionList');
    if(list) list.innerHTML=data.locations.map(l=>`<div class="region-row"><span class="region-flag">${l.flag}</span><div><strong>${l.city}</strong><small>${l.processor} · ${l.region}</small></div><span class="region-code">${l.code}</span></div>`).join('');
    const cards=document.getElementById('locationCards');
    if(cards) cards.innerHTML=data.locations.map(l=>`<article class="location-card ${l.tier==='performance'?'performance':''}" data-code="${l.code}"<div class="location-card-head"><span class="flagbox">${l.flag}</span><div><h3>${l.city}</h3><span class="region">${l.region}</span></div><span class="node-status"><i></i>${l.status==='operational'?'Operativo':'Revisar'}</span></div><div class="location-specs"><div><span>CPU</span><strong>${l.processor}</strong></div><div><span>Minecraft</span><strong>${money(l.minecraftPerGb)}/GB</strong></div><div><span>VPS</span><strong>${money(l.vpsPerGb)}/GB</strong></div></div><p>${l.description}<br><strong style="color:#c5cad5">Ideal:</strong> ${l.ideal}</p></article>`).join('');
    const table=document.getElementById('networkTable');
    if(table) table.innerHTML=data.locations.map(l=>`<tr><td><strong>${l.flag} ${l.code}</strong></td><td>${l.processor}</td><td>${l.city} · ${l.region}</td><td class="price">${money(l.minecraftPerGb)}/GB</td><td>${money(l.vpsPerGb)}/GB</td><td>${tierLabel[l.tier]||l.tier}</td></tr>`).join('');
  });
})();
