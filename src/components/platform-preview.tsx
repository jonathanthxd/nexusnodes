"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon, type IconName } from "./icon";
import { cx } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: "layout" as IconName },
  { id: "network", label: "Network", icon: "network" as IconName },
  { id: "automation", label: "Automations", icon: "workflow" as IconName }
] as const;

type TabId = typeof tabs[number]["id"];

export function PlatformPreview() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="platform-preview">
      <div className="platform-preview-top">
        <div className="preview-server-id"><span className="preview-logo">N</span><span><strong>survival-01</strong><small>MIA-01 · Paper 1.21.x</small></span></div>
        <div className="preview-status"><i/> Running</div>
        <button aria-label="Más opciones"><Icon name="more"/></button>
      </div>
      <div className="preview-layout">
        <aside className="preview-side">
          {tabs.map((item) => <button key={item.id} className={cx(tab === item.id && "is-active")} onClick={() => setTab(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}
          <i className="preview-side-line"/>
          <button><Icon name="folder"/><span>Files</span></button>
          <button><Icon name="database"/><span>Backups</span></button>
          <button><Icon name="settings"/><span>Settings</span></button>
        </aside>
        <div className="preview-content">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .18 }}>
              {tab === "overview" ? <Overview/> : tab === "network" ? <Network/> : <Automation/>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  return <div className="preview-overview"><div className="preview-kpis"><Kpi icon="cpu" label="CPU" value="38%" tone="purple"/><Kpi icon="memory" label="Memory" value="6.2 GB" tone="blue"/><Kpi icon="gamepad" label="Players" value="37 / 80" tone="green"/></div><div className="preview-chart-card"><div className="preview-card-head"><span><Icon name="activity"/> Resource usage</span><small>preview</small></div><div className="preview-chart"><svg viewBox="0 0 520 150" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b7cff" stopOpacity=".34"/><stop offset="1" stopColor="#8b7cff" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 128 C38 120 54 84 88 92 S138 118 174 75 S229 53 260 79 S312 123 351 82 S411 42 449 63 S492 91 520 44 L520 150 L0 150 Z"/><path className="chart-line" d="M0 128 C38 120 54 84 88 92 S138 118 174 75 S229 53 260 79 S312 123 351 82 S411 42 449 63 S492 91 520 44"/></svg><div className="chart-grid"/></div><div className="preview-chart-foot"><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>now</span></div></div></div>;
}

function Network() {
  return <div className="preview-network"><div className="preview-network-head"><span><Icon name="network"/> Route overview</span><small>catalog view</small></div><div className="mini-network-canvas"><i className="net-line a"/><i className="net-line b"/><span className="net-core"><b>N</b><small>Control</small></span><span className="net-point p1"><i/>MIA-01</span><span className="net-point p2"><i/>DAL-01</span><span className="net-point p3"><i/>SCL-01</span><span className="net-point p4"><i/>ARG-01</span></div><div className="preview-network-stats"><span><b>5</b><small>catalog nodes</small></span><span><b>2</b><small>product families</small></span><span><b>NVMe</b><small>storage class</small></span></div></div>;
}

function Automation() {
  const jobs = [
    ["Nightly backup", "02:00", "archive" as IconName],
    ["Restart window", "04:30", "restart" as IconName],
    ["Database snapshot", "06:00", "database" as IconName]
  ] as const;
  return <div className="preview-automation"><div className="preview-card-head"><span><Icon name="workflow"/> Scheduled workflows</span><button><Icon name="plus"/> New</button></div><div className="automation-list">{jobs.map(([title,time,icon], index) => <div key={title}><span className="automation-icon"><Icon name={icon}/></span><span><strong>{title}</strong><small>Daily · {time}</small></span><em className={index === 1 ? "paused" : ""}>{index === 1 ? "Paused" : "Active"}</em></div>)}</div></div>;
}

function Kpi({ icon, label, value, tone }: { icon: IconName; label: string; value: string; tone: string }) {
  return <div className={`preview-kpi tone-${tone}`}><span><Icon name={icon}/>{label}</span><strong>{value}</strong><i><b/></i></div>;
}
