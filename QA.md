# QA — NexusNodes v4

## Validaciones realizadas en el entorno de creación

- Estructura App Router revisada.
- TS/TSX parseado mediante el compilador TypeScript local, sin emitir archivos.
- Imports relativos/aliases revisados estructuralmente.
- Rutas públicas comprobadas contra la estructura de `src/app`.
- Balance básico de llaves CSS validado.
- Assets requeridos presentes en `public/`.
- ZIP final validado con `unzip -t`.

## Limitación del entorno

El contenedor de creación no tiene acceso funcional al registry de npm; `npm install`/`npx` agotan el timeout. Por eso no es posible ejecutar aquí un `next build` real ni un browser QA sobre el dev server.

Las versiones del proyecto se fijaron a:

```text
Next.js 16.3.8
React 19.3.0
TypeScript 5.8.x
```

En tu equipo:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Si aparece cualquier incompatibilidad puntual de patch version, compárteme el log completo de `npm run build` y la corregimos sobre esta misma base.
