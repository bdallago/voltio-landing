# Hero Animado — Voltio

**Fecha:** 2026-06-13  
**Stack:** HTML/CSS/JS vanilla + GSAP via CDN  
**Archivo de logo:** `public/Recurso 18.svg`

---

## Objetivo

Reemplazar el hero actual (imagen JPG de fondo + botón) por un hero animado en loop infinito con fondo negro, cables eléctricos SVG y el logo de Voltio iluminándose progresivamente. El CTA "Hablemos →" permanece funcional por encima de la animación.

---

## Composición visual

- **Fondo:** negro puro `#0a0a0a`, 100vh, reemplaza el `campo.svg` y la imagen JPG
- **Layout (centrado verticalmente, de arriba a abajo):**
  1. Logo `Recurso 18.svg` (inline en el DOM)
  2. Botón CTA "Hablemos →" (elemento HTML normal, siempre visible)
  3. SVG de cables + botón de encendido animado (parte inferior)

---

## Secuencia de animación — GSAP Timeline, `repeat(-1)`

| Paso | Elemento | Acción | Duración |
|------|----------|--------|----------|
| 1 | Botón de encendido | Fade in desde opacity 0 | 0.4s |
| 2 | Botón de encendido | Pulso de luz azul, stroke cambia a `#2D5BFF` brillante | 0.6s |
| 3 | Cables SVG | `stroke-dashoffset` de largo total a 0 — cables suben desde botón al logo | 0.8s |
| 4 | Logo (`Recurso 18.svg`) | Opacity 0→1 + `filter: drop-shadow(0 0 12px #2D5BFF)` glow | 0.6s |
| 5 | Tagline (dentro del SVG del logo) | Opacity 0→1 fade in | 0.4s |
| 6 | CTA "Hablemos →" | Opacity 0→1 | 0.3s |
| 7 | — | Pausa visible | 0.9s |
| 8 | Todo | Fade out suave a opacity 0 | 0.5s |

**Total ciclo:** ~4s

---

## Implementación técnica

### Estructura HTML del hero

```html
<section class="hero" id="inicio">
  <div class="hero__anim">
    <!-- Logo SVG inline (Recurso 18.svg) -->
    <div class="hero__logo-wrap">
      <!-- contenido de Recurso 18.svg incrustado aquí -->
    </div>

    <!-- CTA (siempre sobre la animación) -->
    <a href="#contacto" class="btn btn--calma hero__cta">Hablemos →</a>

    <!-- SVG de cables + botón de encendido -->
    <svg class="hero__cables" viewBox="0 0 400 200" ...>
      <!-- paths de cables con stroke-dasharray/dashoffset -->
      <!-- círculo + ícono botón de encendido en la base -->
    </svg>
  </div>
</section>
```

### CSS clave

```css
.hero {
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero__anim {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}
.hero__logo-wrap svg {
  width: min(500px, 85vw);
}
.hero__cables {
  width: min(400px, 80vw);
}
```

### GSAP

- Librería cargada via CDN: `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`
- `gsap.timeline({ repeat: -1 })` controla toda la secuencia
- Cables animados con `strokeDashoffset` calculado desde `path.getTotalLength()`
- Glow del logo con `filter` animado via GSAP
- El logo SVG se incrusta inline (no `<img src>`) para poder seleccionar sus paths con JS

### Color eléctrico

- Cables y glow: `#2D5BFF`
- Logo en reposo (antes de iluminarse): `opacity: 0`
- Logo iluminado: `opacity: 1` + `drop-shadow(0 0 12px #2D5BFF)`

---

## Responsive

- Logo: `width: min(500px, 85vw)`
- SVG cables: `width: min(400px, 80vw)` con `viewBox` fijo — escala solo
- En mobile el layout es columna centrada, sin cambios estructurales

---

## Lo que NO cambia

- Nav (`position: absolute`, flota sobre el hero)
- Secciones debajo del hero: sobre nosotros, servicios, productos, clientes, contacto
- El resto del CSS y JS existente
