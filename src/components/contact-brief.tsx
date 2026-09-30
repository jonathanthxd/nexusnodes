"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Icon } from "./icon";

export function ContactBrief() {
  const [product, setProduct] = useState("Minecraft");
  const [audience, setAudience] = useState("Colombia / LATAM norte");
  const [scale, setScale] = useState("20–50 usuarios");
  const [need, setNeed] = useState("Migración y recomendación de recursos");
  const [copied, setCopied] = useState(false);
  const brief = useMemo(() => `NexusNodes · Brief de preventa\nProducto: ${product}\nAudiencia: ${audience}\nEscala: ${scale}\nNecesidad: ${need}\n\nSolicito una recomendación basada en estos datos.`, [product, audience, scale, need]);

  async function copy() {
    try { await navigator.clipboard.writeText(brief); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setCopied(false); }
  }

  return (
    <div className="brief-builder brief-builder-v5">
      <div className="brief-form-v5">
        <div className="brief-form-head"><span className="brief-icon"><Icon name="message"/></span><div><span className="eyebrow">PRE-SALES BRIEF</span><h3>Give support the useful context first.</h3><p>Todo se compone localmente en tu navegador. Esta demo no transmite el contenido.</p></div></div>
        <div className="brief-fields-v5">
          <label className="field-label">Producto<select value={product} onChange={(e) => setProduct(e.target.value)}><option>Minecraft</option><option>VPS</option><option>Infraestructura custom</option></select></label>
          <label className="field-label">Escala<select value={scale} onChange={(e) => setScale(e.target.value)}><option>1–20 usuarios</option><option>20–50 usuarios</option><option>50–150 usuarios</option><option>150+ usuarios</option></select></label>
          <label className="field-label span-2">Audiencia<input value={audience} onChange={(e) => setAudience(e.target.value)}/></label>
          <label className="field-label span-2">Necesidad<textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={4}/></label>
        </div>
      </div>
      <div className="brief-preview-v5">
        <div className="brief-preview-head"><span><Icon name="file"/> BRIEF PREVIEW</span><i>LOCAL ONLY</i></div>
        <AnimatePresence mode="wait" initial={false}><motion.pre key={`${product}-${audience}-${scale}-${need}`} initial={{ opacity: .4 }} animate={{ opacity: 1 }} exit={{ opacity: .4 }} transition={{ duration: .14 }}>{brief}</motion.pre></AnimatePresence>
        <div className="brief-preview-tags"><span><Icon name="shield"/> no upload</span><span><Icon name="copy"/> clipboard ready</span></div>
        <button className="button primary full" onClick={copy}><Icon name={copied ? "check" : "copy"}/>{copied ? "Copiado" : "Copiar brief"}</button>
      </div>
    </div>
  );
}
