# Refresh de Gentius — Plan de implementación (Voltio)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (ejecución
> inline aprobada por Beno en conversación). Steps use checkbox (`- [ ]`) syntax.

**Goal:** Actualizar el contenido de Gentius en voltiodev.com al estado real de HRKit,
manteniendo diseño, estructura y precios, y refrescar la capa SEO/GEO/AEO del sitio.

**Architecture:** Sitio HTML estático bilingüe (raíz ES, `en/` EN). Edición dirigida sobre
las páginas existentes. Spec aprobado: `docs/superpowers/specs/2026-08-14-gentius-refresh-design.md`
(contenido exacto por sección sale de ahí; fuente de verdad del producto:
`B:\CC Agents\HRKit\docs\manual-humano.md`).

**Tech Stack:** HTML/CSS/JS plano, servido estático (dev: `npx serve -l 3001`).

---

### Task 1: `gentius.html` (ES)

**Files:**
- Modify: `gentius.html`

- [ ] **Step 1:** Sacar el comentario de "nombre provisorio" (líneas 2-3).
- [ ] **Step 2:** Hero: tagline suma el cierre del ciclo (novedades → liquidación). Sumar a
  `.gentius-hero__acciones` un botón `<a href="https://gentius.com.ar" target="_blank"
  rel="noopener" class="btn btn--outline-calma">Ver la demo en gentius.com.ar</a>`.
- [ ] **Step 3:** Actualizar las 6 feature cards según el spec (asistencia + relojes
  biométricos y casos automáticos; licencias + multi-paso/calendario/feriados por sector;
  documentos + firma hash+IP y carga masiva; clima + token de un solo uso; legajos + import
  de históricos; reportes → novedades y liquidación con cierre fotografiado y export XLSX).
- [ ] **Step 4:** Sección diferenciales: sumar operación autovigilada (backups verificados
  por restauración, alertas automáticas). Precios: no tocar.
- [ ] **Step 5:** Repetir el link a gentius.com.ar en la CTA final. Verificar en
  http://localhost:3001/gentius.html.

### Task 2: `en/gentius.html` (EN espejo)

**Files:**
- Modify: `en/gentius.html`

- [ ] **Step 1:** Leer el archivo entero primero (puede divergir del ES).
- [ ] **Step 2:** Aplicar los mismos cambios en inglés (con contracciones, según la voz).
- [ ] **Step 3:** Verificar en http://localhost:3001/en/gentius.html.

### Task 3: `productos.html` + `en/productos.html`

**Files:**
- Modify: `productos.html` (blurb card Gentius + description del JSON-LD)
- Modify: `en/productos.html` (ídem)

- [ ] **Step 1:** Alinear blurb y JSON-LD con el nuevo contenido (mencionar el ciclo de
  liquidación). Validar que el JSON-LD siga parseando (`python -c "import json,re,..."` o
  copiar el bloque a un validador local).
- [ ] **Step 2:** Verificar ambas páginas en :3001.

### Task 4: SEO / GEO / AEO

**Files:**
- Modify: `llms.txt` (sección Gentius)
- Modify: `sitemap.xml` (`lastmod` 2026-08-14 en gentius y productos, ES y EN)
- Modify: `robots.txt` (lista de AI crawlers del spec; sacar "Gemini")

- [ ] **Step 1:** Reescribir la sección Gentius de `llms.txt`: sin "nombre provisorio", con
  ciclo de liquidación, relojes, casos, operación autovigilada y link a gentius.com.ar.
- [ ] **Step 2:** `sitemap.xml`: lastmod nuevos.
- [ ] **Step 3:** `robots.txt`: lista final = *, Googlebot, GPTBot, ChatGPT-User,
  OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot,
  Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot,
  DuckAssistBot, CCBot, cohere-ai — todos `Allow: /` + línea Sitemap existente.

### Task 5: Verificación y commit

- [ ] **Step 1:** Revisión visual de las 4 páginas tocadas en :3001 (desktop y ancho mobile).
- [ ] **Step 2:** Grep de sanidad: `grep -ri "provisorio" gentius.html en/gentius.html llms.txt`
  → Expected: sin resultados.
- [ ] **Step 3:** `git add -A && git commit -m "Gentius al estado real de HRKit + SEO/AEO"`
  (un solo commit: el sitio es estático y el cambio es una unidad de contenido).

## Self-review

- Cobertura del spec: gentius ES (T1), EN (T2), productos (T3), llms/sitemap/robots (T4),
  verificación (T5). Link a gentius.com.ar en T1/T2. Precios intactos. ✔
- Sin placeholders: contenido por card enumerado en el spec committeado. ✔
