import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { StatusOverview } from "@/components/status-overview";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Status", description: "Estado de catálogo de servicios y nodos NexusNodes, preparado para integrar observabilidad real." };

export default function StatusPage() {
  return <><PageHero compact eyebrow="SYSTEM STATUS" title={<>Transparencia antes<br/><span className="gradient-text">que decoración verde.</span></>} copy="Esta entrega diferencia deliberadamente datos configurados de telemetría real. El endpoint demo está listo para reemplazarse por observabilidad de producción." actions={<span className="hero-info-chip"><Icon name="activity"/> /api/status · configured mode</span>}/><section className="section"><div className="container"><StatusOverview/></div></section><section className="section section-dim"><div className="container integration-callout"><div><span className="eyebrow">PRODUCTION PATH</span><h2>Conecta una fuente que pueda demostrar el estado.</h2><p>Agrega health checks, incidentes, uptime histórico y capacidad desde una capa server-side; no pases tokens de monitorización al browser.</p></div><div className="observability-stack"><span>Uptime Kuma</span><span>Better Stack</span><span>Prometheus</span><span>Custom API</span></div></div></section></>;
}
