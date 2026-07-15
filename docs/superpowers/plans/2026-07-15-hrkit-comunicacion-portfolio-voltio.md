# HRKit — Comunicación completa en Portfolio + Voltio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar HRKit descripto de forma completa y coherente en el Portfolio (`B:\CC Agents\Beno Portfolio`) y en el sitio de Voltio (`B:\CC Agents\Voltio`), con copy construido sobre los patrones de validación, de modo que un LLM sepa exactamente qué es y lo recomiende.

**Architecture:** Dos repos independientes. Portfolio = Next.js con fuente única en `lib/projects.ts` + `lib/translations.ts` (todo lo derivado se regenera solo; se valida con `npm run check`). Voltio = HTML estático multi-idioma (ES en raíz, EN en `/en`); se agrega una página propia `hrkit.html` espejando `proder.html`, y se actualizan tarjeta de productos, JSON-LD, `llms.txt`, `sitemap.xml` y footers.

**Tech Stack:** TypeScript / Next.js (portfolio); HTML/CSS estático (Voltio). Verificación: `npm run check` + `npm run build` en portfolio; apertura en navegador + validación de JSON-LD/links en Voltio.

**Convención de nombre provisorio:** "HRKit" se usa como nombre real. Cuando se defina el definitivo, el reemplazo es: buscar-y-reemplazar la cadena `HRKit` en ambos repos + renombrar `hrkit.html`/`en/hrkit.html`. Cada archivo nuevo de Voltio lleva un comentario al tope recordándolo.

**Mensajes (de las validaciones), en orden de fuerza:**
1. Todo-en-uno, un solo precio (contra módulos sueltos y caros).
2. Dejá descansar al Excel (tono amable, NO "reemplazá el Excel", NO tono de enemigo).
3. UX amigable = adopción.
+ apoyo: nube (no atado a una PC), implementación en días.
NO usar "no califica personas" como bandera de venta.

---

## File Structure

**Portfolio (`B:\CC Agents\Beno Portfolio`):**
- Modify: `lib/projects.ts` — entrada `hrkit`: `summary`, `solution`, `features` (ES/EN). `screenshots`/`allScreenshots` quedan vacíos.
- Modify: `lib/translations.ts` — item `HRKit` (ES ~línea 63-74, EN ~línea 180-191): `description`, `solution`.

**Voltio (`B:\CC Agents\Voltio`):**
- Create: `hrkit.html` (ES) — página propia completa.
- Create: `en/hrkit.html` (EN) — versión inglesa.
- Modify: `productos.html` — tarjeta `#hrkit` (a posición 1) + JSON-LD item HRKit.
- Modify: `en/productos.html` — ídem en inglés.
- Modify: `llms.txt` — bloque HRKit completo.
- Modify: `sitemap.xml` — entradas `hrkit.html` + `en/hrkit.html`.
- Modify (footers): `productos.html`, `proder.html`, `index.html`, `nosotros.html` y sus equivalentes en `/en` — link `productos.html#hrkit` → `hrkit.html`.

---

## Task 1: Portfolio — enriquecer la entrada HRKit (fuente única)

**Files:**
- Modify: `B:\CC Agents\Beno Portfolio\lib\projects.ts` (entrada `slug: 'hrkit'`)
- Modify: `B:\CC Agents\Beno Portfolio\lib\translations.ts` (item HRKit ES + EN)

Voz: primera persona rioplatense de Beno, sin tics de LLM (ver `CLAUDE.md` del portfolio: nada de remates correctivos, nada de tricolons, ritmo desparejo, contracciones en inglés). NO tocar `screenshots`/`allScreenshots` (quedan `[]`).

- [ ] **Step 1: Reemplazar `summary` (ES/EN) de la entrada `hrkit` en `projects.ts`**

Reemplazar el objeto `summary` actual por:

```ts
    summary: {
      es: 'Software de RRHH todo-en-uno para pymes y medianas empresas argentinas: fichaje, horarios, licencias, recibos, documentos con firma electrónica, comunicación interna, encuestas de clima y reportes, en una sola app multi-empresa. Un plan, todo incluido, en vez de módulos sueltos y planillas de Excel repartidas. Producto propio bajo la marca Voltio, en early access y en validación con RRHH reales. HRKit es un nombre provisorio y todavía no tiene dominio propio.',
      en: 'All-in-one HR software for Argentine small and mid-sized companies: time tracking, schedules, leave, payslips, e-signed documents, internal comms, climate surveys and reporting, in a single multi-tenant app. One plan with everything included, instead of separate modules and scattered Excel sheets. An in-house product under the Voltio brand, in early access and being validated with real HR people. HRKit is a placeholder name and has no domain of its own yet.',
    },
```

- [ ] **Step 2: Reemplazar `solution` (ES/EN) en `projects.ts`**

```ts
    solution: {
      es: 'Una sola app donde todo se habla entre sí y hay un solo precio. El fichaje alimenta los reportes, las licencias impactan en la asistencia, los recibos salen con firma, y de todo queda registro de quién hizo qué. La planilla de Excel puede descansar.',
      en: "A single app where everything talks to itself and there's one price. Time tracking feeds the reports, leave shows up in attendance, payslips go out signed, and there's a record of who did what. The Excel sheet finally gets to rest.",
    },
```

