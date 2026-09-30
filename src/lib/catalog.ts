import type { Audience, NodeLocation, Workload } from "./types";

export const brand = {
  name: "NexusNodes",
  domain: "nexusnodes.lat",
  panelUrl: "https://panel.nexusnodes.lat",
  locale: "es-CO"
};

export const pricingConfig = {
  currency: "USD" as const,
  cpuExtraPerCore: 0.35,
  extraStoragePerGb: 0.015,
  includedStorageGb: 20,
  minimumRamGb: 4,
  maxRamGb: 64,
  maxCores: 16,
  maxStorageGb: 500
};

export const nodes: NodeLocation[] = [
  {
    id: "us-dal-intel",
    code: "DAL-01",
    flag: "🇺🇸",
    city: "Dallas",
    region: "Texas, USA",
    country: "USA",
    processor: "Intel",
    minecraftPerGb: 0.5,
    vpsPerGb: 0.45,
    tier: "value",
    tierLabel: "Value",
    description: "Nodo de entrada con el precio por GB más bajo del catálogo.",
    ideal: "Comunidades internacionales y proyectos sensibles al presupuesto.",
    status: "operational",
    coords: { x: 30, y: 39 },
    capabilities: ["Minecraft", "VPS", "NVMe", "IPv4"]
  },
  {
    id: "us-mia-r7",
    code: "MIA-01",
    flag: "🇺🇸",
    city: "Miami",
    region: "Florida, USA",
    country: "USA",
    processor: "Ryzen 7 3700X",
    minecraftPerGb: 0.95,
    vpsPerGb: 0.855,
    tier: "balanced",
    tierLabel: "Balanced",
    description: "Equilibrio entre frecuencia, ubicación y precio para LATAM.",
    ideal: "Caribe, norte de Sudamérica y costa este.",
    status: "operational",
    coords: { x: 37, y: 47 },
    capabilities: ["Minecraft", "VPS", "NVMe", "LATAM route"]
  },
  {
    id: "cl-scl-intel",
    code: "SCL-01",
    flag: "🇨🇱",
    city: "Santiago",
    region: "Chile",
    country: "Chile",
    processor: "Intel",
    minecraftPerGb: 0.95,
    vpsPerGb: 0.855,
    tier: "latam",
    tierLabel: "LATAM",
    description: "Presencia regional pensada para jugadores del cono sur.",
    ideal: "Chile y comunidades cercanas del Pacífico sur.",
    status: "operational",
    coords: { x: 44, y: 79 },
    capabilities: ["Minecraft", "VPS", "NVMe", "Regional"]
  },
  {
    id: "ar-xeon",
    code: "ARG-01",
    flag: "🇦🇷",
    city: "Argentina",
    region: "Argentina",
    country: "Argentina",
    processor: "Intel Xeon",
    minecraftPerGb: 1,
    vpsPerGb: 0.9,
    tier: "latam",
    tierLabel: "LATAM",
    description: "Nodo regional con CPU Xeon y presencia directa en Argentina.",
    ideal: "Argentina, Uruguay y comunidades del cono sur.",
    status: "operational",
    coords: { x: 50, y: 81 },
    capabilities: ["Minecraft", "VPS", "NVMe", "Regional"]
  },
  {
    id: "us-mia-r9",
    code: "MIA-02",
    flag: "🇺🇸",
    city: "Miami Performance",
    region: "Florida, USA",
    country: "USA",
    processor: "Ryzen 9 5950X",
    minecraftPerGb: 1.5,
    vpsPerGb: 1.35,
    tier: "performance",
    tierLabel: "Performance",
    description: "La opción de mayor frecuencia del catálogo actual.",
    ideal: "Modpacks, plugins pesados y cargas que priorizan rendimiento por núcleo.",
    status: "operational",
    coords: { x: 39, y: 45 },
    capabilities: ["Minecraft", "VPS", "High clock", "NVMe"]
  }
];

