(function(){
  "use strict";
  const data = window.NEXUS_DATA;
  if(!data) return;
  const ui = window.NexusUI;
  const money = n => ui?.money ? ui.money(n) : `$${Number(n).toFixed(2)}`;
  const state = { product: "minecraft", node: data.locations.find(n=>n.id==="us-mia-r7") || data.locations[0] };

  function specs(){
    return state.product === "vps"
      ? {ram:8, cores:4, storage:80, label:"VPS M"}
      : {ram:8, cores:2, storage:35, label:"Community"};
  }
  function total(){
    const s=specs();
    const rate=state.product==="vps"?state.node.vpsPerGb:state.node.minecraftPerGb;
    return s.ram*rate + Math.max(0,s.cores-1)*data.pricing.cpuExtraPerCore + Math.max(0,s.storage-data.pricing.includedStorageGb)*data.pricing.extraStoragePerGb;
  }
  function renderLaunchpad(){
    document.querySelectorAll("[data-home-product]").forEach(b=>b.classList.toggle("active",b.dataset.homeProduct===state.product));
    const nodeList=document.getElementById("homeNodeList");
    if(nodeList){
      nodeList.innerHTML=data.locations.map(n=>`<button type="button" class="launch-node ${n.id===state.node.id?'active':''}" data-home-node="${n.id}"><span><i class="node-mini-dot ${n.status==='operational'?'online':''}"></i><strong>${n.code}</strong></span><small>${n.city}</small><b>${money(state.product==='vps'?n.vpsPerGb:n.minecraftPerGb)}/GB</b></button>`).join("");
      nodeList.querySelectorAll("[data-home-node]").forEach(btn=>btn.addEventListener("click",()=>{state.node=data.locations.find(n=>n.id===btn.dataset.homeNode)||data.locations[0];renderLaunchpad();}));
    }
    const s=specs();
    const set=(id,val)=>{const el=document.getElementById(id); if(el) el.textContent=val;};
    set("homeLaunchName",state.product==="vps"?"nexus-vps-01":"survival-01");
    set("homeLaunchProduct",state.product==="vps"?"Linux VPS":"Minecraft");
    set("homeLaunchRam",`${s.ram} GB`); set("homeLaunchCpu",`${s.cores} ${state.product==='vps'?'vCPU':'cores'}`); set("homeLaunchDisk",`${s.storage} GB`);
    set("homeLaunchNode",state.node.code); set("homeLaunchPrice",money(total())); set("homeLaunchProcessor",state.node.processor);
    const order=document.getElementById("homeLaunchButton");
    if(order){
      const q=new URLSearchParams({product:state.product,node:state.node.id,ram:s.ram,cores:s.cores,storage:s.storage});
      order.href=`planes.html?${q.toString()}#configurador`;
    }
  }

  function renderRoutePlanner(){
    const select=document.getElementById("audienceSelect");
    if(!select) return;
    select.innerHTML=data.audiences.map(a=>`<option value="${a.id}">${a.label}</option>`).join("");
    const update=()=>{
      const audience=data.audiences.find(a=>a.id===select.value)||data.audiences[0];
      const node=data.locations.find(n=>n.id===audience.node)||data.locations[0];
      const perf=data.locations.find(n=>n.id===audience.performanceNode)||node;
      document.getElementById("routeFlag").textContent=node.flag;
      document.getElementById("routeNode").textContent=`${node.city} · ${node.code}`;
      document.getElementById("routeCpu").textContent=node.processor;
      document.getElementById("routeNote").textContent=audience.note;
      document.getElementById("routePrice").textContent=`Desde ${money(node.minecraftPerGb)}/GB`;
      const perfEl=document.getElementById("routePerformance");
      if(perfEl) perfEl.textContent=perf.id===node.id?"Mismo nodo recomendado":`Performance: ${perf.code} · ${perf.processor}`;
      const cta=document.getElementById("routeCta"); if(cta) cta.href=`planes.html?product=minecraft&node=${node.id}#configurador`;
    };
    select.addEventListener("change",update); update();
  }

  function initLiveFeed(){
    const root=document.getElementById("homeLiveFeed"); if(!root) return;
    const messages=[
      ["Provision","Container template prepared"],
      ["Network","Private allocation attached"],
      ["Runtime","Java / Linux environment ready"],
      ["Panel","Service registered in control plane"]
    ];
    root.innerHTML=messages.map(([tag,text],i)=>`<div class="feed-line"><span>${String(i+1).padStart(2,'0')}</span><b>${tag}</b><p>${text}</p><i>READY</i></div>`).join("");
  }

  document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll("[data-home-product]").forEach(btn=>btn.addEventListener("click",()=>{state.product=btn.dataset.homeProduct==='vps'?'vps':'minecraft';renderLaunchpad();}));
    renderLaunchpad(); renderRoutePlanner(); initLiveFeed();
  });
})();
