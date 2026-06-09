# Voltio Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing page estática de una sola página para Voltio, fiel a `Identidad Visual/Modelo.png`, publicada en GitHub + Vercel.

**Architecture:** Un `index.html` con 8 secciones ancladas, una hoja `css/styles.css` con design tokens (paleta muestreada de los PNG reales) y un `js/main.js` mínimo (menú móvil, reveal on scroll, formulario → mailto/WhatsApp). Sin build step, sin dependencias en runtime.

**Tech Stack:** HTML5, CSS3 (custom properties, grid/flex), JavaScript vanilla, Google Fonts (Poppins + Lora como reemplazos temporales de Pacaembu/Loretta), `gh` CLI y `vercel` CLI (ya autenticados como bdallago).

**Spec:** `docs/superpowers/specs/2026-06-09-voltio-landing-design.md`

---

## Design tokens (muestreados de los archivos reales — usar EXACTAMENTE estos)

| Token | Hex | Origen |
|---|---|---|
| `--calma` | `#01595A` | Voltio Calma.png |
| `--fuerza` | `#29B3B6` | Voltio Fuerza.png |
| `--idea` | `#FFF8E5` | Voltio Idea.png / fondos del Modelo |
| `--tierra` | `#2A1001` | Voltio Tierra.png |
| `--teal-medio` | `#236E6D` | título "Sobre" del Modelo |
| `--teal-apagado` | `#558D88` | panel derecho del form del Modelo |
| `--aqua-claro` | `#9DD8CF` | inputs del form del Modelo |

Assets de logos (en `Identidad Visual/Logos PNG/`): los **rayos sueltos** son `Recurso 5.png` (crema), `Recurso 7.png` (turquesa), `Recurso 9.png` (calma); los **rayos dentro de óvalo** son `Recurso 6.png` (crema), `Recurso 8.png` (turquesa), `Recurso 10.png` (calma). Logotipos completos: `Isologotipo/Voltio {Calma,Fuerza,Idea,Tierra}.png`.

Datos de contacto: mailto `bdallago01@gmail.com`, WhatsApp `https://wa.me/5493416289453`.

**Verificación visual en cada task:** servir con `npx -y serve -l 8123 .` (una sola vez, en background) y comparar contra `Identidad Visual/Modelo.png`. Donde diga "VISUAL", el ejecutor abre/screenshotea `http://localhost:8123` y verifica lo descrito.

---

### Task 1: Scaffold, assets y design tokens

**Files:**
- Create: `index.html`, `css/styles.css`, `js/main.js`
- Create (copia): `assets/logos/*.png`

- [ ] **Step 1: Crear estructura y copiar logos**

```powershell
New-Item -ItemType Directory -Force assets\logos, assets\img, assets\fonts, css, js | Out-Null
Copy-Item "Identidad Visual\Logos PNG\Isologotipo\*.png" assets\logos\
Copy-Item "Identidad Visual\Logos PNG\Isologo\100ppi\*.png" assets\logos\
Get-ChildItem assets\logos
```

Expected: 10 archivos PNG en `assets/logos`.

- [ ] **Step 2: Crear `index.html` (esqueleto completo)**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voltio — La fuerza que mueve tu negocio</title>
  <meta name="description" content="Voltio es una startup de soluciones de software: desarrollo web, aplicaciones a medida y automatización para tu negocio.">
  <link rel="icon" type="image/png" href="assets/logos/Recurso 10.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- TIPOGRAFÍAS TEMPORALES: Poppins ≈ Pacaembu, Lora ≈ Loretta.
       Al comprar las licencias reales, borrar este <link> y seguir las
       instrucciones del bloque @font-face en css/styles.css -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- NAV (Task 2) -->
  <header class="nav" id="inicio"></header>

  <main>
    <!-- HERO (Task 3) -->
    <section class="hero"></section>
    <!-- SOBRE NOSOTROS (Task 4) -->
    <section class="sobre" id="sobre-nosotros"></section>
    <!-- SERVICIOS (Task 5) -->
    <section class="servicios" id="servicios"></section>
    <!-- PRODUCTOS (Task 6) -->
    <section class="productos" id="productos"></section>
    <!-- CLIENTES (Task 7) -->
    <section class="clientes" id="clientes"></section>
    <!-- CONTACTO (Task 8) -->
    <section class="contacto" id="contacto"></section>
  </main>

  <!-- FOOTER (Task 2) -->
  <footer class="footer"></footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Crear `css/styles.css` con tokens y base**

