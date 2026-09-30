"use client";

import { useMemo, useState } from "react";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

const tabs = ["Overview", "Console", "Files", "Backups", "Schedules"] as const;
type Tab = typeof tabs[number];

export function DashboardDemo() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [running, setRunning] = useState(true);
  const [backupCount, setBackupCount] = useState(3);
  const content = useMemo(() => {
    if (tab === "Console") return <ConsoleView running={running}/>;
    if (tab === "Files") return <FilesView/>;
    if (tab === "Backups") return <BackupsView count={backupCount} onCreate={() => setBackupCount((value) => value + 1)}/>;
    if (tab === "Schedules") return <SchedulesView/>;
    return <OverviewView running={running}/>;
  }, [tab, running, backupCount]);

  return (
    <div className="dashboard-demo-shell">
      <aside className="demo-sidebar">
        <div className="demo-brand"><span className="demo-brand-mark">N</span><span>Nexus Control</span></div>
        <nav><button className="is-active"><Icon name="server"/>Servers</button><button><Icon name="globe"/>Network</button><button><Icon name="database"/>Databases</button><button><Icon name="user"/>Team</button></nav>
        <div className="demo-sidebar-bottom"><span>Demo UI</span><small>No backend connected</small></div>
      </aside>
      <div className="demo-main">
        <div className="demo-topbar"><div><span className="status-badge good"><i/>{running ? "ONLINE" : "STOPPED"}</span><div><strong>survival-01</strong><span>MIA-01 · Paper 1.21.x</span></div></div><div className="demo-top-actions"><button onClick={() => setRunning(true)} disabled={running}>Start</button><button onClick={() => setRunning((value) => !value)}>{running ? "Restart" : "Start"}</button><button className="danger" onClick={() => setRunning(false)}>Stop</button></div></div>
        <div className="demo-tabs">{tabs.map((item) => <button key={item} className={cx(tab === item && "is-active")} onClick={() => setTab(item)}>{item}</button>)}</div>
        <div className="demo-content">{content}</div>
      </div>
    </div>
  );
}

function OverviewView({ running }: { running: boolean }) {
  return <><div className="demo-stat-grid"><div><span>CPU</span><strong>{running ? "38%" : "0%"}</strong><i><b style={{ width: running ? "38%" : "0%" }}/></i></div><div><span>Memory</span><strong>{running ? "6.2 / 8 GB" : "0 / 8 GB"}</strong><i><b style={{ width: running ? "77%" : "0%" }}/></i></div><div><span>Disk</span><strong>18.4 / 40 GB</strong><i><b style={{ width: "46%" }}/></i></div><div><span>Players</span><strong>{running ? "37 / 80" : "0 / 80"}</strong><i><b style={{ width: running ? "46%" : "0%" }}/></i></div></div><div className="demo-two-col"><div className="demo-panel"><span className="micro-label">RESOURCE HISTORY</span><div className="fake-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="demo-panel"><span className="micro-label">SERVER INFO</span><dl><div><dt>Node</dt><dd>MIA-01</dd></div><div><dt>Software</dt><dd>Paper</dd></div><div><dt>Java</dt><dd>21</dd></div><div><dt>Backups</dt><dd>3</dd></div></dl></div></div></>;
}

function ConsoleView({ running }: { running: boolean }) {
  return <div className="demo-console"><div className="console-lines"><p><span>[17:24:12 INFO]</span> Starting minecraft server version 1.21.x</p><p><span>[17:24:13 INFO]</span> Loading properties</p><p><span>[17:24:14 INFO]</span> Preparing level "world"</p><p><span>[17:24:15 INFO]</span> Done (1.842s)! For help, type "help"</p>{running ? <p><span>[17:28:41 INFO]</span> Player joined: NexusPlayer</p> : <p><span>[17:29:04 INFO]</span> Server stopped.</p>}</div><div className="console-input"><span>&gt;</span><input placeholder={running ? "Type a command…" : "Server is stopped"} disabled={!running}/><button disabled={!running}>Send</button></div></div>;
}

function FilesView() {
  const files = [["server.properties", "2.1 KB", "file"], ["paper-global.yml", "13.2 KB", "file"], ["plugins", "—", "folder"], ["world", "—", "folder"], ["logs", "—", "folder"]];
  return <div className="demo-files"><div className="demo-files-head"><span>/home/container</span><button>New file</button></div>{files.map(([name, size, type]) => <div key={name}><span className={`file-glyph ${type}`}>{type === "folder" ? "▣" : "◇"}</span><strong>{name}</strong><em>{size}</em><button>•••</button></div>)}</div>;
}

function BackupsView({ count, onCreate }: { count: number; onCreate: () => void }) {
  return <div className="demo-backups"><div className="demo-panel-head"><div><h4>Backups</h4><p>Snapshots visuales para esta demo.</p></div><button onClick={onCreate}>Create backup</button></div>{Array.from({ length: count }).map((_, index) => <div className="backup-row" key={index}><span className="backup-icon"><Icon name="database"/></span><div><strong>Automatic backup #{count - index}</strong><span>{index === 0 ? "Today, 04:00" : `${index + 1} days ago`} · 2.4 GB</span></div><em>Completed</em></div>)}</div>;
}

function SchedulesView() {
  return <div className="demo-schedules"><div className="schedule-row"><span className="schedule-icon"><Icon name="clock"/></span><div><strong>Nightly restart</strong><span>Every day at 04:30</span></div><em>Enabled</em></div><div className="schedule-row"><span className="schedule-icon"><Icon name="database"/></span><div><strong>World backup</strong><span>Every 12 hours</span></div><em>Enabled</em></div></div>;
}
