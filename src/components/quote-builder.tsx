"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { audiences, getNode, minecraftWorkloads, nodes, vpsWorkloads } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import type { ProductType, QuoteInput } from "@/lib/types";
import { Icon, type IconName } from "./icon";
import { cx } from "@/lib/utils";

type InitialQuote = Partial<QuoteInput> & { audience?: string; workload?: string };
type ServerValidation = { ok: boolean; quote?: ReturnType<typeof calculateQuote>; normalized?: QuoteInput; error?: string };

export function QuoteBuilder({ initial = {} }: { initial?: InitialQuote }) {
  const [product, setProduct] = useState<ProductType>(initial.product === "vps" ? "vps" : "minecraft");
  const [nodeId, setNodeId] = useState(initial.nodeId && nodes.some((n) => n.id === initial.nodeId) ? initial.nodeId : "us-mia-r7");
  const [ramGb, setRamGb] = useState(Number(initial.ramGb) || 8);
  const [cores, setCores] = useState(Number(initial.cores) || 2);
  const [storageGb, setStorageGb] = useState(Number(initial.storageGb) || 40);
  const [audience, setAudience] = useState(initial.audience || "north-sa");
  const [workload, setWorkload] = useState(initial.workload || "plugins");
  const [players, setPlayers] = useState(30);
  const [intensity, setIntensity] = useState<"light" | "balanced" | "heavy">("balanced");
  const [message, setMessage] = useState("");
  const [validating, setValidating] = useState(false);

  const input = useMemo<QuoteInput>(() => ({ product, nodeId, ramGb, cores, storageGb }), [product, nodeId, ramGb, cores, storageGb]);
  const quote = useMemo(() => calculateQuote(input), [input]);
  const node = getNode(nodeId);
  const selectedAudience = audiences.find((item) => item.id === audience) ?? audiences[0];
  const workloadList = product === "minecraft" ? minecraftWorkloads : vpsWorkloads;

  function changeProduct(next: ProductType) {
    setProduct(next);
    setMessage("");
    if (next === "vps") {
      setWorkload("web"); setRamGb(4); setCores(2); setStorageGb(50);
    } else {
      setWorkload("plugins"); setRamGb(8); setCores(2); setStorageGb(40);
    }
  }

  function runSizer() {
    const list = product === "minecraft" ? minecraftWorkloads : vpsWorkloads;
    const selected = list.find((item) => item.id === workload) ?? list[0];
    const multiplier = intensity === "heavy" ? 1.5 : intensity === "light" ? 0.85 : 1;
    let ram = selected.baseRam;
    let cpu = selected.baseCores;
    let storage = selected.baseStorage;
    if (product === "minecraft") {
      ram += Math.max(0, Math.ceil((players - 20) / 25) * 2);
      cpu += players > 70 ? 2 : players > 35 ? 1 : 0;
      storage += players > 50 ? 20 : 0;
    }
    setRamGb(Math.min(64, Math.max(4, Math.round(ram * multiplier))));
    setCores(Math.min(16, Math.max(1, Math.round(cpu * (intensity === "heavy" ? 1.25 : 1)))));
    setStorageGb(Math.min(500, Math.max(20, Math.round(storage * multiplier / 10) * 10)));
    setNodeId(intensity === "heavy" ? selectedAudience.performanceNode : selectedAudience.node);
    setMessage("Smart Sizer aplicado. Ajusta cualquier recurso antes de continuar.");
  }

  async function validateServer() {
    setValidating(true); setMessage("");
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
      const data = await response.json() as ServerValidation;
      if (!response.ok || !data.ok) throw new Error(data.error || "No fue posible validar la cotización.");
      setMessage(`Price check OK · ${formatMoney(data.quote?.total ?? quote.total)} / month`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No fue posible validar la cotización.");
    } finally { setValidating(false); }
  }

  function saveQuote() {
    localStorage.setItem("nexusnodes.quote", JSON.stringify({ ...input, audience, workload }));
    setMessage("Configuration saved in this browser.");
  }

  async function shareQuote() {
    const params = new URLSearchParams({ product, node: nodeId, ram: String(ramGb), cores: String(cores), storage: String(storageGb), audience, workload });
    const url = `${window.location.origin}/pricing?${params.toString()}`;
    try { await navigator.clipboard.writeText(url); setMessage("Share link copied."); }
    catch { setMessage(url); }
  }

  const checkoutParams = new URLSearchParams({ product, node: nodeId, ram: String(ramGb), cores: String(cores), storage: String(storageGb) }).toString();

  return (
    <div className="configurator-v5">
      <aside className="config-sidebar-v5">
        <div className="config-sidebar-head"><span className="configurator-logo"><Icon name="sliders"/></span><div><span className="eyebrow">SMART CONFIGURATOR</span><h3>Build your service</h3></div></div>
        <ConfigStep number="01" title="Product">
          <div className="product-switch-v5">
            <button className={cx(product === "minecraft" && "is-active")} onClick={() => changeProduct("minecraft")}><Icon name="gamepad"/><span><strong>Minecraft</strong><small>Game server</small></span></button>
            <button className={cx(product === "vps" && "is-active")} onClick={() => changeProduct("vps")}><Icon name="cloud"/><span><strong>Cloud VPS</strong><small>Linux compute</small></span></button>
          </div>
        </ConfigStep>

        <ConfigStep number="02" title="Workload">
          <div className="workload-list-v5">{workloadList.map((item) => <button key={item.id} onClick={() => setWorkload(item.id)} className={cx(workload === item.id && "is-active")}><span><strong>{item.label}</strong><small>{item.short}</small></span><i/></button>)}</div>
        </ConfigStep>

        <ConfigStep number="03" title="Audience & intensity">
          <label className="select-field-v5"><span>Primary audience</span><select value={audience} onChange={(event) => setAudience(event.target.value)}>{audiences.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
          {product === "minecraft" ? <label className="players-field-v5"><span><b>Expected players</b><em>{players}</em></span><input type="range" min="5" max="150" step="5" value={players} onChange={(event) => setPlayers(Number(event.target.value))}/></label> : null}
          <div className="intensity-v5">{(["light", "balanced", "heavy"] as const).map((level) => <button key={level} onClick={() => setIntensity(level)} className={cx(intensity === level && "is-active")}>{level === "light" ? "Light" : level === "balanced" ? "Balanced" : "Heavy"}</button>)}</div>
        </ConfigStep>

        <button className="button primary full" onClick={runSizer}><Icon name="spark"/> Apply Smart Sizer</button>
        <div className="advisor-note-v5"><Icon name="map-pin"/><span>{selectedAudience.note}</span></div>
      </aside>

      <section className="config-canvas-v5">
        <div className="config-canvas-head"><div><span className="eyebrow">RESOURCES</span><h2>Fine tune the deployment.</h2><p>Presets are a starting point. Every resource remains editable.</p></div><span className="config-product-badge"><Icon name={product === "minecraft" ? "gamepad" : "cloud"}/>{product === "minecraft" ? "GAME SERVER" : "CLOUD VPS"}</span></div>

        <div className="resource-cards-v5">
          <ResourceCard icon="memory" label="Memory" value={ramGb} suffix="GB RAM" min={4} max={64} step={2} onChange={setRamGb} helper="Working set + runtime"/>
          <ResourceCard icon="cpu" label="Compute" value={cores} suffix="vCPU" min={1} max={16} step={1} onChange={setCores} helper="CPU allocation"/>
          <ResourceCard icon="disk" label="Storage" value={storageGb} suffix="GB NVMe" min={20} max={300} step={10} onChange={setStorageGb} helper="Persistent storage"/>
        </div>

        <div className="region-config-v5">
          <div className="region-config-head"><div><span className="eyebrow">REGION</span><h3>Choose where the service starts.</h3><p>Use geography and hardware as context; validate real latency before production.</p></div><Link href="/network">Explore network <Icon name="arrow-up-right"/></Link></div>
          <div className="region-card-grid-v5">{nodes.map((item) => <button key={item.id} className={cx("region-card-v5", item.id === nodeId && "is-active")} onClick={() => setNodeId(item.id)}><div><span className="region-flag-v5">{item.flag}</span><span><strong>{item.code}</strong><small>{item.city}</small></span></div><span className="region-tier-v5">{item.tierLabel}</span><div className="region-card-meta"><span><Icon name="cpu"/>{item.processor}</span><span><Icon name="money"/>${(product === "minecraft" ? item.minecraftPerGb : item.vpsPerGb).toFixed(2)}/GB</span></div><i/></button>)}</div>
        </div>
      </section>

      <aside className="order-summary-v5">
        <div className="order-summary-sticky">
          <div className="order-head-v5"><span><Icon name="wallet"/> ORDER SUMMARY</span><button onClick={shareQuote} title="Share configuration"><Icon name="external"/></button></div>
          <div className="order-product-v5"><span className="order-product-icon"><Icon name={product === "minecraft" ? "gamepad" : "cloud"}/></span><span><strong>{product === "minecraft" ? "Minecraft Server" : "Cloud VPS"}</strong><small>{node.flag} {node.code} · {node.city}</small></span></div>
          <div className="order-specs-v5"><span><Icon name="memory"/><b>{ramGb} GB</b><small>RAM</small></span><span><Icon name="cpu"/><b>{cores}</b><small>vCPU</small></span><span><Icon name="disk"/><b>{storageGb} GB</b><small>NVMe</small></span></div>
          <div className="order-breakdown-v5"><div><span>Memory</span><strong>{formatMoney(quote.ram)}</strong></div><div><span>Additional CPU</span><strong>{formatMoney(quote.cpu)}</strong></div><div><span>Additional storage</span><strong>{formatMoney(quote.storage)}</strong></div></div>
          <div className="order-total-v5"><span>Estimated monthly</span><AnimatePresence mode="popLayout" initial={false}><motion.strong key={quote.total} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{formatMoney(quote.total)}<small>/mo</small></motion.strong></AnimatePresence><p>Catalog estimate before taxes, stock and billing validation.</p></div>
          <div className="order-actions-v5"><Link href={`/account?${checkoutParams}`} className="button primary full">Continue <Icon name="arrow"/></Link><button className="button ghost full" onClick={validateServer} disabled={validating}><Icon name="shield"/>{validating ? "Validating…" : "Validate server-side"}</button><button className="order-save-v5" onClick={saveQuote}><Icon name="disk"/> Save configuration</button></div>
          {message ? <motion.div className="config-message-v5" role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}><Icon name="check-circle"/><span>{message}</span></motion.div> : null}
          <div className="order-security-v5"><Icon name="lock"/><span>Final billing and provisioning must always be performed by trusted server-side services.</span></div>
        </div>
      </aside>
    </div>
  );
}

function ConfigStep({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <div className="config-step-v5"><div className="config-step-title"><span>{number}</span><strong>{title}</strong></div>{children}</div>;
}

function ResourceCard({ icon, label, value, suffix, min, max, step, onChange, helper }: { icon: IconName; label: string; value: number; suffix: string; min: number; max: number; step: number; onChange: (value: number) => void; helper: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return <article className="resource-card-v5"><div className="resource-card-head"><span className="resource-card-icon"><Icon name={icon}/></span><span><strong>{label}</strong><small>{helper}</small></span></div><div className="resource-value-v5"><strong>{value}</strong><span>{suffix}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} style={{ "--range": `${pct}%` } as React.CSSProperties} onChange={(event) => onChange(Number(event.target.value))}/><div className="resource-range-foot"><span>{min}</span><span>{max}</span></div></article>;
}
