# QA — NexusNodes v5

## Resultado de la validación en el entorno de creación

Se realizaron las siguientes comprobaciones sobre la entrega final:

- **49 archivos TS/TSX** transpilados con TypeScript 5.8.3 mediante `transpileModule`: **0 errores sintácticos**.
- Resolución de imports internos `@/` y relativos: **0 referencias faltantes**.
- Scan de iconos `lucide-react`: **58 nombres usados / 0 nombres inexistentes** en el mapa `Icon`.
- Heurística de Client Components (`useState`, `useEffect`, eventos, Motion, navigation hooks): **0 boundaries faltantes**.
- Rutas internas literales: **53 hrefs / 0 rutas estáticas faltantes**.
- Anchors principales (`#main`, `#sizer`, `#composer`, `#explorer`, `#brief`) comprobados contra IDs existentes.
- Referencias heredadas a `.html`: **0**.
- Balance de llaves CSS: **0 desbalance**.
- Catálogo y pricing permanecen centralizados en `src/lib`.
- API health actualizada a `5.0.0`.
- Dynamic node pages siguen usando `generateStaticParams` + metadata dinámica.
- Open Graph root y por nodo se generan mediante `next/og`.

## Comprobación de TypeScript sin dependencias instaladas

El contenedor incluye TypeScript 5.8.3 global, pero no las dependencias npm del proyecto. Se realizó además una pasada con declaraciones QA temporales para detectar errores propios de estructura/tipos básicos.

Los únicos diagnósticos restantes de esa pasada corresponden al tipado contextual de eventos JSX (`onChange`, `onMouseDown`, etc.) que normalmente proporciona `@types/react`; al no estar instalado en el contenedor, esos eventos aparecen como `any` en los stubs temporales. No se encontraron errores sintácticos ni imports internos rotos.

Los stubs temporales **no forman parte del ZIP final**.

## Limitación del entorno: registry npm

Se intentó instalar dependencias con:

```bash
npm install --ignore-scripts --no-audit --no-fund --fetch-timeout=15000 --fetch-retries=0
```

El resultado fue:

```text
npm ERR! code EAI_AGAIN
npm ERR! syscall getaddrinfo
npm ERR! request to https://registry.npmjs.org/@types%2fnode failed
npm ERR! reason: getaddrinfo EAI_AGAIN registry.npmjs.org
```

Por esa razón **no fue posible ejecutar `next build`, `npm run typecheck` con los tipos reales ni un browser QA sobre el dev server dentro de este contenedor**.

## Validación requerida en tu máquina/VPS

Después de extraer:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Revisar especialmente:

```text
/
/minecraft
/vps
/network
/network/us-mia-r7
/pricing
/account
/status
/company
/contact
/dashboard-demo
```

Y endpoints:

```text
GET  /api/health
GET  /api/catalog
GET  /api/status
POST /api/quote
```

## Browser QA recomendado

Tamaños mínimos:

- 1440×900
- 1024×768
- 768×1024
- 390×844

Interacciones a probar:

- Mega menu Products.
- `Ctrl/⌘ + K` command palette.
- Quick Deploy Studio.
- Smart Configurator + `Validate server-side`.
- Minecraft mode switch.
- VPS workload switch.
- Node Explorer + Region Advisor.
- Nexus Control: Overview / Console / Files / Backups / Automations / Network.
- Login/Register y password strength.
- Contact brief + clipboard.
- Status fetch a `/api/status`.

Si el build real devuelve un error de versión o typings de una dependencia, corrígelo sobre esta v5 en vez de volver a la arquitectura estática.
## 5.0.1 Vercel hotfix

The Vercel build for v5.0.0 compiled successfully and then failed TypeScript checking because `src/app/layout.tsx` referenced `siteUrl()` without importing it. v5.0.1 adds the missing import. A local dependency-complete `next build` still cannot be executed in this container because external npm registry access is unavailable, so the post-fix production build should be confirmed by Vercel.

