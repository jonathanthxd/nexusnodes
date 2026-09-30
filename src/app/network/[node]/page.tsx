import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { nodes } from "@/lib/catalog";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";

export function generateStaticParams() {
  return nodes.map((node) => ({ node: node.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ node: string }> }): Promise<Metadata> {
  const { node: nodeId } = await params;
  const node = nodes.find((item) => item.id === nodeId);
  if (!node) return { title: "Nodo no encontrado" };
  return { title: `${node.code} · ${node.city}`, description: `${node.code}: ${node.processor}, tier ${node.tierLabel}, Minecraft desde $${node.minecraftPerGb.toFixed(2)}/GB.` };
}

export default async function NodePage({ params }: { params: Promise<{ node: string }> }) {
  const { node: nodeId } = await params;
  const node = nodes.find((item) => item.id === nodeId);
  if (!node) notFound();
  const minecraftParams = new URLSearchParams({ product: "minecraft", node: node.id, ram: "8", cores: "2", storage: "40" }).toString();
  const vpsParams = new URLSearchParams({ product: "vps", node: node.id, ram: "8", cores: "4", storage: "80" }).toString();

  return (
    <>
      <section className="node-page-hero"><div className="hero-grid-bg"/><div className="container"><Link href="/network" className="back-link">← Volver a Network</Link><div className="node-page-title"><span className="node-flag hero-flag">{node.flag}</span><div><span className="eyebrow">{node.code} · {node.tierLabel.toUpperCase()}</span><h1>{node.city}</h1><p>{node.region}</p></div><span className="status-badge good"><i/> Catalogued</span></div><p className="node-page-lead">{node.description}</p></div></section>

      <section className="section"><div className="container node-page-grid"><div className="node-facts"><article><Icon name="cpu"/><span>Processor</span><strong>{node.processor}</strong></article><article><Icon name="bolt"/><span>Tier</span><strong>{node.tierLabel}</strong></article><article><Icon name="map"/><span>Region</span><strong>{node.country}</strong></article><article><Icon name="shield"/><span>Catalog status</span><strong>Catalogued</strong></article></div><div className="node-pricing-box"><span className="eyebrow">BASE RATES</span><div><span>Minecraft</span><strong>${node.minecraftPerGb.toFixed(2)}<small>/GB</small></strong></div><div><span>VPS</span><strong>${node.vpsPerGb.toFixed(3).replace(/0+$/, "")}<small>/GB</small></strong></div><p>CPU y storage extra usan parámetros de catálogo hasta integrar billing real.</p></div></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="IDEAL FOR" title={node.ideal}/><div className="node-capabilities">{node.capabilities.map((cap) => <span key={cap}><Icon name="check"/>{cap}</span>)}</div><div className="node-page-actions"><Link href={`/pricing?${minecraftParams}`} className="button primary">Configurar Minecraft <Icon name="arrow"/></Link><Link href={`/pricing?${vpsParams}`} className="button ghost">Configurar VPS <Icon name="arrow"/></Link></div><p className="price-disclaimer">Este nodo está publicado en el catálogo. Conecta observabilidad real antes de mostrar disponibilidad, capacidad o latencia en tiempo real.</p></div></section>
    </>
  );
}
