import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { NetworkVisual } from "@/components/network-visual";
import { NodeExplorer } from "@/components/node-explorer";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";
import { nodes } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Network",
  description: "Explora nodos NexusNodes en Norteamérica y LATAM con hardware, tier y precio base visibles."
};

export default function NetworkPage() {
  return (
    <>
      <PageHero eyebrow="NEXUS NETWORK" title={<>La región importa.<br/><span className="gradient-text">La evidencia también.</span></>} copy="Compara nodos por ubicación, procesador, tier y precio. No mostramos milisegundos de ping ni capacidad live hasta tener una fuente que realmente pueda medirlos." actions={<><Link href="#explorer" className="button primary large">Abrir Node Explorer <Icon name="arrow"/></Link><Link href="/status" className="button ghost large">Ver status</Link></>} visual={<NetworkVisual compact/>}/>

      <section className="section" id="explorer"><div className="container"><SectionHeading eyebrow="NODE EXPLORER" title={<>Cinco nodos.<br/><span className="text-muted">Contexto antes de elegir.</span></>} copy="Usa el advisor como punto de partida geográfico, no como sustituto de una prueba de red."/><NodeExplorer/></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="CATALOG" title="Comparación transparente."/><div className="catalog-table"><div className="catalog-head"><span>Nodo</span><span>Procesador</span><span>Tier</span><span>Minecraft</span><span>VPS</span><span/></div>{nodes.map((node) => <div className="catalog-row" key={node.id}><span><b>{node.flag} {node.code}</b><small>{node.city}</small></span><span>{node.processor}</span><span><em className={`tier-pill tier-${node.tier}`}>{node.tierLabel}</em></span><span>${node.minecraftPerGb.toFixed(2)}/GB</span><span>${node.vpsPerGb.toFixed(3).replace(/0+$/, "")}/GB</span><span><Link href={`/network/${node.id}`} aria-label={`Abrir ${node.code}`}><Icon name="arrow"/></Link></span></div>)}</div></div></section>

      <section className="section"><div className="container"><SectionHeading eyebrow="LIVE DATA READY" title="Lo que falta para convertir catálogo en observabilidad."/><div className="integration-grid"><article><span className="icon-tile"><Icon name="wifi"/></span><h3>Looking Glass</h3><p>Test IP o endpoints por nodo para que cada visitante mida una ruta real desde su ISP.</p><span className="integration-state">NOT CONNECTED</span></article><article><span className="icon-tile"><Icon name="activity"/></span><h3>Health checks</h3><p>Uptime Kuma, Better Stack o una API propia para disponibilidad y degradación.</p><span className="integration-state">READY FOR API</span></article><article><span className="icon-tile"><Icon name="server"/></span><h3>Capacity</h3><p>Stock y capacidad deben llegar desde billing/provisioning, nunca de un número hardcoded.</p><span className="integration-state">READY FOR API</span></article></div></div></section>

      <section className="section tight"><div className="container cta-mega"><div><span className="eyebrow">REGION + RESOURCES</span><h2>¿Ya sabes dónde desplegar?</h2><p>Lleva el nodo al configurador y ajusta el resto de recursos.</p></div><div><Link href="/pricing" className="button primary large">Configurar <Icon name="arrow"/></Link></div></div></section>
    </>
  );
}
