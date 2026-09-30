(function(){
  "use strict";
  const data=window.NEXUS_DATA;
  if(!data) return;
  const ui=window.NexusUI;
  const money=n=>ui?.money?ui.money(n):`$${Number(n).toFixed(2)}`;
  let selected=data.locations.find(n=>n.id==='us-mia-r7')||data.locations[0];
  const tierLabel={value:'Value',balanced:'Balanced',latam:'LATAM',performance:'Performance'};

  function renderCards(){
    const cards=document.getElementById('locationCards');
    if(cards) cards.innerHTML=data.locations.map(l=>`<article class="location-card ${l.tier==='performance'?'performance':''}" data-code="${l.code}">
      <div class="location-card-head"><span class="flagbox">${l.flag}</span><div><h3>${l.city}</h3><span class="region">${l.region}</span></div><span class="node-status"><i></i>${l.status==='operational'?'Operativo':'Revisar'}</span></div>
      <div class="location-specs"><div><span>CPU</span><strong>${l.processor}</strong></div><div><span>Minecraft</span><strong>${money(l.minecraftPerGb)}/GB</strong></div><div><span>VPS</span><strong>${money(l.vpsPerGb)}/GB</strong></div></div>
      <p>${l.description}<br><strong class="soft-strong">Ideal:</strong> ${l.ideal}</p>
      <a class="card-inline-link" href="planes.html?node=${l.id}#configurador">Configurar en ${l.code} →</a>
    </article>`).join('');
  }

  function renderTable(){
    const table=document.getElementById('networkTable');
    if(table) table.innerHTML=data.locations.map(l=>`<tr><td><strong>${l.flag} ${l.code}</strong></td><td>${l.processor}</td><td>${l.city} · ${l.region}</td><td class="price">${money(l.minecraftPerGb)}/GB</td><td>${money(l.vpsPerGb)}/GB</td><td>${tierLabel[l.tier]||l.tier}</td></tr>`).join('');
  }

  function renderExplorer(){
    const list=document.getElementById('nodeExplorerList');
    if(list){
      list.innerHTML=data.locations.map(n=>`<button type="button" class="node-explorer-row ${n.id===selected.id?'active':''}" data-explore-node="${n.id}">
        <span class="flagbox">${n.flag}</span><span><strong>${n.code}</strong><small>${n.city} · ${n.region}</small></span><b>${n.tierLabel||tierLabel[n.tier]}</b>
      </button>`).join('');
      list.querySelectorAll('[data-explore-node]').forEach(btn=>btn.addEventListener('click',()=>{selected=data.locations.find(n=>n.id===btn.dataset.exploreNode)||data.locations[0];renderExplorer();}));
    }
    const root=document.getElementById('nodeExplorerDetail');
    if(root) root.innerHTML=`
      <div class="node-detail-top"><div><span class="node-detail-code">${selected.flag} ${selected.code}</span><h3>${selected.city}</h3><p>${selected.region}</p></div><span class="tier-badge ${selected.tier}">${selected.tierLabel||tierLabel[selected.tier]}</span></div>
      <div class="node-detail-cpu"><span>Compute profile</span><strong>${selected.processor}</strong><small>${selected.description}</small></div>
      <div class="node-detail-prices"><div><span>Minecraft</span><strong>${money(selected.minecraftPerGb)}<small>/GB</small></strong></div><div><span>VPS</span><strong>${money(selected.vpsPerGb)}<small>/GB</small></strong></div></div>
      <div class="node-detail-ideal"><span>Mejor encaje</span><p>${selected.ideal}</p></div>
      <div class="node-detail-actions"><a class="button primary" href="planes.html?node=${selected.id}#configurador">Configurar este nodo</a><a class="button ghost" href="status.html">Ver estado</a></div>`;
    document.querySelectorAll('[data-map-node]').forEach(pin=>pin.classList.toggle('active',pin.dataset.mapNode===selected.id));
  }

  function initMapPins(){
    document.querySelectorAll('[data-map-node]').forEach(pin=>pin.addEventListener('click',()=>{selected=data.locations.find(n=>n.id===pin.dataset.mapNode)||data.locations[0];renderExplorer();document.getElementById('nodeExplorerDetail')?.scrollIntoView({behavior:'smooth',block:'nearest'});}));
  }

  function initAudienceAdvisor(){
    const select=document.getElementById('networkAudience'); if(!select) return;
    select.innerHTML=data.audiences.map(a=>`<option value="${a.id}">${a.label}</option>`).join('');
    const priority=document.getElementById('networkPriority');
    const update=()=>{
      const audience=data.audiences.find(a=>a.id===select.value)||data.audiences[0];
      const performance=priority?.value==='performance';
      const node=data.locations.find(n=>n.id===(performance?audience.performanceNode:audience.node))||data.locations[0];
      const result=document.getElementById('networkAdviceResult');
      if(result) result.innerHTML=`<div class="advice-node"><span class="flagbox">${node.flag}</span><div><span>Punto de partida sugerido</span><strong>${node.city} · ${node.code}</strong><small>${node.processor} · ${node.tierLabel}</small></div><b>${money(node.minecraftPerGb)}/GB</b></div><p>${audience.note}</p><a class="button ghost compact" href="planes.html?product=minecraft&node=${node.id}#configurador">Usar ${node.code}</a>`;
    };
    select.addEventListener('change',update); priority?.addEventListener('change',update); update();
  }

  document.addEventListener('DOMContentLoaded',()=>{renderCards();renderTable();renderExplorer();initMapPins();initAudienceAdvisor();});
})();
