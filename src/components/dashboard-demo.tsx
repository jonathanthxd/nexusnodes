"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Icon, type IconName } from "./icon";
import { cx } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: "layout" as IconName },
  { id: "console", label: "Console", icon: "terminal" as IconName },
  { id: "files", label: "Files", icon: "folder" as IconName },
  { id: "backups", label: "Backups", icon: "archive" as IconName },
  { id: "automation", label: "Automations", icon: "workflow" as IconName },
  { id: "network", label: "Network", icon: "network" as IconName }
] as const;

type Tab = typeof tabs[number]["id"];

export function DashboardDemo() {
  const [tab, setTab] = useState<Tab>("overview");
  const [running, setRunning] = useState(true);
  const [backupCount, setBackupCount] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const content = useMemo(() => {
    if (tab === "console") return <ConsoleView running={running}/>;
    if (tab === "files") return <FilesView/>;
    if (tab === "backups") return <BackupsView count={backupCount} onCreate={() => setBackupCount((value) => value + 1)}/>;
    if (tab === "automation") return <AutomationsView/>;
    if (tab === "network") return <NetworkView/>;
    return <OverviewView running={running}/>;
  }, [tab, running, backupCount]);

  return (
    <div className="nexus-control-shell">
      <aside className={cx("control-sidebar", sidebarOpen && "is-open")}>
        <div className="control-brand"><span className="control-brand-mark">N</span><span><strong>Nexus Control</strong><small>Preview workspace</small></span><button onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú"><Icon name="x"/></button></div>
        <div className="control-server-pill"><span className="server-avatar"><Icon name="gamepad"/></span><span><strong>survival-01</strong><small>MIA-01 · Paper</small></span><i className={running ? "online" : "offline"}/></div>
        <nav className="control-nav">
          <span className="control-nav-label">SERVER</span>
          {tabs.map((item) => <button key={item.id} className={cx(tab === item.id && "is-active")} onClick={() => { setTab(item.id); setSidebarOpen(false); }}><Icon name={item.icon}/><span>{item.label}</span>{item.id === "backups" ? <em>{backupCount}</em> : null}</button>)}
          <span className="control-nav-label">MANAGE</span>
          <button><Icon name="database"/><span>Databases</span></button>
          <button><Icon name="user"/><span>Team access</span></button>
          <button><Icon name="settings"/><span>Settings</span></button>
        </nav>
        <div className="control-sidebar-foot"><span><Icon name="shield"/>Preview mode</span><small>No backend connected</small></div>
      </aside>

      <main className="control-main">
        <header className="control-topbar">
          <div className="control-top-left"><button className="control-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Icon name="menu"/></button><div><span className="control-breadcrumb">Servers / survival-01</span><h2>{tabs.find((item) => item.id === tab)?.label}</h2></div></div>
          <div className="control-top-actions"><button className="control-icon-btn" title="Buscar"><Icon name="search"/></button><button className="control-icon-btn" title="Notificaciones"><Icon name="bell"/><i/></button><span className="control-divider"/><button className="control-user"><span>JN</span><Icon name="chevron-down"/></button></div>
        </header>

        <div className="control-server-bar">
          <div className="control-server-state"><span className={cx("status-dot", running && "on")}/><span><strong>{running ? "Running" : "Stopped"}</strong><small>Preview state</small></span></div>
          <div className="control-server-meta"><span><Icon name="map-pin"/> MIA-01</span><span><Icon name="cpu"/> 2 vCPU</span><span><Icon name="memory"/> 8 GB RAM</span><span><Icon name="disk"/> 40 GB NVMe</span></div>
          <div className="control-power-actions"><button onClick={() => setRunning(true)} disabled={running}><Icon name="play"/> Start</button><button onClick={() => setRunning((value) => !value)}><Icon name="restart"/> Restart</button><button className="danger" onClick={() => setRunning(false)} disabled={!running}><Icon name="power"/> Stop</button></div>
        </div>

        <div className="control-stage">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OverviewView({ running }: { running: boolean }) {
  return <div className="control-overview">
    <div className="control-kpi-grid">
      <Metric icon="cpu" label="CPU usage" value={running ? "38%" : "0%"} detail="2 vCPU allocated" pct={running ? 38 : 0} tone="purple"/>
      <Metric icon="memory" label="Memory" value={running ? "6.2 GB" : "0 GB"} detail="of 8 GB" pct={running ? 77 : 0} tone="blue"/>
      <Metric icon="disk" label="Storage" value="18.4 GB" detail="of 40 GB" pct={46} tone="cyan"/>
      <Metric icon="gamepad" label="Players" value={running ? "37" : "0"} detail="80 slots configured" pct={running ? 46 : 0} tone="green"/>
    </div>

    <div className="control-overview-grid">
      <section className="control-panel chart-panel">
        <PanelHead icon="activity" title="Resource history" action="Last 60 min"/>
        <div className="control-chart"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-canvas"><svg viewBox="0 0 720 220" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="controlFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a78ff" stopOpacity=".3"/><stop offset="1" stopColor="#8a78ff" stopOpacity="0"/></linearGradient></defs><path className="control-area" d={running ? "M0 176 C45 165 56 118 101 130 S156 167 205 112 S272 82 315 118 S390 177 443 109 S529 67 579 91 S660 135 720 70 L720 220 L0 220 Z" : "M0 215 L720 215 L720 220 L0 220 Z"}/><path className="control-line" d={running ? "M0 176 C45 165 56 118 101 130 S156 167 205 112 S272 82 315 118 S390 177 443 109 S529 67 579 91 S660 135 720 70" : "M0 215 L720 215"}/></svg><div className="chart-guides"><i/><i/><i/><i/></div><div className="chart-x"><span>12:00</span><span>13:00</span><span>14:00</span><span>15:00</span><span>16:00</span><span>Now</span></div></div></div>
      </section>

      <section className="control-panel activity-panel">
        <PanelHead icon="radio" title="Recent activity" action="View all"/>
        <div className="activity-feed">
          <Activity icon="restart" title="Server restarted" detail="Manual action · Jonathan" time="12 min" tone="purple"/>
          <Activity icon="archive" title="Backup completed" detail="nightly-2026-09-30" time="2 h" tone="green"/>
          <Activity icon="user" title="Player peak reached" detail="42 concurrent players" time="4 h" tone="blue"/>
          <Activity icon="workflow" title="Schedule executed" detail="world-save task" time="6 h" tone="cyan"/>
        </div>
      </section>

      <section className="control-panel quick-panel">
        <PanelHead icon="bolt" title="Quick actions"/>
        <div className="quick-action-grid"><button><Icon name="terminal"/><span><strong>Open console</strong><small>Run commands</small></span><Icon name="chevron"/></button><button><Icon name="archive"/><span><strong>Create backup</strong><small>Snapshot service</small></span><Icon name="chevron"/></button><button><Icon name="folder"/><span><strong>File manager</strong><small>Edit configs</small></span><Icon name="chevron"/></button><button><Icon name="workflow"/><span><strong>New schedule</strong><small>Automate tasks</small></span><Icon name="chevron"/></button></div>
      </section>

      <section className="control-panel info-panel">
        <PanelHead icon="server" title="Service details"/>
        <dl className="service-details"><div><dt>Node</dt><dd>MIA-01</dd></div><div><dt>Software</dt><dd>Paper 1.21.x</dd></div><div><dt>Java</dt><dd>21</dd></div><div><dt>Primary IP</dt><dd>Hidden in preview</dd></div><div><dt>Backups</dt><dd>3 / 10</dd></div><div><dt>Databases</dt><dd>1 / 3</dd></div></dl>
      </section>
    </div>
  </div>;
}

function ConsoleView({ running }: { running: boolean }) {
  const lines = running ? [
    ["17:24:12", "INFO", "Starting minecraft server version 1.21.x"],
    ["17:24:13", "INFO", "Loading properties"],
    ["17:24:14", "INFO", "Preparing level \"world\""],
    ["17:24:15", "INFO", "Done (1.842s)! For help, type \"help\""],
    ["17:28:41", "INFO", "NexusPlayer joined the game"],
    ["17:31:08", "INFO", "NexusPlayer issued server command: /spawn"]
  ] : [["17:33:04", "INFO", "Server stopped."]];
  return <section className="control-panel console-panel"><div className="console-toolbar"><div><span className="console-dot red"/><span className="console-dot yellow"/><span className="console-dot green"/></div><span>survival-01 / console</span><button><Icon name="copy"/> Copy</button></div><div className="real-console-lines">{lines.map(([time,level,message]) => <p key={`${time}-${message}`}><span className="console-time">[{time}]</span><span className="console-level">[{level}]</span><span>{message}</span></p>)}</div><div className="real-console-input"><span>&gt;</span><input placeholder={running ? "Type a command…" : "Start the server to use console"} disabled={!running}/><button disabled={!running}><Icon name="send"/> Send</button></div></section>;
}

function FilesView() {
  const files = [
    { name: "plugins", size: "—", type: "folder", modified: "4 min ago" },
    { name: "world", size: "—", type: "folder", modified: "12 min ago" },
    { name: "logs", size: "—", type: "folder", modified: "now" },
    { name: "server.properties", size: "2.1 KB", type: "file", modified: "1 d ago" },
    { name: "paper-global.yml", size: "13.2 KB", type: "file", modified: "3 d ago" }
  ];
  return <section className="control-panel files-panel"><div className="files-toolbar"><div className="files-path"><Icon name="folder"/><span>/home/container</span></div><div><button><Icon name="file"/> New file</button><button className="primary-lite"><Icon name="folder"/> New folder</button></div></div><div className="files-table"><div className="files-head"><span>Name</span><span>Size</span><span>Modified</span><span/></div>{files.map((item) => <button key={item.name} className="file-row"><span><i className={item.type}><Icon name={item.type === "folder" ? "folder" : "file"}/></i><strong>{item.name}</strong></span><em>{item.size}</em><em>{item.modified}</em><Icon name="more"/></button>)}</div></section>;
}

function BackupsView({ count, onCreate }: { count: number; onCreate: () => void }) {
  return <div className="control-stack"><section className="control-panel backup-hero"><div><span className="backup-big-icon"><Icon name="archive"/></span><span><strong>{count} backups</strong><small>10 slots available in preview</small></span></div><button onClick={onCreate}><Icon name="plus"/> Create backup</button></section><section className="control-panel backup-list"><PanelHead icon="archive" title="Available backups"/><BackupRow name="nightly-2026-09-30" size="8.4 GB" age="2 hours ago"/><BackupRow name="before-plugin-update" size="8.2 GB" age="1 day ago"/><BackupRow name="weekly-snapshot" size="7.9 GB" age="5 days ago"/>{count > 3 ? <BackupRow name={`manual-preview-${count}`} size="8.4 GB" age="just now"/> : null}</section></div>;
}

function AutomationsView() {
  return <div className="control-stack"><section className="control-panel automation-hero"><div><span className="automation-big-icon"><Icon name="workflow"/></span><div><span className="eyebrow">AUTOMATIONS</span><h3>Run repetitive tasks on schedule.</h3><p>Preview of how backups, restarts and commands could be orchestrated.</p></div></div><button><Icon name="plus"/> New automation</button></section><section className="control-panel automation-table"><div className="automation-table-head"><span>Name</span><span>Schedule</span><span>Action</span><span>Status</span><span/></div><AutomationRow name="Nightly backup" schedule="Every day · 02:00" action="Create backup"/><AutomationRow name="World save" schedule="Every 30 min" action="save-all"/><AutomationRow name="Restart window" schedule="Sunday · 04:30" action="Restart service" paused/></section></div>;
}

function NetworkView() {
  return <div className="control-network-view"><section className="control-panel network-map-panel"><PanelHead icon="network" title="Node topology" action="Catalog preview"/><div className="control-network-map"><span className="control-network-core"><b>N</b><small>Control</small></span><i className="route r1"/><i className="route r2"/><i className="route r3"/><i className="route r4"/><NetPoint cls="n1" code="MIA-01" region="Miami"/><NetPoint cls="n2" code="DAL-01" region="Dallas"/><NetPoint cls="n3" code="SCL-01" region="Santiago"/><NetPoint cls="n4" code="ARG-01" region="Argentina"/></div></section><section className="control-panel"><PanelHead icon="wifi" title="Network facts"/><div className="network-fact-list"><span><b>Primary node</b><em>MIA-01</em></span><span><b>Region</b><em>Florida, USA</em></span><span><b>Route test</b><em>Not connected</em></span><span><b>Capacity feed</b><em>Not connected</em></span></div></section></div>;
}

function Metric({ icon, label, value, detail, pct, tone }: { icon: IconName; label: string; value: string; detail: string; pct: number; tone: string }) {
  return <article className={`control-kpi tone-${tone}`}><div><span><Icon name={icon}/>{label}</span><Icon name="more"/></div><strong>{value}</strong><small>{detail}</small><i><b style={{ width: `${pct}%` }}/></i></article>;
}

function PanelHead({ icon, title, action }: { icon: IconName; title: string; action?: string }) {
  return <div className="control-panel-head"><span><Icon name={icon}/><strong>{title}</strong></span>{action ? <button>{action}<Icon name="chevron-down"/></button> : null}</div>;
}

function Activity({ icon, title, detail, time, tone }: { icon: IconName; title: string; detail: string; time: string; tone: string }) {
  return <div className="activity-item"><span className={`activity-icon tone-${tone}`}><Icon name={icon}/></span><span><strong>{title}</strong><small>{detail}</small></span><time>{time}</time></div>;
}

function BackupRow({ name, size, age }: { name: string; size: string; age: string }) {
  return <div className="backup-row-v5"><span className="backup-row-icon"><Icon name="archive"/></span><span><strong>{name}</strong><small>{age}</small></span><em>{size}</em><button><Icon name="more"/></button></div>;
}

function AutomationRow({ name, schedule, action, paused = false }: { name: string; schedule: string; action: string; paused?: boolean }) {
  return <div className="automation-row-v5"><span><strong>{name}</strong><small>Service automation</small></span><span>{schedule}</span><span>{action}</span><em className={paused ? "paused" : "active"}><i/>{paused ? "Paused" : "Active"}</em><button><Icon name="more"/></button></div>;
}

function NetPoint({ cls, code, region }: { cls: string; code: string; region: string }) {
  return <span className={`control-net-point ${cls}`}><i/><span><strong>{code}</strong><small>{region}</small></span></span>;
}
