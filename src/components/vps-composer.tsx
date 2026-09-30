"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { distros, nodes, vpsWorkloads } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

export function VpsComposer() {
  const [distro, setDistro] = useState("ubuntu");
  const [workload, setWorkload] = useState("web");
  const [nodeId, setNodeId] = useState("us-mia-r7");
  const selected = vpsWorkloads.find((item) => item.id === workload) ?? vpsWorkloads[1];
  const node = nodes.find((item) => item.id === nodeId) ?? nodes[1];
  const quote = useMemo(() => calculateQuote({ product: "vps", nodeId, ramGb: selected.baseRam, cores: selected.baseCores, storageGb: selected.baseStorage }), [nodeId, selected]);
  const params = new URLSearchParams({ product: "vps", node: node.id, ram: String(selected.baseRam), cores: String(selected.baseCores), storage: String(selected.baseStorage), workload }).toString();

  return (
    <div className="vps-composer">
      <div className="composer-form">
        <div className="composer-step"><span>01</span><div><strong>Distribución</strong><p>Una selección visual; la disponibilidad final debe venir del provisioning.</p></div></div>
        <div className="distro-grid">{distros.map((item) => <button className={cx(item.id === distro && "is-active")} key={item.id} onClick={() => setDistro(item.id)}><b>{item.glyph}</b><span><strong>{item.label}</strong><small>{item.version}</small></span></button>)}</div>
        <div className="composer-step"><span>02</span><div><strong>Workload</strong><p>Partimos de un preset fácil de entender y modificar.</p></div></div>
        <div className="workload-row">{vpsWorkloads.map((item) => <button key={item.id} className={cx(item.id === workload && "is-active")} onClick={() => setWorkload(item.id)}>{item.label}</button>)}</div>
        <div className="composer-step"><span>03</span><div><strong>Región</strong><p>Elige por audiencia y valida latencia cuando haya Looking Glass.</p></div></div>
        <div className="node-option-grid compact">{nodes.map((item) => <button key={item.id} onClick={() => setNodeId(item.id)} className={cx("node-option", item.id === nodeId && "is-active")}><span><b>{item.code}</b><small>{item.city}</small></span></button>)}</div>
      </div>
      <div className="composer-preview">
        <div className="cloud-card-top"><span className="micro-label">DEPLOY PREVIEW</span><span className="live-pill"><i/> READY</span></div>
        <div className="cloud-instance-name"><span className="cloud-icon"><Icon name="server"/></span><div><strong>nx-{workload}-01</strong><span>{distros.find((item) => item.id === distro)?.label} · {node.code}</span></div></div>
        <div className="recommended-resource-grid"><div><Icon name="cpu"/><span>vCPU</span><strong>{selected.baseCores}</strong></div><div><Icon name="memory"/><span>RAM</span><strong>{selected.baseRam} GB</strong></div><div><Icon name="disk"/><span>NVMe</span><strong>{selected.baseStorage} GB</strong></div></div>
        <div className="cloud-stack"><span><Icon name="lock"/>Root access</span><span><Icon name="globe"/>IPv4*</span><span><Icon name="terminal"/>Console</span><span><Icon name="shield"/>DDoS*</span></div>
        <div className="recommended-price"><span>Estimación mensual</span><strong>{formatMoney(quote.total)}<small>/mes</small></strong></div>
        <Link href={`/pricing?${params}`} className="button primary full">Configurar este VPS <Icon name="arrow"/></Link>
        <small className="muted-note">*Disponibilidad y condiciones deben confirmarse desde el sistema real de provisioning/billing.</small>
      </div>
    </div>
  );
}
