import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/quote-builder";
import { PageHero } from "@/components/page-shell";
import { Icon } from "@/components/icon";
import { pickNumber, pickString } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Precios & Configurador",
  description: "Smart Sizer y configurador de recursos NexusNodes para Minecraft y VPS."
};

type Search = Record<string, string | string[] | undefined>;

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

  return (
    <>
      <PageHero compact eyebrow="SMART PRICING" title={<>Configura recursos.<br/><span className="gradient-text">Entiende el cálculo.</span></>} copy="El frontend estima con parámetros visibles; el endpoint de servidor vuelve a normalizar y calcular antes de considerar una cifra válida." actions={<span className="hero-info-chip"><Icon name="shield"/> Server-side quote validation incluida</span>}/>
      <section className="section pricing-section"><div className="container"><QuoteBuilder initial={initial}/></div></section>
      <section className="section section-dim"><div className="container pricing-explainer"><article><span>01</span><h3>RAM</h3><p>El coste base usa la tarifa por GB del nodo y producto seleccionados.</p></article><article><span>02</span><h3>CPU</h3><p>El primer core está incluido en la lógica demo; cores extra usan un multiplicador configurable.</p></article><article><span>03</span><h3>Storage</h3><p>20 GB están incluidos en la estimación; el exceso utiliza otro parámetro visible.</p></article><article><span>04</span><h3>Backend</h3><p>Producción debe recalcular precio, stock, impuestos, límites y descuentos fuera del navegador.</p></article></div></section>
    </>
  );
}
