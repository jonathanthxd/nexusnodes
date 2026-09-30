import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { ContactBrief } from "@/components/contact-brief";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Contacto", description: "Prepara un brief de preventa y encuentra el canal correcto para tu caso NexusNodes." };

export default function ContactPage() {
  return <><PageHero compact eyebrow="CONTACT" title={<>Menos ida y vuelta.<br/><span className="gradient-text">Más contexto desde el inicio.</span></>} copy="Usa el configurador para compras normales o genera un brief cuando necesitas migración, arquitectura especial o una recomendación humana."/><section className="section"><div className="container contact-route-grid"><article><span className="icon-tile"><Icon name="spark"/></span><h3>Quiero comprar</h3><p>Usa Smart Sizer y llega a una configuración compartible.</p><Link href="/pricing" className="inline-link">Abrir configurador <Icon name="arrow"/></Link></article><article><span className="icon-tile"><Icon name="user"/></span><h3>Ya soy cliente</h3><p>El acceso principal debe vivir en tu panel y sistema de tickets real.</p><a href="https://panel.nexusnodes.lat" target="_blank" rel="noreferrer" className="inline-link">Abrir panel <Icon name="external"/></a></article><article><span className="icon-tile"><Icon name="layers"/></span><h3>Caso especial</h3><p>Migraciones, redes, múltiples servidores o infraestructura fuera de catálogo.</p><span className="inline-muted">Genera el brief inferior</span></article></div></section><section className="section section-dim"><div className="container"><ContactBrief/></div></section></>;
}
