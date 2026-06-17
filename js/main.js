// Marca que hay JS: el CSS solo oculta .reveal cuando esta clase existe,
// así la página es legible también sin JavaScript.
// ?noanim desactiva las animaciones (útil para capturas/QA).
if (!location.search.includes('noanim')) {
  document.documentElement.classList.add('js');
}

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

// Carrusel de testimonios — avance continuo infinito
(function () {
  const wrap  = document.querySelector('.carrusel');
  const track = document.querySelector('.carrusel__track');
  const dots  = Array.from(document.querySelectorAll('.carrusel__dot'));
  if (!wrap || !track) return;

  const items = Array.from(track.children);
  const total = items.length;
  if (total < 2) return;

  // Clona el primer slide al final para loop seamless
  track.appendChild(items[0].cloneNode(true));

  let current = 0;
  let animating = false;

  function setWidths() {
    const w = wrap.offsetWidth;
    const m = 18; // margen lateral — crea el gap visible entre tarjetas durante la transición
    Array.from(track.children).forEach(function (el) {
      el.style.width = (w - m * 2) + 'px';
      el.style.marginLeft = m + 'px';
      el.style.marginRight = m + 'px';
    });
    track.style.width = (w * (total + 1)) + 'px';
    // Reposiciona sin transición al redimensionar
    track.style.transition = 'none';
    track.style.transform = 'translateX(-' + (current * w) + 'px)';
  }

  function updateDots(idx) {
    dots.forEach(function (d, i) {
      d.classList.toggle('carrusel__dot--activo', i === idx % total);
    });
  }

  function next() {
    if (animating) return;
    animating = true;
    current++;

    const w = wrap.offsetWidth;
    track.style.transition = 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = 'translateX(-' + (current * w) + 'px)';
    updateDots(current);

    setTimeout(function () {
      if (current === total) {
        // Llegamos al clon → snap silencioso al inicio
        track.style.transition = 'none';
        current = 0;
        track.style.transform = 'translateX(0)';
        updateDots(0);
      }
      animating = false;
    }, 900);
  }

  setWidths();
  window.addEventListener('resize', setWidths);

  // Dots: click pausa y salta al slide
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () {
      if (animating) return;
      animating = true;
      current = i;
      const w = wrap.offsetWidth;
      track.style.transition = 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)';
      track.style.transform = 'translateX(-' + (current * w) + 'px)';
      updateDots(current);
      setTimeout(function () { animating = false; }, 900);
    });
  });

  // Avance automático cada 8 s
  setInterval(next, 8000);
})();

// "Clientes" en nav: scroll centrado en el carrusel de opiniones
document.querySelectorAll('a[href="#opiniones"], a[href*="index.html#opiniones"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const target = document.getElementById('opiniones');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

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
