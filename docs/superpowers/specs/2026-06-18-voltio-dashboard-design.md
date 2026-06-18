# Voltio Dashboard — Spec de diseño
**Fecha:** 2026-06-18  
**Estado:** Aprobado

---

## Resumen

App web privada en `dashboard.voltiodev.com` que centraliza métricas de múltiples proyectos en un solo lugar. Arquitectura multi-proyecto y multi-usuario: cada usuario gestiona sus propios proyectos con sus propias credenciales. Por ahora de uso personal (Benito), pero diseñada para escalar a múltiples usuarios.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Auth | NextAuth v5 + Google Provider |
| Base de datos | Supabase (Postgres) |
| UI | Tailwind CSS + shadcn/ui |
| Deploy | Vercel — proyecto separado |
| Dominio | dashboard.voltiodev.com |

---

## Arquitectura

### Estructura de carpetas

```
voltio-dashboard/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← sidebar + auth guard
│   │   ├── page.tsx                ← redirect al primer proyecto
│   │   ├── [projectId]/
│   │   │   ├── page.tsx            ← overview
│   │   │   └── settings/page.tsx   ← configuración del proyecto
│   │   └── projects/new/page.tsx   ← wizard nuevo proyecto
│   └── api/
│       ├── ga4/route.ts
│       ├── search-console/route.ts
│       └── vercel/route.ts
├── components/
│   ├── sidebar.tsx
│   ├── kpi-card.tsx
│   ├── events-table.tsx
│   ├── keywords-table.tsx
│   └── period-selector.tsx
└── lib/
    ├── supabase.ts
    ├── auth.ts
    ├── ga4.ts
    ├── search-console.ts
    └── vercel-analytics.ts
```

### Flujo de datos

Las credenciales viven en Supabase (encriptadas). Las API routes de Next.js las leen del lado del servidor, llaman a las APIs externas, y devuelven los datos al cliente. Las credenciales nunca tocan el browser.

---

## Base de datos — Supabase

```sql
-- Usuarios autorizados
users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
)

-- Proyectos por usuario
projects (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  name text NOT NULL,
  slug text NOT NULL,
  color text DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now()
)

-- Credenciales por fuente por proyecto
project_sources (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects(id),
  source text NOT NULL, -- 'ga4' | 'search_console' | 'vercel' | 'clarity'
  credentials jsonb,    -- encriptado, varía por fuente
  created_at timestamptz DEFAULT now()
)
```

---

## Fuentes de datos

| Fuente | API | Credencial necesaria |
|---|---|---|
| GA4 | Google Analytics Data API v1 | Property ID + Service Account JSON key |
| Search Console | Google Search Console API v1 | Mismo Service Account + URL de la propiedad |
| Vercel Analytics | Vercel REST API | API Token + Project ID |
| Clarity | — (sin API pública) | URL directa al proyecto |

---

## Pantallas

### 1. Login (`/login`)
- Logo de Voltio centrado
- Botón "Entrar con Google"
- Si el email no está en `users`, muestra error "Acceso no autorizado"

### 2. Layout dashboard (`layout.tsx`)
- Sidebar izquierdo fijo con lista de proyectos del usuario
- Proyecto activo resaltado
- Botón "+" para crear proyecto nuevo
- Avatar del usuario + botón de logout abajo

### 3. Overview del proyecto (`/[projectId]`)

Una sola pantalla con selector de período (última semana / último mes / últimos 3 meses).

**Bloque 1 — Tráfico (Vercel Analytics)**
- Visitantes únicos
- Pageviews

**Bloque 2 — Engagement (GA4 · scroll depth)**
- % usuarios que llegaron al 25%
- % usuarios que llegaron al 50%
- % usuarios que llegaron al 75%
- % usuarios que llegaron al 100%

**Bloque 3 — Conversiones (GA4 · eventos)**
- `cta_click` hero — "Quiero resolverlo"
- `cta_click` proceso — "Diagnóstico gratis"
- `whatsapp_click` banner de contacto
- `whatsapp_click` footer
- `whatsapp_click` botón flotante
- `calendly_click` sección agenda
- `calendly_click` banner de contacto
- `email_click` banner de contacto
- `email_click` footer
- `nav_click` → Productos

Cada métrica muestra el valor del período y la comparación vs el período anterior (flecha verde/roja + %).

**Bloque 4 — Búsqueda orgánica (Search Console)**
- Impresiones totales
- Clicks totales
- CTR promedio
- Posición promedio en Google
- Tabla con top 5 keywords (keyword · clicks · impresiones · posición)

**Accesos rápidos**
- Botón → Clarity
- Botón → GA4
- Botón → Search Console

### 4. Configuración del proyecto (`/[projectId]/settings`)
- Editar nombre y color
- Por cada fuente: form de credenciales + botón "Verificar conexión"
- Botón eliminar proyecto (con confirmación)

### 5. Nuevo proyecto (`/projects/new`)
- Paso 1: nombre y color
- Paso 2: credenciales por fuente (todas opcionales, se pueden agregar después)
- Verificación de cada fuente antes de guardar

---

## Seguridad

- Auth guard en el layout del dashboard — cualquier ruta bajo `(dashboard)` requiere sesión activa
- Las credenciales en Supabase se guardan encriptadas con una clave en variables de entorno de Vercel
- Cada usuario solo puede ver y editar sus propios proyectos (Row Level Security en Supabase)
- Las API keys nunca se exponen al cliente

---

## Variables de entorno necesarias

```env
# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://dashboard.voltiodev.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Encriptación de credenciales
ENCRYPTION_KEY=
```

---

## Fuera de scope (por ahora)

- Gráficos de series de tiempo (líneas, barras) — solo números y tablas en v1
- Notificaciones o alertas automáticas
- Export a PDF o CSV
- Modo oscuro
