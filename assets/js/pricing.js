(function(){
  "use strict";
  const data=window.NEXUS_DATA;
  if(!data) return;
  const ui=window.NexusUI;
  const $=s=>document.querySelector(s);
  const $$=s=>[...document.querySelectorAll(s)];
  const money=n=>ui?.money?ui.money(n):`$${Number(n).toFixed(2)}`;
  const defaultLocation=data.locations.find(l=>l.id==='us-mia-r7')||data.locations[0];
  const defaults={product:'minecraft',location:defaultLocation,ram:8,cores:2,storage:40,workload:'plugins',players:30,audience:'north-sa',intensity:'standard'};
  let state={...defaults};

  function rate(node=state.location){return state.product==='vps'?node.vpsPerGb:node.minecraftPerGb}
  function calc(node=state.location){
    const ramCost=state.ram*(state.product==='vps'?node.vpsPerGb:node.minecraftPerGb);
    const cpuExtra=Math.max(0,state.cores-1)*data.pricing.cpuExtraPerCore;
    const storageExtra=Math.max(0,state.storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
    return {ramCost,cpuExtra,storageExtra,total:ramCost+cpuExtra+storageExtra};
  }
  function setRangeFill(el){if(!el)return;const min=+el.min,max=+el.max,val=+el.value;el.style.setProperty('--range',`${((val-min)/(max-min))*100}%`)}
  function productPresets(){return state.product==='vps'?data.vpsPresets:data.minecraftPresets}
  function workloads(){return state.product==='vps'?data.vpsWorkloads:data.minecraftWorkloads}

  function configUrl(base='planes.html'){
    const q=new URLSearchParams({product:state.product,node:state.location.id,ram:state.ram,cores:state.cores,storage:state.storage,workload:state.workload,audience:state.audience});
    if(state.product==='minecraft') q.set('players',state.players);
    return `${base}?${q.toString()}#configurador`;
  }

  function renderPresets(){
    const root=$('#presetPlanGrid'); if(!root) return;
    root.innerHTML=productPresets().map(p=>{
      const total=(p.ram*rate())+Math.max(0,p.cores-1)*data.pricing.cpuExtraPerCore+Math.max(0,p.storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
      return `<article class="price-plan ${p.featured?'featured':''}">
        ${p.featured?'<span class="recommended">Punto de partida</span>':''}
        <div class="plan-topline"><span class="kicker">${state.product==='vps'?'VPS':'Minecraft'}</span><span>${state.location.code}</span></div>
        <h3>${p.name}</h3><p>${p.description}</p>
        <div class="plan-price">${money(total)} <small>/ mes · estimado</small></div>
        <div class="plan-specs"><span>${p.ram} GB RAM</span><span>${p.cores} ${state.product==='vps'?'vCPU':'core(s)'}</span><span>${p.storage} GB NVMe</span></div>
        <button class="button ${p.featured?'primary':'ghost'} full" data-use-preset data-ram="${p.ram}" data-cores="${p.cores}" data-storage="${p.storage}">Usar configuración</button>
      </article>`;
    }).join('');
    $$('[data-use-preset]').forEach(btn=>btn.addEventListener('click',()=>{applyPreset(+btn.dataset.ram,+btn.dataset.cores,+btn.dataset.storage);$('#configurador')?.scrollIntoView({behavior:'smooth'});}));
  }

  function renderLocations(){
    const root=$('#locationSelector'); if(!root) return;
    root.innerHTML=data.locations.map(l=>`<button type="button" class="location-option ${l.id===state.location.id?'active':''}" data-location="${l.id}">
      <span class="flagbox">${l.flag}</span>
      <span><strong>${l.city} · ${l.code}</strong><small>${l.processor} · ${l.tierLabel||l.tier}</small></span>
      <b>${money(state.product==='vps'?l.vpsPerGb:l.minecraftPerGb)}/GB</b>
    </button>`).join('');
    $$('[data-location]').forEach(btn=>btn.addEventListener('click',()=>{state.location=data.locations.find(l=>l.id===btn.dataset.location)||data.locations[0];renderLocations();renderPresets();update();}));
  }

  function renderQuickPresets(){
    const root=$('#quickPresets'); if(!root) return;
    root.innerHTML=productPresets().map(p=>`<button type="button" class="preset-button" data-quick data-ram="${p.ram}" data-cores="${p.cores}" data-storage="${p.storage}">${p.name}</button>`).join('');
    $$('[data-quick]').forEach(btn=>btn.addEventListener('click',()=>applyPreset(+btn.dataset.ram,+btn.dataset.cores,+btn.dataset.storage)));
  }

  function renderWorkloads(){
    const root=$('#smartWorkloads'); if(!root) return;
    root.innerHTML=workloads().map(w=>`<button type="button" class="smart-choice ${w.id===state.workload?'active':''}" data-workload="${w.id}"><strong>${w.label}</strong><small>${w.short||w.description}</small></button>`).join('');
    root.querySelectorAll('[data-workload]').forEach(btn=>btn.addEventListener('click',()=>{state.workload=btn.dataset.workload;renderWorkloads();renderSmartContext();}));
  }

  function renderAudience(){
    const select=$('#smartAudience'); if(!select) return;
    select.innerHTML=data.audiences.map(a=>`<option value="${a.id}">${a.label}</option>`).join('');
    select.value=state.audience;
  }

  function renderSmartContext(){
    const mc=$('#smartMinecraftSize');
    if(mc) mc.hidden=state.product!=='minecraft';
    const label=$('#playersValue'); if(label) label.textContent=`${state.players} jugadores`;
    const help=$('#smartWorkloadHelp');
    const w=workloads().find(x=>x.id===state.workload)||workloads()[0];
    if(help) help.textContent=w?.description||'';
  }

  function recommendation(){
    const audience=data.audiences.find(a=>a.id===state.audience)||data.audiences.find(a=>a.id==='unknown')||data.audiences[0];
    if(state.product==='vps'){
      const w=data.vpsWorkloads.find(x=>x.id===state.workload)||data.vpsWorkloads[0];
      const intensity=state.intensity==='heavy'?1:0;
      return {ram:w.ram+(intensity?Math.max(2,Math.round(w.ram*.5)):0),cores:w.cores+(intensity?2:0),storage:w.storage+(intensity?40:0),node:data.locations.find(n=>n.id===(intensity?audience.performanceNode:audience.node))||defaultLocation,reason:`${w.label} · ${state.intensity==='heavy'?'carga alta':'carga estándar'}`};
    }
    const w=data.minecraftWorkloads.find(x=>x.id===state.workload)||data.minecraftWorkloads[0];
    const playerBands=Math.max(0,Math.ceil(Math.max(0,state.players-10)/25));
    let ram=w.baseRam+playerBands*w.ramStep;
    let cores=w.baseCores+(state.players>60?1:0);
    let storage=w.baseStorage+playerBands*10;
    if(state.intensity==='heavy'){ram+=Math.max(2,w.ramStep);cores+=1;storage+=20;}
    ram=Math.min(64,Math.max(4,Math.round(ram/2)*2)); cores=Math.min(16,cores); storage=Math.min(300,Math.ceil(storage/10)*10);
    const perf=state.intensity==='heavy'||state.workload==='modded'||state.workload==='network';
    return {ram,cores,storage,node:data.locations.find(n=>n.id===(perf?audience.performanceNode:audience.node))||defaultLocation,reason:`${w.label} · ${state.players} jugadores · ${state.intensity==='heavy'?'carga alta':'estándar'}`};
  }

  function applyRecommendation(){
    const r=recommendation();
    state.ram=r.ram;state.cores=r.cores;state.storage=r.storage;state.location=r.node;
    syncControls();renderLocations();renderPresets();update();
    const box=$('#smartResult');
    if(box){box.hidden=false;box.innerHTML=`<div><span class="smart-result-kicker">Punto de partida sugerido</span><strong>${r.node.flag} ${r.node.code} · ${r.ram} GB · ${r.cores} ${state.product==='vps'?'vCPU':'cores'}</strong><small>${r.reason}. Ajusta libremente después.</small></div><span>${money(calc().total)}/mes*</span>`;}
    ui?.toast?.('Recomendación aplicada al configurador','success');
  }

  function applyPreset(ram,cores,storage){state.ram=ram;state.cores=cores;state.storage=storage;syncControls();update();}
  function syncControls(){
    const rr=$('#ramRange'),cr=$('#cpuRange'),sr=$('#storageRange');
    if(rr){rr.value=state.ram;setRangeFill(rr)} if(cr){cr.value=state.cores;setRangeFill(cr)} if(sr){sr.value=state.storage;setRangeFill(sr)}
  }

  function setProduct(product){
    state.product=product==='vps'?'vps':'minecraft';
    if(state.product==='vps' && !data.vpsWorkloads.some(w=>w.id===state.workload)) state.workload='web';
    if(state.product==='minecraft' && !data.minecraftWorkloads.some(w=>w.id===state.workload)) state.workload='plugins';
    $$('[data-product-tabs] button,[data-config-product] button,[data-smart-product]').forEach(b=>b.classList.toggle('active',b.dataset.product===state.product||b.dataset.smartProduct===state.product));
    renderLocations();renderQuickPresets();renderPresets();renderWorkloads();renderSmartContext();update();
  }

  function renderNodeComparison(){
    const root=$('#nodeCostComparison'); if(!root) return;
    root.innerHTML=data.locations.map(node=>{
      const c=calc(node); const selected=node.id===state.location.id;
      return `<div class="cost-node ${selected?'selected':''}"><span><i class="node-mini-dot online"></i>${node.code}</span><strong>${money(c.total)}</strong><small>${node.tierLabel||node.tier}</small></div>`;
    }).join('');
  }

  function update(){
    const c=calc();
    const set=(id,val)=>{const el=$(id);if(el)el.textContent=val;};
    set('#ramValue',`${state.ram} GB`); set('#cpuValue',`${state.cores} ${state.cores===1?'core':'cores'}`); set('#storageValue',`${state.storage} GB`);
    set('#summaryName',`${state.product==='vps'?'VPS':'Minecraft'} · Custom`);
    set('#summaryLocation',`${state.location.flag} ${state.location.city} · ${state.location.code}`);
    set('#summaryRam',`${state.ram} GB`); set('#summaryCpu',`${state.cores} ${state.cores===1?'core':'cores'} · ${state.cores*100}%`);
    set('#summaryStorage',`${state.storage} GB`); set('#summaryRate',`${money(rate())}/GB × ${state.ram}`);
    set('#summaryExtras',`CPU ${money(c.cpuExtra)} + disk ${money(c.storageExtra)}`); set('#priceTotal',money(c.total));
    set('#breakdownRam',money(c.ramCost)); set('#breakdownCpu',money(c.cpuExtra)); set('#breakdownDisk',money(c.storageExtra));
    const total=Math.max(.01,c.total);
    const ramBar=$('#costRamBar'),cpuBar=$('#costCpuBar'),diskBar=$('#costDiskBar');
    if(ramBar)ramBar.style.width=`${c.ramCost/total*100}%`;if(cpuBar)cpuBar.style.width=`${c.cpuExtra/total*100}%`;if(diskBar)diskBar.style.width=`${c.storageExtra/total*100}%`;
    const order=$('#orderButton'); if(order){const q=new URLSearchParams({product:state.product,node:state.location.id,ram:state.ram,cores:state.cores,storage:state.storage,workload:state.workload,estimate:c.total.toFixed(2)});order.href=`cuenta.html?${q.toString()}#register`;}
    const share=$('#shareConfig'); if(share) share.dataset.url=absoluteConfigUrl();
    renderNodeComparison();
  }

  function absoluteConfigUrl(){
    const base=/^https?:/i.test(location.href)?location.href:'https://nexusnodes.lat/planes.html';
    return new URL(configUrl('planes.html'),base).href;
  }

  async function shareConfig(){
    const url=absoluteConfigUrl();
    if(navigator.share){try{await navigator.share({title:'Mi configuración NexusNodes',text:'Configuración estimada de NexusNodes',url});return;}catch(_) {}}
    try{await navigator.clipboard.writeText(url);ui?.toast?.('Enlace de configuración copiado','success');}catch(_){ui?.toast?.('No se pudo copiar el enlace','warning');}
  }

  function saveDraft(){
    const payload={...state,location:state.location.id};
    if(ui?.saveDraft?.('nexus-config-v3',payload)) ui.toast('Configuración guardada en este navegador','success');
    else ui?.toast?.('No se pudo guardar la configuración','warning');
  }

  function loadStateFromParams(){
    const params=new URLSearchParams(location.search);
    const hasParams=[...params.keys()].length>0;
    if(!hasParams){
      const draft=ui?.readDraft?.('nexus-config-v3');
      if(draft){state={...state,...draft,location:data.locations.find(l=>l.id===draft.location)||defaultLocation};}
    }
    state.product=params.get('product')==='vps'?'vps':(params.get('product')==='minecraft'?'minecraft':state.product);
    const loc=data.locations.find(l=>l.id===params.get('node')); if(loc) state.location=loc;
    ['ram','cores','storage','players'].forEach(k=>{const v=Number(params.get(k));if(Number.isFinite(v)&&v>0) state[k]=v;});
    if(params.get('workload')) state.workload=params.get('workload');
    if(params.get('audience')) state.audience=params.get('audience');
  }

  function reset(){state={...defaults};syncControls();renderAudience();setProduct('minecraft');renderSmartContext();const res=$('#smartResult');if(res)res.hidden=true;ui?.toast?.('Configurador restablecido');}

  document.addEventListener('DOMContentLoaded',()=>{
    loadStateFromParams();
    $$('[data-product-tabs] button,[data-config-product] button').forEach(btn=>btn.addEventListener('click',()=>setProduct(btn.dataset.product)));
    $$('[data-smart-product]').forEach(btn=>btn.addEventListener('click',()=>setProduct(btn.dataset.smartProduct)));
    const rr=$('#ramRange'),cr=$('#cpuRange'),sr=$('#storageRange'),pr=$('#playersRange');
    if(rr){rr.addEventListener('input',()=>{state.ram=+rr.value;setRangeFill(rr);update();});}
    if(cr){cr.addEventListener('input',()=>{state.cores=+cr.value;setRangeFill(cr);update();});}
    if(sr){sr.addEventListener('input',()=>{state.storage=+sr.value;setRangeFill(sr);update();});}
    if(pr){pr.value=state.players;setRangeFill(pr);pr.addEventListener('input',()=>{state.players=+pr.value;setRangeFill(pr);renderSmartContext();});}
    const audience=$('#smartAudience'); if(audience) audience.addEventListener('change',()=>state.audience=audience.value);
    $$('[data-intensity]').forEach(btn=>btn.addEventListener('click',()=>{state.intensity=btn.dataset.intensity;$$('[data-intensity]').forEach(b=>b.classList.toggle('active',b===btn));}));
    $('#smartRecommend')?.addEventListener('click',applyRecommendation);
    $('#saveConfig')?.addEventListener('click',saveDraft);
    $('#shareConfig')?.addEventListener('click',shareConfig);
    $('#resetConfig')?.addEventListener('click',reset);
    renderAudience();
    syncControls();
    if(pr)setRangeFill(pr);
    setProduct(state.product);
    const intensityBtn=$(`[data-intensity="${state.intensity}"]`); if(intensityBtn) intensityBtn.classList.add('active');
  });
})();
