(function(){
  const data = window.NEXUS_DATA;
  if(!data) return;
  const money = n => `$${Number(n).toFixed(2)}`;
  const defaultLoc = data.locations[0];

  function presetCard(p, type){
    const rate = type === 'vps' ? defaultLoc.vpsPerGb : defaultLoc.minecraftPerGb;
    const extraCpu = Math.max(0,p.cores-1) * data.pricing.cpuExtraPerCore;
    const extraStorage = Math.max(0,p.storage-data.pricing.includedStorageGb) * data.pricing.extraStoragePerGb;
    const total = (p.ram * rate) + extraCpu + extraStorage;
    return `<article class="preset-card ${p.featured?'featured':''}"
      <span class="plan-tag">${p.featured?'Recomendado':'Preset'}</span>
      <h3>${p.name}</h3><p>${p.description}</p>
      <div class="preset-resources"><div><span>RAM</span><strong>${p.ram} GB</strong></div><div><span>CPU</span><strong>${p.cores} ${type==='vps'?'vCPU':'core'}</strong></div><div><span>Disk</span><strong>${p.storage} GB</strong></div></div>
      <div class="preset-price">${money(total)} <small>/ mes · estimado</small></div>
      <a class="button ${p.featured?'primary':'ghost'} full" style="margin-top:16px" href="planes.html?product=${type}&ram=${p.ram}&cores=${p.cores}&storage=${p.storage}#configurador">Configurar</a>
    </article>`;
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const mc = document.getElementById('minecraftPresets');
    if(mc) mc.innerHTML = data.minecraftPresets.slice(0,3).map(p=>presetCard(p,'minecraft')).join('');
    const vps = document.getElementById('vpsPresets');
    if(vps) vps.innerHTML = data.vpsPresets.map(p=>presetCard(p,'vps')).join('');
    const table = document.getElementById('vpsLocationTable');
    if(table) table.innerHTML = data.locations.map(l=>`<tr><td><strong>${l.flag} ${l.code}</strong></td><td>${l.processor}</td><td>${l.city}, ${l.region}</td><td class="price">${money(l.vpsPerGb)}/GB</td><td>${money(l.minecraftPerGb)}/GB</td></tr>`).join('');
  });
})();