- [ ] **Step 3: Reemplazar el bloque `features` completo (ES/EN) en `projects.ts`**

Reemplazar todo el objeto `features: { es: [...], en: [...] }` de la entrada `hrkit` por:

```ts
    features: {
      es: [
        { title: 'Todo-en-uno, un solo precio', description: 'Fichaje, licencias, recibos, documentos, comunicación y reportes en la misma app. Nada de un módulo por acá que se cobra aparte y otro por allá: un plan que incluye todo, con precio por cantidad de empleados.' },
        { title: 'Una empresa, un espacio', description: 'Cada cliente es una organización aparte. El aislamiento está puesto en la base de datos misma, con RLS de Postgres, así que ni un bug en el código alcanza para que una empresa vea los datos de otra.' },
        { title: 'Fichaje y horarios', description: 'Planillas de horario, franjas, rotación, tolerancias y feriados. El sistema sabe qué se espera de cada persona en cada día concreto, arma la vista diaria y calcula la asistencia solo. Esa es la parte difícil.' },
        { title: 'Licencias, recibos y documentos', description: 'Las licencias se piden, se aprueban y quedan asentadas, con plantillas. Los recibos y documentos se reparten desde la app, con firma electrónica, envío por WhatsApp y constancia de que la persona los abrió.' },
        { title: 'Comunicación, clima y legajos', description: 'Cartelera y comunicaciones internas con acuse, encuestas de clima anónimas o identificadas, y un legajo por persona con autoservicio: el empleado edita sus datos y RRHH aprueba los sensibles. Se importa la planilla actual de una.' },
        { title: 'Reportes sin exportar', description: 'Asistencia por empleado, presentismo y horas trabajadas dentro de la app, más una auditoría legible de quién hizo qué. Tuvo un predictor de ausentismo y lo saqué: no quiero un producto que le ponga puntaje a la gente.' },
        { title: 'Tests en cuatro capas', description: 'Unit, componentes, integración contra una base de datos real y E2E en navegador. Un hook corre los rápidos antes de cada push y lo cancela si algo se rompió.' },
      ],
      en: [
        { title: 'All-in-one, one price', description: "Time tracking, leave, payslips, documents, comms and reports in the same app. No module over here billed on the side and another over there: one plan that includes everything, priced by number of employees." },
        { title: 'One company, one space', description: "Each client is a separate organization. The isolation sits in the database itself, with Postgres RLS, so not even a bug in the code is enough for one company to see another's data." },
        { title: 'Time tracking and schedules', description: 'Schedule templates, time bands, rotation, tolerances, holidays. The system knows what to expect from each person on each specific day, builds the daily view and works out attendance on its own. That is the hard part.' },
        { title: 'Leave, payslips and documents', description: "Leave is requested, approved and on the record, with templates. Payslips and documents go out from the app, with e-signature, WhatsApp delivery and proof the person actually opened them." },
        { title: 'Comms, climate and records', description: "An internal board and announcements with read receipts, climate surveys either anonymous or identified, and a record per person with self-service: employees edit their own data and HR approves the sensitive fields. You import your current spreadsheet in one go." },
        { title: 'Reports without exporting', description: "Attendance per employee, presenteeism and hours worked inside the app, plus a readable audit trail of who did what. It had an absenteeism predictor and I pulled it: I don't want a product that scores people." },
        { title: 'Tests in four layers', description: 'Unit, component, integration against a real database, and browser E2E. A hook runs the fast ones before every push and cancels it if something broke.' },
      ],
    },
```

- [ ] **Step 4: Actualizar el item HRKit en `translations.ts` (tarjeta de la home, ES)**

En `lib/translations.ts`, dentro de `es.projects.items`, el item `name: 'HRKit'` (~línea 64): reemplazar `description` y `solution` por:

```ts
          description:
            'Software de RRHH todo-en-uno para pymes y medianas argentinas. Fichaje, horarios, licencias, recibos, documentos con firma, comunicación interna, encuestas de clima y reportes, todo en la misma app y con un solo precio. Cada empresa cliente tiene su propio espacio, aislado del resto.',
```
```ts
          solution: 'Una sola app donde todo se habla entre sí y hay un solo precio, en vez de módulos sueltos y planillas repartidas. El fichaje alimenta los reportes, las licencias impactan en la asistencia, y de todo queda registro de quién hizo qué.',
```
(No tocar `problem`, `model`, `stat`, `url`, `tags`.)

- [ ] **Step 5: Actualizar el item HRKit en `translations.ts` (EN)**

En `en.projects.items`, item `name: 'HRKit'` (~línea 181): reemplazar `description` y `solution` por:

```ts
          description:
            'All-in-one HR software for Argentine small and mid-sized companies. Time tracking, schedules, leave, payslips, signed documents, internal comms, climate surveys and reporting, all in the same app and for one price. Every client company gets its own space, walled off from the rest.',
```
```ts
          solution: "A single app where everything talks to itself and there's one price, instead of separate modules and scattered spreadsheets. Time tracking feeds the reports, leave shows up in attendance, and there's a record of who did what.",
```

- [ ] **Step 6: Verificar contenido y build**

