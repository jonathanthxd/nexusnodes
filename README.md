# NexusNodes v5 — Next.js Super UI Update

NexusNodes v5 empuja la migración de v4 hacia una **aplicación de producto real**, no una landing HTML trasladada a React. Mantiene Next.js App Router como arquitectura y reconstruye la capa de experiencia con Client Islands, Motion y `lucide-react`, dejando el contenido y catálogo principalmente en Server Components.

## Qué cambia en v5

- **UI completamente rehecha** con superficies de producto, bento layouts, mega menu, motion y jerarquía visual más fuerte.
- **`lucide-react`** sustituye el sistema de SVGs caseros.
- **Motion for React** se usa únicamente en islands interactivas.
- Home nueva con **Quick Deploy Studio** interactivo.
- Pricing convertido en un **Configurator de 3 superficies**.
- **Nexus Control** rehecho como panel interactivo completo.
- Minecraft y VPS tienen experiencias visuales propias, no el mismo hero reutilizado.
- Network recibe un **Node Explorer** y Region Advisor más profundos.
- Nexus Identity / Account rehecho.
- Status distingue catálogo configurado de observabilidad live.
- Open Graph **generado por código** con `next/og`.
- Open Graph dinámico para `/network/[node]`.
- Route Handler público de catálogo en `GET /api/catalog`.
- Estados nativos de App Router: loading, error y not-found.
- Conserva Docker/standalone, APIs de quote/status/health y rutas dinámicas de v4.

## Stack

```text
Next.js 16.3.8     App Router
React 19.3.0
TypeScript 5.8.x   strict
lucide-react 1.48.0
motion 13.4.4
CSS propio         sin Tailwind / sin UI kit
```

La filosofía sigue siendo **Server Components first**. Solo los componentes que requieren estado, eventos o animación cruzan la frontera `"use client"`.

## Rutas

```text
/                       Home + Quick Deploy Studio
/minecraft              Minecraft product surface + Sizer
/vps                    VPS product surface + Composer
/network                Node Explorer + Region Advisor
/network/[node]         Ficha dinámica por nodo
/pricing                Smart Configurator
/account                Nexus Identity
/status                 Platform Status
/company                Empresa / principios
/contact                Preventa / brief builder
/dashboard-demo         Nexus Control interactivo
```

## Route Handlers

```text
GET  /api/catalog       catálogo público, sin fingir telemetría
POST /api/quote         normaliza y recalcula estimación server-side
GET  /api/status        snapshot configurado; no es observabilidad live
GET  /api/health        healthcheck de la aplicación
```

### `POST /api/quote`

Ejemplo:

```json
{
  "product": "minecraft",
  "nodeId": "us-mia-r7",
  "ramGb": 8,
  "cores": 2,
  "storageGb": 40
}
```

El navegador **no es autoridad de precio**. En producción, billing debe recalcular stock, impuestos, descuentos y precio final antes de cobrar.

## Desarrollo

Requisitos:

- Node.js 20.9+ (Node 22 recomendado)
- npm reciente

```bash
npm install
npm run typecheck
npm run dev
```

Abre:

```text
http://localhost:3000
```

Build de producción:

```bash
npm run build
npm start
```

## Docker / VPS

Se conserva `output: "standalone"` y el Dockerfile multi-stage:

```bash
docker compose up -d --build
```

Healthcheck:

```text
GET /api/health
```

## Arquitectura de UI

```text
RootLayout (Server)
├── SiteHeader                    Client island
├── Route                         Server Component
│   ├── content/catalog           Server-rendered
│   └── interactive surface       Client island
└── SiteFooter                    Server
```

Ejemplos de islands:

```text
DeployStudio
QuoteBuilder
MinecraftPlatformPreview
VpsPlatformPreview
NodeExplorer
DashboardDemo
AccountPanel
StatusOverview
```

Esto evita convertir todo el sitio en una SPA cliente únicamente para tener interactividad.

## Metadata / Social previews

Next.js genera metadata mediante App Router y ahora incluye:

```text
src/app/opengraph-image.tsx
src/app/network/[node]/opengraph-image.tsx
src/app/manifest.ts
src/app/robots.ts
src/app/sitemap.ts
```

Cada ficha de nodo puede producir un preview social con ciudad, hardware, tier y precio de catálogo sin mantener imágenes manuales por región.

## Datos y pricing

Catálogo:

```text
src/lib/catalog.ts
```

Estimación:

```text
src/lib/pricing.ts
```

Los parámetros temporales siguen siendo de **catálogo/demo** hasta integrar billing real:

```ts
cpuExtraPerCore: 0.35
extraStoragePerGb: 0.015
includedStorageGb: 20
```

No deben usarse como autoridad de cobro.

## Seguridad / boundaries

- No hay Application API Key de Pterodactyl en cliente.
- Quote server-side normaliza límites y recalcula el total de catálogo.
- Cuenta demo no provisiona desde el navegador.
- Status diferencia catálogo de monitorización live.
- `/api/catalog` no expone un supuesto health state como si fuera telemetría.
- Security headers y `poweredByHeader: false` siguen activos.

Consulta `INTEGRATION.md` antes de conectar billing, auth o provisioning.

## Pendiente antes de producción

1. Auth/sesiones reales.
2. Billing como autoridad de precio.
3. Payment provider y webhooks idempotentes.
4. Capacity/stock por nodo.
5. Provisioning server-side.
6. Integración segura con Pterodactyl.
7. Observabilidad real para Status.
8. Looking Glass/Test IP.
9. Datos legales y canales reales de soporte.
10. Analytics/consent según jurisdicción.

## QA

Consulta `QA.md`. En el entorno de creación se ejecuta validación sintáctica de TS/TSX, resolución de imports locales, iconografía, Client boundaries, CSS y estructura App Router. El registry de npm no está disponible de forma funcional dentro del contenedor, por lo que el build de Next.js debe confirmarse tras `npm install` en tu máquina/VPS.
