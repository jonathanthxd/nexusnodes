"use client";

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
    await navigator.clipboard?.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="brief-builder">
      <div className="brief-form">
        <span className="panel-kicker"><Icon name="spark"/> PRE-SALES BRIEF</span><h3>Llega a soporte con contexto útil.</h3><p>Se genera localmente en tu navegador; esta demo no transmite el contenido.</p>
        <label className="field-label">Producto<select value={product} onChange={(e) => setProduct(e.target.value)}><option>Minecraft</option><option>VPS</option><option>Infraestructura custom</option></select></label>
        <label className="field-label">Audiencia<input value={audience} onChange={(e) => setAudience(e.target.value)}/></label>
        <label className="field-label">Escala<select value={scale} onChange={(e) => setScale(e.target.value)}><option>1–20 usuarios</option><option>20–50 usuarios</option><option>50–150 usuarios</option><option>150+ usuarios</option></select></label>
        <label className="field-label">Necesidad<textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={4}/></label>
      </div>
      <div className="brief-preview"><span className="micro-label">PREVIEW</span><pre>{brief}</pre><button className="button primary full" onClick={copy}><Icon name="copy"/>{copied ? "Copiado" : "Copiar brief"}</button></div>
    </div>
  );
}
