export type ProductType = "minecraft" | "vps";
export type NodeTier = "value" | "balanced" | "latam" | "performance";
export type NodeStatus = "operational" | "maintenance" | "degraded";

export type NodeLocation = {
  id: string;
  code: string;
  flag: string;
  city: string;
  region: string;
  country: string;
  processor: string;
  minecraftPerGb: number;
  vpsPerGb: number;
  tier: NodeTier;
  tierLabel: string;
  description: string;
  ideal: string;
  status: NodeStatus;
  coords: { x: number; y: number };
  capabilities: string[];
};

export type Audience = {
  id: string;
  label: string;
  node: string;
  performanceNode: string;
  note: string;
};

export type Workload = {
  id: string;
  label: string;
  short: string;
  baseRam: number;
  baseCores: number;
  baseStorage: number;
  description: string;
};

export type QuoteInput = {
  product: ProductType;
  nodeId: string;
  ramGb: number;
  cores: number;
  storageGb: number;
};

export type QuoteBreakdown = {
  ram: number;
  cpu: number;
  storage: number;
  total: number;
  includedStorageGb: number;
  currency: "USD";
  nodeCode: string;
  nodeName: string;
};
