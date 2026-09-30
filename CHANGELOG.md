# Changelog

## 4.0.0 — Biggest Update / Next.js

### Arquitectura

- Migración total de HTML/CSS/JS estático a Next.js App Router.
- TypeScript estricto.
- Server Components por defecto.
- Client Components aislados para interacción.
- Route Handlers para quote y status.
- Dynamic routes para nodos.
- Metadata, robots, sitemap y manifest mediante convenciones Next.js.
- Standalone output para self-hosting.
- Error boundary, loading UI y 404 nativos.

### Diseño / UX

- Home reconstruida con Nexus Launchpad.
- Product bento Minecraft/VPS.
- Control plane visual.
- Network visual interactiva.
- Command palette global `Ctrl/⌘ + K`.
- Header sticky + navegación móvil.
- Responsive completo y reduced motion.

### Minecraft

- Página dedicada nueva.
- Minecraft Sizer por workload, jugadores, audiencia y carga pesada.
- Software matrix.
- Operations feature set.
- Flujo visual de migración.

### VPS

- Deploy Composer por distro, workload y nodo.
- Use-case matrix.
- Arquitectura frontend → billing → provisioning.

### Network

- Node Explorer.
- Region Advisor.
- Fichas dinámicas `/network/[node]`.
- Tabla comparativa.
- Bloques preparados para Looking Glass, health checks y capacity API.

### Pricing

- Smart Sizer.
- Configurador RAM/CPU/NVMe/nodo.
- Breakdown de coste.
- Guardado local y links compartibles.
- Validación server-side mediante `/api/quote`.
- Order context hacia `/account`.

### Cuenta

- Login/register UX.
- Password strength.
- Order context recalculado.
- Sin secretos ni provisioning desde el navegador.

### Dashboard Demo

- Nuevo concepto `Nexus Control`.
- Overview, Console, Files, Backups y Schedules interactivos.
- Estado Start/Restart/Stop simulado.

### Status

- `/api/status` demo.
- UI explícitamente diferenciada de observabilidad real.

### Seguridad / Calidad

- Security headers básicos.
- `poweredByHeader: false`.
- Configuraciones y catálogo tipados.
- No se confía en precio enviado por query string.
