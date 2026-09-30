import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "nexusnodes-web",
    version: "5.0.0",
    timestamp: new Date().toISOString()
  }, { headers: { "cache-control": "no-store" } });
}
