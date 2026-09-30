import type { Metadata } from "next";
import { DashboardDemo } from "@/components/dashboard-demo";

export const metadata: Metadata = { title: "Dashboard Demo", description: "Demo interactiva del concepto Nexus Control para administrar servidores." };

export default function DashboardDemoPage() {
  return <section className="dashboard-page"><div className="container dashboard-intro"><span className="eyebrow">INTERACTIVE CONCEPT</span><h1>Nexus Control</h1><p>Una demo de experiencia de administración. Los datos son simulados y no representan un servidor real.</p></div><div className="dashboard-wide"><DashboardDemo/></div></section>;
}
