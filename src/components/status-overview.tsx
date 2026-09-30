"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icon";

type StatusPayload = {
  generatedAt: string;
  mode: "configured";
  overall: "operational";
  services: Array<{ id: string; name: string; status: string; detail: string }>;
  nodes: Array<{ code: string; city: string; status: string }>;
};

export function StatusOverview() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/status").then((res) => res.json()).then(setData).catch(() => setError(true));
  }, []);

  if (error) return <div className="status-error">No fue posible cargar el endpoint demo de status.</div>;
  if (!data) return <div className="status-loading"><i/><span>Cargando snapshot…</span></div>;

  return (
    <div className="status-dashboard">
      <div className="overall-status"><div><span className="status-orbit"><i/></span><div><span className="eyebrow">CURRENT SNAPSHOT</span><h3>Todos los servicios configurados como operativos.</h3><p>Este snapshot es de catálogo, no una afirmación de telemetría live.</p></div></div><span className="status-badge good"><i/> Operational</span></div>
      <div className="status-service-grid">{data.services.map((service) => <div key={service.id}><span className="service-icon"><Icon name={service.id === "network" ? "globe" : service.id === "vps" ? "server" : service.id === "panel" ? "terminal" : "box"}/></span><div><strong>{service.name}</strong><span>{service.detail}</span></div><em><i/> Operational</em></div>)}</div>
      <div className="status-node-table"><div className="status-table-head"><span>Node</span><span>Location</span><span>State</span></div>{data.nodes.map((node) => <div key={node.code}><strong>{node.code}</strong><span>{node.city}</span><em><i/> Operational</em></div>)}</div>
      <div className="status-footnote"><Icon name="activity"/><span>Para producción sustituye este endpoint por health checks, Uptime Kuma, Better Stack o una API de observabilidad propia.</span></div>
    </div>
  );
}
