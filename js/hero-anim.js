(function () {
  // Salir si ?noanim está en la URL (modo QA/capturas)
  if (location.search.includes('noanim')) return;
  if (!window.gsap) return;

  const logoWrap = document.querySelector('.hero__logo-wrap');
  const wordmark = document.querySelector('.vl-wordmark');
  const tagline  = document.querySelector('.vl-tagline');
  const cta      = document.querySelector('.hero__cta');
  const powerBtn = document.querySelector('.power-btn');
  const cables   = document.querySelectorAll('.cable');

  if (!logoWrap || !powerBtn) return;
  if (!wordmark || !tagline || !cta) return;

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
  tl.to([logoWrap, cta, powerBtn, tagline], {
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
