"use client";

import { useMemo, useState } from "react";
import { audiences, getNode, minecraftWorkloads, nodes, vpsWorkloads } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import type { ProductType, QuoteInput } from "@/lib/types";
import { Icon } from "./icon";
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
    setMessage("Recomendación aplicada. Puedes ajustar cada recurso manualmente.");
  }

  async function validateServer() {
    setValidating(true); setMessage("");
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
      const data = await response.json() as ServerValidation;
      if (!response.ok || !data.ok) throw new Error(data.error || "No fue posible validar la cotización.");
      setMessage(`Validado por servidor: ${formatMoney(data.quote?.total ?? quote.total)} / mes.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No fue posible validar la cotización.");
    } finally { setValidating(false); }
  }

  function saveQuote() {
    localStorage.setItem("nexusnodes.quote", JSON.stringify({ ...input, audience, workload }));
    setMessage("Configuración guardada en este navegador.");
  }

  async function shareQuote() {
    const params = new URLSearchParams({ product, node: nodeId, ram: String(ramGb), cores: String(cores), storage: String(storageGb), audience, workload });
    const url = `${window.location.origin}/pricing?${params.toString()}`;
    await navigator.clipboard?.writeText(url);
    setMessage("Enlace de configuración copiado.");
  }

  const checkoutParams = new URLSearchParams({ product, node: nodeId, ram: String(ramGb), cores: String(cores), storage: String(storageGb) }).toString();

  return (
    <div className="quote-builder">
      <aside className="sizer-panel">
        <div className="panel-kicker"><Icon name="spark"/> SMART SIZER</div>
        <h3>Empieza por tu carga, no por una lista de planes.</h3>
        <p>El sizer propone un punto de partida. No sustituye pruebas reales ni garantiza rendimiento.</p>

        <div className="segmented-control" role="group" aria-label="Producto">
          <button className={cx(product === "minecraft" && "is-active")} onClick={() => changeProduct("minecraft")}>Minecraft</button>
          <button className={cx(product === "vps" && "is-active")} onClick={() => changeProduct("vps")}>VPS</button>
        </div>

        <label className="field-label">Workload
          <select value={workload} onChange={(event) => setWorkload(event.target.value)}>
            {workloadList.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.short}</option>)}
          </select>
        </label>

        <label className="field-label">Audiencia principal
          <select value={audience} onChange={(event) => setAudience(event.target.value)}>
            {audiences.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
          </select>
        </label>

        {product === "minecraft" ? <label className="range-field"><span><b>Jugadores esperados</b><em>{players}</em></span><input type="range" min="5" max="150" step="5" value={players} onChange={(event) => setPlayers(Number(event.target.value))}/></label> : null}

        <div className="field-label">Intensidad
          <div className="choice-row">{(["light", "balanced", "heavy"] as const).map((level) => <button key={level} className={cx(intensity === level && "is-active")} onClick={() => setIntensity(level)}>{level === "light" ? "Ligera" : level === "balanced" ? "Equilibrada" : "Alta"}</button>)}</div>
        </div>

        <button className="button primary full" onClick={runSizer}><Icon name="spark"/> Aplicar recomendación</button>
        <div className="sizer-note"><Icon name="map"/><span>{selectedAudience.note}</span></div>
      </aside>

      <div className="configurator-panel">
        <div className="configurator-head"><div><span className="eyebrow">CONFIGURADOR</span><h3>Tu infraestructura, pieza por pieza.</h3></div><span className="config-type">{product === "minecraft" ? "GAME SERVER" : "CLOUD VPS"}</span></div>

        <div className="resource-control-grid">
          <ResourceRange icon="memory" label="RAM" value={ramGb} suffix="GB" min={4} max={64} step={2} onChange={setRamGb}/>
          <ResourceRange icon="cpu" label="CPU" value={cores} suffix="vCPU" min={1} max={16} step={1} onChange={setCores}/>
          <ResourceRange icon="disk" label="Storage" value={storageGb} suffix="GB" min={20} max={300} step={10} onChange={setStorageGb}/>
        </div>

        <div className="node-selector-head"><div><span className="field-title">Región / nodo</span><small>La latencia real debe medirse con test IP o Looking Glass.</small></div><span className="selected-node"><i/>{node.code}</span></div>
        <div className="node-option-grid">{nodes.map((item) => <button key={item.id} onClick={() => setNodeId(item.id)} className={cx("node-option", item.id === nodeId && "is-active")}><span><b>{item.flag} {item.code}</b><small>{item.city}</small></span><em>{item.tierLabel}</em></button>)}</div>

        <div className="quote-summary">
          <div className="quote-lines">
            <div><span>RAM · {ramGb} GB</span><strong>{formatMoney(quote.ram)}</strong></div>
            <div><span>CPU extra · {Math.max(0, cores - 1)} cores</span><strong>{formatMoney(quote.cpu)}</strong></div>
            <div><span>Storage extra · {Math.max(0, storageGb - quote.includedStorageGb)} GB</span><strong>{formatMoney(quote.storage)}</strong></div>
            <div className="quote-total"><span>Estimación mensual</span><strong>{formatMoney(quote.total)}<small>/mes</small></strong></div>
          </div>
          <div className="quote-context"><span><Icon name="server"/>{node.code} · {node.processor}</span><span><Icon name="shield"/>DDoS / aislamiento según plataforma</span><span><Icon name="clock"/>Facturación final: backend</span></div>
        </div>

        <div className="config-actions">
          <a href={`/account?${checkoutParams}`} className="button primary">Continuar <Icon name="arrow"/></a>
          <button className="button ghost" onClick={validateServer} disabled={validating}>{validating ? "Validando…" : "Validar precio"}</button>
          <button className="icon-button" onClick={saveQuote} title="Guardar configuración"><Icon name="disk"/></button>
          <button className="icon-button" onClick={shareQuote} title="Copiar enlace"><Icon name="copy"/></button>
        </div>
        {message ? <div className="config-message" role="status">{message}</div> : null}
        <p className="price-disclaimer">La cifra es una estimación de catálogo. El backend debe recalcular precio, stock, impuestos y límites antes de cualquier cobro.</p>
      </div>
    </div>
  );
}

function ResourceRange({ icon, label, value, suffix, min, max, step, onChange }: { icon: "memory" | "cpu" | "disk"; label: string; value: number; suffix: string; min: number; max: number; step: number; onChange: (value: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return <div className="resource-control"><div className="resource-control-title"><span><Icon name={icon}/>{label}</span><strong>{value} <small>{suffix}</small></strong></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} style={{ "--range": `${pct}%` } as React.CSSProperties} onChange={(event) => onChange(Number(event.target.value))}/><div className="range-limits"><span>{min}</span><span>{max}</span></div></div>;
}