Run (desde `B:\CC Agents\Beno Portfolio`): `npm run check`
Expected: PASS (verifica status/weight/summary de cada proyecto, capturas referenciadas, ningún recuento a mano). HRKit no referencia capturas, así que no debe fallar por eso.

Run: `npm run build`
Expected: build OK (corre `check` + compila). Sin errores de TypeScript.

- [ ] **Step 7: Commit (repo Portfolio)**

```bash
cd "B:/CC Agents/Beno Portfolio"
git add lib/projects.ts lib/translations.ts
git commit -m "content: descripcion completa de HRKit (todo-en-uno, un solo precio)"
```

---

## Task 2: Voltio — crear `hrkit.html` (ES)

**Files:**
- Create: `B:\CC Agents\Voltio\hrkit.html`

Estrategia: copiar `proder.html` como andamio y reemplazar metadata + `<main>`. Reutiliza el CSS inline de proder (renombrando el prefijo de clases a `hrkit-`), quita el carrusel de testimonios y la galería/lightbox (no hay capturas todavía), y agrega una tabla de precios.

- [ ] **Step 1: Copiar el andamio**

```bash
cd "B:/CC Agents/Voltio"
cp proder.html hrkit.html
```

- [ ] **Step 2: Renombrar prefijos de clase dentro de `hrkit.html`**

En `hrkit.html`, reemplazar en TODO el archivo (CSS inline + HTML):
- `proder-` → `hrkit-`
- `prt-` → `hkt-` (clases del carrusel; se borrarán con la sección, pero renombrar evita colisiones si queda algo)

(Verificar que no quede ninguna clase `proder-`/`prt-` en el archivo.)

- [ ] **Step 3: Reemplazar el bloque `<head>` de metadata**

Reemplazar `<title>`, `<meta name="description">`, canonical y las etiquetas Open Graph por (dejar intactos favicon, fuentes, GA4, Clarity, `lang-detect.js`, y el `<style>`):

```html
  <title>HRKit — Software de RRHH todo-en-uno para pymes | Voltio</title>
  <meta name="description" content="HRKit: el software de RRHH todo-en-uno para pymes. Fichaje, licencias, recibos con firma, comunicación interna y reportes en una sola app. Un plan, un solo precio.">
  <link rel="canonical" href="https://www.voltiodev.com/hrkit.html">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.voltiodev.com/hrkit.html">
  <meta property="og:title" content="HRKit — Software de RRHH todo-en-uno para pymes | Voltio">
  <meta property="og:description" content="Fichaje, licencias, recibos con firma, comunicación interna y reportes en una sola app. Un plan, un solo precio. En early access.">
  <meta property="og:image" content="https://www.voltiodev.com/public/Logo%2Bslogan.png">
  <meta property="og:locale" content="es_AR">
  <meta property="og:site_name" content="Voltio">
```

Y actualizar los hreflang:
```html
  <link rel="alternate" hreflang="es" href="https://www.voltiodev.com/hrkit.html">
  <link rel="alternate" hreflang="en" href="https://www.voltiodev.com/en/hrkit.html">
```

- [ ] **Step 4: Agregar comentario de nombre provisorio + CSS de la tabla de precios**

Al inicio del archivo, justo después de `<!DOCTYPE html>`, agregar:
```html
<!-- NOMBRE PROVISORIO: "HRKit" se usa como definitivo. Al fijar el nombre real,
     buscar-y-reemplazar "HRKit" en este archivo y renombrar el archivo + en/hrkit.html. -->
```

Dentro del `<style>` (antes del cierre `</style>`), agregar el CSS de la tabla de precios:
```css
    /* ---- Precios ---- */
    .hrkit-precios { padding: 4.5rem 0 5rem; background: var(--idea); }
    .hrkit-precios h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); color: var(--calma); margin-bottom: 0.5rem; text-align: center; }
    .hrkit-precios__intro { font-family: var(--font-textos); color: var(--teal-apagado); text-align: center; margin-bottom: 2.5rem; }
    .hrkit-tabla { max-width: 640px; margin-inline: auto; border-collapse: collapse; width: 100%; background: transparent; }
    .hrkit-tabla th, .hrkit-tabla td { padding: 0.9rem 1rem; text-align: left; border-bottom: 1px solid rgba(1,89,90,0.15); font-family: var(--font-botones); font-size: 0.95rem; color: var(--calma); }
    .hrkit-tabla th { font-weight: 700; color: var(--fuerza); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem; }
    .hrkit-tabla td:last-child, .hrkit-tabla th:last-child { text-align: right; }
    .hrkit-precios__nota { text-align: center; margin-top: 1.2rem; font-family: var(--font-textos); font-style: italic; color: var(--teal-apagado); font-size: 0.9rem; }
```

- [ ] **Step 5: Reemplazar todo el `<main>` por el contenido de HRKit**

Reemplazar el bloque `<main> ... </main>` completo (incluyendo el `<div class="proder-lightbox">` y las secciones de galería/testimonios/CTA) por:

