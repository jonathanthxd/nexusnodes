import { NextResponse } from "next/server";
import { nodes, pricingConfig } from "@/lib/catalog";

export function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    currency: pricingConfig.currency,
    nodes: nodes.map(({ status: _status, ...node }) => node),
    note: "Public catalog data. Capacity, latency and availability require dedicated live sources."
  }, { headers: { "cache-control": "public, max-age=300, stale-while-revalidate=600" } });
}
