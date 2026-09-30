# NexusNodes v3 — Super Update

NexusNodes v3 convierte la base estática del proyecto en una web de hosting mucho más cercana a un producto real: visualmente más profunda, con configuradores útiles, datos centralizados y una separación clara entre la UI pública y las operaciones que deben vivir en backend.

La entrega sigue siendo deliberadamente ligera: **HTML + CSS + JavaScript vanilla, sin build step obligatorio**.

## Qué incluye v3

### Experiencia global

- Design system oscuro/premium unificado.
- Header sticky con navegación desktop y drawer móvil.
- Command Palette con `Ctrl/⌘ + K`.
- Barra de progreso de lectura.
- Motion y microinteracciones con fallback y `prefers-reduced-motion`.
- Toasts, estados de foco y progressive enhancement.
- SEO base, OpenGraph, Twitter Card, JSON-LD, sitemap y manifest.
- Iconos PWA 192/512 y Apple Touch Icon.
- Responsive probado desde mobile hasta desktop wide.

### Home

- Hero completamente reconstruido.
- **Nexus Launchpad** interactivo para Minecraft/VPS.
- Cambio de producto, nodo y estimación visual.
- Flujo hacia Smart Sizing/configurador.
- Secciones de producto, control plane, principios de plataforma y network.
- Consola visual de actividad como preview, sin fingir telemetría real.

### Minecraft

- Hero de producto dedicado.
- Visual de servidor/players/TPS/RAM.
- **Minecraft Sizer** por workload, jugadores e intensidad.
- Recomendación inicial de RAM, CPU, storage y nodo.
- Matriz de software: Paper, Fabric, Forge/NeoForge, Proxy, Bedrock y Java.
- Flujo de migración y operación con Pterodactyl.

### VPS

- Hero tipo cloud console.
- **Deploy Composer** por distribución + workload.
- Ubuntu, Debian y AlmaLinux como opciones visuales configurables.
- Workloads y presets de recursos.
- Arquitectura visual de una instancia y comparación regional.

### Network

- Visual global de nodos.
- **Node Explorer** interactivo.
- Comparación de hardware/tarifas por nodo.
- **Region Advisor** basado en audiencia y prioridad, sin inventar milisegundos de ping.
- Separación explícita entre datos de catálogo y futuras señales live: Looking Glass, stock/capacity y monitoring.

### Pricing / configurador

- **Smart Sizer** para Minecraft y VPS.
- Workload, audiencia, intensidad y jugadores.
- Configurador manual de RAM, CPU, storage y nodo.
- Presets y comparación de coste entre nodos.
- Breakdown visual de coste.
- Configuración guardable en `localStorage`.
- Configuración compartible por URL.
- Contexto de pedido preservado al pasar a Cuenta.
- El precio se vuelve a calcular desde los parámetros conocidos; no se confía en el `estimate` enviado por query string.

### Cuenta

- UX de login y registro rehecha.
- Order context visible cuando se llega desde el configurador.
- Password strength meter.
- Login estático redirige al panel oficial sin procesar la contraseña en esta web.
- Registro visual listo para conectarse a un backend seguro.

### Status

- Vista de servicios y nodos.
- Señalización explícita de que el estado actual es manual/configurado.
- Arquitectura visual preparada para sustituirse por una API read-only de observabilidad.

### Contacto

- Rutas claras para cliente, compra y necesidades especiales.
- **Pre-sales Brief Builder** local: genera un resumen copiable sin transmitir datos.

## Páginas

```text
index.html       Home
minecraft.html   Minecraft Hosting
vps.html         VPS
network.html     Network / Nodes
planes.html      Smart Sizer + Pricing + Configurator
cuenta.html      Login / Register UX
status.html      Status
empresa.html     Empresa / arquitectura
contacto.html    Contacto / pre-sales brief
404.html         Error page
```

## Estructura

```text
assets/
  css/
    styles.css
  js/
    data.js           Datos, precios, nodos, presets, workloads
    app.js            Shell global, nav, command palette, motion, FAQ
    home.js           Launchpad y home interactions
    pricing.js        Smart Sizer + configurador + share/save
    network.js        Node Explorer + Region Advisor
    product-pages.js Minecraft Sizer + VPS Composer + renders comunes
    account.js        Cuenta, contexto de pedido y password meter
    status.js         Status renderer
    contact.js        Pre-sales brief builder
    company.js        Datos de empresa/network
  favicon.svg
  icon-192.png
  icon-512.png
  apple-touch-icon.png
  SinFondo.png
  Modelado.png
```

