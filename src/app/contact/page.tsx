import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { ContactBrief } from "@/components/contact-brief";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Contacto", description: "Prepara un brief de preventa y encuentra el canal correcto para tu caso NexusNodes." };

const routes = [
  { icon: "spark" as const, eyebrow: "SELF-SERVICE", title: "I know what I need", copy: "Configura recursos, región y contexto de precio sin esperar una conversación.", href: "/pricing", action: "Open Configurator" },
  { icon: "user" as const, eyebrow: "CUSTOMER", title: "I already have a service", copy: "Acceso, consola y soporte deberían continuar en el panel y ticketing real.", href: "https://panel.nexusnodes.lat", action: "Open panel", external: true },
  { icon: "layers" as const, eyebrow: "PRE-SALES", title: "My case is not standard", copy: "Migraciones, múltiples servidores, networks o infraestructura fuera de catálogo.", href: "#brief", action: "Build a brief" }
];

export default function ContactPage() {
  return (
    <>
      <PageHero compact eyebrow="CONTACT" title={<>Less back-and-forth.<br/><span className="gradient-text">More context upfront.</span></>} copy="Compra normal por Configurator. Para migraciones, arquitectura especial o múltiples servicios, prepara un brief que le dé a una persona el contexto correcto desde el primer mensaje." />
      <section className="section">
        <div className="container contact-route-grid contact-route-grid-v5">
          {routes.map((item) => <article key={item.title}><div className="contact-route-top"><span className="icon-tile"><Icon name={item.icon}/></span><span className="micro-label">{item.eyebrow}</span></div><h3>{item.title}</h3><p>{item.copy}</p>{item.external ? <a href={item.href} target="_blank" rel="noreferrer" className="inline-link">{item.action} <Icon name="external"/></a> : <Link href={item.href} className="inline-link">{item.action} <Icon name="arrow"/></Link>}</article>)}
        </div>
      </section>
      <section className="section section-dim" id="brief"><div className="container"><ContactBrief/></div></section>
    </>
  );
}
