import { getNode, pricingConfig } from "./catalog";
import type { QuoteBreakdown, QuoteInput } from "./types";

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function normalizeQuote(input: QuoteInput): QuoteInput {
  return {
    product: input.product === "vps" ? "vps" : "minecraft",
    nodeId: getNode(input.nodeId).id,
    ramGb: clampNumber(Math.round(input.ramGb), pricingConfig.minimumRamGb, pricingConfig.maxRamGb),
    cores: clampNumber(Math.round(input.cores), 1, pricingConfig.maxCores),
    storageGb: clampNumber(Math.round(input.storageGb), pricingConfig.includedStorageGb, pricingConfig.maxStorageGb)
  };
}

export function calculateQuote(raw: QuoteInput): QuoteBreakdown {
  const input = normalizeQuote(raw);
  const node = getNode(input.nodeId);
  const perGb = input.product === "minecraft" ? node.minecraftPerGb : node.vpsPerGb;
  const ram = input.ramGb * perGb;
  const cpu = Math.max(0, input.cores - 1) * pricingConfig.cpuExtraPerCore;
  const extraStorage = Math.max(0, input.storageGb - pricingConfig.includedStorageGb);
  const storage = extraStorage * pricingConfig.extraStoragePerGb;
  const total = ram + cpu + storage;

  return {
    ram: roundMoney(ram),
    cpu: roundMoney(cpu),
    storage: roundMoney(storage),
    total: roundMoney(total),
    includedStorageGb: pricingConfig.includedStorageGb,
    currency: "USD",
    nodeCode: node.code,
    nodeName: node.city
  };
}

export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(value);
}