export const audiences: Audience[] = [
  { id: "north-sa", label: "Colombia / Venezuela / Ecuador", node: "us-mia-r7", performanceNode: "us-mia-r9", note: "Miami suele ser un buen punto de partida geográfico para el norte de Sudamérica. Valida con una prueba real antes de producción." },
  { id: "caribbean", label: "Caribe / Centroamérica", node: "us-mia-r7", performanceNode: "us-mia-r9", note: "Miami suele ofrecer una ruta geográficamente razonable para comunidades del Caribe y Centroamérica." },
  { id: "global", label: "Audiencia internacional", node: "us-dal-intel", performanceNode: "us-mia-r9", note: "Dallas se usa como punto de partida por coste; una comunidad internacional debería validar rutas reales." },
  { id: "chile", label: "Chile / Perú / Bolivia", node: "cl-scl-intel", performanceNode: "cl-scl-intel", note: "Santiago es el punto de partida regional para una audiencia concentrada en el Pacífico sur." },
  { id: "argentina", label: "Argentina / Uruguay", node: "ar-xeon", performanceNode: "ar-xeon", note: "El nodo argentino es el punto de partida regional para una audiencia concentrada en Argentina o Uruguay." },
  { id: "unknown", label: "Aún no lo sé", node: "us-mia-r7", performanceNode: "us-mia-r9", note: "Empieza por una región equilibrada y valida después con test IP o Looking Glass cuando esté conectado." }
];

export const minecraftWorkloads: Workload[] = [
  { id: "vanilla", label: "Vanilla / Paper", short: "Survival y SMP", baseRam: 4, baseCores: 2, baseStorage: 30, description: "Servidor clásico con optimización ligera o plugins básicos." },
  { id: "plugins", label: "Plugins", short: "Paper / Purpur", baseRam: 6, baseCores: 2, baseStorage: 40, description: "Survival con plugins, sistemas custom y más carga de entidades." },
  { id: "modded", label: "Modded", short: "Forge / NeoForge / Fabric", baseRam: 8, baseCores: 3, baseStorage: 50, description: "Modpacks y servidores con mayor uso de memoria y disco." },
  { id: "network", label: "Network", short: "Velocity / múltiples servers", baseRam: 12, baseCores: 4, baseStorage: 70, description: "Proxy y varios backends o una comunidad con crecimiento previsto." }
];

export const vpsWorkloads: Workload[] = [
  { id: "bot", label: "Bot / Worker", short: "Procesos persistentes", baseRam: 4, baseCores: 2, baseStorage: 40, description: "Bots, workers, schedulers y servicios persistentes ligeros." },
  { id: "web", label: "Web / API", short: "Apps y APIs", baseRam: 4, baseCores: 2, baseStorage: 50, description: "APIs, paneles, sitios y backends pequeños o medianos." },
  { id: "database", label: "Database", short: "Datos persistentes", baseRam: 8, baseCores: 4, baseStorage: 80, description: "PostgreSQL, MariaDB, Redis u otros servicios con datos persistentes." },
  { id: "stack", label: "Full stack", short: "App + DB + proxy", baseRam: 8, baseCores: 4, baseStorage: 100, description: "Aplicación + base de datos + reverse proxy en una misma instancia." }
];

export const software = [
  ["Paper", "Plugins", "green"], ["Purpur", "Plugins", "purple"], ["Fabric", "Mods", "yellow"],
  ["Forge", "Mods", "orange"], ["NeoForge", "Mods", "orange"], ["Velocity", "Proxy", "blue"],
  ["BungeeCord", "Proxy", "red"], ["Bedrock", "Crossplay", "cyan"]
] as const;

export const distros = [
  { id: "ubuntu", label: "Ubuntu", version: "LTS", glyph: "U" },
  { id: "debian", label: "Debian", version: "Stable", glyph: "D" },
  { id: "alma", label: "AlmaLinux", version: "9", glyph: "A" }
] as const;

export const services = [
  { id: "panel", name: "Panel / Control", status: "operational", detail: "Interfaz y gestión de servicios" },
  { id: "minecraft", name: "Minecraft Hosting", status: "operational", detail: "Instancias Java y Bedrock" },
  { id: "vps", name: "VPS", status: "operational", detail: "Instancias Linux" },
  { id: "network", name: "Network", status: "operational", detail: "Conectividad entre nodos" }
] as const;

export function getNode(id: string) {
  return nodes.find((node) => node.id === id) ?? nodes[1];
}
