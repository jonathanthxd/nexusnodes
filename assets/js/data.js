window.NEXUS_DATA = {
  version: "3.0.0",
  brand: {
    name: "NexusNodes",
    domain: "nexusnodes.lat",
    panelUrl: "https://panel.nexusnodes.lat",
    supportUrl: "contacto.html",
    locale: "es-CO"
  },
  pricing: {
    currency: "USD",
    cpuExtraPerCore: 0.35,
    extraStoragePerGb: 0.015,
    includedStorageGb: 20,
    minimumRamGb: 4,
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
      tierLabel: "Value",
      accent: "blue",
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
      tierLabel: "Balanced",
      accent: "purple",
      description: "Equilibrio entre frecuencia, ubicación y precio para LATAM.",
      ideal: "Caribe, norte de Sudamérica y costa este.",
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
      tierLabel: "LATAM",
      accent: "cyan",
      description: "Presencia regional pensada para jugadores del cono sur.",
      ideal: "Chile y comunidades cercanas del Pacífico sur.",
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
      tierLabel: "LATAM",
      accent: "cyan",
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
      tierLabel: "Performance",
      accent: "violet",
      description: "La opción de mayor frecuencia del catálogo actual.",
      ideal: "Modpacks, plugins pesados y cargas que priorizan rendimiento por núcleo.",
      status: "operational"
    }
  ],
  audiences: [
    { id: "north-sa", label: "Colombia / Venezuela / Ecuador", node: "us-mia-r7", performanceNode: "us-mia-r9", note: "Miami suele ser un buen punto de partida geográfico para el norte de Sudamérica. Verifica con una prueba real antes de producción." },
    { id: "caribbean", label: "Caribe / Centroamérica", node: "us-mia-r7", performanceNode: "us-mia-r9", note: "Miami suele ofrecer una ruta geográficamente razonable para comunidades del Caribe y Centroamérica." },
    { id: "global", label: "Audiencia internacional", node: "us-dal-intel", performanceNode: "us-mia-r9", note: "Dallas se usa aquí como punto de partida por coste; una comunidad internacional debería validar rutas reales." },
    { id: "chile", label: "Chile / Perú / Bolivia", node: "cl-scl-intel", performanceNode: "cl-scl-intel", note: "Santiago es el punto de partida regional para una audiencia concentrada en el Pacífico sur." },
    { id: "argentina", label: "Argentina / Uruguay", node: "ar-xeon", performanceNode: "ar-xeon", note: "El nodo argentino es el punto de partida regional para una audiencia concentrada en Argentina o Uruguay." },
    { id: "unknown", label: "Aún no lo sé", node: "us-mia-r7", performanceNode: "us-mia-r9", note: "Empieza por una región equilibrada y valida después con test IP o Looking Glass cuando esté conectado." }
  ],
  minecraftWorkloads: [
    { id: "vanilla", label: "Vanilla / Paper", short: "Survival y SMP", baseRam: 4, baseCores: 2, baseStorage: 30, ramStep: 2, description: "Servidor clásico con optimización ligera o plugins básicos." },
    { id: "plugins", label: "Plugins", short: "Paper / Purpur", baseRam: 6, baseCores: 2, baseStorage: 40, ramStep: 2, description: "Survival con plugins, sistemas custom y más carga de entidades." },
    { id: "modded", label: "Modded", short: "Forge / NeoForge / Fabric", baseRam: 8, baseCores: 3, baseStorage: 50, ramStep: 3, description: "Modpacks y servidores con mayor uso de memoria y disco." },
    { id: "network", label: "Network", short: "Velocity / múltiples servers", baseRam: 12, baseCores: 4, baseStorage: 70, ramStep: 4, description: "Proxy y varios backends o una comunidad con crecimiento previsto." }
  ],
  vpsWorkloads: [
    { id: "bot", label: "Bot / Worker", ram: 4, cores: 2, storage: 40, description: "Discord bots, workers, schedulers y servicios persistentes ligeros." },
    { id: "web", label: "Web / API", ram: 4, cores: 2, storage: 50, description: "APIs, paneles, sitios y backends pequeños o medianos." },
    { id: "database", label: "Database", ram: 8, cores: 4, storage: 80, description: "PostgreSQL, MariaDB, Redis u otros servicios con datos persistentes." },
    { id: "stack", label: "Full stack", ram: 8, cores: 4, storage: 100, description: "Aplicación + base de datos + reverse proxy en una misma instancia." }
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
  software: [
    { id: "paper", label: "Paper", family: "Plugins", tone: "green" },
    { id: "purpur", label: "Purpur", family: "Plugins", tone: "purple" },
    { id: "fabric", label: "Fabric", family: "Mods", tone: "yellow" },
    { id: "forge", label: "Forge", family: "Mods", tone: "orange" },
    { id: "neoforge", label: "NeoForge", family: "Mods", tone: "orange" },
    { id: "velocity", label: "Velocity", family: "Proxy", tone: "blue" },
    { id: "bungee", label: "BungeeCord", family: "Proxy", tone: "red" },
    { id: "bedrock", label: "Bedrock", family: "Crossplay", tone: "cyan" }
  ],
  distros: [
    { id: "ubuntu", label: "Ubuntu", version: "LTS", glyph: "U" },
    { id: "debian", label: "Debian", version: "Stable", glyph: "D" },
    { id: "alma", label: "AlmaLinux", version: "9", glyph: "A" }
  ],
  services: [
    { id: "panel", name: "Panel / Control", status: "operational", detail: "Interfaz y gestión de servicios" },
    { id: "minecraft", name: "Minecraft Hosting", status: "operational", detail: "Instancias Java y Bedrock" },
    { id: "vps", name: "VPS", status: "operational", detail: "Instancias Linux" },
    { id: "network", name: "Network", status: "operational", detail: "Conectividad entre nodos" }
  ]
};
