"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "./icon";

type StatusPayload = {
  generatedAt: string;
  mode: "configured";
  overall: "operational";
  services: Array<{ id: string; name: string; status: string; detail: string }>;
  nodes: Array<{ code: string; city: string; status: string }>;
};

const serviceIcons: Record<string, IconName> = { panel: "layout", minecraft: "gamepad", vps: "cloud", network: "network" };

export function StatusOverview() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/status").then((res) => {
      if (!res.ok) throw new Error("status unavailable");
      return res.json();
    }).then(setData).catch(() => setError(true));
  }, []);

  const generated = useMemo(() => data ? new Date(data.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "", [data]);

  if (error) return <div className="status-error status-error-v5"><Icon name="activity"/><div><strong>Status snapshot unavailable</strong><span>The demo endpoint could not be loaded.</span></div></div>;
  if (!data) return <div className="status-loading status-loading-v5"><span className="status-loader-ring"><i/></span><div><strong>Loading platform snapshot</strong><span>Reading /api/status…</span></div></div>;

  return (
    <div className="status-center-v5">
      <motion.section className="status-overview-v5" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
        <div className="status-overview-main"><span className="status-orbit-v5"><i/><b><Icon name="activity"/></b></span><div><span className="eyebrow">CATALOG SNAPSHOT</span><h2>Configured services are marked available.</h2><p>This is not a substitute for production monitoring. Live uptime and incidents should come from a real observability source.</p></div></div>
        <div className="status-overview-meta"><span className="status-chip-v5"><i/> Configured</span><small>Snapshot generated at {generated}</small></div>
      </motion.section>

      <div className="status-grid-v5">
        <section className="status-services-v5">
          <div className="status-section-head"><div><span className="eyebrow">SERVICES</span><h3>Platform surfaces</h3></div><span>{data.services.length} configured</span></div>
          <div className="status-service-list-v5">{data.services.map((service,index) => <motion.div key={service.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:index*.04}}><span className="status-service-icon-v5"><Icon name={serviceIcons[service.id] ?? "server"}/></span><span><strong>{service.name}</strong><small>{service.detail}</small></span><em><i/> Configured</em></motion.div>)}</div>
        </section>

        <section className="status-observability-v5">
          <div className="status-section-head"><div><span className="eyebrow">OBSERVABILITY</span><h3>Live data coverage</h3></div></div>
          <div className="coverage-ring-v5"><div><strong>0%</strong><small>live sources connected</small></div></div>
          <div className="coverage-list-v5"><span><Icon name="wifi"/><b>Looking Glass</b><em>Not connected</em></span><span><Icon name="activity"/><b>Health checks</b><em>Not connected</em></span><span><Icon name="server"/><b>Capacity feed</b><em>Not connected</em></span><span><Icon name="message"/><b>Incident feed</b><em>Not connected</em></span></div>
        </section>
      </div>

      <section className="status-nodes-v5">
        <div className="status-section-head"><div><span className="eyebrow">REGIONS</span><h3>Catalog nodes</h3></div><span>No live capacity attached</span></div>
        <div className="status-node-head-v5"><span>Node</span><span>Location</span><span>Source</span><span>State</span></div>
        {data.nodes.map((node) => <div className="status-node-row-v5" key={node.code}><strong>{node.code}</strong><span>{node.city}</span><span>Catalog</span><em><i/> Listed</em></div>)}
      </section>

      <div className="status-disclaimer-v5"><Icon name="shield"/><div><strong>Truth boundary</strong><span>Before launch, replace configured status with actual health checks, incident history and capacity from server-side integrations.</span></div></div>
    </div>
  );
}