```css
/* =====================================================================
   Voltio — estilos
   --------------------------------------------------------------------
   TIPOGRAFÍAS: hoy usamos alternativas gratuitas (Poppins ≈ Pacaembu,
   Lora ≈ Loretta). Cuando tengas las licencias reales:
     1. Copiá los archivos a assets/fonts/ con estos nombres:
        Pacaembu-Regular.woff2, Pacaembu-SemiBold.woff2,
        Loretta-Regular.woff2, Loretta-Italic.woff2
     2. Descomentá los @font-face de abajo.
     3. En :root cambiá 'Poppins' por 'Pacaembu' y 'Lora' por 'Loretta'.
     4. Borrá el <link> de Google Fonts en index.html.
   ===================================================================== */
/*
@font-face { font-family: 'Pacaembu'; src: url('../assets/fonts/Pacaembu-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Pacaembu'; src: url('../assets/fonts/Pacaembu-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'Loretta'; src: url('../assets/fonts/Loretta-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Loretta'; src: url('../assets/fonts/Loretta-Italic.woff2') format('woff2'); font-weight: 400; font-style: italic; font-display: swap; }
*/

:root {
  /* Paleta Voltio (muestreada de Identidad Visual) */
  --calma: #01595A;
  --fuerza: #29B3B6;
  --idea: #FFF8E5;
  --tierra: #2A1001;
  --teal-medio: #236E6D;
  --teal-apagado: #558D88;
  --aqua-claro: #9DD8CF;

  /* Tipografías (ver instrucciones arriba) */
  --font-titulos: 'Poppins', 'Trebuchet MS', sans-serif;
  --font-botones: 'Poppins', 'Trebuchet MS', sans-serif;
  --font-textos: 'Lora', Georgia, serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-textos);
  color: var(--calma);
  background: var(--idea);
  line-height: 1.6;
}

h1, h2, h3 { font-family: var(--font-titulos); line-height: 1.15; }

img { max-width: 100%; display: block; }

a { color: inherit; }

.container {
  width: min(1100px, 92%);
  margin-inline: auto;
}

/* Botones (Pacaembu SemiBold → Poppins 600) */
.btn {
  display: inline-block;
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
  padding: 0.8em 1.8em;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s ease, background-color 0.15s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn--calma { background: var(--calma); color: var(--idea); }
.btn--fuerza { background: var(--fuerza); color: var(--idea); }

/* Reveal on scroll (JS agrega .visible) */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 4: Crear `js/main.js` (solo reveal por ahora)**

```js
// Animación de aparición por sección
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

- [ ] **Step 5: Servir y verificar**

```powershell
# una sola vez, queda corriendo para todas las tasks
npx -y serve -l 8123 .
```

(en background) Luego: `Invoke-WebRequest http://localhost:8123 | Select-Object -ExpandProperty StatusCode` → Expected: `200`. VISUAL: página crema vacía sin errores en consola.

- [ ] **Step 6: Commit**

```powershell
git add index.html css js assets
git commit -m "feat: scaffold de la landing con design tokens y assets de marca"
```

---

### Task 2: Nav y Footer

**Files:**
- Modify: `index.html` (header y footer)
- Modify: `css/styles.css` (append)

- [ ] **Step 1: Reemplazar `<header class="nav" id="inicio"></header>` por:**

```html
<header class="nav" id="inicio">
  <div class="container nav__inner">
    <a href="#inicio" class="nav__logo" aria-label="Voltio — inicio">
      <img src="assets/logos/Recurso 10.png" alt="Isologo Voltio" width="34" height="44">
    </a>
    <button class="nav__toggle" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav__links" aria-label="Navegación principal">
      <a href="#sobre-nosotros">Sobre nosotros</a>
      <a href="#servicios">Servicios</a>
      <a href="#productos">Productos</a>
      <a href="#clientes">Clientes</a>
      <a href="#contacto">Contacto</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Reemplazar `<footer class="footer"></footer>` por:**

```html
<footer class="footer">
  <div class="container footer__inner">
    <img src="assets/logos/Voltio Idea.png" alt="Voltio" class="footer__logo" width="160">
    <p class="footer__tagline">La fuerza que <em>mueve tu negocio</em></p>
    <div class="footer__contacto">
      <a href="mailto:bdallago01@gmail.com">bdallago01@gmail.com</a>
      <a href="https://wa.me/5493416289453" target="_blank" rel="noopener">WhatsApp +54 9 341 628-9453</a>
    </div>
    <p class="footer__copy">© 2026 Voltio. Todos los derechos reservados.</p>
  </div>
