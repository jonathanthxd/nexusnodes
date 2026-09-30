"use client";

import { useMemo, useState } from "react";
import { getNode } from "@/lib/catalog";
import { calculateQuote, formatMoney } from "@/lib/pricing";
import type { ProductType } from "@/lib/types";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

type AccountContext = {
  product: ProductType;
  nodeId: string;
  ramGb: number;
  cores: number;
  storageGb: number;
};

export function AccountPanel({ context }: { context?: AccountContext }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const score = useMemo(() => passwordScore(password), [password]);
  const quote = context ? calculateQuote(context) : null;
  const node = context ? getNode(context.nodeId) : null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === "login") {
      window.location.href = "https://panel.nexusnodes.lat";
      return;
    }
    alert("La interfaz de registro está lista. Conecta aquí tu backend de autenticación y provisioning; no se enviaron credenciales a ningún tercero.");
  }

  return (
    <div className="account-layout">
      <div className="account-promo">
        <span className="eyebrow">NEXUS IDENTITY</span>
        <h2>Una cuenta.<br/>Toda tu infraestructura.</h2>
        <p>El frontend queda preparado para separar autenticación, billing y provisioning sin exponer secretos administrativos en el navegador.</p>
        <div className="account-feature-list"><span><Icon name="server"/>Minecraft &amp; VPS</span><span><Icon name="database"/>Billing context</span><span><Icon name="shield"/>Backend-first provisioning</span><span><Icon name="terminal"/>Pterodactyl / control plane</span></div>
        {quote && context && node ? <div className="order-context"><span className="micro-label">ORDER CONTEXT</span><div className="order-context-head"><strong>{context.product === "minecraft" ? "Minecraft Server" : "Cloud VPS"}</strong><b>{formatMoney(quote.total)}<small>/mes</small></b></div><div className="order-context-grid"><span>{node.code}</span><span>{context.ramGb} GB RAM</span><span>{context.cores} vCPU</span><span>{context.storageGb} GB NVMe</span></div><p>El servidor debe volver a calcular y validar este pedido antes de cobrar.</p></div> : null}
      </div>

      <div className="account-card">
        <div className="account-tabs"><button className={cx(mode === "login" && "is-active")} onClick={() => setMode("login")}>Iniciar sesión</button><button className={cx(mode === "register" && "is-active")} onClick={() => setMode("register")}>Crear cuenta</button></div>
        <div className="account-card-head"><span className="eyebrow">{mode === "login" ? "WELCOME BACK" : "CREATE NEXUS ID"}</span><h3>{mode === "login" ? "Vuelve a tu panel." : "Empieza con una identidad segura."}</h3><p>{mode === "login" ? "La demo redirige al panel oficial y no procesa tu contraseña aquí." : "Conecta este formulario a tu backend. La UI nunca debe tener una Application API Key."}</p></div>
        <form onSubmit={handleSubmit}>
          {mode === "register" ? <label className="field-label">Nombre<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" autoComplete="name"/></label> : null}
          <label className="field-label">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" autoComplete="email"/></label>
          <label className="field-label">Contraseña<input required type="password" minLength={mode === "register" ? 8 : undefined} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••••••" autoComplete={mode === "login" ? "current-password" : "new-password"}/></label>
          {mode === "register" ? <div className="password-strength"><div><i className={score >= 1 ? "on" : ""}/><i className={score >= 2 ? "on" : ""}/><i className={score >= 3 ? "on" : ""}/><i className={score >= 4 ? "on" : ""}/></div><span>{score < 2 ? "Débil" : score < 4 ? "Aceptable" : "Fuerte"}</span></div> : null}
          <button className="button primary full" type="submit">{mode === "login" ? "Continuar al panel" : "Crear cuenta"}<Icon name="arrow"/></button>
        </form>
        <div className="security-note"><Icon name="lock"/><span>Esta entrega no contiene claves Pterodactyl, tokens de pago ni secretos de backend.</span></div>
      </div>
    </div>
  );
}

function passwordScore(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
