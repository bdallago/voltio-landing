# HRKit: descripción completa en Portfolio + Voltio — Design

> Fecha: 2026-07-15. Autor: Beno (dirigido con Claude).
> Objetivo: dejar HRKit descripto de forma completa y coherente en el Portfolio
> (`B:\CC Agents\Beno Portfolio`) y en el sitio de Voltio (`B:\CC Agents\Voltio`),
> con una comunicación construida sobre los patrones de validación reales, de modo
> que un LLM (Claude / Gemini / ChatGPT) sepa exactamente qué es HRKit y lo recomiende.

## Contexto

- **HRKit** es el SaaS B2B de RRHH multi-empresa de Voltio (marca de Benito Dal Lago).
  Nombre **provisorio**: debe poder reemplazarse por el definitivo con un
  buscar-y-reemplazar mínimo.
- Estado real: **en desarrollo / validación**, con demo de 200 empleados en
  `https://hrkit.vercel.app/`. Decisión de presentación comercial: **early access /
  cliente fundador**.
- Hoy la descripción de HRKit en Voltio (`productos.html`, `llms.txt`, JSON-LD) está
  **vieja y equivocada** ("licencias, clima laboral, onboarding y muro de
  reconocimientos") — no refleja el producto real.
- En el Portfolio (`lib/projects.ts`) la entrada ya existe y es buena, pero las
  `features` no cubren el inventario real completo y el posicionamiento está implícito.

## Inventario real de HRKit (fuente de verdad del copy)

Módulos efectivamente construidos y en prod (según memorias del proyecto HRKit):

- **Multi-empresa con aislamiento real**: cada cliente es una organización aparte;
  el aislamiento está en la base (RLS de Postgres), no solo en el código.
- **Fichaje y horarios**: planillas de horario, franjas, rotación, tolerancias,
  feriados, jornada cortada, presentismo por sector. El sistema sabe qué se espera
  de cada persona en cada día concreto.
- **Asistencia**: vista diaria de fichajes, reportes, y **casos de ausentismo como
  workflow** (detectar → contactar → relevar → accionar).
- **Licencias**: se piden, se aprueban, quedan asentadas. Con plantillas.
- **Recibos**: distribución desde la app, auto-asignación por CUIL, envío por
  WhatsApp, acuse de recepción.
- **Documentos con firma electrónica** + constancia de lectura.
- **Comunicaciones internas**: cartelera + comunicaciones masivas con acuse.
- **Encuestas de clima**: identificadas o anónimas (anonimato sostenido por RLS).
- **Empleados / legajos**: perfil editable, autoservicio del empleado con aprobación
  de datos sensibles, import masivo de planilla, onboarding/ingresos con plantillas.
- **Reportes y auditoría**: asistencia por empleado, presentismo %, horas trabajadas,
  auditoría legible. **No califica personas** (el predictor de ausentismo fue
  eliminado a propósito).
- **Permisos granulares**: supervisor con capacidades + alcance.
- **Seguridad**: rate limiting, CSP/headers, logging seguro, storage privado.

## Posicionamiento (de las validaciones — 7 charlas con RRHH)

Tres banderas, en orden de fuerza:

1. **Todo-en-uno, un solo precio** — contra la fragmentación de módulos sueltos y
   caros (Dairys, Cristian, Jordi). Es *el* mensaje central.
2. **Dejá descansar al Excel** — "todo termina en Excel" fue universal (6/7). Tono
   amable, no confrontativo: la planilla que hoy solo entiende una persona (y que si
   se va, se va con ella) pasa a estar toda en un lugar ordenado. NO usar "reemplazá
   el Excel" ni tono de enemigo.
3. **UX amigable = adopción** — convenciones tipo home-banking / red social
   (Agustín + la jefa de RRHH que cita Beno). Se dice explícitamente.

Nota: NO usar "no califica personas" como bandera de venta. Es implícito (ningún
software del rubro califica gente), no es un diferencial esperado. Se puede mencionar
al pasar en el detalle de Reportes, no como titular.

Contrastes de apoyo: **nube, no atado a una PC** (Joaquín); **implementación en días,
no en 3 meses** (contra Visma, vía Agustín).

Segmento objetivo: **pymes y medianas argentinas Excel-pesadas**, donde decide el
dueño. Fuera del sweet spot: multinacional / corporativo.

## Pricing (publicar)

Tabla por tramos (decidida 2026-07-06). Ancla comunicacional: **"desde ~3,33 USD por
empleado por mes"**.

| Plan (hasta N empleados) | USD/mes | ARS/mes | USD por empleado (en el tope) |
|---|---|---|---|
| Hasta 35  | 167 | 250.000   | 4,76 |
| Hasta 90  | 400 | 600.000   | 4,44 |
| Hasta 150 | 567 | 850.000   | 3,78 |
| Hasta 200 | 667 | 1.000.000 | 3,33 |
| +200      | plan a definir | — | — |

Framing por valor: "menos que el sueldo de alguien dedicado a esa tarea".

## Decisiones tomadas

- **Alcance Voltio**: página propia completa (`hrkit.html` ES + `en/hrkit.html`),
  espejando `proder.html`.
- **Estado comercial**: early access / cliente fundador.
- **Pricing**: se publica la tabla de 4 tramos.
- **Capturas**: NO ahora. Beno las saca después, con la UX pulida. Galería con
  placeholders o sección de capturas omitida hasta entonces.
- **Prueba social**: nada por ahora; se agrega cuando haya testimonios reales.
- **Demo**: sin exponer el link directo. Botón **"Pedir demo"** → Calendly
  (`https://calendly.com/benito-voltiodev/30min`).

## Parte A — Portfolio (`lib/projects.ts`)

Cambios quirúrgicos sobre la entrada `hrkit` existente; NO se toca la arquitectura de
fuente única (metadata/JSON-LD/llms.txt/llm-info se derivan solos):

- **Reescribir `features` (ES/EN)** para cubrir el inventario real completo (agregar
  comunicaciones internas, encuestas de clima, casos de ausentismo como workflow,
  auditoría, permisos granulares, autoservicio del empleado). Tono primera persona
  rioplatense, largo desparejo, sin tics de LLM (según `CLAUDE.md` del portfolio).
- **Afinar `summary` y `solution`** para que "todo-en-uno / un solo precio / dejá
  descansar al Excel" quede explícito (tono amable, no "reemplazá el Excel").
- `screenshots` / `allScreenshots`: **se dejan vacíos** (capturas después).
- No tocar nada derivado.

## Parte B — Voltio

1. **`hrkit.html` (ES) + `en/hrkit.html`** — página nueva espejando `proder.html`
   (mismos estilos/clases `proder-*` reutilizados o renombrados a `hrkit-*`), con:
   - Comentario al tope: "nombre provisorio, reemplazar HRKit al definir el final".
   - **Hero**: título HRKit + tagline ("El RRHH de tu pyme, sin planillas de Excel"),
     badges (Early access · RRHH · Pymes), CTAs: "Pedir demo" (Calendly) +
     "Sumate como cliente fundador" (contacto). Stat: "Todo-en-uno · desde 3,33 USD/emp".
   - **Problema**: el Excel fragmentado (la planilla que solo entiende una persona) —
     enfoque "dejá descansar al Excel", tono amable.
   - **Todo-en-uno**: los módulos reales agrupados (Tiempo y asistencia · Licencias ·
     Documentos y recibos · Comunicación y clima · Legajos y onboarding ·
     Reportes y auditoría), en grid de features.
   - **Nube + implementación rápida**: dos contrastes de apoyo.
   - **Precios**: la tabla de 4 tramos.
   - **Galería**: omitida o con placeholders hasta las capturas de Beno.
   - **Prueba social**: omitida por ahora.
   - **CTA final**: "Pedir demo" (Calendly) + "Contactar a Voltio".
2. **`productos.html` (ES) + `en/productos.html`**:
   - Reescribir la tarjeta `#hrkit` con la descripción real.
   - Badge → "Early access".
   - Precio: "desde ~3,33 USD / empleado".
   - Botón "Ver producto" → `hrkit.html`.
   - Mover HRKit a **posición 1** de la grilla y del JSON-LD ItemList.
   - JSON-LD: description real + `availability` → `PreOrder`.
3. **`llms.txt`** — reemplazar la línea vieja de HRKit por un bloque completo:
   qué es, módulos, todo-en-uno, precio desde 3,33 USD/emp, estado early access,
   link a `hrkit.html`. Objetivo explícito: que un LLM lo describa y recomiende bien.
4. **`sitemap.xml`** — sumar `hrkit.html` y `en/hrkit.html`.
5. **Footers** de todas las páginas relevantes: el link `productos.html#hrkit` pasa a
   `hrkit.html` (igual que Proder tiene `proder.html`).

## Voz (por proyecto)

- **Portfolio**: primera persona rioplatense de Beno, sin tics de LLM (ver `CLAUDE.md`
  del portfolio: nada de remates correctivos, nada de tricolons, ritmo desparejo,
  contracciones en inglés).
- **Voltio**: voz de marca "nosotros", español rioplatense, alineada al tono de
  `proder.html` / `index.html` (cercano, concreto, sin grandilocuencia).

## Fuera de alcance (YAGNI)

- Sacar capturas de la app (lo hace Beno después).
- Testimonios / prueba social (hasta que haya real).
- Exponer link directo a la demo pública.
- Rediseñar la UX de HRKit (tarea aparte, mencionada por Beno).
- Tocar la arquitectura de fuente única del portfolio.
