# Changelog

## 5.0.1 — Vercel TypeScript hotfix

- Fixed production type-check failure in `src/app/layout.tsx` by importing `siteUrl` from `@/lib/utils`.
- Aligned `tsconfig.json` with the changes Next.js 16 was applying automatically during Vercel builds (`jsx: react-jsx` and `.next/dev/types/**/*.ts`).
- Pinned the deployment engine to Node `20.x` to avoid automatic major Node upgrades on Vercel.
- Re-ran static diagnostics for unresolved local identifiers after the fix; no remaining `TS2304` diagnostics were found.

## 5.0.0 — Next.js Super UI Update

### Design system

- Rework visual completo sobre la arquitectura Next.js de v4.
- `lucide-react` sustituye los iconos SVG internos.
- Motion for React para transiciones y microinteracciones en client islands.
- Nueva jerarquía de superficies, bento layouts, halos, grids y estados de foco.
- Mega menu de productos, navegación móvil y command palette renovados.
- Responsive refinado para desktop, tablet y mobile.

### Home

- Hero reconstruido alrededor de **Quick Deploy Studio**.
- Selector Minecraft/VPS, presets, RAM, vCPU, NVMe y región.
- Estimación animada conectada al mismo pricing catalog.
- Product bento asimétrico.
- Preview interactivo de Nexus Control.
- Network showcase y deployment flow.

### Nexus Control

- Dashboard demo completamente nuevo.
- Sidebar, topbar y server controls.
- Overview con KPIs, chart y activity feed.
- Console interactiva.
- File manager.
- Backups.
- Automations / schedules.
- Network view.
- Estados Start / Restart / Stop simulados explícitamente como demo.

### Configurator

- Pricing convertido en una experiencia de 3 columnas.
- Smart Sizer integrado.
- Recursos y nodos con controles visuales.
- Order summary sticky.
- Precio animado.
- Guardado local y share URL.
- Validación server-side mediante `/api/quote` preservada.

### Minecraft

- Hero interactivo propio.
- Modos SMP, Modded y Network.
- Topología de servicios, player context y recursos.
- Minecraft Sizer preservado e integrado en el nuevo sistema visual.
- Operations, software ecosystem y migration flow rehechos.

### VPS

- Hero interactivo propio.
- Workloads Web/API, Database y Full Stack.
- Compute/storage/usage visual.
- Deploy Composer integrado.
- Provisioning path y workload cards nuevos.

### Network

- Node Explorer rehecho como herramienta visual.
- Hardware, rates, capabilities y Region Advisor en una sola superficie.
- Fichas dinámicas dejan de presentar catálogo como health live.
- Nuevo `GET /api/catalog` público, separado de status/observabilidad.

### Identity / Status

- Nexus Identity renovado con order context, login/register animados y password strength.
- Status rediseñado para distinguir explícitamente snapshot configurado y observabilidad live.

### Company / Contact

- Company recibe un Platform Architecture explorer interactivo.
- Contact recibe rutas de intención y Pre-sales Brief Builder renovado con Motion.

### Next.js

- Open Graph generado por código con `next/og`.
- Open Graph dinámico por `/network/[node]`.
- `loading.tsx` convertido en skeleton de streaming visual.
- `error.tsx` y `not-found.tsx` mantienen integración nativa del App Router.
- Metadata de rutas preservada.
- API health reporta versión 5.0.0.

## 4.0.0 — Biggest Update / Next.js

- Migración total de HTML/CSS/JS estático a Next.js App Router.
- TypeScript estricto, Server Components y Client Components aislados.
- Route Handlers para quote/status/health.
- Dynamic routes por nodo.
- Metadata, robots, sitemap y manifest mediante convenciones Next.js.
- Standalone output para self-hosting.
- Smart Sizer, Node Explorer, Nexus Control v1, Minecraft Sizer y VPS Composer.
