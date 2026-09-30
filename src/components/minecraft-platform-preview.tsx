"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

const modes = {
  smp: { label: "SMP", players: "37 / 80", ram: "6.2 / 8 GB", cpu: "38%", software: "Paper", nodes: ["Proxy", "Survival"] },
  modded: { label: "Modded", players: "14 / 40", ram: "9.4 / 12 GB", cpu: "52%", software: "NeoForge", nodes: ["Proxy", "Modded"] },
  network: { label: "Network", players: "126 online", ram: "21 / 32 GB", cpu: "61%", software: "Velocity", nodes: ["Proxy", "Lobby", "Skyblock", "Gens"] }
} as const;

type Mode = keyof typeof modes;

export function MinecraftPlatformPreview() {
  const [mode, setMode] = useState<Mode>("smp");
  const data = modes[mode];
  return <div className="mc-preview-v5">
    <div className="mc-preview-bar"><div><i/><span>minecraft.nexusnodes.lat</span></div><span><Icon name="wifi"/> Preview surface</span></div>
    <div className="mc-preview-tabs">{(Object.keys(modes) as Mode[]).map((key) => <button key={key} className={cx(mode === key && "is-active")} onClick={() => setMode(key)}>{modes[key].label}</button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={mode} className="mc-preview-body" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: .18 }}>
      <div className="mc-preview-head"><div><span className="mc-cube"><Icon name="blocks"/></span><span><strong>{mode === "network" ? "nexus-network" : mode === "modded" ? "modded-01" : "survival-01"}</strong><small>MIA-01 · {data.software}</small></span></div><em><i/> ONLINE</em></div>
      <div className="mc-stat-row"><span><Icon name="gamepad"/><b>{data.players}</b><small>Players</small></span><span><Icon name="memory"/><b>{data.ram}</b><small>Memory</small></span><span><Icon name="cpu"/><b>{data.cpu}</b><small>CPU</small></span></div>
      <div className="mc-topology"><div className="topology-label"><span>Service topology</span><small>preview</small></div><div className="topology-canvas"><span className="topology-core"><Icon name="network"/><small>{data.software}</small></span>{data.nodes.map((node,index) => <span key={node} className={`topology-node tn-${index+1}`}><i/><b>{node}</b></span>)}<svg viewBox="0 0 100 55" preserveAspectRatio="none" aria-hidden="true"><path d="M50 27 L18 12 M50 27 L82 12 M50 27 L18 43 M50 27 L82 43"/></svg></div></div>
      <div className="mc-preview-foot"><span><Icon name="shield"/> Protected</span><span><Icon name="archive"/> Backups</span><span><Icon name="workflow"/> Schedules</span></div>
    </motion.div></AnimatePresence>
  </div>;
}
