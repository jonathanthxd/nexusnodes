window.NEXUS_DATA = {
  brand: {
    name: "NexusNodes",
    domain: "nexusnodes.lat",
    panelUrl: "https://panel.nexusnodes.lat",
    supportUrl: "cuenta.html#support"
  },
  pricing: {
    currency: "USD",
    cpuExtraPerCore: 0.35,
    extraStoragePerGb: 0.015,
    includedStorageGb: 20,
    note: "Estimación frontend. Ajusta los multiplicadores en assets/js/data.js para reflejar tu facturación real."
  },
  locations: [
    {
      id: "us-dal-intel",
      code: "DAL-01",
      flag: "🇺🇸",
      city: "Dallas",
      region: "Texas, USA",
      processor: "Intel",
      minecraftPerGb: 0.50,
      vpsPerGb: 0.45,
      tier: "value",
      description: "Nodo de entrada con el precio por GB más bajo del catálogo.",
      ideal: "Comunidades internacionales y proyectos sensibles al presupuesto.",
      status: "operational"
    },
    {
      id: "us-mia-r7",
      code: "MIA-01",
      flag: "🇺🇸",
      city: "Miami",
      region: "Florida, USA",
      processor: "Ryzen 7 3700X",
      minecraftPerGb: 0.95,
      vpsPerGb: 0.855,
      tier: "balanced",
      description: "Equilibrio entre frecuencia, ubicación y precio para LATAM.",
      ideal: "Comunidades del Caribe, norte de Sudamérica y costa este.",
      status: "operational"
    },
    {
      id: "cl-scl-intel",
      code: "SCL-01",
      flag: "🇨🇱",
      city: "Santiago",
      region: "Chile",
      processor: "Intel",
      minecraftPerGb: 0.95,
      vpsPerGb: 0.855,
      tier: "latam",
      description: "Presencia regional pensada para jugadores del cono sur.",
      ideal: "Chile y comunidades cercanas del cono sur.",
      status: "operational"
    },
    {
      id: "ar-xeon",
      code: "ARG-01",
      flag: "🇦🇷",
      city: "Argentina",
      region: "Argentina",
      processor: "Intel Xeon",
      minecraftPerGb: 1.00,
      vpsPerGb: 0.90,
      tier: "latam",
      description: "Nodo regional con CPU Xeon y presencia directa en Argentina.",
      ideal: "Argentina, Uruguay y comunidades del cono sur.",
      status: "operational"
    },
    {
      id: "us-mia-r9",
      code: "MIA-02",
      flag: "🇺🇸",
      city: "Miami Performance",
      region: "Florida, USA",
      processor: "Ryzen 9 5950X",
      minecraftPerGb: 1.50,
      vpsPerGb: 1.35,
      tier: "performance",
      description: "La opción de mayor frecuencia del catálogo actual.",
      ideal: "Modpacks, plugins pesados y servidores que priorizan rendimiento por núcleo.",
      status: "operational"
    }
  ],
  minecraftPresets: [
    { name: "Starter", ram: 4, cores: 1, storage: 20, description: "Servidor pequeño, vanilla o pruebas." },
    { name: "Community", ram: 8, cores: 2, storage: 35, description: "Survival con plugins y comunidad en crecimiento.", featured: true },
    { name: "Advanced", ram: 16, cores: 3, storage: 60, description: "Más margen para plugins, mundos y jugadores." },
    { name: "Performance", ram: 24, cores: 4, storage: 90, description: "Proyectos exigentes o modpacks medianos." }
  ],
  vpsPresets: [
    { name: "VPS S", ram: 4, cores: 2, storage: 40, description: "Bots, paneles, webs y servicios ligeros." },
    { name: "VPS M", ram: 8, cores: 4, storage: 80, description: "Servicios persistentes y stacks medianos.", featured: true },
    { name: "VPS L", ram: 16, cores: 6, storage: 120, description: "Bases de datos, APIs y workloads más pesados." }
  ],
  services: [
    { id: "panel", name: "Panel / Control", status: "operational", detail: "Interfaz y gestión de servicios" },
    { id: "minecraft", name: "Minecraft Hosting", status: "operational", detail: "Instancias Java y Bedrock" },
    { id: "vps", name: "VPS", status: "operational", detail: "Instancias Linux" },
    { id: "network", name: "Network", status: "operational", detail: "Conectividad entre nodos" }
  ]
};
