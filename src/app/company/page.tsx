import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { PlatformArchitecture } from "@/components/platform-architecture";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Empresa", description: "Principios técnicos y de producto detrás de NexusNodes." };

const principles = [
  ["01", "Comprensible", "RAM, CPU, storage y región deben ser visibles antes de pagar. El nombre del plan nunca debería ocultar la unidad económica.", "sliders"],
  ["02", "Verificable", "Ping, uptime, capacidad y estado live solo se presentan como tales cuando existe una fuente medible detrás.", "activity"],
  ["03", "Composable", "Experiencia, identidad, billing y provisioning evolucionan como capas con límites claros.", "layers"],
  ["04", "Operable", "Una buena compra termina en una buena experiencia diaria: console, backups, files, schedules y equipo.", "terminal"]
] as const;

export default function CompanyPage() {
  return (
    <>
      <PageHero compact eyebrow="ABOUT NEXUSNODES" title={<>Hosting designed<br/><span className="gradient-text">like a product system.</span></>} copy="NexusNodes no se plantea como un checkout pegado a Pterodactyl. Discovery, identity, commerce, observability y provisioning pueden evolucionar como capas separadas sin perder una experiencia coherente." actions={<><Link href="/contact" className="button primary">Hablar con NexusNodes <Icon name="arrow"/></Link><Link href="/dashboard-demo" className="button ghost"><Icon name="layout"/> Nexus Control</Link></>} />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="PRODUCT PRINCIPLES" title={<>Infrastructure should be<br/><span className="text-muted">easy to understand and hard to fake.</span></>} />
          <div className="principle-grid-v5">
            {principles.map(([number, title, copy, icon]) => <article key={number}><span className="principle-number">{number}</span><span className="icon-tile"><Icon name={icon}/></span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-dim">
        <div className="container">
          <SectionHeading eyebrow="PLATFORM ARCHITECTURE" title={<>One experience.<br/><span className="text-muted">Four explicit boundaries.</span></>} copy="Explora qué debe resolver cada capa y, más importante, qué no debería resolver." />
          <PlatformArchitecture/>
        </div>
      </section>

      <section className="section tight">
        <div className="container cta-mega cta-mega-v5"><div><span className="eyebrow">NEXT STEP</span><h2>From polished frontend to real infrastructure.</h2><p>La experiencia pública ya está preparada para conectarse a identidad, billing, observabilidad y provisioning reales.</p></div><Link href="/contact" className="button primary large">Prepare a brief <Icon name="arrow"/></Link></div>
      </section>
    </>
  );
}
