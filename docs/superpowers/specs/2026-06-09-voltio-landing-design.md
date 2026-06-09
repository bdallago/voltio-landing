# Spec de diseño — Landing page Voltio

**Fecha:** 2026-06-09
**Estado:** aprobado por el usuario (diseño verbal); pendiente revisión de este documento.

## Objetivo

Landing page de una sola página para Voltio, startup unipersonal de desarrollo de
software fundada por Beno. El diseño replica fielmente la referencia
`Identidad Visual/Modelo.png`, completándola con las secciones que el mockup no
desarrolla (Servicios, Productos, Clientes).

## Decisiones tomadas con el usuario

| Tema | Decisión |
|---|---|
| Fidelidad visual | Fiel al Modelo.png: "representa exactamente lo que quiero tener" |
| Stack | HTML + CSS + JS estático, sin frameworks |
| Tipografías | Alternativas gratuitas temporales (Poppins y Lora), con puntos de reemplazo documentados para Pacaembu y Loretta |
| Contenido | Lo redacta Claude en español; el usuario lo ajusta después |
| Contacto | mailto a bdallago01@gmail.com + WhatsApp +54 9 341 628-9453 (`wa.me/5493416289453`). Sin backend. |
| Clientes | 3 testimonios ficticios editables |
| Supabase | No se usa (una landing estática no necesita base de datos) |
| Publicación | Repo en GitHub (cuenta bdallago) + deploy en Vercel (cuenta bdallago), todo gestionado por Claude |

## Identidad visual (extraída del Modelo y los logos)

**Paleta:**

- Verde oscuro "Calma" (nav, pastilla del tagline, títulos fuertes): aprox `#0d4f4a`
- Turquesa "Fuerza" (acentos, sección contacto, título "Sobre"): aprox `#35b5b0`
- Crema "Idea" (fondos claros, logo sobre oscuro): aprox `#fdf6e3`
- Marrón "Tierra" disponible como variante de logo; no domina en el Modelo

Los valores exactos se muestrean de los PNG de `Identidad Visual/Logos PNG/` al
implementar.

**Tipografías (variables CSS centralizadas):**

- `--font-titulos`: Poppins (futura **Pacaembu**) — títulos y logo tipográfico
- `--font-botones`: Poppins SemiBold (futura **Pacaembu SemiBold**) — botones y labels
- `--font-textos`: Lora (futura **Loretta**) — párrafos; la itálica se usa como
  acento dentro de títulos ("a medida", "solución", "mueve tu negocio")

El CSS incluye un bloque `@font-face` comentado que indica exactamente qué
archivos colocar en `assets/fonts/` y qué variables cambiar cuando se compren
las licencias reales.

**Ilustraciones:** el Modelo usa bocetos en blanco y negro de personas
(estilo sketch con contorno tipo sticker). Se usan personajes de **Open Peeps**
(CC0) en SVG, tratados en B/N, para mantener el estilo con licencia libre.

**Motivos gráficos:** rayo del isologo como icono y como patrón en semitono
turquesa; burbujas-estrella turquesa con texto; banners redondeados con textura
granulada; pastillas de resaltado detrás de texto.

## Estructura de la página (orden del Modelo, completado)

1. **Nav** sticky, verde oscuro: isologo rayo crema a la izquierda; links
   Sobre Nosotros · Servicios · Productos · Clientes · Contacto; tipografía de
   botones en mayúsculas crema.
2. **Hero**: fondo fotográfico de campo verde con tinte/overlay verde.
   Izquierda: ilustración B/N de persona reclinada en silla de oficina.
   Derecha: logotipo VOLTIO grande (verde oscuro con rayo) y tagline
   `*La fuerza que` (crema) + `mueve tu negocio` (Lora itálica, dentro de
   pastilla verde oscuro). Asterisco turquesa. CTA "Hablemos" que ancla a
   Contacto.
