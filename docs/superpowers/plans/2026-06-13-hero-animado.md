# Hero Animado — Voltio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el hero actual (JPG de fondo) por un hero animado en loop infinito con fondo negro, cables eléctricos SVG y el logo de Voltio iluminándose, usando GSAP via CDN.

**Architecture:** El hero se compone de tres capas apiladas en flexbox columna: (1) el logo SVG incrustado inline, (2) el CTA, (3) un SVG de cables + botón de encendido. GSAP controla un timeline con `repeat(-1)` que anima stroke-dashoffset en los cables y opacity/glow en el logo. El nav existente (`position: absolute`) flota sin cambios sobre el hero.

**Tech Stack:** HTML/CSS/JS vanilla · GSAP 3 via CDN (`https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`)

---

## Archivos afectados

| Archivo | Acción |
|---------|--------|
| `index.html` | Modificar sección `.hero`: nuevo HTML, inline SVG logo, inline SVG cables, agregar GSAP CDN |
| `css/styles.css` | Reemplazar estilos del hero (fondo negro, layout columna, quitar JPG) |
| `js/hero-anim.js` | Crear — toda la lógica GSAP del hero |
| `js/main.js` | Sin cambios |

---

## Task 1: CSS del hero — fondo negro y layout columna

**Files:**
- Modify: `css/styles.css` (bloque `.hero` y clases relacionadas, líneas ~149-170)

- [ ] **Step 1: Reemplazar el bloque hero en `css/styles.css`**

Encontrar el bloque actual que empieza con `/* ---------- Hero ---------- */` y reemplazarlo por:

```css
/* ---------- Hero ---------- */
.hero {
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero__anim {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 0 1.5rem;
}
.hero__logo-wrap {
  opacity: 0;
}
.hero__logo-wrap svg {
  width: min(520px, 88vw);
  display: block;
}
.hero__cta {
  opacity: 0;
}
.hero__cables {
  width: min(360px, 75vw);
  overflow: visible;
}
```

- [ ] **Step 2: Eliminar regla responsive obsoleta del hero**

En el bloque `@media` del archivo, eliminar la línea que dice:
```css
  .hero__content { align-items: center; text-align: center; }
```
(ya no existe `.hero__content`)

- [ ] **Step 3: Verificar en el navegador**

Recargar `http://localhost:52997`. El hero debe verse negro puro y las secciones de abajo (sobre nosotros, servicios, etc.) deben seguir intactas.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: hero css — fondo negro y layout columna para animación"
```

---

## Task 2: HTML del hero — inline SVGs y estructura

**Files:**
- Modify: `index.html` (sección `.hero`, líneas ~39-54)

- [ ] **Step 1: Reemplazar la sección `.hero` en `index.html`**

Encontrar:
```html
    <!-- HERO (Task 3) -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <h1 class="sr-only">Voltio — La fuerza que mueve tu negocio</h1>
          <a href="#contacto" class="btn btn--calma reveal">Hablemos →</a>
        </div>
      </div>
    </section>