</footer>
```

- [ ] **Step 3: Append a `css/styles.css`:**

```css
/* ---------- Nav ---------- */
/* En el Modelo la nav flota sobre el hero: fondo transparente, texto calma */
.nav {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 10;
  padding: 1rem 0;
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__links {
  display: flex;
  gap: 2rem;
}
.nav__links a {
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--calma);
}
.nav__links a:hover { color: var(--teal-medio); }
.nav__toggle { display: none; }

/* ---------- Footer ---------- */
.footer {
  background: var(--calma);
  color: var(--idea);
  padding: 3rem 0 2rem;
  text-align: center;
}
.footer__inner { display: grid; gap: 1rem; justify-items: center; }
.footer__logo { width: 160px; }
.footer__tagline { font-family: var(--font-textos); }
.footer__tagline em { font-style: italic; }
.footer__contacto { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
.footer__contacto a {
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--aqua-claro);
  text-decoration: none;
}
.footer__contacto a:hover { color: var(--fuerza); }
.footer__copy { font-size: 0.8rem; opacity: 0.7; }
```

- [ ] **Step 4: Verificar** — VISUAL en `http://localhost:8123`: nav arriba con isologo y 5 links en mayúsculas; footer verde oscuro con logotipo crema, tagline, mail y WhatsApp. Los links de WhatsApp/mail abren bien.

- [ ] **Step 5: Commit**

```powershell
git add index.html css/styles.css
git commit -m "feat: nav flotante y footer con datos de contacto"
```

---

### Task 3: Hero (fondo de campo + ilustración + logo + tagline)

**Files:**
- Create: `assets/img/campo.svg`, `assets/img/hero-persona.svg`
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Crear `assets/img/campo.svg`** (colinas verdes en duotono, reemplaza la foto del Modelo sin problemas de licencia):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#CBDDC0"/>
      <stop offset="1" stop-color="#A6C4A7"/>
    </linearGradient>
    <filter id="grano">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="1440" height="760" fill="url(#cielo)"/>
  <path d="M0 430 Q 360 330 720 410 T 1440 380 V760 H0 Z" fill="#7FA98B"/>
  <path d="M0 540 Q 420 440 860 530 T 1440 500 V760 H0 Z" fill="#5C8F74"/>
  <path d="M0 650 Q 480 560 960 640 T 1440 620 V760 H0 Z" fill="#3E7560"/>
  <rect width="1440" height="760" filter="url(#grano)" fill="transparent"/>
</svg>
```

- [ ] **Step 2: Crear `assets/img/hero-persona.svg`** (línea B/N estilo boceto: persona reclinada en silla de oficina, contorno blanco tipo sticker como en el Modelo):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 300" fill="none">
  <g stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF">
    <use href="#figura"/>
  </g>
  <g id="figura" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF">
    <!-- silla -->
    <path d="M150 270 L150 232 M118 270 H182 M150 232 Q104 232 100 180 L104 120 Q105 104 120 104 L150 106"/>
    <circle cx="126" cy="272" r="7"/><circle cx="174" cy="272" r="7"/>
    <!-- torso reclinado -->
    <path d="M120 112 Q160 96 196 116 L210 160 Q190 180 150 176 L122 160 Z"/>
    <!-- piernas cruzadas extendidas -->
    <path d="M205 162 Q250 170 282 150 M282 150 L296 158 M210 176 Q256 188 290 172 L302 180"/>
    <!-- cabeza -->
    <circle cx="226" cy="92" r="26"/>
    <path d="M214 84 Q226 76 238 84 M220 98 Q226 102 232 98"/>
    <!-- pelo -->
    <path d="M204 84 Q204 58 230 60 Q252 60 250 84"/>
    <!-- brazos detrás de la cabeza -->
    <path d="M200 110 Q188 86 206 72 M250 86 Q262 100 248 116"/>
  </g>
</svg>
```

(Nota: es una aproximación estilizada al boceto del Modelo; si el resultado visual no convence, simplificar a silueta y seguir — se puede reemplazar después por una ilustración Open Peeps real.)

- [ ] **Step 3: Reemplazar `<section class="hero"></section>` en `index.html` por:**