3. **Sobre nosotros** (fondo crema): título "⚡Sobre" (turquesa, peso liviano) +
   "nosotros" (verde oscuro, bold). Texto base real del Modelo: "Voltio es una
   startup unipersonal de desarrollo de software, fundada por Beno (vibecoder y
   web developer)", ampliado con 1-2 párrafos redactados. Ilustración B/N de
   persona con laptop a la derecha.
4. **Servicios** (fondo crema, continúa de la anterior): título del Modelo
   "SOLUCIONES" (verde oscuro, caps, bold) + "a medida" (Lora itálica).
   Burbuja-estrella turquesa con el texto del Modelo: "Damos respuesta a los
   problemas a través de ideas pensadas para tu negocio". Patrón de rayos en
   semitono. Debajo, 3 tarjetas: **Desarrollo web**, **Aplicaciones a medida**,
   **Automatización e integraciones**, cada una con icono de rayo, título y
   2-3 líneas de descripción.
5. **Productos** (fondo crema con acentos turquesa, mismo lenguaje visual):
   título "Nuestros productos" en el mismo sistema tipográfico. 2 tarjetas de
   producto con nombre ficticio editable, descripción y etiqueta de estado
   (ej. "disponible" / "en desarrollo").
6. **Clientes** (fondo verde oscuro): título "Clientes que confían". 3 tarjetas
   crema de testimonios ficticios (cita en Lora itálica, nombre y empresa
   placeholder en Poppins).
7. **Contacto** (fondo turquesa, réplica del Modelo): banner verde texturado
   "Encontremos la *solución* juntos". Panel partido: izquierda turquesa
   brillante con campos NOMBRE y EMPRESA; derecha teal apagado con
   "¿Cómo te podemos ayudar?" y textarea. Botón enviar (Poppins SemiBold) que
   abre `mailto:bdallago01@gmail.com` con asunto y cuerpo prellenados con los
   campos. Botón secundario de WhatsApp a `wa.me/5493416289453` con mensaje
   prearmado. Rayos turquesa "cayendo" como transición desde la sección
   anterior, igual que en el Modelo.
8. **Footer** verde oscuro: logotipo crema, mail, WhatsApp, © 2026 Voltio.

## Comportamiento (JS)

- Scroll suave al anclar desde la nav.
- Animación de aparición (fade/slide sutil) por sección usando
  IntersectionObserver; respeta `prefers-reduced-motion`.
- Formulario: validación mínima en cliente (campos no vacíos) y construcción
  del mailto/WhatsApp con `encodeURIComponent`. Sin red, sin backend.
- Nav colapsa a menú hamburguesa en móvil.

## Responsive

Diseño fluido con breakpoint principal ~768px: hero pasa a columna única
(ilustración debajo del logo), tarjetas apilan, panel de contacto pasa de dos
columnas a una.

## Estructura de archivos

```
index.html
css/styles.css
js/main.js
assets/
  logos/        ← copiados de Identidad Visual/Logos PNG
  fonts/        ← vacío; destino de Pacaembu/Loretta cuando existan
  img/          ← fondo de campo (foto libre), ilustraciones SVG
docs/superpowers/specs/  ← este documento
```

`Identidad Visual/` queda en el repo como material fuente. `.crops/` (recortes
temporales del Modelo) se ignora en git.

## Publicación

- `git init` + repo GitHub `voltio-landing` (privado o público a elección del
  usuario al crearlo; por defecto público).
- Deploy en Vercel como sitio estático con deploys automáticos desde GitHub.

## Manejo de errores

No hay backend ni red: los únicos puntos de fallo son enlaces externos
(mailto/WhatsApp) y assets. Las imágenes llevan `alt`; si una fuente de Google
Fonts no carga, hay fallbacks de sistema en cada variable tipográfica.

## Verificación

- Revisión visual contra Modelo.png sección por sección (desktop y móvil).
- Validación de que el mailto y el link de WhatsApp abren con el contenido
  correcto.
- Lighthouse rápido (rendimiento y accesibilidad) antes del deploy final.

## Fuera de alcance

- Backend, base de datos, analytics, SEO avanzado, blog, múltiples idiomas.
- Compra/integración de las tipografías comerciales reales.
