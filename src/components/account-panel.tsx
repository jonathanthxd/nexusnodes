"use client";

import { AnimatePresence, motion } from "motion/react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const score = useMemo(() => passwordScore(password), [password]);
  const quote = context ? calculateQuote(context) : null;
  const node = context ? getNode(context.nodeId) : null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === "login") {
      window.location.href = "https://panel.nexusnodes.lat";
      return;
    }
    setNotice("Registration UI is ready; connect it to your trusted identity backend before production.");
  }

  return (
    <div className="account-layout account-layout-v5">
      <div className="account-promo account-promo-v5">
        <div className="identity-orbit" aria-hidden="true"><i/><i/><i/><span>N</span><b className="identity-node id-a"><Icon name="server"/></b><b className="identity-node id-b"><Icon name="credit"/></b><b className="identity-node id-c"><Icon name="shield"/></b></div>
        <div className="account-promo-copy"><span className="hero-kicker"><i/><span>NEXUS IDENTITY</span></span><h1>One identity.<br/><span className="gradient-text">Every service.</span></h1><p>Your account is the bridge between configuration, billing and the control plane. The browser never needs administrator secrets to provide a polished experience.</p><div className="account-feature-list account-feature-list-v5"><span><Icon name="gamepad"/><b>Minecraft &amp; VPS</b><small>One customer surface.</small></span><span><Icon name="wallet"/><b>Billing context</b><small>Orders follow the identity.</small></span><span><Icon name="shield"/><b>Trusted boundaries</b><small>Provisioning stays server-side.</small></span><span><Icon name="layout"/><b>Nexus Control</b><small>Operate after checkout.</small></span></div></div>

        {quote && context && node ? <motion.div className="order-context order-context-v5" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}><div className="order-context-head-v5"><span><Icon name="wallet"/> PENDING CONFIGURATION</span><strong>{formatMoney(quote.total)}<small>/mo</small></strong></div><div className="order-context-product-v5"><span className="order-context-icon"><Icon name={context.product === "minecraft" ? "gamepad" : "cloud"}/></span><span><b>{context.product === "minecraft" ? "Minecraft Server" : "Cloud VPS"}</b><small>{node.flag} {node.code} · {node.city}</small></span></div><div className="order-context-grid order-context-grid-v5"><span><Icon name="memory"/><b>{context.ramGb} GB</b><small>RAM</small></span><span><Icon name="cpu"/><b>{context.cores}</b><small>vCPU</small></span><span><Icon name="disk"/><b>{context.storageGb} GB</b><small>NVMe</small></span></div><p>Pricing must be recalculated by the backend again before payment.</p></motion.div> : null}
      </div>

      <div className="account-card account-card-v5">
        <div className="account-card-brand"><span>N</span><div><strong>NexusNodes</strong><small>Identity gateway</small></div></div>
        <div className="account-tabs account-tabs-v5"><button className={cx(mode === "login" && "is-active")} onClick={() => { setMode("login"); setNotice(""); }}>Sign in</button><button className={cx(mode === "register" && "is-active")} onClick={() => { setMode("register"); setNotice(""); }}>Create account</button></div>
        <AnimatePresence mode="wait"><motion.div key={mode} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:.16}}>
          <div className="account-card-head account-card-head-v5"><span className="eyebrow">{mode === "login" ? "WELCOME BACK" : "CREATE NEXUS ID"}</span><h2>{mode === "login" ? "Continue to your infrastructure." : "Start with a secure identity."}</h2><p>{mode === "login" ? "This public frontend redirects to the official panel instead of processing panel credentials itself." : "The form is presentation-ready; connect it to your own authentication backend before accepting registrations."}</p></div>
          <form onSubmit={handleSubmit} className="account-form-v5">
            {mode === "register" ? <label className="auth-field-v5"><span>Name</span><div><Icon name="user"/><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name"/></div></label> : null}
            <label className="auth-field-v5"><span>Email</span><div><Icon name="mail"/><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email"/></div></label>
            <label className="auth-field-v5"><span>Password</span><div><Icon name="lock"/><input required type={showPassword ? "text" : "password"} minLength={mode === "register" ? 8 : undefined} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••••••" autoComplete={mode === "login" ? "current-password" : "new-password"}/><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}><Icon name={showPassword ? "eye-off" : "eye"}/></button></div></label>
            {mode === "register" ? <div className="password-strength password-strength-v5"><div><i className={score >= 1 ? "on" : ""}/><i className={score >= 2 ? "on" : ""}/><i className={score >= 3 ? "on" : ""}/><i className={score >= 4 ? "on" : ""}/></div><span>{score < 2 ? "Weak" : score < 4 ? "Good" : "Strong"}</span></div> : <div className="auth-helper-v5"><label><input type="checkbox"/> Remember me</label><button type="button">Forgot password?</button></div>}
            <button className="button primary full large" type="submit">{mode === "login" ? "Continue to panel" : "Create account"}<Icon name="arrow"/></button>
          </form>
          {notice ? <motion.div className="account-notice-v5" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}}><Icon name="shield"/><span>{notice}</span></motion.div> : null}
        </motion.div></AnimatePresence>
        <div className="security-note security-note-v5"><Icon name="lock"/><span>No Pterodactyl application keys, payment secrets or admin tokens belong in this client bundle.</span></div>
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