```html
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__ilustracion reveal">
      <img src="assets/img/hero-persona.svg" alt="Ilustración de una persona relajada en una silla de oficina" width="320" height="300">
    </div>
    <div class="hero__marca reveal">
      <img src="assets/logos/Voltio Calma.png" alt="Voltio" class="hero__logo" width="420">
      <p class="hero__tagline">
        <span class="hero__asterisco">*</span>La fuerza que
        <span class="hero__pill">mueve <strong>tu negocio</strong></span>
      </p>
      <a href="#contacto" class="btn btn--calma">Hablemos →</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Append a `css/styles.css`:**

```css
/* ---------- Hero ---------- */
.hero {
  min-height: 88vh;
  background: url('../assets/img/campo.svg') center / cover no-repeat;
  display: flex;
  align-items: center;
  padding: 7rem 0 4rem;
}
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  gap: 2rem;
}
.hero__ilustracion img { width: min(320px, 80%); margin-inline: auto; }
.hero__marca { display: grid; gap: 1.5rem; justify-items: start; }
.hero__logo { width: min(420px, 100%); }
.hero__tagline {
  font-family: var(--font-textos);
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: var(--idea);
}
.hero__asterisco { color: var(--fuerza); font-weight: 700; }
.hero__pill {
  display: inline-block;
  background: var(--calma);
  border-radius: 999px;
  padding: 0.1em 0.6em;
  font-style: italic;
}
.hero__pill strong { font-weight: 500; }
```

- [ ] **Step 5: Verificar** — VISUAL contra el tercio superior del Modelo: campo verde, ilustración a la izquierda, VOLTIO calma grande, tagline con pastilla, CTA. Comprobar que el CTA ancla a `#contacto`.

- [ ] **Step 6: Commit**

```powershell
git add index.html css/styles.css assets/img
git commit -m "feat: hero con campo, ilustracion, logo y tagline del Modelo"
```

---

### Task 4: Sobre nosotros

**Files:**
- Create: `assets/img/nosotros-retrato.svg` (descarga DiceBear estilo Open Peeps)
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Descargar retrato estilo Open Peeps (CC0) vía DiceBear:**

```powershell
Invoke-WebRequest "https://api.dicebear.com/9.x/open-peeps/svg?seed=Beno&accessories=glasses2&head=twists2" -OutFile assets\img\nosotros-retrato.svg
(Get-Item assets\img\nosotros-retrato.svg).Length
```

Expected: archivo > 2000 bytes. Si la descarga falla (sin red), usar de fallback una copia de `hero-persona.svg` y anotar para reemplazar.

- [ ] **Step 2: Reemplazar `<section class="sobre" id="sobre-nosotros"></section>` por:**

```html
<section class="sobre" id="sobre-nosotros">
  <div class="container sobre__inner">
    <div class="sobre__texto reveal">
      <h2 class="titulo-seccion">
        <img src="assets/logos/Recurso 7.png" alt="" class="titulo-rayo" width="22">
        <span class="titulo-seccion__liviano">Sobre</span><br>
        <span class="titulo-seccion__fuerte">nosotros</span>
      </h2>
      <p><strong><em>Voltio</em></strong> es una startup unipersonal de desarrollo de software, fundada por Beno (vibecoder y web developer).</p>
      <p>Nació de una idea simple: la tecnología tiene que trabajar para tu negocio, y no al revés. Por eso cada proyecto arranca escuchando el problema real antes de escribir una sola línea de código.</p>
      <p>Trabajamos cerca, en lenguaje claro y sin vueltas: entendemos lo que necesitás, lo construimos y te acompañamos después de la entrega.</p>
    </div>
    <div class="sobre__ilustracion reveal">
      <img src="assets/img/nosotros-retrato.svg" alt="Retrato ilustrado de Beno, fundador de Voltio" width="260" height="260">
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append a `css/styles.css`:**

```css
/* ---------- Títulos de sección (patrón del Modelo) ---------- */
.titulo-seccion {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  margin-bottom: 1.5rem;
  position: relative;
}
.titulo-rayo {
  position: absolute;
  left: -1.6rem;
  top: 0.2em;
  width: 22px;
}
.titulo-seccion__liviano { color: var(--fuerza); font-weight: 400; }
.titulo-seccion__fuerte { color: var(--calma); font-weight: 700; }

