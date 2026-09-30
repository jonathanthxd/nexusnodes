"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

const workloads = {
  web: { label: "Web / API", ram: "4 GB", cpu: "2 vCPU", disk: "50 GB", process: "nexus-api", usage: "42%" },
  database: { label: "Database", ram: "8 GB", cpu: "4 vCPU", disk: "100 GB", process: "postgres", usage: "67%" },
  stack: { label: "Full stack", ram: "12 GB", cpu: "4 vCPU", disk: "120 GB", process: "docker", usage: "54%" }
} as const;
type Workload = keyof typeof workloads;

export function VpsPlatformPreview() {
  const [workload, setWorkload] = useState<Workload>("web");
  const data = workloads[workload];
  return <div className="vps-preview-v5">
    <div className="vps-preview-bar"><div><span className="vps-preview-logo"><Icon name="cloud"/></span><span><strong>nx-vps-01</strong><small>Ubuntu LTS · MIA-01</small></span></div><em><i/> Running</em></div>
    <div className="vps-preview-tabs">{(Object.keys(workloads) as Workload[]).map((key) => <button key={key} className={cx(workload === key && "is-active")} onClick={() => setWorkload(key)}>{workloads[key].label}</button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={workload} className="vps-preview-body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .18 }}>
      <div className="vps-resource-grid"><span><Icon name="memory"/><small>Memory</small><strong>{data.ram}</strong></span><span><Icon name="cpu"/><small>Compute</small><strong>{data.cpu}</strong></span><span><Icon name="disk"/><small>NVMe</small><strong>{data.disk}</strong></span></div>
      <div className="vps-process-card"><div className="vps-process-head"><span><Icon name="activity"/> Resource usage</span><strong>{data.usage}</strong></div><div className="vps-bars"><i><b style={{width:data.usage}}/></i><i><b style={{width:"34%"}}/></i><i><b style={{width:"58%"}}/></i></div><div className="vps-bar-legend"><span>CPU</span><span>Network</span><span>Disk I/O</span></div></div>
      <div className="vps-shell-v5"><div><i/><i/><i/><span>root@nx-vps-01</span></div><code>$ systemctl status {data.process}</code><code className="good">● active (running)</code><code>$ uptime</code><code>17:42:18 up 8 days, 4:12</code></div>
    </motion.div></AnimatePresence>
  </div>;
}
