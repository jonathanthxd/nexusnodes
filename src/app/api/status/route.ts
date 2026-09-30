import { NextResponse } from "next/server";
import { nodes, services } from "@/lib/catalog";

export function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    mode: "configured",
    overall: "operational",
    services,
    nodes: nodes.map((node) => ({ code: node.code, city: node.city, status: node.status })),
    disclaimer: "Configured catalog snapshot; replace with a real observability source in production."
  }, { headers: { "cache-control": "public, max-age=60" } });
}
