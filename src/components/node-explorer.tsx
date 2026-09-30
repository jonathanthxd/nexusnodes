"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { audiences, nodes } from "@/lib/catalog";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

export function NodeExplorer() {
  const [active, setActive] = useState(nodes[1].id);
  const [audience, setAudience] = useState("north-sa");
  const [priority, setPriority] = useState<"balanced" | "performance" | "budget">("balanced");
  const selected = useMemo(() => nodes.find((node) => node.id === active) ?? nodes[0], [active]);
  const audienceData = audiences.find((item) => item.id === audience) ?? audiences[0];
  const recommendedId = priority === "performance" ? audienceData.performanceNode : priority === "budget" ? "us-dal-intel" : audienceData.node;
  const recommended = nodes.find((node) => node.id === recommendedId) ?? nodes[0];

  return (
    <div className="node-explorer">
      <div className="node-list-panel">
        <div className="panel-title"><span className="eyebrow">NODE EXPLORER</span><h3>Catálogo de regiones.</h3><p>Hardware y precio base visibles. Sin fabricar ping ni capacidad en tiempo real.</p></div>
        <div className="node-list">{nodes.map((node) => <button key={node.id} onClick={() => setActive(node.id)} className={cx(node.id === active && "is-active")}><span className="node-flag">{node.flag}</span><span><b>{node.code}</b><small>{node.city}</small></span><em>{node.tierLabel}</em><Icon name="chevron"/></button>)}</div>
      </div>
      <div className="node-detail-panel">
        <div className="node-detail-head"><div><span className="node-flag large">{selected.flag}</span><div><span className="eyebrow">{selected.code}</span><h3>{selected.city}</h3><p>{selected.region}</p></div></div><span className="status-badge good"><i/> Operational*</span></div>
        <div className="node-hardware"><div><Icon name="cpu"/><span>Procesador</span><strong>{selected.processor}</strong></div><div><Icon name="bolt"/><span>Tier</span><strong>{selected.tierLabel}</strong></div><div><Icon name="map"/><span>Región</span><strong>{selected.country}</strong></div></div>
        <p className="node-description">{selected.description}</p>
        <div className="node-rate-grid"><div><span>Minecraft</span><strong>${selected.minecraftPerGb.toFixed(2)}<small>/GB</small></strong></div><div><span>VPS</span><strong>${selected.vpsPerGb.toFixed(3).replace(/0+$/, "")}<small>/GB</small></strong></div></div>
        <div className="capability-row">{selected.capabilities.map((cap) => <span key={cap}><Icon name="check"/>{cap}</span>)}</div>
        <Link href={`/network/${selected.id}`} className="button ghost full">Ficha completa <Icon name="arrow"/></Link>
      </div>
      <div className="advisor-panel">
        <div className="panel-kicker"><Icon name="spark"/> REGION ADVISOR</div><h3>¿Dónde empezar?</h3>
        <label className="field-label">Audiencia<select value={audience} onChange={(event) => setAudience(event.target.value)}>{audiences.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <div className="field-label">Prioridad<div className="choice-row"><button onClick={() => setPriority("budget")} className={cx(priority === "budget" && "is-active")}>Precio</button><button onClick={() => setPriority("balanced")} className={cx(priority === "balanced" && "is-active")}>Balance</button><button onClick={() => setPriority("performance")} className={cx(priority === "performance" && "is-active")}>CPU</button></div></div>
        <div className="advisor-result"><span>Recomendación inicial</span><strong>{recommended.flag} {recommended.code} · {recommended.city}</strong><p>{audienceData.note}</p></div>
        <p className="price-disclaimer">*El estado de catálogo no es telemetría live hasta conectar la API de observabilidad.</p>
      </div>
    </div>
  );
}
