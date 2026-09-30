import type { Metadata } from "next";
import Link from "next/link";
import { DashboardDemo } from "@/components/dashboard-demo";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Nexus Control", description: "Interactive preview of the NexusNodes server control experience." };

export default function DashboardDemoPage() {
  return <section className="dashboard-page dashboard-page-v5"><div className="dashboard-ambient"/><div className="container dashboard-intro dashboard-intro-v5"><div><span className="hero-kicker"><i/><span>INTERACTIVE PRODUCT PREVIEW</span></span><h1>Nexus Control</h1><p>Explora cómo puede sentirse administrar un servicio NexusNodes. Los datos son simulados; la UI está diseñada para conectarse después a telemetría y provisioning reales.</p></div><div><Link href="/pricing" className="button primary">Configure a service <Icon name="arrow"/></Link><Link href="/" className="button ghost">Back home</Link></div></div><div className="dashboard-wide"><DashboardDemo/></div></section>;
}
