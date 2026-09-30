import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/quote-builder";
import { PageHero } from "@/components/page-shell";
import { Icon } from "@/components/icon";
import { pickNumber, pickString } from "@/lib/utils";

type Search = Record<string, string | string[] | undefined>;
export const metadata: Metadata = { title: "Smart Configurator", description: "Configure Minecraft or VPS resources, region and catalog pricing in one interactive NexusNodes workflow." };

export default async function PricingPage({ searchParams }: { searchParams: Promise<Search> }) {
  const query = await searchParams;
  const initial = {
    product: pickString(query.product, "minecraft") === "vps" ? "vps" as const : "minecraft" as const,
    nodeId: pickString(query.node, "us-mia-r7"),
    ramGb: pickNumber(query.ram, 8),
    cores: pickNumber(query.cores, 2),
    storageGb: pickNumber(query.storage, 40),
    audience: pickString(query.audience, "north-sa"),
    workload: pickString(query.workload, pickString(query.product, "minecraft") === "vps" ? "web" : "plugins")
  };

  return <>
    <PageHero compact eyebrow="SMART CONFIGURATOR" title={<>From workload<br/><span className="gradient-text">to infrastructure.</span></>} copy="Build a Minecraft server or VPS by resources and region instead of choosing from opaque plan names. The browser gives instant feedback; the server remains the pricing authority." actions={<><span className="hero-info-chip"><Icon name="shield"/> Server-side quote validation</span><span className="hero-info-chip"><Icon name="external"/> Shareable configurations</span></>}/>
    <section className="section pricing-section"><div className="container"><QuoteBuilder initial={initial}/></div></section>
    <section className="section section-dim"><div className="container pricing-explainer pricing-explainer-v5"><article><span>01</span><i><Icon name="memory"/></i><h3>Memory</h3><p>Base cost follows the selected node and product rate.</p></article><article><span>02</span><i><Icon name="cpu"/></i><h3>Compute</h3><p>CPU allocation stays explicit instead of being hidden behind plan names.</p></article><article><span>03</span><i><Icon name="disk"/></i><h3>Storage</h3><p>Persistent NVMe allocation is visible and independently adjustable.</p></article><article><span>04</span><i><Icon name="shield"/></i><h3>Server validation</h3><p>Final price, stock, taxes and limits must be recalculated outside the browser.</p></article></div></section>
  </>;
}
