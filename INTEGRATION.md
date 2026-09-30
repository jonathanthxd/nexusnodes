# NexusNodes v3 — Backend Integration Contract

Este documento define una frontera recomendada entre la web pública y los sistemas privados. Es una guía de integración, no un backend implementado.

## Principio

El navegador expresa **intención**. El servidor decide y valida **verdad**.

Nunca confíes en:

- precio calculado en JavaScript;
- node ID enviado por el cliente sin validar stock;
- RAM/CPU/storage fuera de límites server-side;
- estado de pago enviado por el cliente;
- IDs de Pterodactyl enviados como autoridad;
- roles/permisos contenidos en el frontend.

## 1. Catálogo público

```http
GET /api/catalog
```

Respuesta sugerida:

```json
{
  "version": "2026-09-30",
  "products": ["minecraft", "vps"],
  "nodes": [],
  "pricing": {},
  "limits": {}
}
```

Esto permite sustituir gradualmente `assets/js/data.js` por datos de billing sin rehacer la UI.

## 2. Quote autoritativo

```http
POST /api/quotes
Content-Type: application/json
```

```json
{
  "product": "minecraft",
  "node": "us-mia-r7",
  "ram": 8,
  "cores": 2,
  "storage": 40,
  "workload": "plugins"
}
```

El backend debe devolver:

```json
{
  "quote_id": "...",
  "currency": "USD",
  "subtotal": 0,
  "tax": 0,
  "total": 0,
  "expires_at": "...",
  "node": "us-mia-r7",
  "capacity_confirmed": true
}
```

El checkout debería usar `quote_id`, no un total enviado por query string.

## 3. Registro

```http
POST /api/auth/register
```

La política de password, verificación de email, rate limit y creación de identidad pertenecen al servidor.

## 4. Crear orden

```http
POST /api/orders
Authorization: session
Idempotency-Key: <uuid>
```

Ejemplo:

```json
{
  "quote_id": "...",
  "payment_method": "..."
}
```

El backend vuelve a validar quote, expiración, stock y usuario antes del pago.

## 5. Pago

- Crea sesiones/intenciones de pago server-side.
- Verifica webhooks con la firma del proveedor.
- No provisiona por el redirect del navegador.
- Provisiona únicamente después de un evento de pago validado/idempotente.

## 6. Provisioning / Pterodactyl

Flujo recomendado:

```text
Order paid
   ↓
Provisioning job
   ↓
Capacity lock / node selection
   ↓
Pterodactyl Application API (server-side)
   ↓
Persist external server id
   ↓
Order active
```

La Application API Key vive únicamente en secrets del backend.

## 7. Capacity

```http
GET /api/capacity
```

Una respuesta pública puede limitarse a estados seguros:

```json
{
  "nodes": [
    {"id":"us-mia-r7","status":"available"},
    {"id":"us-mia-r9","status":"limited"}
  ]
}
```

No publiques métricas internas sensibles si no hacen falta para comprar.

## 8. Status

```http
GET /api/status
```

Endpoint público read-only y cacheable. Puede agregar monitorización sin exponer tokens del proveedor.

## 9. Looking Glass

Idealmente cada región expone un destino de test no sensible:

```json
{
  "node": "us-mia-r7",
  "test_host": "...",
  "http_probe": "..."
}
```

No inventes latencia. Muéstrala únicamente después de una medición real y deja claro que la ruta puede variar.

## 10. Seguridad mínima

- TLS obligatorio.
- Cookies `Secure`, `HttpOnly`, `SameSite` según arquitectura.
- CSRF para flujos basados en cookies cuando aplique.
- Rate limit y anti-abuse.
- Validación de schema server-side.
- Idempotency en órdenes/pagos/provisioning.
- Secrets solo en servidor.
- Logs sin passwords/tokens.
- Webhooks con firma.
- CSP/headers de seguridad en CDN/origin.
- Auditoría de permisos del panel y API keys con mínimo privilegio.