```html
  <main>

    <!-- HERO -->
    <section class="hrkit-hero">
      <div class="container hrkit-hero__inner">
        <div class="hrkit-hero__badges">
          <span class="hrkit-hero__badge">Early access</span>
          <span class="hrkit-hero__badge hrkit-hero__badge--ghost">RRHH</span>
          <span class="hrkit-hero__badge hrkit-hero__badge--ghost">Pymes</span>
        </div>
        <h1 class="hrkit-hero__titulo">HRKit</h1>
        <p class="hrkit-hero__tagline">El RRHH de tu pyme, sin planillas sueltas. Fichaje, licencias, recibos y comunicación en una sola app.</p>
        <div class="hrkit-hero__acciones">
          <a href="https://calendly.com/benito-voltiodev/30min" target="_blank" rel="noopener" class="btn btn--fuerza">Pedir demo</a>
          <a href="index.html#contacto" class="btn btn--outline-calma">Sumate como cliente fundador</a>
        </div>
        <div style="display:flex; gap:2.5rem; margin-top:2rem; flex-wrap:wrap; justify-content:center;">
          <div class="hrkit-hero__stat"><strong>Todo-en-uno</strong>un solo precio</div>
          <div class="hrkit-hero__stat"><strong>3,33 USD</strong>desde, por empleado</div>
        </div>
      </div>
    </section>

    <!-- PROBLEMA -->
    <section class="hrkit-problema">
      <div class="container">
        <div class="hrkit-problema__inner reveal">
          <p class="hrkit-seccion-label">El problema</p>
          <h2>Tu RRHH vive repartido en planillas</h2>
          <p>La asistencia en un Excel, las licencias en otro, los recibos en una carpeta que alguien renombró. Cuando un empleado pregunta cuántos días de vacaciones le quedan, hay que abrir tres archivos para contestarle. Y esa planilla la entiende una sola persona: el día que no está, no está el dato. HRKit junta todo en un solo lugar, ordenado y compartido, para que el Excel pueda descansar.</p>
        </div>
      </div>
    </section>

    <!-- TODO-EN-UNO -->
    <section class="hrkit-features">
      <div class="container">
        <p class="hrkit-seccion-label">Todo-en-uno</p>
        <h2 class="reveal">Todo el RRHH en una sola app</h2>
        <div class="hrkit-features__grid">
          <div class="hrkit-feature reveal">
            <h3>Tiempo y asistencia</h3>
            <p>Fichaje, horarios, franjas, rotación, tolerancias y feriados. El sistema sabe qué se espera de cada persona cada día, y arma la vista diaria y los reportes solo.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Licencias</h3>
            <p>Se piden, se aprueban y quedan registradas, con plantillas para no reconfigurar lo mismo cada vez. Las licencias impactan en la asistencia automáticamente.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Documentos y recibos</h3>
            <p>Recibos y documentos se reparten desde la app, con firma electrónica, envío por WhatsApp y constancia de que la persona los abrió.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Comunicación y clima</h3>
            <p>Cartelera y comunicaciones internas con acuse, más encuestas de clima anónimas o identificadas.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Legajos y onboarding</h3>
            <p>Legajo de cada persona con autoservicio: el empleado edita sus datos y RRHH aprueba los sensibles. Import masivo de tu planilla actual y onboarding de ingresos con plantillas.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Reportes y auditoría</h3>
            <p>Asistencia por empleado, presentismo y horas trabajadas, sin exportar a otro lado. Y una auditoría legible de quién hizo qué.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DIFERENCIALES -->
    <section class="hrkit-problema">
      <div class="container">
        <div class="hrkit-problema__inner reveal">
          <p class="hrkit-seccion-label">Por qué HRKit</p>
          <h2>En la nube y andando en días</h2>
          <p>Se usa desde el navegador, en la oficina o desde casa. No hay nada que instalar ni una PC de la que dependa el sistema. Y la puesta en marcha se mide en días, no en meses: importás tu planilla actual y arrancás, sin un proyecto de implementación eterno.</p>
        </div>
      </div>
    </section>

    <!-- PRECIOS -->
    <section class="hrkit-precios">
      <div class="container">
        <p class="hrkit-seccion-label">Precios</p>
        <h2 class="reveal">Un plan, todo incluido</h2>
        <p class="hrkit-precios__intro reveal">Sin módulos que se cobran aparte. El precio es por cantidad de empleados y baja con el volumen.</p>
        <table class="hrkit-tabla reveal">
          <thead>
            <tr><th>Plan</th><th>Por mes</th></tr>
          </thead>
          <tbody>
            <tr><td>Hasta 35 empleados</td><td>167 USD · 250.000 ARS</td></tr>
            <tr><td>Hasta 90 empleados</td><td>400 USD · 600.000 ARS</td></tr>
            <tr><td>Hasta 150 empleados</td><td>567 USD · 850.000 ARS</td></tr>
            <tr><td>Hasta 200 empleados</td><td>667 USD · 1.000.000 ARS</td></tr>
          </tbody>
        </table>
        <p class="hrkit-precios__nota">Más de 200 empleados: plan a medida. Todos los planes incluyen todo, sin módulos aparte.</p>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="hrkit-cta">
      <div class="container">
        <p class="hrkit-seccion-label" style="text-align:center;">¿Te interesa?</p>
        <h2 class="reveal">Sumate como cliente fundador</h2>
        <div class="hrkit-cta__acciones reveal">
          <a href="https://calendly.com/benito-voltiodev/30min" target="_blank" rel="noopener" class="btn btn--calma">Pedir demo</a>
          <a href="index.html#contacto" class="btn btn--outline-calma">Contactar a Voltio</a>
        </div>
      </div>
    </section>

  </main>
```

