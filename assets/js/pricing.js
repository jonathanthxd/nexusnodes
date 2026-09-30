(function(){
  const data=window.NEXUS_DATA;
  if(!data) return;
  const $=s=>document.querySelector(s);
  const $$=s=>[...document.querySelectorAll(s)];
  const money=n=>`$${Number(n).toFixed(2)}`;
  let state={product:'minecraft',location:data.locations[0],ram:8,cores:2,storage:40};

  function rate(){return state.product==='vps'?state.location.vpsPerGb:state.location.minecraftPerGb}
  function calc(){
    const ramCost=state.ram*rate();
    const cpuExtra=Math.max(0,state.cores-1)*data.pricing.cpuExtraPerCore;
    const storageExtra=Math.max(0,state.storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
    return {ramCost,cpuExtra,storageExtra,total:ramCost+cpuExtra+storageExtra};
  }
  function setRangeFill(el){const min=+el.min,max=+el.max,val=+el.value;el.style.setProperty('--range',`${((val-min)/(max-min))*100}%`)}
  function productPresets(){return state.product==='vps'?data.vpsPresets:data.minecraftPresets}

  function renderPresets(){
    const root=$('#presetPlanGrid'); if(!root) return;
    root.innerHTML=productPresets().map(p=>{
      const total=(p.ram*rate())+Math.max(0,p.cores-1)*data.pricing.cpuExtraPerCore+Math.max(0,p.storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
      return `<article class="price-plan ${p.featured?'featured':''}">${p.featured?'<span class="recommended">Recomendado</span>':''}<span class="kicker">${state.product==='vps'?'VPS':'Minecraft'}</span><h3>${p.name}</h3><p>${p.description}</p><div class="plan-price">${money(total)} <small>/ mes · ${state.location.code}</small></div><div class="plan-specs"><span>${p.ram} GB RAM</span><span>${p.cores} ${state.product==='vps'?'vCPU':'core(s)'}</span><span>${p.storage} GB storage</span></div><button class="button ${p.featured?'primary':'ghost'} full" data-use-preset data-ram="${p.ram}" data-cores="${p.cores}" data-storage="${p.storage}">Usar configuración</button></article>`;
    }).join('');
    $$('[data-use-preset]').forEach(btn=>btn.addEventListener('click',()=>{applyPreset(+btn.dataset.ram,+btn.dataset.cores,+btn.dataset.storage);$('#configurador')?.scrollIntoView({behavior:'smooth'});}));
  }

  function renderLocations(){
    const root=$('#locationSelector'); if(!root) return;
    root.innerHTML=data.locations.map(l=>`<button type="button" class="location-option ${l.id===state.location.id?'active':''}" data-location="${l.id}"><span class="flagbox">${l.flag}</span><span><strong>${l.city} · ${l.code}</strong><small>${l.processor} · ${l.region}</small></span><b>${money(state.product==='vps'?l.vpsPerGb:l.minecraftPerGb)}/GB</b></button>`).join('');
    $$('[data-location]').forEach(btn=>btn.addEventListener('click',()=>{state.location=data.locations.find(l=>l.id===btn.dataset.location)||data.locations[0];renderLocations();renderPresets();update();}));
  }

  function renderQuickPresets(){
    const root=$('#quickPresets'); if(!root) return;
    root.innerHTML=productPresets().map(p=>`<button type="button" class="preset-button" data-quick data-ram="${p.ram}" data-cores="${p.cores}" data-storage="${p.storage}">${p.name}</button>`).join('');
    $$('[data-quick]').forEach(btn=>btn.addEventListener('click',()=>applyPreset(+btn.dataset.ram,+btn.dataset.cores,+btn.dataset.storage)));
  }

  function applyPreset(ram,cores,storage){
    state.ram=ram;state.cores=cores;state.storage=storage;
    const rr=$('#ramRange'),cr=$('#cpuRange'),sr=$('#storageRange');
    if(rr){rr.value=ram;setRangeFill(rr)} if(cr){cr.value=cores;setRangeFill(cr)} if(sr){sr.value=storage;setRangeFill(sr)} update();
  }

  function setProduct(product){
    state.product=product==='vps'?'vps':'minecraft';
    $$('[data-product-tabs] button,[data-config-product] button').forEach(b=>b.classList.toggle('active',b.dataset.product===state.product));
    renderLocations();renderQuickPresets();renderPresets();update();
  }

  function update(){
    const c=calc();
    $('#ramValue').textContent=`${state.ram} GB`; $('#cpuValue').textContent=`${state.cores} ${state.cores===1?'core':'cores'}`; $('#storageValue').textContent=`${state.storage} GB`;
    $('#summaryName').textContent=`${state.product==='vps'?'VPS':'Minecraft'} · Custom`;
    $('#summaryLocation').textContent=`${state.location.flag} ${state.location.city} · ${state.location.code}`;
    $('#summaryRam').textContent=`${state.ram} GB`; $('#summaryCpu').textContent=`${state.cores} ${state.cores===1?'core':'cores'} · ${state.cores*100}%`;
    $('#summaryStorage').textContent=`${state.storage} GB`; $('#summaryRate').textContent=`${money(rate())}/GB × ${state.ram}`;
    $('#summaryExtras').textContent=`CPU ${money(c.cpuExtra)} + disk ${money(c.storageExtra)}`; $('#priceTotal').textContent=money(c.total);
    const order=$('#orderButton'); if(order){const q=new URLSearchParams({product:state.product,node:state.location.id,ram:state.ram,cores:state.cores,storage:state.storage,estimate:c.total.toFixed(2)});order.href=`cuenta.html?${q.toString()}#register`;}
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const params=new URLSearchParams(location.search);
    state.product=params.get('product')==='vps'?'vps':'minecraft';
    const loc=data.locations.find(l=>l.id===params.get('node')); if(loc) state.location=loc;
    ['ram','cores','storage'].forEach(k=>{const v=Number(params.get(k));if(Number.isFinite(v)&&v>0) state[k]=v;});
    $$('[data-product-tabs] button,[data-config-product] button').forEach(btn=>btn.addEventListener('click',()=>setProduct(btn.dataset.product)));
    const rr=$('#ramRange'),cr=$('#cpuRange'),sr=$('#storageRange');
    if(rr){rr.value=state.ram;setRangeFill(rr);rr.addEventListener('input',()=>{state.ram=+rr.value;setRangeFill(rr);update();});}
    if(cr){cr.value=state.cores;setRangeFill(cr);cr.addEventListener('input',()=>{state.cores=+cr.value;setRangeFill(cr);update();});}
    if(sr){sr.value=state.storage;setRangeFill(sr);sr.addEventListener('input',()=>{state.storage=+sr.value;setRangeFill(sr);update();});}
    setProduct(state.product);
  });
})();
