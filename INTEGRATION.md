# NexusNodes v4 — Integration Blueprint

La UI ya está preparada para trabajar como frontend de una plataforma real. Esta guía define el boundary recomendado.

## 1. Flujo de compra

```text
Pricing UI
   │ intent
   ▼
POST /api/quote
   │ validated catalog quote
   ▼
Billing Service
   │ authoritative price + tax + stock
   ▼
Checkout / Payment
   │ signed webhook
   ▼
Order State Machine
   │ paid + idempotency key
   ▼
Provisioning Worker
   │ server-side credentials
   ▼
Pterodactyl / Hypervisor
```

### Regla crítica

Nunca provisionar porque el navegador diga `paid=true` ni porque envíe un `total`.

## 2. Quote authority

`src/lib/pricing.ts` es únicamente una implementación de catálogo para UX.

Producción debería tener algo equivalente a:

```text
POST /api/checkout/quote
→ authenticate/anonymous session
→ validate product
→ validate node
→ validate stock/capacity
→ load authoritative price rules
→ apply tax/discount/currency
→ create immutable quote id
→ return signed/opaque quote reference
```

El checkout trabaja con el `quote_id`, no con números editables por query string.

## 3. Autenticación

La UI de `/account` es deliberadamente backend-agnostic.

Opciones:

- Auth.js
- Clerk
- Supabase Auth
- sistema propio con cookies HttpOnly

Si usas un sistema propio:

- `Secure`, `HttpOnly`, `SameSite=Lax/Strict` según flujo;
- rotación de sesión;
- rate limit en login/register;
- verificación de email si aplica;
- nunca guardar contraseña en logs.

## 4. Pterodactyl

La Application API Key debe vivir únicamente en servidor/worker.

Nunca:

```text
NEXT_PUBLIC_PTERODACTYL_KEY=...
```

Sí:

```text
PTERODACTYL_APPLICATION_API_KEY=...
```

Y solo consumida desde código server-only.

### Provisioning recomendado

1. Crear/obtener customer.
2. Crear orden idempotente.
3. Confirmar pago desde webhook firmado.
4. Resolver node/egg/allocation desde backend.
5. Crear usuario Pterodactyl si no existe.
6. Crear server.
7. Guardar IDs externos.
8. Marcar orden `provisioned`.
9. Notificar al usuario.

## 5. Idempotencia

Cada webhook de pago y job de provisioning necesita una clave idempotente.

Ejemplo conceptual:

```text
payment_event_id UNIQUE
order_id UNIQUE
external_server_id UNIQUE
```

Un retry nunca debe crear dos servidores.

## 6. Capacity / Stock

No usar `status: operational` para inferir stock.

Separar:

```text
health       → ¿el nodo responde?
capacity     → ¿hay RAM/CPU/disk disponible?
commerce     → ¿se permite vender este SKU?
```

La web puede consumir una API read-only agregada.

## 7. Observabilidad

`/api/status` debe reemplazarse con un agregador server-side.

Fuentes posibles:

- Uptime Kuma
- Better Stack
- Prometheus
- health checks internos
- billing capacity

No expongas tokens de estas plataformas al navegador.

## 8. Looking Glass

Para latencia real:

- endpoint HTTP por región;
- test IP por nodo;
- medición cliente con varias muestras;
- mediana, no solo una petición;
- aclarar que browser latency no equivale exactamente a Minecraft TCP latency.

## 9. Data model mínimo

```text
users
customers
catalog_products
catalog_nodes
price_rules
quotes
orders
payments
services
external_resources
provisioning_jobs
incidents
```

## 10. Estados de orden sugeridos

```text
draft
quoted
payment_pending
paid
provisioning
active
failed
cancelled
refunded
```

No mezclar estado de pago con estado de provisioning.