/* ---------- Sobre nosotros ---------- */
.sobre { padding: 5rem 0; background: var(--idea); }
.sobre__inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: center;
}
.sobre__texto p { margin-bottom: 1rem; max-width: 48ch; }
.sobre__ilustracion img { width: min(260px, 70%); margin-inline: auto; }
```

- [ ] **Step 4: Verificar** — VISUAL: título "Sobre / nosotros" en dos colores con rayo, texto de Beno, retrato a la derecha. Comparar con la franja media del Modelo.

- [ ] **Step 5: Commit**

```powershell
git add index.html css/styles.css assets/img
git commit -m "feat: seccion sobre nosotros con retrato ilustrado"
```

---

### Task 5: Servicios ("SOLUCIONES a medida")

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Reemplazar `<section class="servicios" id="servicios"></section>` por:**

```html
<section class="servicios" id="servicios">
  <div class="container">
    <div class="servicios__cabecera">
      <h2 class="servicios__titulo reveal">
        <span class="servicios__caps">Soluciones</span><br>
        <span class="servicios__italica">a medida</span>
      </h2>
      <div class="servicios__burbuja reveal">
        <p>Damos <em>respuesta</em> a los problemas a través de ideas <em>pensadas</em> para tu negocio</p>
      </div>
    </div>
    <div class="servicios__grid">
      <article class="servicio reveal">
        <img src="assets/logos/Recurso 8.png" alt="" width="30" height="40">
        <h3>Desarrollo web</h3>
        <p>Sitios y plataformas web rápidos, modernos y pensados para convertir visitas en clientes.</p>
      </article>
      <article class="servicio reveal">
        <img src="assets/logos/Recurso 8.png" alt="" width="30" height="40">
        <h3>Aplicaciones a medida</h3>
        <p>Software que se adapta a tus procesos: gestión, paneles internos y herramientas hechas para vos.</p>
      </article>
      <article class="servicio reveal">
        <img src="assets/logos/Recurso 8.png" alt="" width="30" height="40">
        <h3>Automatización e integraciones</h3>
        <p>Conectamos tus sistemas y automatizamos tareas repetitivas para que ganes tiempo todos los días.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append a `css/styles.css`:**

```css
/* ---------- Servicios ---------- */
.servicios { padding: 5rem 0; background: var(--idea); }
.servicios__cabecera {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 3rem;
  /* patrón de rayos en semitono, como el Modelo */
  background-image: url('../assets/logos/Recurso 7.png');
  background-size: 26px;
  background-repeat: repeat;
  background-position: right center;
  background-blend-mode: soft-light;
}
.servicios__titulo { font-size: clamp(2.4rem, 6vw, 3.6rem); background: var(--idea); width: fit-content; padding-right: 1rem; }
.servicios__caps { color: var(--calma); font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; }
.servicios__italica { font-family: var(--font-textos); font-style: italic; font-weight: 500; color: var(--calma); }
.servicios__burbuja {
  background: var(--fuerza);
  color: var(--idea);
  font-family: var(--font-botones);
  font-weight: 600;
  padding: 1.5rem 2rem;
  border-radius: 1.5rem 1.5rem 1.5rem 0.2rem;
  max-width: 34ch;
  justify-self: end;
}
.servicios__burbuja em { font-family: var(--font-textos); font-style: italic; }
.servicios__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.servicio {
  background: #FFFDF4;
  border: 2px solid var(--calma);
  border-radius: 1.2rem;
  padding: 2rem 1.5rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.servicio:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(1, 89, 90, 0.15); }
.servicio img { width: 30px; margin-bottom: 1rem; }
.servicio h3 { color: var(--calma); font-weight: 600; margin-bottom: 0.5rem; font-size: 1.15rem; }
.servicio p { font-size: 0.95rem; }
```

- [ ] **Step 3: Verificar** — VISUAL: título "SOLUCIONES / a medida" (caps + itálica), burbuja turquesa con el texto del Modelo, patrón de rayos sutil, 3 tarjetas con hover. Si el patrón de rayos satura, bajar `background-size` o limitarlo con un pseudo-elemento.

- [ ] **Step 4: Commit**

```powershell
git add index.html css/styles.css
git commit -m "feat: seccion servicios con titulo y burbuja del Modelo"
```

---

### Task 6: Productos

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Reemplazar `<section class="productos" id="productos"></section>` por:**

