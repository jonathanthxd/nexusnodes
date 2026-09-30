(function(){
  "use strict";
  const data=window.NEXUS_DATA;
  if(!data) return;
  const ui=window.NexusUI;
  const money=n=>ui?.money?ui.money(n):`$${Number(n).toFixed(2)}`;
  const defaultLoc=data.locations[0];

  function estimate(p,type,node=defaultLoc){
    const rate=type==='vps'?node.vpsPerGb:node.minecraftPerGb;
    return p.ram*rate+Math.max(0,p.cores-1)*data.pricing.cpuExtraPerCore+Math.max(0,p.storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
  }

  function presetCard(p,type){
    const total=estimate(p,type);
    return `<article class="preset-card ${p.featured?'featured':''}">
      <div class="preset-top"><span class="plan-tag">${p.featured?'Punto de partida':'Preset'}</span><span>${type==='vps'?'VPS':'MC'}</span></div>
      <h3>${p.name}</h3><p>${p.description}</p>
      <div class="preset-resources"><div><span>RAM</span><strong>${p.ram} GB</strong></div><div><span>CPU</span><strong>${p.cores} ${type==='vps'?'vCPU':'core'}</strong></div><div><span>Disk</span><strong>${p.storage} GB</strong></div></div>
      <div class="preset-price">${money(total)} <small>/ mes · estimado en ${defaultLoc.code}</small></div>
      <a class="button ${p.featured?'primary':'ghost'} full" href="planes.html?product=${type}&ram=${p.ram}&cores=${p.cores}&storage=${p.storage}#configurador">Personalizar</a>
    </article>`;
  }

  function renderCommon(){
    const mc=document.getElementById('minecraftPresets');
    if(mc) mc.innerHTML=data.minecraftPresets.slice(0,3).map(p=>presetCard(p,'minecraft')).join('');
    const vps=document.getElementById('vpsPresets');
    if(vps) vps.innerHTML=data.vpsPresets.map(p=>presetCard(p,'vps')).join('');
    const table=document.getElementById('vpsLocationTable');
    if(table) table.innerHTML=data.locations.map(l=>`<tr><td><strong>${l.flag} ${l.code}</strong></td><td>${l.processor}</td><td>${l.city}, ${l.region}</td><td class="price">${money(l.vpsPerGb)}/GB</td><td>${money(l.minecraftPerGb)}/GB</td></tr>`).join('');
  }

  function initMinecraftSizer(){
    const root=document.getElementById('mcSizer'); if(!root) return;
    let state={workload:'plugins',players:30,intensity:'standard'};
    const workloads=document.getElementById('mcSizerWorkloads');
    const range=document.getElementById('mcPlayers');
    const output=document.getElementById('mcPlayersOutput');
    const result=document.getElementById('mcSizerResult');

    function recommend(){
      const w=data.minecraftWorkloads.find(x=>x.id===state.workload)||data.minecraftWorkloads[0];
      const bands=Math.max(0,Math.ceil(Math.max(0,state.players-10)/25));
      let ram=w.baseRam+bands*w.ramStep,cores=w.baseCores+(state.players>60?1:0),storage=w.baseStorage+bands*10;
      if(state.intensity==='heavy'){ram+=Math.max(2,w.ramStep);cores+=1;storage+=20;}
      ram=Math.min(64,Math.max(4,Math.round(ram/2)*2));cores=Math.min(16,cores);storage=Math.min(300,Math.ceil(storage/10)*10);
      const node=data.locations.find(n=>n.id===((state.intensity==='heavy'||['modded','network'].includes(state.workload))?'us-mia-r9':'us-mia-r7'))||defaultLoc;
      const price=estimate({ram,cores,storage},'minecraft',node);
      if(result) result.innerHTML=`<div class="sizer-result-main"><span>Starting point</span><strong>${ram} GB RAM · ${cores} cores · ${storage} GB</strong><small>${w.label} · ${state.players} jugadores · ${state.intensity==='heavy'?'carga alta':'estándar'}</small></div><div class="sizer-result-node"><span>${node.flag} ${node.code}</span><strong>${money(price)}<small>/mes*</small></strong><a href="planes.html?product=minecraft&node=${node.id}&ram=${ram}&cores=${cores}&storage=${storage}&workload=${state.workload}&players=${state.players}#configurador">Abrir configurador →</a></div>`;
    }
    workloads.innerHTML=data.minecraftWorkloads.map(w=>`<button class="smart-choice ${w.id===state.workload?'active':''}" type="button" data-mc-workload="${w.id}"><strong>${w.label}</strong><small>${w.short}</small></button>`).join('');
    workloads.querySelectorAll('[data-mc-workload]').forEach(btn=>btn.addEventListener('click',()=>{state.workload=btn.dataset.mcWorkload;workloads.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));recommend();}));
    if(range){const fill=()=>{range.style.setProperty('--range',`${(+range.value-+range.min)/(+range.max-+range.min)*100}%`)};range.addEventListener('input',()=>{state.players=+range.value;if(output)output.textContent=`${state.players}`;fill();recommend();});fill();}
    root.querySelectorAll('[data-mc-intensity]').forEach(btn=>btn.addEventListener('click',()=>{state.intensity=btn.dataset.mcIntensity;root.querySelectorAll('[data-mc-intensity]').forEach(b=>b.classList.toggle('active',b===btn));recommend();}));
    recommend();
  }

  function initVpsComposer(){
    const root=document.getElementById('vpsComposer'); if(!root) return;
    let state={distro:'ubuntu',workload:'web'};
    const distros=document.getElementById('distroChoices');
    const workloads=document.getElementById('vpsWorkloadChoices');
    const result=document.getElementById('vpsComposerResult');
    function renderResult(){
      const d=data.distros.find(x=>x.id===state.distro)||data.distros[0];
      const w=data.vpsWorkloads.find(x=>x.id===state.workload)||data.vpsWorkloads[0];
      const node=data.locations.find(n=>n.id==='us-dal-intel')||defaultLoc;
      const price=estimate(w,'vps',node);
      result.innerHTML=`<div class="composer-os"><span class="distro-glyph">${d.glyph}</span><div><span>Image</span><strong>${d.label} ${d.version}</strong></div></div><div class="composer-specs"><div><span>RAM</span><strong>${w.ram} GB</strong></div><div><span>vCPU</span><strong>${w.cores}</strong></div><div><span>NVMe</span><strong>${w.storage} GB</strong></div></div><div class="composer-total"><span>${node.code} · starting point</span><strong>${money(price)}<small>/mes*</small></strong><a class="button primary compact" href="planes.html?product=vps&node=${node.id}&ram=${w.ram}&cores=${w.cores}&storage=${w.storage}&workload=${w.id}#configurador">Personalizar VPS</a></div>`;
    }
    distros.innerHTML=data.distros.map(d=>`<button type="button" class="distro-choice ${d.id===state.distro?'active':''}" data-distro="${d.id}"><span class="distro-glyph">${d.glyph}</span><span><strong>${d.label}</strong><small>${d.version}</small></span></button>`).join('');
    distros.querySelectorAll('[data-distro]').forEach(btn=>btn.addEventListener('click',()=>{state.distro=btn.dataset.distro;distros.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));renderResult();}));
    workloads.innerHTML=data.vpsWorkloads.map(w=>`<button type="button" class="smart-choice ${w.id===state.workload?'active':''}" data-vps-workload="${w.id}"><strong>${w.label}</strong><small>${w.description}</small></button>`).join('');
    workloads.querySelectorAll('[data-vps-workload]').forEach(btn=>btn.addEventListener('click',()=>{state.workload=btn.dataset.vpsWorkload;workloads.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));renderResult();}));
    renderResult();
  }

  document.addEventListener('DOMContentLoaded',()=>{renderCommon();initMinecraftSizer();initVpsComposer();});
})();
