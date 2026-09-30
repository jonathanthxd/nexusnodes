"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
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
    <div className="node-explorer node-explorer-v5">
      <aside className="node-list-panel node-list-panel-v5">
        <div className="panel-title"><span className="eyebrow">NODE EXPLORER</span><h3>Regions &amp; hardware</h3><p>Select a catalog node to inspect its profile.</p></div>
        <div className="node-list node-list-v5">{nodes.map((node) => <button key={node.id} onClick={() => setActive(node.id)} className={cx(node.id === active && "is-active")}><span className="node-flag">{node.flag}</span><span><b>{node.code}</b><small>{node.city}</small></span><em>{node.tierLabel}</em><Icon name="chevron"/></button>)}</div>
        <div className="node-list-foot"><Icon name="activity"/><span>Catalog data only. Live capacity requires an observability source.</span></div>
      </aside>

      <section className="node-detail-panel node-detail-panel-v5">
        <AnimatePresence mode="wait">
          <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .18 }}>
            <div className="node-detail-head-v5"><div className="node-identity-v5"><span className="node-flag large">{selected.flag}</span><span><span className="eyebrow">{selected.code}</span><h3>{selected.city}</h3><p>{selected.region}</p></span></div><span className="catalog-state"><i/> Catalogued</span></div>
            <div className="node-hardware-v5"><div><span className="node-metric-icon"><Icon name="cpu"/></span><span><small>Processor</small><strong>{selected.processor}</strong></span></div><div><span className="node-metric-icon"><Icon name="bolt"/></span><span><small>Tier</small><strong>{selected.tierLabel}</strong></span></div><div><span className="node-metric-icon"><Icon name="map-pin"/></span><span><small>Region</small><strong>{selected.country}</strong></span></div></div>
            <p className="node-description-v5">{selected.description}</p>
            <div className="node-rate-grid-v5"><div><span><Icon name="gamepad"/> Minecraft</span><strong>${selected.minecraftPerGb.toFixed(2)}<small>/GB</small></strong></div><div><span><Icon name="cloud"/> Cloud VPS</span><strong>${selected.vpsPerGb.toFixed(3).replace(/0+$/, "")}<small>/GB</small></strong></div></div>
            <div className="capability-row capability-row-v5">{selected.capabilities.map((cap) => <span key={cap}><Icon name="check"/>{cap}</span>)}</div>
            <div className="node-detail-actions-v5"><Link href={`/network/${selected.id}`} className="button ghost">Open node profile <Icon name="arrow-up-right"/></Link><Link href={`/pricing?node=${selected.id}`} className="button primary">Configure here <Icon name="arrow"/></Link></div>
          </motion.div>
        </AnimatePresence>
      </section>

      <aside className="advisor-panel advisor-panel-v5">
        <div className="panel-kicker"><Icon name="spark"/> REGION ADVISOR</div><h3>Where should you start?</h3><p>Use audience and priority as a first-pass heuristic, then validate with real routing tools when connected.</p>
        <label className="field-label">Primary audience<select value={audience} onChange={(event) => setAudience(event.target.value)}>{audiences.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <div className="field-label">Priority<div className="choice-row"><button onClick={() => setPriority("budget")} className={cx(priority === "budget" && "is-active")}>Cost</button><button onClick={() => setPriority("balanced")} className={cx(priority === "balanced" && "is-active")}>Balance</button><button onClick={() => setPriority("performance")} className={cx(priority === "performance" && "is-active")}>CPU</button></div></div>
        <motion.div className="advisor-result advisor-result-v5" key={`${recommended.id}-${priority}`} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="advisor-result-label">Recommended starting point</span><div className="advisor-node-v5"><span>{recommended.flag}</span><span><strong>{recommended.code}</strong><small>{recommended.city}</small></span></div><p>{audienceData.note}</p><div className="advisor-meta-v5"><span><Icon name="cpu"/>{recommended.processor}</span><span><Icon name="money"/>${recommended.minecraftPerGb.toFixed(2)}/GB MC</span></div>
        </motion.div>
        <div className="advisor-warning-v5"><Icon name="shield"/><span>Recommendation ≠ guaranteed latency. Production needs test IP / Looking Glass data.</span></div>
      </aside>
    </div>
  );
}