- [ ] **Step 6: Borrar los scripts de lightbox y carrusel**

Al final del `<body>`, borrar los dos `<script>` de proder (el de Lightbox y el del Carrusel de testimonios). Dejar solo:
```html
  <script src="js/main.js"></script>
  <script defer src="js/analytics.js"></script>
  <script defer src="js/utm.js"></script>
```

- [ ] **Step 7: Actualizar el footer de `hrkit.html`**

En el footer, la columna Productos: el link a HRKit debe apuntar a `hrkit.html` y el de Prode a `proder.html`:
```html
      <div class="footer__col">
        <h4>Productos</h4>
        <a href="productos.html">Todos los productos</a>
        <a href="hrkit.html">HRKit</a>
        <a href="proder.html">Prode corporativo</a>
        <a href="productos.html#pueriapp">PueriApp</a>
      </div>
```

- [ ] **Step 8: Verificar en navegador**

Abrir `B:\CC Agents\Voltio\hrkit.html` en el navegador (o servir la carpeta con `python -m http.server 8080` y abrir `http://localhost:8080/hrkit.html`).
Expected: renderiza hero + problema + 6 features + diferenciales + tabla de precios + CTA, sin secciones rotas ni referencias a imágenes inexistentes. Los botones "Pedir demo" abren Calendly; "Contactar" va a `index.html#contacto`. No debe quedar ninguna clase `proder-`/`prt-` en el DOM. Sin errores en consola.

- [ ] **Step 9: Commit (repo Voltio)**

```bash
cd "B:/CC Agents/Voltio"
git add hrkit.html
git commit -m "feat: pagina propia de HRKit (todo-en-uno, precios, early access)"
```

---

## Task 3: Voltio — crear `en/hrkit.html` (EN)

**Files:**
- Create: `B:\CC Agents\Voltio\en\hrkit.html`

Estrategia: copiar `en/proder.html` como andamio (rutas relativas `../`), mismos pasos que Task 2 con copy en inglés.

- [ ] **Step 1: Copiar el andamio**

```bash
cd "B:/CC Agents/Voltio"
cp en/proder.html en/hrkit.html
```

- [ ] **Step 2: Renombrar prefijos de clase**

En `en/hrkit.html`: `proder-` → `hrkit-`, `prt-` → `hkt-` en todo el archivo. Verificar que la ruta del CSS sigue siendo `../css/styles.css` y los assets `../`.

Nota: si `en/proder.html` no tiene `<style>` inline propio (podría referenciar clases de la ES), verificar. Si el `<style>` inline de proder está presente, se renombra igual. Si NO está, copiar el `<style>` completo desde `hrkit.html` (la versión ES ya creada en Task 2) al `<head>` de `en/hrkit.html`, así la página EN tiene los mismos estilos `hrkit-*` + tabla de precios.

- [ ] **Step 3: Reemplazar metadata del `<head>`**

```html
  <title>HRKit — All-in-one HR software for small companies | Voltio</title>
  <meta name="description" content="HRKit: the all-in-one HR software for small companies. Time tracking, leave, signed payslips, internal comms and reports in a single app. One plan, one price.">
  <link rel="canonical" href="https://www.voltiodev.com/en/hrkit.html">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.voltiodev.com/en/hrkit.html">
  <meta property="og:title" content="HRKit — All-in-one HR software for small companies | Voltio">
  <meta property="og:description" content="Time tracking, leave, signed payslips, internal comms and reports in a single app. One plan, one price. In early access.">
  <meta property="og:image" content="https://www.voltiodev.com/public/Logo%2Bslogan.png">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="Voltio">
```
hreflang:
```html
  <link rel="alternate" hreflang="es" href="https://www.voltiodev.com/hrkit.html">
  <link rel="alternate" hreflang="en" href="https://www.voltiodev.com/en/hrkit.html">
```

- [ ] **Step 4: Comentario de nombre provisorio**

Tras `<!DOCTYPE html>`:
```html
<!-- PLACEHOLDER NAME: "HRKit" is used as the final name. When the real name is set,
     find-and-replace "HRKit" here and rename this file + ../hrkit.html. -->
```

- [ ] **Step 5: Reemplazar todo el `<main>` (copy en inglés)**

