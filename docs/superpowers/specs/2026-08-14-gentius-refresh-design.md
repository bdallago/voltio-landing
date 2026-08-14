# Spec — Refresh de Gentius al estado real de HRKit

**Fecha:** 2026-08-14 · **Aprobado por Beno** en conversación (edición dirigida, sin rediseño).
Spec hermano en el portfolio: `docs/superpowers/specs/2026-08-14-pepe-tito-gentius-refresh-design.md`
(ahí entran además Pepe y Tito, que no son productos Voltio).

## Alcance

Refresh de **contenido** de las páginas de Gentius manteniendo diseño, estructura y
**precios tal cual**. Fuente: `B:\CC Agents\HRKit\docs\manual-humano.md` y bitácora.

## Cambios

### `gentius.html` + `en/gentius.html`

- Sacar el comentario HTML de "nombre provisorio": Gentius ya tiene dominio propio.
- Hero: tagline suma el cierre del ciclo (novedades → liquidación).
- **Sumar link a `https://gentius.com.ar`** (la landing con la demo interactiva del Excel),
  además de los CTA actuales de Calendly/contacto. Decisión de Beno: sí va.
- Las 6 feature cards se actualizan (la grilla de 3×2 se mantiene):
  - *Tiempo y asistencia*: + relojes biométricos por API key, + casos de ausentismo que el
    sistema detecta solo cada mañana.
  - *Licencias*: + flujos de aprobación multi-paso, calendario del equipo, feriados por sector.
  - *Documentos y recibos*: + firma con valor probatorio (hash + IP), carga masiva de recibos,
    links de descarga que expiran.
  - *Comunicación y clima*: + anonimato real (token de un solo uso).
  - *Legajos y onboarding*: + import de históricos (fichajes viejos, licencias, legajos PDF).
  - *Reportes y auditoría* → se reformula alrededor de **novedades y liquidación**: cierre de
    período fotografiado y export XLSX directo al sistema de sueldos, más reportes armables
    y auditoría.
- Diferenciales: + la operación se cuida sola (backups nocturnos verificados por
  restauración, alertas automáticas).
- Precios: **no se tocan**.

### `productos.html` + `en/productos.html`

Blurb de Gentius y description del JSON-LD alineados con lo anterior.

### SEO / GEO / AEO

- `llms.txt`: sección Gentius reescrita (sin "nombre provisorio", con el ciclo de
  liquidación, relojes, casos, operación autovigilada, link a gentius.com.ar).
- `sitemap.xml`: `lastmod` de gentius y productos (ES y EN) a la fecha del cambio.
- `robots.txt`: alinear la lista de AI crawlers con la del portfolio — queda: GPTBot,
  ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai,
  PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent,
  Amazonbot, DuckAssistBot, CCBot (más Googlebot y cohere-ai que ya estaban) — y sacar
  "Gemini", que no es un user-agent real.

## Verificación

Revisión visual en localhost:3001 (gentius ES/EN, productos ES/EN), JSON-LD parseable,
llms.txt coherente. Deploy fuera de alcance salvo pedido.
