"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getNode, nodes } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import type { ProductType } from "@/lib/types";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

export function HeroLaunchpad() {
  const [product, setProduct] = useState<ProductType>("minecraft");
  const [nodeId, setNodeId] = useState("us-mia-r7");
  const [ram, setRam] = useState(8);
  const [cores, setCores] = useState(2);
  const quote = useMemo(() => calculateQuote({ product, nodeId, ramGb: ram, cores, storageGb: product === "minecraft" ? 40 : 60 }), [product, nodeId, ram, cores]);
  const node = getNode(nodeId);
  const params = new URLSearchParams({ product, node: nodeId, ram: String(ram), cores: String(cores), storage: String(product === "minecraft" ? 40 : 60) }).toString();

  return (
    <div className="launchpad-card">
      <div className="launchpad-top"><div><span className="micro-label">NEXUS LAUNCHPAD</span><strong>{product === "minecraft" ? "survival-01" : "nx-vps-01"}</strong></div><span className="live-pill"><i/> READY</span></div>
      <div className="launch-tabs"><button onClick={() => setProduct("minecraft")} className={cx(product === "minecraft" && "is-active")}>Minecraft</button><button onClick={() => setProduct("vps")} className={cx(product === "vps" && "is-active")}>VPS</button></div>
      <div className="launch-resource-row"><div><span>RAM</span><strong>{ram} GB</strong></div><div><span>CPU</span><strong>{cores} vCPU</strong></div><div><span>NODE</span><strong>{node.code}</strong></div></div>
      <div className="launch-sliders">
        <label><span>Memory</span><input type="range" min="4" max="32" step="2" value={ram} onChange={(e) => setRam(Number(e.target.value))}/><em>{ram} GB</em></label>
        <label><span>Compute</span><input type="range" min="1" max="8" step="1" value={cores} onChange={(e) => setCores(Number(e.target.value))}/><em>{cores} vCPU</em></label>
      </div>
      <div className="launch-node-row">{nodes.slice(0, 4).map((item) => <button key={item.id} className={cx(item.id === nodeId && "is-active")} onClick={() => setNodeId(item.id)}><i/>{item.code}</button>)}</div>
      <div className="launch-estimate"><span>Estimación</span><strong>{formatMoney(quote.total)}<small>/mes</small></strong></div>
      <Link href={`/pricing?${params}`} className="button primary full">Abrir configuración <Icon name="arrow"/></Link>
      <p className="launch-footnote">Estimación de catálogo · precio final validado por backend.</p>
    </div>
  );
}