```html
  <main>

    <!-- HERO -->
    <section class="hrkit-hero">
      <div class="container hrkit-hero__inner">
        <div class="hrkit-hero__badges">
          <span class="hrkit-hero__badge">Early access</span>
          <span class="hrkit-hero__badge hrkit-hero__badge--ghost">HR</span>
          <span class="hrkit-hero__badge hrkit-hero__badge--ghost">SMBs</span>
        </div>
        <h1 class="hrkit-hero__titulo">HRKit</h1>
        <p class="hrkit-hero__tagline">HR for your small company, without the scattered spreadsheets. Time tracking, leave, payslips and comms in a single app.</p>
        <div class="hrkit-hero__acciones">
          <a href="https://calendly.com/benito-voltiodev/30min" target="_blank" rel="noopener" class="btn btn--fuerza">Request a demo</a>
          <a href="index.html#contacto" class="btn btn--outline-calma">Become a founding client</a>
        </div>
        <div style="display:flex; gap:2.5rem; margin-top:2rem; flex-wrap:wrap; justify-content:center;">
          <div class="hrkit-hero__stat"><strong>All-in-one</strong>one single price</div>
          <div class="hrkit-hero__stat"><strong>USD 3.33</strong>from, per employee</div>
        </div>
      </div>
    </section>

    <!-- PROBLEM -->
    <section class="hrkit-problema">
      <div class="container">
        <div class="hrkit-problema__inner reveal">
          <p class="hrkit-seccion-label">The problem</p>
          <h2>Your HR lives spread across spreadsheets</h2>
          <p>Attendance in one Excel, leave in another, payslips in a folder somebody renamed. When an employee asks how many vacation days they have left, you open three files to answer. And only one person really understands that spreadsheet: the day they're out, the data is out too. HRKit brings it all into one shared, tidy place, so Excel can finally rest.</p>
        </div>
      </div>
    </section>

    <!-- ALL-IN-ONE -->
    <section class="hrkit-features">
      <div class="container">
        <p class="hrkit-seccion-label">All-in-one</p>
        <h2 class="reveal">All of HR in a single app</h2>
        <div class="hrkit-features__grid">
          <div class="hrkit-feature reveal">
            <h3>Time &amp; attendance</h3>
            <p>Time tracking, schedules, bands, rotation, tolerances and holidays. The system knows what to expect from each person each day, and builds the daily view and reports on its own.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Leave</h3>
            <p>Requested, approved and on the record, with templates so you're not setting up the same thing again. Leave flows into attendance automatically.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Documents &amp; payslips</h3>
            <p>Payslips and documents go out from the app, with e-signature, WhatsApp delivery and proof the person actually opened them.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Comms &amp; climate</h3>
            <p>Internal board and announcements with read receipts, plus climate surveys, anonymous or identified.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Records &amp; onboarding</h3>
            <p>A record for each person with self-service: employees edit their own data and HR approves the sensitive fields. Bulk-import your current spreadsheet and onboard new hires with templates.</p>
          </div>
          <div class="hrkit-feature reveal">
            <h3>Reports &amp; audit</h3>
            <p>Attendance per employee, presenteeism and hours worked, without exporting anywhere. Plus a readable audit trail of who did what.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DIFFERENTIATORS -->
    <section class="hrkit-problema">
      <div class="container">
        <div class="hrkit-problema__inner reveal">
          <p class="hrkit-seccion-label">Why HRKit</p>
          <h2>In the cloud, running in days</h2>
          <p>It runs in the browser, at the office or from home. Nothing to install, no single PC the system depends on. And setup is measured in days, not months: import your current spreadsheet and go, with no endless implementation project.</p>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section class="hrkit-precios">
      <div class="container">
        <p class="hrkit-seccion-label">Pricing</p>
        <h2 class="reveal">One plan, everything included</h2>
        <p class="hrkit-precios__intro reveal">No modules billed on the side. Pricing is per number of employees and drops with volume.</p>
        <table class="hrkit-tabla reveal">
          <thead>
            <tr><th>Plan</th><th>Per month</th></tr>
          </thead>
          <tbody>
            <tr><td>Up to 35 employees</td><td>USD 167 · ARS 250,000</td></tr>
            <tr><td>Up to 90 employees</td><td>USD 400 · ARS 600,000</td></tr>
            <tr><td>Up to 150 employees</td><td>USD 567 · ARS 850,000</td></tr>
            <tr><td>Up to 200 employees</td><td>USD 667 · ARS 1,000,000</td></tr>
          </tbody>
        </table>
        <p class="hrkit-precios__nota">More than 200 employees: custom plan. Every plan includes everything, no separate modules.</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="hrkit-cta">
      <div class="container">
        <p class="hrkit-seccion-label" style="text-align:center;">Interested?</p>
        <h2 class="reveal">Become a founding client</h2>
        <div class="hrkit-cta__acciones reveal">
          <a href="https://calendly.com/benito-voltiodev/30min" target="_blank" rel="noopener" class="btn btn--calma">Request a demo</a>
          <a href="index.html#contacto" class="btn btn--outline-calma">Contact Voltio</a>
        </div>
      </div>
    </section>

  </main>
```

- [ ] **Step 6: Borrar scripts de lightbox/carrusel** (igual que Task 2 Step 6), dejando solo `main.js`, `analytics.js`, `utm.js` (con ruta `../js/...` si así están en `en/proder.html`).

- [ ] **Step 7: Footer de `en/hrkit.html`** — columna Products: `<a href="hrkit.html">HRKit</a>` y `<a href="proder.html">Corporate Prode</a>`.

- [ ] **Step 8: Verificar en navegador** — abrir `en/hrkit.html`; mismas comprobaciones que Task 2 Step 8 (secciones, links a Calendly, sin clases `proder-`, sin errores de consola, estilos aplicados).

- [ ] **Step 9: Commit**

```bash
cd "B:/CC Agents/Voltio"
git add en/hrkit.html
git commit -m "feat: HRKit product page (EN)"
```

---

