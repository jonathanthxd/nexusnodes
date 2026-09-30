import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { StatusOverview } from "@/components/status-overview";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Platform Status", description: "NexusNodes platform status surface, with a clear boundary between configured catalog state and live observability." };

export default function StatusPage() {
  return <><PageHero compact eyebrow="PLATFORM STATUS" title={<>Know what is live.<br/><span className="gradient-text">Know what is not.</span></>} copy="The status surface separates catalog configuration from real telemetry. That makes it safe to connect monitoring later without presenting decorative green dots as evidence." actions={<span className="hero-info-chip"><Icon name="activity"/> /api/status · catalog snapshot</span>}/><section className="section"><div className="container"><StatusOverview/></div></section><section className="section section-dim"><div className="container integration-callout"><div><span className="eyebrow">PRODUCTION OBSERVABILITY</span><h2>Connect sources that can prove the state.</h2><p>Health checks, incident history, uptime and capacity should be collected server-side and exposed through a narrow public API.</p></div><div className="observability-stack"><span>Uptime Kuma</span><span>Better Stack</span><span>Prometheus</span><span>Custom API</span></div></div></section></>;
}