## Probar localmente

No hay dependencias de Node ni build obligatorio.

```bash
cd NexusNodes
python -m http.server 8080
```

Después abre:

```text
http://localhost:8080/
```

Usar un servidor HTTP local es preferible a abrir `file://` porque reproduce mejor el entorno de producción.

## Fuente única de datos

El catálogo frontend vive en:

```text
assets/js/data.js
```

Nodos actuales de la entrega:

| Nodo | Región | Procesador | Minecraft | VPS |
|---|---|---|---:|---:|
| DAL-01 | Dallas | Intel | $0.50/GB | $0.45/GB |
| MIA-01 | Miami | Ryzen 7 3700X | $0.95/GB | $0.855/GB |
| SCL-01 | Santiago | Intel | $0.95/GB | $0.855/GB |
| ARG-01 | Argentina | Intel Xeon | $1.00/GB | $0.90/GB |
| MIA-02 | Miami Performance | Ryzen 9 5950X | $1.50/GB | $1.35/GB |

Estos valores proceden del catálogo que recibió esta iteración y deben confirmarse antes de producción.

## Importante: CPU y storage

La lógica de estimación incluye parámetros configurables:

```js
cpuExtraPerCore: 0.35,
extraStoragePerGb: 0.015,
includedStorageGb: 20
```

Son **parámetros de frontend para la experiencia del configurador**, no una sustitución del billing real.

Antes de cobrar:

1. El backend debe recalcular el precio.
2. Debe validar producto, nodo, stock y límites permitidos.
3. Debe ignorar cualquier total enviado por el navegador.
4. Debe devolver el precio final autorizado por billing.

## Cuenta, billing y Pterodactyl

Nunca pongas una Application API Key de Pterodactyl, secretos de pago, claves de monitorización o credenciales administrativas en `assets/js/*`.

El frontend puede enviar una intención de pedido, pero el servidor debe encargarse de:

- autenticación y sesión;
- rate limits;
- CSRF cuando aplique;
- validación server-side;
- precio final;
- pagos y webhooks;
- idempotencia;
- provisioning;
- llamadas administrativas a Pterodactyl;
- logging seguro.

Consulta `INTEGRATION.md` para un contrato de integración recomendado.

## Status / observabilidad

La página de Status **no finge monitorización live**. Los estados visibles son datos configurados hasta conectar una fuente real.

Para producción puedes exponer una API pública de solo lectura que agregue datos de, por ejemplo:

- Uptime Kuma;
- Better Stack;
- Prometheus/Grafana a través de una API propia;
- health checks internos;
- capacity/stock del sistema de billing/provisioning.

No expongas tokens del monitor al navegador.

## Latencia y Region Advisor

El Region Advisor usa una heurística de audiencia para sugerir un punto de partida, pero **no muestra ping inventado**.

Si quieres latencia real, implementa un Looking Glass/Test IP por nodo y mide desde el cliente. La interfaz de Network ya deja espacio para esa integración.

## Despliegue recomendado

1. Confirmar nodos, hardware y precios en `data.js`.
2. Sustituir multiplicadores de CPU/storage por billing real.
3. Conectar cuenta y provisioning al backend.
4. Integrar stock/capacity por nodo.
5. Conectar Status a observabilidad read-only.
6. Añadir Looking Glass si existe infraestructura para ello.
7. Servir `/assets/` con cache largo e immutable cuando uses filenames versionados.
8. Activar Brotli/Gzip y HTTP/2 o HTTP/3 en CDN/origin.
9. Definir CSP y headers de seguridad en el servidor/CDN.
10. Añadir analytics/consent solamente si de verdad se van a utilizar.

## Validación realizada en esta entrega

- Parseo de todos los JavaScript con `node --check`.
- Comprobación automática de referencias locales HTML/CSS/JS/assets.
- Render headless de las 10 rutas.
- Desktop 1440 px y mobile 390 px.
- Sin overflow horizontal detectado en las rutas probadas.
- Sin errores de consola/page JS en la pasada final.
- Navegación móvil y componentes principales revisados.
- Smart Sizer/configuración compartible verificados.
- Minecraft Sizer, Node Explorer, Cuenta y Brief Builder renderizados.

Los tests de navegador son una validación del frontend estático; no sustituyen pruebas de billing/provisioning cuando esos sistemas se conecten.
