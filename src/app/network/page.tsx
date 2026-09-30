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
  description: "Explora regiones NexusNodes en Norteamérica y LATAM por hardware, tier y precio base."
};

export default function NetworkPage() {
  return (
    <>
      <PageHero eyebrow="NEXUS NETWORK" title={<>Region is a product decision.<br/><span className="gradient-text">Treat it like one.</span></>} copy="Compara ubicación, hardware y tarifa antes de elegir. La interfaz evita inventar ping, capacidad o stock: esas métricas solo deberían aparecer cuando estén conectadas a una fuente real." actions={<><Link href="#explorer" className="button primary large">Open Node Explorer <Icon name="arrow"/></Link><Link href="/status" className="button ghost large"><Icon name="activity"/> Platform status</Link></>} visual={<NetworkVisual compact/>}/>

      <section className="section product-value-strip"><div className="container value-strip-grid"><div><Icon name="map-pin"/><span><strong>5 catalog nodes</strong><small>North America + LATAM.</small></span></div><div><Icon name="cpu"/><span><strong>Hardware visible</strong><small>CPU context before checkout.</small></span></div><div><Icon name="money"/><span><strong>Rates visible</strong><small>Base pricing by product.</small></span></div><div><Icon name="activity"/><span><strong>Live-ready</strong><small>Prepared for real observability APIs.</small></span></div></div></section>

      <section className="section" id="explorer"><div className="container"><SectionHeading eyebrow="NODE EXPLORER" title={<>Five catalog regions.<br/><span className="text-muted">Context before commitment.</span></>} copy="Inspect each node, compare rates and use Region Advisor as a first-pass heuristic before validating real routes."/><NodeExplorer/></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="CATALOG MATRIX" title="Compare without opening five tabs."/><div className="catalog-table catalog-table-v5"><div className="catalog-head"><span>Node</span><span>Processor</span><span>Tier</span><span>Minecraft</span><span>VPS</span><span/></div>{nodes.map((node) => <div className="catalog-row" key={node.id}><span><b>{node.flag} {node.code}</b><small>{node.city}</small></span><span>{node.processor}</span><span><em className={`tier-pill tier-${node.tier}`}>{node.tierLabel}</em></span><span>${node.minecraftPerGb.toFixed(2)}/GB</span><span>${node.vpsPerGb.toFixed(3).replace(/0+$/, "")}/GB</span><span><Link href={`/network/${node.id}`} aria-label={`Abrir ${node.code}`}><Icon name="arrow-up-right"/></Link></span></div>)}</div></div></section>

      <section className="section"><div className="container"><SectionHeading eyebrow="OBSERVABILITY LAYER" title={<>Turn catalog data into<br/><span className="text-muted">real operational evidence.</span></>} copy="Next.js can expose a polished interface, but the truth still has to come from the infrastructure. These are the integrations that convert the network page into a live product surface."/><div className="integration-grid integration-grid-v5"><article><span className="icon-tile"><Icon name="wifi"/></span><div><span className="integration-state">SOURCE NEEDED</span><h3>Looking Glass</h3><p>Test IP, traceroute or region endpoints so visitors can measure from their own ISP.</p></div><Icon name="arrow-up-right"/></article><article><span className="icon-tile"><Icon name="activity"/></span><div><span className="integration-state">API READY</span><h3>Health checks</h3><p>Feed platform state from Uptime Kuma, Better Stack or your own monitoring service.</p></div><Icon name="arrow-up-right"/></article><article><span className="icon-tile"><Icon name="server"/></span><div><span className="integration-state">API READY</span><h3>Capacity</h3><p>Surface stock and allocation only from billing/provisioning, never from hardcoded UI values.</p></div><Icon name="arrow-up-right"/></article></div></div></section>

      <section className="section tight"><div className="container cta-mega cta-mega-v5"><div className="cta-orb"/><div><span className="eyebrow">REGION + RESOURCES</span><h2>Choose a node, then tune the service.</h2><p>Carry region context directly into the configurator.</p></div><div><Link href="/pricing" className="button primary large">Open Configurator <Icon name="sliders"/></Link></div></div></section>
    </>
  );
}
