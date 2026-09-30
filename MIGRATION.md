# Migration map — v3 static → v4 Next.js

| v3 | v4 |
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
| static manifest/sitemap | Next.js route conventions |

## Qué no se migró literalmente

No se copiaron scripts imperativos ni HTML repetido. Se reescribieron como componentes y módulos tipados para evitar mantener dos arquitecturas a la vez.

## Assets preservados

- logo mark
- modelado artwork
- PWA icons
- Apple touch icon

## Compatibilidad conceptual

Los nodos y precios base heredados se conservaron como catálogo, pero ahora viven en una única fuente tipada.
