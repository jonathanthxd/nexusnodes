# NexusNodes v4 — Biggest Update / Next.js Edition

NexusNodes v4 reconstruye por completo la entrega v3 sobre **Next.js 16.3 + React 19.3 + TypeScript**. Ya no es una colección de páginas HTML: ahora es una aplicación con App Router, Server Components, Client Components aislados, Route Handlers, metadata nativa, rutas dinámicas y una base lista para integrarse con autenticación, billing, observabilidad y provisioning.

## Stack

- Next.js 16.3.x — App Router
- React 19.3
- TypeScript estricto
- CSS propio sin Tailwind ni librerías UI
- `next/image` para assets
- Server Components por defecto
- Client Components solo para navegación, configuradores y demos
- `output: "standalone"` para self-hosting / Docker

## Páginas

```text
/                       Home / Nexus Launchpad
/minecraft              Minecraft Hosting + Minecraft Sizer
/vps                    Cloud VPS + Deploy Composer
/network                Node Explorer + Region Advisor
/network/[node]         Ficha individual de cada nodo
/pricing                Smart Sizer + configurador completo
/account                Login / Register UX + order context
/status                 Status frontend + /api/status
/company                Principios + platform map
/contact                Rutas de contacto + brief builder
/dashboard-demo         Demo interactiva de Nexus Control
```

## API demo

### `POST /api/quote`

Normaliza recursos y vuelve a calcular una estimación en servidor.

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

Importante: **esto sigue siendo lógica de catálogo**, no billing real. Producción debe consultar precios, stock, descuentos, impuestos y reglas desde la fuente de autoridad real.

### `GET /api/status`

Devuelve el snapshot configurado de servicios/nodos. La propia UI marca que no es telemetría live.

## Desarrollo

Requisitos recomendados:

- Node.js 20.9+ (Node 22 recomendado)
- npm reciente

```bash
npm install
npm run dev
```

Abre:

```text
http://localhost:3000
```

Build:

```bash
npm run typecheck
npm run build
npm start
```

## Variables

Copia `.env.example` a `.env.local` cuando empieces a integrar servicios reales.

```env
NEXT_PUBLIC_SITE_URL=https://nexusnodes.lat
PTERODACTYL_BASE_URL=https://panel.nexusnodes.lat
PTERODACTYL_APPLICATION_API_KEY=
BILLING_WEBHOOK_SECRET=
```

Nunca expongas `PTERODACTYL_APPLICATION_API_KEY` ni secretos de billing mediante variables `NEXT_PUBLIC_*`.

## Arquitectura

```text
Browser
  │
  ▼
Next.js App Router
  ├─ Server Components        catálogo / contenido / metadata
  ├─ Client Components        configuradores / UX interactiva
  └─ Route Handlers           boundary inicial de APIs
             │
             ▼
        Backend domain
  ├─ Identity / sessions
  ├─ Billing / invoices
  ├─ Payments / webhooks
  ├─ Stock / capacity
  ├─ Observability
  └─ Provisioning
             │
             ▼
     Pterodactyl / Nodes
```

Consulta `INTEGRATION.md` para el flujo recomendado de producción.

## Fuente de datos

El catálogo está centralizado en:

```text
src/lib/catalog.ts
```

Y la lógica de estimación en:

```text
src/lib/pricing.ts
```

Esto reemplaza los datos repetidos que existían en la versión HTML.

## Datos del catálogo heredados

| Nodo | Región | CPU | Minecraft | VPS |
|---|---|---|---:|---:|
| DAL-01 | Dallas | Intel | $0.50/GB | $0.45/GB |
| MIA-01 | Miami | Ryzen 7 3700X | $0.95/GB | $0.855/GB |
| SCL-01 | Santiago | Intel | $0.95/GB | $0.855/GB |
| ARG-01 | Argentina | Intel Xeon | $1.00/GB | $0.90/GB |
| MIA-02 | Miami Performance | Ryzen 9 5950X | $1.50/GB | $1.35/GB |

Confirma estos datos antes de producción.

## Pricing demo

Los parámetros temporales siguen centralizados:

```ts
cpuExtraPerCore: 0.35
extraStoragePerGb: 0.015
includedStorageGb: 20
```

No los uses como autoridad de cobro. El total del navegador debe considerarse únicamente intención de compra.

## Seguridad incluida en la base

- No hay secretos administrativos en componentes de cliente.
- El endpoint de quote normaliza límites server-side.
- Cabeceras básicas de seguridad en `next.config.ts`.
- `poweredByHeader` desactivado.
- Separación explícita entre UI, billing y provisioning.
- Cuenta demo no envía credenciales a Pterodactyl.
- Status evita presentar datos hardcoded como monitorización live.

## Pendiente antes de producción

1. Sistema real de identidad/sesión.
2. Billing como autoridad de precio.
3. Payment provider + webhooks idempotentes.
4. Capacity/stock por nodo.
5. Provisioning server-side.
6. Integración Pterodactyl con Application API Key solo en servidor.
7. Observabilidad real para Status.
8. Looking Glass/Test IP para latencia.
9. Textos legales reales.
10. Analytics/consent según la jurisdicción aplicable.

## QA de esta entrega

La entrega se valida estructuralmente y a nivel sintáctico dentro del entorno de creación. El entorno utilizado no permite instalar paquetes desde npm, así que `next build` debe ejecutarse después de `npm install` en tu máquina/VPS. Consulta `QA.md` para el detalle exacto.

## Docker / VPS

La configuración usa `output: "standalone"`, así que también se incluye una imagen multi-stage:

```bash
docker compose up -d --build
```

Health endpoint:

```text
GET /api/health
```

El contenedor ejecuta un health check contra ese endpoint.