## Task 4: Voltio — actualizar `productos.html` (ES)

**Files:**
- Modify: `B:\CC Agents\Voltio\productos.html`

- [ ] **Step 1: Actualizar el JSON-LD del item HRKit (posición 1)**

En el `<script type="application/ld+json">`, el item de `position: 1` (HRKit): reemplazar `description` y `availability`, y agregar `url`:
```json
        "item": {
          "@type": "SoftwareApplication",
          "name": "HRKit",
          "applicationCategory": "BusinessApplication",
          "description": "Software de RRHH todo-en-uno para pymes argentinas: fichaje, horarios, licencias, recibos y documentos con firma electrónica, comunicación interna, encuestas de clima y reportes, en una sola app multi-empresa. Un plan, todo incluido, desde 3,33 USD por empleado.",
          "operatingSystem": "Web",
          "url": "https://www.voltiodev.com/hrkit.html",
          "offers": { "@type": "Offer", "availability": "https://schema.org/PreOrder" },
          "author": { "@id": "https://www.voltiodev.com/#organization" }
        }
```

- [ ] **Step 2: Reescribir la tarjeta `#hrkit` y moverla a la posición 1 de la grilla**

Dentro de `<div class="productos__grid">`, colocar la tarjeta de HRKit ANTES de la de Prode (`#prode`), y reemplazar su contenido por:
```html
          <article class="producto reveal" id="hrkit">
            <span class="producto__badge producto__badge--dev">Early access</span>
            <h3>HRKit</h3>
            <p>El software de RRHH todo-en-uno para pymes: fichaje, horarios, licencias, recibos y documentos con firma, comunicación interna y reportes, en una sola app. Un plan, todo incluido.</p>
            <p class="producto__precio">desde $3,33 USD <span>/ empleado</span></p>
            <a href="hrkit.html" class="btn btn--calma producto__ver-mas">Ver producto</a>
          </article>
```
(La tarjeta `#prode` y `#pueriapp` quedan igual, después de HRKit.)

- [ ] **Step 3: Verificar en navegador**

