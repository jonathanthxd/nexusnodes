"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { audiences, minecraftWorkloads, nodes } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

export function MinecraftSizer() {
  const [workload, setWorkload] = useState("plugins");
  const [players, setPlayers] = useState(35);
  const [audience, setAudience] = useState("north-sa");
  const [heavy, setHeavy] = useState(false);
  const result = useMemo(() => {
    const item = minecraftWorkloads.find((w) => w.id === workload) ?? minecraftWorkloads[1];
    const audienceData = audiences.find((a) => a.id === audience) ?? audiences[0];
    const extraRam = Math.max(0, Math.ceil((players - 20) / 25) * 2);
    const ram = Math.min(64, Math.max(4, item.baseRam + extraRam + (heavy ? 4 : 0)));
    const cores = Math.min(16, item.baseCores + (players > 70 ? 2 : players > 35 ? 1 : 0) + (heavy ? 1 : 0));
    const storage = item.baseStorage + (players > 50 ? 20 : 0) + (heavy ? 20 : 0);
    const nodeId = heavy ? audienceData.performanceNode : audienceData.node;
    const node = nodes.find((n) => n.id === nodeId) ?? nodes[1];
    const quote = calculateQuote({ product: "minecraft", nodeId, ramGb: ram, cores, storageGb: storage });
    return { ram, cores, storage, node, quote };
  }, [workload, players, audience, heavy]);

  const params = new URLSearchParams({ product: "minecraft", node: result.node.id, ram: String(result.ram), cores: String(result.cores), storage: String(result.storage), audience, workload }).toString();

  return (
    <div className="product-sizer">
      <div className="product-sizer-form">
        <span className="panel-kicker"><Icon name="spark"/> MINECRAFT SIZER</span>
        <h3>Un punto de partida para tu servidor.</h3>
        <div className="workload-card-grid">{minecraftWorkloads.map((item) => <button key={item.id} className={cx(item.id === workload && "is-active")} onClick={() => setWorkload(item.id)}><strong>{item.label}</strong><span>{item.short}</span></button>)}</div>
        <label className="range-field"><span><b>Jugadores simultáneos</b><em>{players}</em></span><input type="range" min="5" max="150" step="5" value={players} onChange={(event) => setPlayers(Number(event.target.value))}/></label>
        <label className="field-label">Audiencia principal<select value={audience} onChange={(event) => setAudience(event.target.value)}>{audiences.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <button className={cx("toggle-card", heavy && "is-active")} onClick={() => setHeavy((value) => !value)}><span><Icon name="bolt"/><span><strong>Carga pesada</strong><small>Plugins complejos, granjas, mundos o mods exigentes.</small></span></span><i/></button>
      </div>
      <div className="product-sizer-result">
        <div className="result-head"><div><span className="eyebrow">RECOMMENDED START</span><h3>{result.node.code} · {result.node.city}</h3></div><span className="status-badge good"><i/> READY</span></div>
        <div className="recommended-resource-grid"><div><Icon name="memory"/><span>RAM</span><strong>{result.ram} GB</strong></div><div><Icon name="cpu"/><span>CPU</span><strong>{result.cores} vCPU</strong></div><div><Icon name="disk"/><span>NVMe</span><strong>{result.storage} GB</strong></div></div>
        <div className="recommended-price"><span>Estimación mensual</span><strong>{formatMoney(result.quote.total)}<small>/mes</small></strong></div>
        <p>{minecraftWorkloads.find((item) => item.id === workload)?.description}</p>
        <Link href={`/pricing?${params}`} className="button primary full">Afinar configuración <Icon name="arrow"/></Link>
        <small className="muted-note">Recomendación orientativa. El rendimiento depende del software, configuración y carga real.</small>
      </div>
    </div>
  );
}