```

Reemplazar por:
```html
    <!-- HERO animado -->
    <section class="hero" id="inicio-hero">
      <div class="hero__anim">

        <!-- Logo Voltio incrustado inline para animar sus paths con GSAP -->
        <div class="hero__logo-wrap" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 557.78 266.53">
            <defs>
              <style>
                .vl-fill { fill: #fff8e5; }
                .vl-mark { fill: #01595a; }
              </style>
            </defs>
            <!-- Tagline -->
            <g class="vl-tagline">
              <text fill="#fff8e5" font-family="Poppins, sans-serif" font-style="italic" font-size="62" x="0" y="182">*La fuerza que mueve</text>
              <text fill="#fff8e5" font-family="Poppins, sans-serif" font-style="italic" font-size="86" x="181" y="247">tu negocio</text>
            </g>
            <!-- Wordmark VOLTIO -->
            <g class="vl-wordmark">
              <path class="vl-mark" d="M31.76,8.26l28.07,73.5L87.77,8.26h16.74l-35.86,94.01h-18.25L14.52,8.26h17.24Z"/>
              <path class="vl-mark" d="M197.12,55.33c0,30.21-18.62,48.2-44.8,48.2s-44.68-18-44.68-48.2S126.27,7,152.33,7s44.8,18,44.8,48.33ZM124.39,55.33c0,21.52,12.83,32.97,27.94,32.97s28.06-11.45,28.06-32.97-12.96-32.98-28.06-32.98-27.94,11.33-27.94,32.98Z"/>
              <path class="vl-mark" d="M229.71,8.26v78.65h45.81v15.35h-62.04V8.26h16.24Z"/>
              <path class="vl-mark" d="M342.22,8.26v15.35h-29.7v78.66h-16.24V23.61h-29.57v-15.35h75.51Z"/>
              <path class="vl-mark" d="M371.03,8.26v94.01h-16.24V8.26h16.24Z"/>
              <path class="vl-mark" d="M432.07,7c-26.05,0-44.68,18-44.68,48.33s18.63,48.2,44.68,48.2,44.8-18,44.8-48.2-18.62-48.33-44.8-48.33ZM411.31,97.43c-.29-3.82-.46-12.78,4.46-22.55,4.9-9.74,12.18-14.94,15.42-16.99-12.26-.33-24.51-.66-36.77-.99,18.59-14.6,37.17-29.2,55.76-43.8.79,3.31,2.59,12.83-1.82,23.57-3.92,9.55-10.62,14.84-13.48,16.86,11.65.27,23.31.55,34.96.82-19.51,14.36-39.02,28.72-58.52,43.08Z"/>
            </g>
          </svg>
        </div>

        <!-- h1 accesible oculto visualmente -->
        <h1 class="sr-only">Voltio — La fuerza que mueve tu negocio</h1>

        <!-- CTA — siempre por encima de la animación -->
        <a href="#contacto" class="btn btn--calma hero__cta">Hablemos →</a>

        <!-- SVG de cables y botón de encendido -->
        <svg class="hero__cables" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Cable vertical central: sube desde el botón -->
          <path class="cable cable--v" d="M200,170 L200,10" stroke="#2D5BFF" stroke-width="2" stroke-linecap="round"/>
          <!-- Cable rama izquierda -->
          <path class="cable cable--l" d="M200,80 L60,10" stroke="#2D5BFF" stroke-width="2" stroke-linecap="round"/>
          <!-- Cable rama derecha -->
          <path class="cable cable--r" d="M200,80 L340,10" stroke="#2D5BFF" stroke-width="2" stroke-linecap="round"/>
          <!-- Botón de encendido -->
          <g class="power-btn">
            <circle cx="200" cy="176" r="20" stroke="#2D5BFF" stroke-width="2"/>
            <line x1="200" y1="163" x2="200" y2="174" stroke="#2D5BFF" stroke-width="3" stroke-linecap="round"/>
            <path d="M189,166 A15,15 0 1,0 211,166" stroke="#2D5BFF" stroke-width="2.5" stroke-linecap="round"/>
          </g>
        </svg>

      </div>
    </section>
```

- [ ] **Step 2: Agregar GSAP CDN antes del cierre `</body>`**

Justo antes de `<script src="js/main.js"></script>`, agregar:
```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="js/hero-anim.js"></script>
```

- [ ] **Step 3: Verificar en el navegador**

Recargar `http://localhost:52997`. Debe verse:
- Hero negro con el wordmark VOLTIO y el tagline (ambos estáticos por ahora, opacity 0 porque CSS lo setea)
- El botón CTA y los cables del SVG en la parte inferior
- Sin errores en consola (F12)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: hero html — inline SVGs logo y cables para animación GSAP"
```

---

## Task 3: Animación GSAP — `js/hero-anim.js`

**Files:**
- Create: `js/hero-anim.js`

- [ ] **Step 1: Crear `js/hero-anim.js` con el timeline completo**

```javascript
(function () {
  // Salir si ?noanim está en la URL (modo QA/capturas)
  if (location.search.includes('noanim')) return;

  const logoWrap = document.querySelector('.hero__logo-wrap');
  const wordmark = document.querySelector('.vl-wordmark');
  const tagline  = document.querySelector('.vl-tagline');
  const cta      = document.querySelector('.hero__cta');
  const powerBtn = document.querySelector('.power-btn');
  const cables   = document.querySelectorAll('.cable');

  if (!logoWrap || !powerBtn) return;

  // --- Setup inicial: todo invisible, cables sin trazar ---
  gsap.set([logoWrap, cta, powerBtn], { opacity: 0 });
  gsap.set([wordmark, tagline], { opacity: 0 });

  cables.forEach((cable) => {
    const len = cable.getTotalLength();
    gsap.set(cable, {
      strokeDasharray: len,
      strokeDashoffset: len,
      opacity: 1,
    });
  });

  // --- Timeline principal ---
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

  // 1. Botón de encendido aparece
  tl.to(powerBtn, { opacity: 1, duration: 0.4, ease: 'power2.out' });

  // 2. Pulso del botón — glow azul
  tl.to(powerBtn, {
    filter: 'drop-shadow(0 0 8px #2D5BFF)',
    duration: 0.5,
    ease: 'power2.inOut',
  });

  // 3. Cables suben (stroke-dashoffset → 0) en cascada
  tl.to('.cable--v', {
    strokeDashoffset: 0,
    duration: 0.7,
    ease: 'power2.inOut',
  }, '-=0.1');

  tl.to(['.cable--l', '.cable--r'], {
    strokeDashoffset: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    stagger: 0.08,
  }, '-=0.3');

  // 4. Logo aparece con glow azul
  tl.to(logoWrap, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  tl.to(wordmark, {
    opacity: 1,
    filter: 'drop-shadow(0 0 14px #2D5BFF)',
    duration: 0.5,
    ease: 'power2.out',
  }, '-=0.2');

  // 5. Tagline fade in
  tl.to(tagline, { opacity: 1, duration: 0.4, ease: 'power2.out' });

  // 6. CTA aparece
  tl.to(cta, { opacity: 1, duration: 0.3, ease: 'power2.out' });

  // 7. Pausa visible
  tl.to({}, { duration: 1.2 });

  // 8. Fade out de todo
  tl.to([logoWrap, cta, powerBtn], {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
  });

  // Reset cables para el próximo loop
  tl.call(() => {
    cables.forEach((cable) => {
      const len = cable.getTotalLength();
      gsap.set(cable, { strokeDashoffset: len });
    });
    gsap.set([wordmark, tagline], { opacity: 0, filter: 'none' });
    gsap.set(powerBtn, { filter: 'none' });
  });

  // Pausa mínima antes de reiniciar
  tl.to({}, { duration: 0.3 });
})();
```

- [ ] **Step 2: Verificar la animación en el navegador**

Recargar `http://localhost:52997`. Debés ver:

1. Hero negro
2. El botón de encendido (círculo con ícono) aparece en la parte inferior
3. Glow azul en el botón
4. Cables azules suben desde el botón hacia arriba
5. Logo VOLTIO + tagline se iluminan con glow azul
6. Aparece el botón "Hablemos →"
7. Todo hace fade out
8. El loop se repite suavemente

Si el loop se rompe o hay saltos: abrir DevTools (F12) → Console para ver errores.

- [ ] **Step 3: Verificar responsive en mobile**

En DevTools, activar vista mobile (iPhone SE o similar). Confirmar que:
- El logo escala con `min(520px, 88vw)` sin desbordar
- Los cables escalan con `min(360px, 75vw)`
- El botón CTA es tapeable

- [ ] **Step 4: Commit**

```bash
git add js/hero-anim.js
git commit -m "feat: hero — animación GSAP loop infinito cables + logo"
```

---

## Task 4: Ajuste de color del wordmark para fondo negro

**Files:**
- Modify: `index.html` (SVG inline del logo)

El wordmark usa `fill: #01595a` (verde oscuro), que sobre negro queda poco legible antes de que el glow lo ilumine. Hay que cambiarlo a crema para que el logo sea legible una vez que aparece.

- [ ] **Step 1: Cambiar la clase `.vl-mark` en el SVG inline**

En `index.html`, dentro del `<defs>` del SVG del logo, cambiar:
```css
.vl-mark { fill: #01595a; }
```
por:
```css
.vl-mark { fill: #fff8e5; }
```

- [ ] **Step 2: Verificar en el navegador**

Recargar. El wordmark VOLTIO debe aparecer en crema (`#fff8e5`) al iluminarse, igual que el tagline. El glow azul sigue funcionando sobre el color crema.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: wordmark en crema para legibilidad sobre fondo negro"
```

---

## Task 5: Nav — asegurar que flota sobre el hero negro

**Files:**
- Modify: `css/styles.css` (bloque `.nav`)

- [ ] **Step 1: Verificar que el nav es visible sobre negro**

El nav ya tiene `position: absolute`. Sobre el hero negro el logo y los links deben ser legibles. Si el logo (isologo PNG) se pierde sobre negro, agregar un filtro CSS.

Abrir `http://localhost:52997` y revisar el nav. Si el isologo PNG es oscuro y no se ve:

En `css/styles.css`, dentro de `.nav__logo img`, agregar:
```css
.nav__logo img { filter: brightness(0) invert(1); }
```

Si ya se ve bien, saltar este step.

- [ ] **Step 2: Commit (solo si se hizo el cambio)**

```bash
git add css/styles.css
git commit -m "fix: nav logo visible sobre hero negro"
```

---

## Task 6: Smoke test final y limpieza

- [ ] **Step 1: Verificar el flujo completo**

En `http://localhost:52997`:
- [ ] Hero animado funciona en loop
- [ ] Click en "Hablemos →" lleva a la sección contacto
- [ ] Scroll hacia abajo muestra todas las secciones intactas
- [ ] Menú hamburguesa funciona en mobile
- [ ] `?noanim` en la URL desactiva la animación GSAP (la página es usable sin JS)

- [ ] **Step 2: Verificar que `.superpowers/` está en `.gitignore`**

```bash
cat .gitignore | grep superpowers
```

Si no aparece, agregar al `.gitignore`:
```
.superpowers/
```

```bash
git add .gitignore
git commit -m "chore: ignorar carpeta .superpowers del brainstorming"
```

- [ ] **Step 3: Commit final si quedan cambios sueltos**

```bash
git status
# Si hay algo sin commitear:
git add -A
git commit -m "chore: limpieza hero animado"
```
