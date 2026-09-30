import type { Metadata } from "next";
import { AccountPanel } from "@/components/account-panel";
import { pickNumber, pickString } from "@/lib/utils";

export const metadata: Metadata = { title: "Cuenta", description: "Acceso a NexusNodes y contexto de pedido preparado para backend." };
type Search = Record<string, string | string[] | undefined>;

export default async function AccountPage({ searchParams }: { searchParams: Promise<Search> }) {
  const query = await searchParams;
  const hasContext = typeof query.product === "string";
  const context = hasContext ? {
    product: pickString(query.product, "minecraft") === "vps" ? "vps" as const : "minecraft" as const,
    nodeId: pickString(query.node, "us-mia-r7"),
    ramGb: pickNumber(query.ram, 8),
    cores: pickNumber(query.cores, 2),
    storageGb: pickNumber(query.storage, 40)
  } : undefined;

  return <section className="account-page"><div className="hero-grid-bg"/><div className="container"><AccountPanel context={context}/></div></section>;
}
