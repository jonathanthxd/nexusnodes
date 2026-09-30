import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { VpsPlatformPreview } from "@/components/vps-platform-preview";
import { VpsComposer } from "@/components/vps-composer";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Cloud VPS",
  description: "Cloud VPS Linux configurables por workload, RAM, CPU, NVMe y región."
};

export default function VpsPage() {
  return (
    <>
      <PageHero eyebrow="CLOUD VPS" title={<>Compute that starts<br/><span className="gradient-text">from the workload.</span></>} copy="Bots, APIs, databases y stacks completos. Elige distribución, recursos y región en una sola experiencia y conserva control total sobre la instancia." actions={<><Link href="/pricing?product=vps" className="button primary large">Configure VPS <Icon name="arrow"/></Link><Link href="#composer" className="button ghost large"><Icon name="cloud"/> Deploy Composer</Link></>} visual={<VpsPlatformPreview/>}/>

      <section className="section product-value-strip"><div className="container value-strip-grid"><div><Icon name="key"/><span><strong>Root access</strong><small>Tu sistema, tus servicios.</small></span></div><div><Icon name="cloud"/><span><strong>Linux images</strong><small>Ubuntu, Debian y AlmaLinux.</small></span></div><div><Icon name="disk"/><span><strong>NVMe storage</strong><small>Capacidad visible desde el inicio.</small></span></div><div><Icon name="network"/><span><strong>Multi-region</strong><small>Elige dónde comienza tu instancia.</small></span></div></div></section>

      <section className="section" id="composer"><div className="container"><SectionHeading eyebrow="DEPLOY COMPOSER" title={<>Compose the instance<br/><span className="text-muted">from its purpose.</span></>} copy="Workload, distro, region and resources stay connected, so the user understands the deployment before checkout."/><VpsComposer/></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="WORKLOADS" title="One compute layer. Different jobs."/><div className="usecase-grid usecase-grid-v5"><article><span className="icon-tile"><Icon name="code"/></span><h3>Web &amp; APIs</h3><p>Next.js, Node, Bun, Python, reverse proxies and persistent services.</p><span className="usecase-spec">4 GB · 2 vCPU · 50 GB</span></article><article><span className="icon-tile"><Icon name="database"/></span><h3>Databases</h3><p>PostgreSQL, MariaDB, Redis and services with persistent datasets.</p><span className="usecase-spec">8 GB · 4 vCPU · 80 GB</span></article><article><span className="icon-tile"><Icon name="terminal"/></span><h3>Bots &amp; Workers</h3><p>Discord bots, schedulers, queues and background processes.</p><span className="usecase-spec">4 GB · 2 vCPU · 40 GB</span></article><article><span className="icon-tile"><Icon name="layers"/></span><h3>Full stack</h3><p>App, database, reverse proxy and auxiliary services together.</p><span className="usecase-spec">8 GB · 4 vCPU · 100 GB</span></article></div></div></section>

      <section className="section"><div className="container vps-architecture-v5"><div className="split-copy"><span className="eyebrow">PROVISIONING PATH</span><h2>The browser describes intent.<br/><span className="text-muted">Trusted services perform the work.</span></h2><p>La cotización puede ser interactiva y rápida sin exponer credenciales ni convertir el frontend en el plano de control real.</p><div className="feature-checks"><span><Icon name="shield"/> Server-side quote validation</span><span><Icon name="credit"/> Billing boundary</span><span><Icon name="server"/> Provisioning boundary</span><span><Icon name="lock"/> Secrets never shipped to the client</span></div></div><div className="provision-pipeline-v5"><div><span className="pipeline-icon"><Icon name="monitor"/></span><span><strong>Web app</strong><small>Intent + configuration</small></span></div><i><Icon name="arrow"/></i><div><span className="pipeline-icon"><Icon name="shield"/></span><span><strong>Trusted backend</strong><small>Validate + bill</small></span></div><i><Icon name="arrow"/></i><div><span className="pipeline-icon"><Icon name="server"/></span><span><strong>Provisioner</strong><small>Create service</small></span></div><i><Icon name="arrow"/></i><div><span className="pipeline-icon"><Icon name="activity"/></span><span><strong>Observability</strong><small>Report real state</small></span></div></div></div></section>

      <section className="section tight"><div className="container cta-mega cta-mega-v5"><div className="cta-orb"/><div><span className="eyebrow">CLOUD COMPUTE</span><h2>Build the instance around the workload.</h2><p>Start with a composer preset or tune every resource yourself.</p></div><div><Link href="/pricing?product=vps" className="button primary large">Configure VPS <Icon name="rocket"/></Link><Link href="/network" className="button ghost large">Compare regions <Icon name="network"/></Link></div></div></section>
    </>
  );
}
