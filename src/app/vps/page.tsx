import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { InfraConsole } from "@/components/infra-console";
import { VpsComposer } from "@/components/vps-composer";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Cloud VPS",
  description: "VPS Linux configurables por workload, RAM, CPU, NVMe y región."
};

export default function VpsPage() {
  return (
    <>
      <PageHero eyebrow="CLOUD VPS" title={<>Compute directo.<br/><span className="gradient-text">Sin planes indescifrables.</span></>} copy="Elige workload, distribución, recursos y región. Usa la instancia como base para bots, APIs, databases, paneles o stacks completos." actions={<><Link href="/pricing?product=vps" className="button primary large">Configurar VPS <Icon name="arrow"/></Link><Link href="#composer" className="button ghost large">Abrir Composer</Link></>} visual={<InfraConsole mode="vps"/>}/>

      <section className="section" id="composer"><div className="container"><SectionHeading eyebrow="DEPLOY COMPOSER" title={<>Construye la instancia<br/><span className="text-muted">desde su propósito.</span></>} copy="Selecciona distribución, workload y región. Después puedes afinar recursos en el configurador global."/><VpsComposer/></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="USE CASES" title="Una base pequeña que puede crecer."/><div className="usecase-grid"><article><span className="icon-tile"><Icon name="code"/></span><h3>Web &amp; APIs</h3><p>Next.js, Node, Bun, Python, reverse proxies y servicios web persistentes.</p><span className="usecase-spec">4 GB · 2 vCPU · 50 GB</span></article><article><span className="icon-tile"><Icon name="database"/></span><h3>Databases</h3><p>PostgreSQL, MariaDB, Redis y servicios con almacenamiento persistente.</p><span className="usecase-spec">8 GB · 4 vCPU · 80 GB</span></article><article><span className="icon-tile"><Icon name="terminal"/></span><h3>Bots &amp; Workers</h3><p>Discord bots, schedulers, queues y procesos que deben estar siempre activos.</p><span className="usecase-spec">4 GB · 2 vCPU · 40 GB</span></article><article><span className="icon-tile"><Icon name="layers"/></span><h3>Full stack</h3><p>App, database, proxy y servicios auxiliares en una sola instancia.</p><span className="usecase-spec">8 GB · 4 vCPU · 100 GB</span></article></div></div></section>

      <section className="section"><div className="container split-feature"><div className="split-copy"><span className="eyebrow">ARCHITECTURE</span><h2>Tu VPS no debería depender<br/><span className="text-muted">de una landing bonita.</span></h2><p>La experiencia pública ya está separada de la lógica que realmente debe decidir si una instancia puede crearse.</p><div className="feature-checks"><span><Icon name="check"/> Precio recalculado en servidor</span><span><Icon name="check"/> Stock/capacidad preparado para API</span><span><Icon name="check"/> Provisioning fuera del browser</span><span><Icon name="check"/> Standalone build para self-hosting</span></div></div><div className="architecture-stack"><div><Icon name="globe"/><span>Next.js Web</span></div><i/><div><Icon name="shield"/><span>Backend / Billing</span></div><i/><div className="dual"><span><Icon name="server"/>Hypervisor</span><span><Icon name="database"/>Storage</span></div></div></div></section>

      <section className="section tight"><div className="container cta-mega"><div><span className="eyebrow">DEPLOY</span><h2>Empieza con una instancia clara.</h2><p>Ajusta RAM, CPU, NVMe y nodo sin abandonar el flujo.</p></div><div><Link href="/pricing?product=vps" className="button primary large">Configurar VPS <Icon name="arrow"/></Link><Link href="/network" className="button ghost large">Comparar nodos</Link></div></div></section>
    </>
  );
}
