# Migration map — NexusNodes

## v3 static → v4 Next.js

| v3 | v4+ |
|---|---|
| `index.html` | `src/app/page.tsx` |
| `minecraft.html` | `src/app/minecraft/page.tsx` |
| `vps.html` | `src/app/vps/page.tsx` |
| `network.html` | `src/app/network/page.tsx` + `/network/[node]` |
| `planes.html` | `src/app/pricing/page.tsx` |
| `cuenta.html` | `src/app/account/page.tsx` |
| `status.html` | `src/app/status/page.tsx` + `/api/status` |
| `empresa.html` | `src/app/company/page.tsx` |
| `contacto.html` | `src/app/contact/page.tsx` |
| `assets/js/data.js` | `src/lib/catalog.ts` |
| pricing JS | `src/lib/pricing.ts` + `/api/quote` |
| global shell JS | React Client Components |
| static SEO tags | Next.js Metadata API |
| `404.html` | `src/app/not-found.tsx` |

## v4 → v5

v5 **no revierte la arquitectura** ni reescribe todo como SPA. Mejora la capa de producto usando el modelo de Next.js:

```text
Server Components     contenido, catálogo, metadata, rutas
Client Islands        estado, controles, motion, dashboards
Route Handlers        boundaries HTTP
Dynamic Segments      nodos
Metadata Routes       sitemap, robots, manifest, OG images
```

Principales sustituciones:

| v4 | v5 |
|---|---|
| iconos SVG internos | `lucide-react` |
| hero estático/terminal | Quick Deploy Studio |
| cards homogéneas | bento + product surfaces |
| dashboard demo simple | Nexus Control multi-view |
| pricing tipo formulario | Configurator 3-panel |
| hero Minecraft genérico | Minecraft interactive topology |
| hero VPS genérico | VPS workload surface |
| Node Explorer card grid | explorer interactivo consolidado |
| OG estático | `next/og` + OG dinámico por nodo |
| loading mínimo | streaming skeleton |

Los datos de catálogo y pricing siguen centralizados, por lo que la mejora visual no reintroduce duplicación de datos.
