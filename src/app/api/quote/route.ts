import { NextResponse } from "next/server";
import { calculateQuote, normalizeQuote } from "@/lib/pricing";
import type { QuoteInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<QuoteInput>;
    const product = body.product === "vps" ? "vps" : "minecraft";
    const nodeId = typeof body.nodeId === "string" ? body.nodeId : "us-mia-r7";
    const ramGb = Number(body.ramGb);
    const cores = Number(body.cores);
    const storageGb = Number(body.storageGb);

    if (![ramGb, cores, storageGb].every(Number.isFinite)) {
      return NextResponse.json({ ok: false, error: "Parámetros numéricos inválidos." }, { status: 400 });
    }

    const normalized = normalizeQuote({ product, nodeId, ramGb, cores, storageGb });
    const quote = calculateQuote(normalized);
    return NextResponse.json({ ok: true, normalized, quote, note: "Catálogo demo. Billing de producción debe ser la autoridad final." });
  } catch {
    return NextResponse.json({ ok: false, error: "Body JSON inválido." }, { status: 400 });
  }
}