```html
<section class="productos" id="productos">
  <div class="container">
    <h2 class="titulo-seccion reveal">
      <img src="assets/logos/Recurso 7.png" alt="" class="titulo-rayo" width="22">
      <span class="titulo-seccion__liviano">Nuestros</span><br>
      <span class="titulo-seccion__fuerte">productos</span>
    </h2>
    <div class="productos__grid">
      <!-- EDITAR: nombres y descripciones de productos reales -->
      <article class="producto reveal">
        <span class="producto__badge producto__badge--dev">En desarrollo</span>
        <h3>Voltio Gestión</h3>
        <p>Panel de administración todo-en-uno para pymes: clientes, ventas y reportes en un solo lugar, sin planillas eternas.</p>
      </article>
      <article class="producto reveal">
        <span class="producto__badge">Disponible</span>
        <h3>Voltio Turnos</h3>
        <p>Sistema de reservas y turnos online para negocios de servicios. Tus clientes reservan solos, vos te dedicás a atenderlos.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append a `css/styles.css`:**

```css
/* ---------- Productos ---------- */
.productos { padding: 5rem 0; background: var(--idea); }
.productos__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.producto {
  position: relative;
  background: var(--calma);
  color: var(--idea);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem 2rem;
}
.producto h3 { font-weight: 700; font-size: 1.5rem; margin-bottom: 0.6rem; }
.producto p { font-size: 0.98rem; opacity: 0.92; }
.producto__badge {
  position: absolute;
  top: -0.9rem;
  left: 2rem;
  background: var(--fuerza);
  color: var(--idea);
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.35em 1em;
  border-radius: 999px;
}
.producto__badge--dev { background: var(--teal-apagado); }
```

- [ ] **Step 3: Verificar** — VISUAL: 2 tarjetas verde oscuro con badge turquesa flotante, mismo lenguaje visual que el resto.

- [ ] **Step 4: Commit**

```powershell
git add index.html css/styles.css
git commit -m "feat: seccion productos con tarjetas editables"
```

---

### Task 7: Clientes (testimonios)

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Reemplazar `<section class="clientes" id="clientes"></section>` por:**

```html
<section class="clientes" id="clientes">
  <div class="container">
    <h2 class="titulo-seccion titulo-seccion--claro reveal">
      <img src="assets/logos/Recurso 5.png" alt="" class="titulo-rayo" width="22">
      <span class="titulo-seccion__liviano">Clientes que</span><br>
      <span class="titulo-seccion__fuerte">confían</span>
    </h2>
    <div class="clientes__grid">
      <!-- EDITAR: reemplazar por testimonios reales -->
      <figure class="testimonio reveal">
        <blockquote>«Voltio entendió exactamente lo que necesitábamos y lo resolvió en semanas, no en meses.»</blockquote>
        <figcaption>Mariana L. — Estudio contable</figcaption>
      </figure>
      <figure class="testimonio reveal">
        <blockquote>«Automatizaron la carga de pedidos y hoy ahorramos horas todos los días. Comunicación clara de principio a fin.»</blockquote>
        <figcaption>Jorge P. — Distribuidora mayorista</figcaption>
      </figure>
      <figure class="testimonio reveal">
        <blockquote>«Nuestra web pasó de ser una tarjeta de presentación a traernos consultas todas las semanas.»</blockquote>
        <figcaption>Sofía R. — Estudio de arquitectura</figcaption>
      </figure>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append a `css/styles.css`:**

```css
/* ---------- Clientes ---------- */
.clientes { padding: 5rem 0; background: var(--calma); }
.titulo-seccion--claro .titulo-seccion__liviano { color: var(--aqua-claro); }
.titulo-seccion--claro .titulo-seccion__fuerte { color: var(--idea); }
.clientes__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.testimonio {
  background: var(--idea);
  border-radius: 1.2rem;
  padding: 2rem 1.5rem;
  display: grid;
  gap: 1rem;
  align-content: space-between;
}
.testimonio blockquote {
  font-style: italic;
  font-size: 1rem;
  color: var(--calma);
}
.testimonio figcaption {
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--teal-medio);
}
```

- [ ] **Step 3: Verificar** — VISUAL: franja verde oscuro con título claro y 3 tarjetas crema de testimonios.

- [ ] **Step 4: Commit**

```powershell
git add index.html css/styles.css
git commit -m "feat: seccion clientes con testimonios editables"
```

---

### Task 8: Contacto (réplica del panel del Modelo + mailto/WhatsApp)

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

- [ ] **Step 1: Reemplazar `<section class="contacto" id="contacto"></section>` por:**

