(function () {
  if (location.search.includes('noanim')) return;
  if (!window.gsap) return;

  const overlay  = document.querySelector('.hero__overlay');
  const logoWrap = document.querySelector('.hero__logo-wrap');
  const wordmark = document.querySelector('.vl-wordmark');
  const tagline  = document.querySelector('.vl-tagline');
  const cta      = document.querySelector('.hero__cta');
  const powerBtn = document.querySelector('.power-btn');
  const cables   = document.querySelectorAll('.cable');

  if (!overlay || !logoWrap || !powerBtn) return;
  if (!wordmark || !tagline || !cta) return;

  // Setup inicial: penumbra total, todo oculto
  gsap.set(overlay, { opacity: 1 });
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

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

  // 1. Botón de encendido aparece en la oscuridad
  tl.to(powerBtn, { opacity: 1, duration: 0.8, ease: 'power2.out' });

  // 2. Pulso eléctrico en el botón
  tl.to(powerBtn, {
    filter: 'drop-shadow(0 0 12px #2D5BFF)',
    duration: 1,
    ease: 'power2.inOut',
  });

  // 3. Cable vertical sube — largo recorrido desde el piso hasta el logo
  tl.to('.cable--v', {
    strokeDashoffset: 0,
    duration: 2.2,
    ease: 'power1.inOut',
  }, '-=0.2');

  // 4. Ramas se extienden hacia los costados
  tl.to(['.cable--l', '.cable--r'], {
    strokeDashoffset: 0,
    duration: 1.4,
    ease: 'power2.inOut',
    stagger: 0.15,
  }, '-=0.8');

  // 5. Logo aparece — como un foco que empieza a encenderse
  tl.to(logoWrap, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  tl.to(wordmark, {
    opacity: 1,
    filter: 'drop-shadow(0 0 22px #2D5BFF)',
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.3');

  // 6. Voltio enciende la escena — la oscuridad se disuelve, el campo aparece
  tl.to(overlay, {
    opacity: 0,
    duration: 2,
    ease: 'power2.inOut',
  }, '-=0.3');

  // 7. Tagline aparece mientras la escena se ilumina
  tl.to(tagline, { opacity: 1, duration: 1, ease: 'power2.out' }, '-=1.4');

  // 8. El glow eléctrico se suaviza a un brillo cálido
  tl.to(wordmark, {
    filter: 'drop-shadow(0 0 10px #fff8e5)',
    duration: 1.2,
    ease: 'power1.inOut',
  }, '-=0.8');

  // 9. CTA aparece
  tl.to(cta, { opacity: 1, duration: 0.8, ease: 'power2.out' });

  // 10. Pausa — la escena iluminada respira
  tl.to({}, { duration: 4.5 });

  // 11. Fadeout lento — la penumbra vuelve suavemente
  tl.to(overlay, {
    opacity: 1,
    duration: 2.8,
    ease: 'power1.in',
  });
  tl.to([logoWrap, cta, powerBtn, tagline], {
    opacity: 0,
    duration: 2.2,
    ease: 'power1.in',
  }, '-=2.5');

  // Reset para el próximo ciclo
  tl.call(() => {
    cables.forEach((cable) => {
      const len = cable.getTotalLength();
      gsap.set(cable, { strokeDashoffset: len });
    });
    gsap.set([wordmark, tagline], { opacity: 0, filter: 'none' });
    gsap.set(powerBtn, { filter: 'none' });
  });

  tl.to({}, { duration: 0.5 });
})();
