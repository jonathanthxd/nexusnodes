"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Icon } from "./icon";
import { nodes } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import type { ProductType } from "@/lib/types";
import { cx } from "@/lib/utils";

type StudioPreset = { id: string; label: string; ram: number; cores: number; storage: number };

const presets: Record<ProductType, StudioPreset[]> = {
  minecraft: [
    { id: "smp", label: "SMP / Plugins", ram: 8, cores: 2, storage: 40 },
    { id: "modded", label: "Modded", ram: 12, cores: 4, storage: 70 },
    { id: "network", label: "Network", ram: 16, cores: 4, storage: 100 }
  ],
  vps: [
    { id: "web", label: "Web / API", ram: 4, cores: 2, storage: 50 },
    { id: "db", label: "Database", ram: 8, cores: 4, storage: 100 },
    { id: "stack", label: "Full stack", ram: 12, cores: 4, storage: 120 }
  ]
};

export function DeployStudio() {
  const [product, setProduct] = useState<ProductType>("minecraft");
  const [preset, setPreset] = useState("smp");
  const [nodeId, setNodeId] = useState("us-mia-r7");
  const [ram, setRam] = useState(8);
  const [cores, setCores] = useState(2);
  const [storage, setStorage] = useState(40);

  const quote = useMemo(() => calculateQuote({ product, nodeId, ramGb: ram, cores, storageGb: storage }), [product, nodeId, ram, cores, storage]);
  const node = nodes.find((item) => item.id === nodeId) ?? nodes[0];
  const list = presets[product];

  function chooseProduct(next: ProductType) {
    setProduct(next);
    const first = presets[next][0];
    setPreset(first.id);
    setRam(first.ram);
    setCores(first.cores);
    setStorage(first.storage);
  }

  function choosePreset(id: string) {
    const item = list.find((entry) => entry.id === id) ?? list[0];
    setPreset(item.id);
    setRam(item.ram);
    setCores(item.cores);
    setStorage(item.storage);
  }

  const params = new URLSearchParams({ product, node: nodeId, ram: String(ram), cores: String(cores), storage: String(storage) }).toString();

  return (
    <motion.div className="deploy-studio" initial={{ opacity: 0, y: 20, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
      <div className="studio-window-bar">
        <div className="window-dots" aria-hidden="true"><i/><i/><i/></div>
        <div className="window-title"><Icon name="command" size={14}/> Quick Deploy</div>
        <span className="window-state"><i/> Ready</span>
      </div>

      <div className="studio-body">
        <div className="studio-tabs" role="tablist" aria-label="Producto">
          <button className={cx(product === "minecraft" && "is-active")} onClick={() => chooseProduct("minecraft")}><Icon name="gamepad"/> Minecraft</button>
          <button className={cx(product === "vps" && "is-active")} onClick={() => chooseProduct("vps")}><Icon name="cloud"/> Cloud VPS</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={product} className="studio-workload" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .2 }}>
            <div className="studio-label"><span>Workload</span><small>preset editable</small></div>
            <div className="studio-preset-grid">
              {list.map((item) => <button key={item.id} className={cx(preset === item.id && "is-active")} onClick={() => choosePreset(item.id)}>{item.label}</button>)}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="studio-resources">
          <StudioRange icon="memory" label="RAM" value={ram} min={4} max={32} step={2} suffix="GB" onChange={setRam}/>
          <StudioRange icon="cpu" label="CPU" value={cores} min={1} max={8} step={1} suffix="vCPU" onChange={setCores}/>
          <StudioRange icon="disk" label="NVMe" value={storage} min={20} max={200} step={10} suffix="GB" onChange={setStorage}/>
        </div>

        <div className="studio-region-row">
          <div><span className="studio-label-text">Región</span><strong>{node.flag} {node.code} · {node.city}</strong></div>
          <select value={nodeId} onChange={(event) => setNodeId(event.target.value)} aria-label="Seleccionar región">
            {nodes.map((item) => <option value={item.id} key={item.id}>{item.code} · {item.city}</option>)}
          </select>
        </div>

        <div className="studio-summary">
          <div className="studio-price"><span>Estimación mensual</span><AnimatePresence mode="popLayout" initial={false}><motion.strong key={quote.total} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{formatMoney(quote.total)}<small>/mes</small></motion.strong></AnimatePresence></div>
          <div className="studio-summary-tags"><span><Icon name="shield"/> DDoS-ready</span><span><Icon name="disk"/> NVMe</span><span><Icon name="settings"/> Editable</span></div>
        </div>

        <div className="studio-actions">
          <Link href={`/pricing?${params}`} className="button primary full">Continuar en Configurator <Icon name="arrow"/></Link>
          <p>El backend vuelve a validar precio, disponibilidad e impuestos antes del cobro.</p>
        </div>
      </div>
      <div className="studio-glow" aria-hidden="true"/>
    </motion.div>
  );
}

function StudioRange({ icon, label, value, min, max, step, suffix, onChange }: { icon: "memory" | "cpu" | "disk"; label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (value: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return <label className="studio-resource"><span><i><Icon name={icon}/></i><b>{label}</b><em>{value} {suffix}</em></span><input type="range" min={min} max={max} step={step} value={value} style={{ "--range": `${pct}%` } as React.CSSProperties} onChange={(event) => onChange(Number(event.target.value))}/></label>;
}