```html
<section class="contacto" id="contacto">
  <div class="contacto__rayos" aria-hidden="true">
    <img src="assets/logos/Recurso 7.png" alt="" width="26">
    <img src="assets/logos/Recurso 7.png" alt="" width="26">
    <img src="assets/logos/Recurso 7.png" alt="" width="26">
  </div>
  <div class="container">
    <h2 class="contacto__banner reveal">Encontremos la <em>solución</em> juntos</h2>
    <form id="form-contacto" class="contacto__panel reveal" novalidate>
      <div class="contacto__col contacto__col--datos">
        <label for="f-nombre">Nombre</label>
        <input id="f-nombre" name="nombre" type="text" autocomplete="name" required>
        <label for="f-empresa">Empresa</label>
        <input id="f-empresa" name="empresa" type="text" autocomplete="organization">
      </div>
      <div class="contacto__col contacto__col--mensaje">
        <label for="f-mensaje">¿Cómo te podemos ayudar?</label>
        <textarea id="f-mensaje" name="mensaje" rows="7" required></textarea>
      </div>
      <div class="contacto__acciones">
        <button type="submit" class="btn btn--calma">Enviar consulta</button>
        <a class="btn btn--fuerza" target="_blank" rel="noopener"
           href="https://wa.me/5493416289453?text=%C2%A1Hola%20Voltio!%20Quiero%20hacer%20una%20consulta.">
          Escribinos por WhatsApp
        </a>
        <p class="contacto__error" role="alert" hidden>Completá tu nombre y el mensaje, por favor.</p>
      </div>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Append a `css/styles.css`:**

```css
/* ---------- Contacto ---------- */
.contacto {
  background: var(--fuerza);
  padding: 0 0 4rem;
  position: relative;
}
.contacto__rayos {
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
  padding: 0 8% 1rem;
  transform: translateY(-30%);
}
.contacto__banner {
  background: var(--calma);
  color: var(--idea);
  font-family: var(--font-titulos);
  font-weight: 600;
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  width: fit-content;
  margin: 0 auto 2.5rem;
  padding: 0.5em 1.4em;
  border-radius: 999px;
}
.contacto__banner em { font-family: var(--font-textos); font-style: italic; }
.contacto__panel {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  border-radius: 1.5rem;
  overflow: hidden;
}
.contacto__col { padding: 2.5rem 2rem; display: grid; gap: 0.5rem; align-content: start; }
.contacto__col--datos { background: var(--fuerza); }
.contacto__col--mensaje { background: var(--teal-apagado); }
.contacto__col label {
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--idea);
  margin-top: 0.8rem;
}
.contacto__col input,
.contacto__col textarea {
  background: var(--aqua-claro);
  border: none;
  border-radius: 0.6rem;
  padding: 0.7em 1em;
  font-family: var(--font-textos);
  font-size: 1rem;
  color: var(--calma);
}
.contacto__col input:focus,
.contacto__col textarea:focus { outline: 3px solid var(--calma); }
.contacto__acciones {
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  padding: 1.5rem 2rem 0;
}
.contacto__error {
  color: var(--idea);
  background: var(--tierra);
  font-family: var(--font-botones);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.4em 1em;
  border-radius: 999px;
}
```

- [ ] **Step 3: Append a `js/main.js`:**

```js
// Formulario de contacto: arma un mailto con los campos cargados
const formContacto = document.querySelector('#form-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = formContacto.nombre.value.trim();
    const empresa = formContacto.empresa.value.trim();
    const mensaje = formContacto.mensaje.value.trim();
    const error = formContacto.querySelector('.contacto__error');
    if (!nombre || !mensaje) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    const asunto = `Consulta desde la web — ${nombre}${empresa ? ` (${empresa})` : ''}`;
    const cuerpo = `Nombre: ${nombre}\nEmpresa: ${empresa || '-'}\n\n${mensaje}`;
    window.location.href =
      `mailto:bdallago01@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  });
}
```

- [ ] **Step 4: Verificar** — VISUAL contra el cuarto inferior del Modelo: banner pill verde con itálica, panel partido turquesa/teal, labels caps, inputs aqua. Funcional: (a) enviar vacío muestra el error; (b) con nombre+mensaje, el navegador intenta abrir `mailto:` con asunto y cuerpo correctos; (c) el botón de WhatsApp abre `wa.me/5493416289453` con el texto prearmado.

- [ ] **Step 5: Commit**

```powershell
git add index.html css/styles.css js/main.js
git commit -m "feat: seccion contacto fiel al Modelo con mailto y WhatsApp"
```

---

### Task 9: Menú móvil + responsive

**Files:**
- Modify: `css/styles.css`, `js/main.js`

- [ ] **Step 1: Append a `js/main.js`:**

```js
// Menú hamburguesa en móvil
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const abierto = links.classList.toggle('nav__links--abierto');
    toggle.setAttribute('aria-expanded', String(abierto));
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('nav__links--abierto');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}
```

- [ ] **Step 2: Append a `css/styles.css`:**

```css
/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .nav__toggle {
    display: grid;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
  }
  .nav__toggle span {
    width: 24px;
    height: 3px;
    border-radius: 2px;
    background: var(--calma);
  }
  .nav__links {
    display: none;
    position: absolute;
    top: 100%;
    right: 4%;
    background: var(--calma);
    border-radius: 1rem;
    padding: 1.2rem 1.6rem;
    flex-direction: column;
    gap: 1rem;
  }
  .nav__links--abierto { display: flex; }
  .nav__links--abierto a { color: var(--idea); }

  .hero__inner { grid-template-columns: 1fr; text-align: center; }
  .hero__marca { justify-items: center; }
  .hero__ilustracion { order: 2; }

  .sobre__inner,
  .servicios__cabecera,
  .productos__grid,
  .clientes__grid { grid-template-columns: 1fr; }
  .servicios__burbuja { justify-self: start; }
  .contacto__panel { grid-template-columns: 1fr; }
  .titulo-rayo { left: -0.2rem; top: -1.4rem; }
  .titulo-seccion { padding-top: 1rem; }
}
```

- [ ] **Step 3: Verificar** — VISUAL con viewport angosto (DevTools o ventana chica): hamburguesa funciona, secciones apilan en una columna, nada desborda horizontalmente.

- [ ] **Step 4: Commit**

```powershell
git add css/styles.css js/main.js
git commit -m "feat: menu movil y layout responsive"
```

---

### Task 10: Verificación final contra el Modelo

**Files:** ninguno nuevo (ajustes menores permitidos en `css/styles.css`)

- [ ] **Step 1: Revisión sección por sección** — VISUAL: recorrer la página completa en desktop y móvil comparando con `Identidad Visual/Modelo.png`. Checklist: nav flotante ✓, hero (campo + ilustración + logo + pill) ✓, sobre nosotros (dos colores + retrato) ✓, soluciones a medida (caps + itálica + burbuja) ✓, productos ✓, clientes ✓, contacto (banner pill + panel partido) ✓, footer ✓. Ajustar espaciados/tamaños que se desvíen del Modelo.

- [ ] **Step 2: Consola y enlaces** — abrir DevTools: 0 errores de consola, 0 requests 404. Probar los 5 anclajes de la nav.

- [ ] **Step 3: Commit de ajustes (si hubo)**

```powershell
git add -A
git commit -m "polish: ajustes visuales contra el Modelo"
```

---

### Task 11: Repo en GitHub

**Files:** ninguno

- [ ] **Step 1: Crear repo y pushear** (gh ya autenticado como bdallago):

```powershell
gh repo create voltio-landing --public --source . --remote origin --push
```

Expected: salida con `https://github.com/bdallago/voltio-landing` y push de la rama `master`.

- [ ] **Step 2: Verificar**

```powershell
gh repo view bdallago/voltio-landing --json url,defaultBranchRef
```

Expected: JSON con la URL y la rama por defecto.

---

### Task 12: Deploy en Vercel

**Files:**
- Create: `.vercel/` (generado por el CLI, ya ignorado en `.gitignore`)

- [ ] **Step 1: Crear el proyecto y linkear** (vercel ya autenticado como bdallago):

```powershell
vercel link --yes --project voltio-landing
```

Expected: `.vercel/project.json` creado.

- [ ] **Step 2: Conectar el repo de GitHub para deploys automáticos:**

```powershell
vercel git connect
```

Expected: mensaje `Connected GitHub repository bdallago/voltio-landing`.

- [ ] **Step 3: Deploy a producción:**

```powershell
vercel --prod
```

Expected: URL `https://voltio-landing-*.vercel.app` (o el dominio asignado). Abrirla y verificar que la página carga igual que en local.

- [ ] **Step 4: Verificación final** — `Invoke-WebRequest <url-produccion>` → StatusCode 200; revisar visualmente la URL de producción en desktop y móvil. Informar la URL al usuario.

---

## Self-review (hecho al escribir el plan)

- **Cobertura del spec:** nav ✓ (T2), hero ✓ (T3), sobre nosotros ✓ (T4), servicios ✓ (T5), productos ✓ (T6), clientes ✓ (T7), contacto mailto+WhatsApp ✓ (T8), footer ✓ (T2), responsive + reduced-motion ✓ (T1/T9), tipografías temporales documentadas ✓ (T1), GitHub ✓ (T11), Vercel ✓ (T12), verificación visual ✓ (T10).
- **Sin placeholders:** todo el código está completo; los textos marcados `<!-- EDITAR -->` son contenido editable por diseño (decisión del usuario), no huecos del plan.
- **Consistencia:** clases CSS usadas en HTML están definidas en los append correspondientes; `#form-contacto`, `.nav__toggle`, `.nav__links`, `.reveal` coinciden entre HTML, CSS y JS.
- **Riesgo conocido:** `hero-persona.svg` es una aproximación dibujada a mano; si no convence visualmente, simplificar a silueta (decisión registrada en T3) — no bloquea el resto.