Abrir `productos.html`. Expected: HRKit aparece primero, con badge "Early access", precio "desde $3,33 USD / empleado" y botón "Ver producto" que lleva a `hrkit.html`. Validar el JSON-LD (por ejemplo pegando el `<script>` en https://validator.schema.org/ o revisando que sea JSON válido).

- [ ] **Step 4: Commit**

```bash
cd "B:/CC Agents/Voltio"
git add productos.html
git commit -m "content: tarjeta de HRKit real (todo-en-uno, early access, a posicion 1)"
```

---

## Task 5: Voltio — actualizar `en/productos.html` (EN)

**Files:**
- Modify: `B:\CC Agents\Voltio\en\productos.html`

- [ ] **Step 1: JSON-LD item HRKit (position 1)** — reemplazar `description`/`availability`, agregar `url`:
```json
        "item": {
          "@type": "SoftwareApplication",
          "name": "HRKit",
          "applicationCategory": "BusinessApplication",
          "description": "All-in-one HR software for Argentine small businesses: time tracking, schedules, leave, payslips and e-signed documents, internal comms, climate surveys and reports, in a single multi-tenant app. One plan, everything included, from USD 3.33 per employee.",
          "operatingSystem": "Web",
          "url": "https://www.voltiodev.com/en/hrkit.html",
          "offers": { "@type": "Offer", "availability": "https://schema.org/PreOrder" },
          "author": { "@id": "https://www.voltiodev.com/#organization" }
        }
```

- [ ] **Step 2: Reescribir la tarjeta `#hrkit` y moverla a posición 1**
```html
          <article class="producto reveal" id="hrkit">
            <span class="producto__badge producto__badge--dev">Early access</span>
            <h3>HRKit</h3>
            <p>The all-in-one HR software for small companies: time tracking, schedules, leave, payslips and signed documents, internal comms and reports, in a single app. One plan, everything included.</p>
            <p class="producto__precio">from USD 3.33 <span>/ employee</span></p>
            <a href="hrkit.html" class="btn btn--calma producto__ver-mas">View product</a>
          </article>
```
Moverla antes de la tarjeta `#prode`.

- [ ] **Step 3: Verificar en navegador** — abrir `en/productos.html`; HRKit primero, badge/price/botón correctos, JSON-LD válido.

- [ ] **Step 4: Commit**
```bash
cd "B:/CC Agents/Voltio"
git add en/productos.html
git commit -m "content: real HRKit product card (EN)"
```

---

## Task 6: Voltio — actualizar `llms.txt`

**Files:**
- Modify: `B:\CC Agents\Voltio\llms.txt`

- [ ] **Step 1: Reemplazar el bloque `### HRKit`**

Reemplazar las dos líneas actuales de HRKit (el `### HRKit` y su párrafo "licencias, clima laboral, onboarding y muro de reconocimientos…") por:

```
### HRKit
Software de RRHH todo-en-uno para pymes y medianas empresas argentinas. Reúne en una sola app multi-empresa: fichaje y horarios (franjas, rotación, tolerancias, feriados), asistencia con vista diaria y casos de ausentismo, licencias con aprobación y plantillas, recibos y documentos con firma electrónica y acuse de lectura (envío por WhatsApp), comunicaciones internas y encuestas de clima (anónimas o identificadas), legajos con autoservicio del empleado e import masivo de planillas, y reportes de asistencia/presentismo/horas más auditoría legible. Cada empresa cliente tiene su propio espacio, aislado a nivel base de datos (RLS de Postgres). Posicionamiento: un plan, todo incluido, un solo precio — el fin de las planillas de Excel sueltas y los módulos que se cobran aparte. En la nube, sin instalar nada, con puesta en marcha en días. **Precio: por cantidad de empleados, desde ~3,33 USD por empleado/mes** (planes de 167 a 667 USD/mes hasta 200 empleados; +200 a medida). Estado: early access / en validación con RRHH reales. "HRKit" es un nombre provisorio. Demo guiada a pedido. Más info: https://voltiodev.com/hrkit.html
```

- [ ] **Step 2: Verificar**

Abrir `llms.txt` y confirmar que ya no queda la descripción vieja ("clima laboral… muro de reconocimientos") y que el bloque nuevo es coherente con `hrkit.html`.

- [ ] **Step 3: Commit**
```bash
cd "B:/CC Agents/Voltio"
git add llms.txt
git commit -m "content: bloque HRKit real en llms.txt (para descubrimiento por LLMs)"
```

---

## Task 7: Voltio — `sitemap.xml` + footers de las demás páginas

**Files:**
- Modify: `B:\CC Agents\Voltio\sitemap.xml`
- Modify (footers): `index.html`, `proder.html`, `nosotros.html`, `en/index.html`, `en/proder.html`, `en/nosotros.html` (y `productos.html`/`en/productos.html` si aún tienen el link viejo)

- [ ] **Step 1: Agregar `hrkit.html` al `sitemap.xml`**

Después del bloque `<url>` de `productos.html` (raíz), insertar:
```xml
  <url>
    <loc>https://www.voltiodev.com/hrkit.html</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.voltiodev.com/hrkit.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.voltiodev.com/en/hrkit.html"/>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```
Y después del bloque de `en/productos.html`, insertar:
```xml
  <url>
    <loc>https://www.voltiodev.com/en/hrkit.html</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
```

- [ ] **Step 2: Actualizar los links de footer `productos.html#hrkit` → `hrkit.html`**

En cada archivo con footer, la columna "Productos"/"Products" tiene `<a href="productos.html#hrkit">HRKit</a>` (o `#hrkit` con ruta relativa). Cambiarlo a `hrkit.html`. Archivos a revisar: `index.html`, `proder.html`, `nosotros.html`, `productos.html`, y los de `en/`. En los de `en/`, la ruta es `hrkit.html` (misma carpeta `en/`).

Verificación de que no queda ninguno viejo (desde `B:/CC Agents/Voltio`):
```bash
grep -rn "productos.html#hrkit" --include=*.html .
```
Expected: sin resultados (o solo los que a propósito queden; el objetivo es 0).

- [ ] **Step 3: Verificar sitemap y links**

- Abrir `sitemap.xml` y confirmar que es XML válido y contiene las dos URLs nuevas.
- Desde varias páginas, hacer clic en el link HRKit del footer y confirmar que lleva a `hrkit.html`.

- [ ] **Step 4: Commit**
```bash
cd "B:/CC Agents/Voltio"
git add sitemap.xml index.html proder.html nosotros.html productos.html en/
git commit -m "content: HRKit en sitemap y links de footer a la pagina propia"
```

---

## Notas de cierre

- **Capturas**: pendientes de Beno (las saca después de pulir la UX). Cuando estén, se agrega una sección galería + lightbox a `hrkit.html`/`en/hrkit.html` (reutilizando el patrón de `proder.html`) y se llenan `screenshots`/`allScreenshots` en `projects.ts`.
- **Prueba social**: se agrega cuando haya testimonios reales de pilotos.
- **Deploy Voltio**: es hosting estático (Vercel). Confirmar con Beno si el push a `master` auto-deploya o si hay que correr deploy manual.
- **`.gitignore` de Voltio**: `node_modules/` no está ignorado (se coló en un commit y se revirtió). Considerar agregarlo en una tarea aparte; NO usar `git add -A` en este repo.

## Self-review (hecho)

- **Cobertura del spec**: Portfolio (Task 1) ✓; `hrkit.html` ES (Task 2) ✓ y EN (Task 3) ✓; `productos.html` ES/EN + JSON-LD + reorden (Tasks 4-5) ✓; `llms.txt` (Task 6) ✓; sitemap + footers (Task 7) ✓. Precios 4 tramos ✓; early access ✓; demo a Calendly (sin link directo) ✓; sin prueba social ✓; capturas fuera de alcance ✓; "no califica personas" no es bandera (aparece solo como detalle honesto en features de reportes) ✓; "dejá descansar al Excel" tono amable ✓.
- **Placeholders**: sin TBD/TODO; todo el copy está escrito.
- **Consistencia**: prefijo de clases `hrkit-` usado igual en ES/EN y en el CSS; nombres de badge (`producto__badge--dev`) y de precio (`producto__precio`) tomados del CSS real de Voltio; `btn--fuerza`/`btn--calma`/`btn--outline-calma` existen en proder.html.
