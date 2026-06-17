(function () {
  if (location.search.includes('noanim')) return;
  if (!window.gsap) return;

  const logoImg = document.querySelector('.hero__title');
  if (!logoImg) return;

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const GLOW_REST  = 'drop-shadow(0 0 18px #29B3B6) drop-shadow(0 0 7px #9DD8CF)';
  const GLOW_PULSE = 'drop-shadow(0 0 30px #29B3B6) drop-shadow(0 0 12px #9DD8CF)';

  // Movimiento sutil de las figuras
  gsap.to('.hero__fig', {
    y: -10, duration: 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
    stagger: { each: 0.25, from: 'random' },
  });
  gsap.to('.hero__fig', {
    rotation: 1.5, transformOrigin: '50% 100%', duration: 1, ease: 'sine.inOut',
    repeat: -1, yoyo: true, stagger: 0.3,
  });

  if (reduce) return;

  // Glow pulsante permanente en el logo
  gsap.set(logoImg, { filter: GLOW_REST });
  gsap.to(logoImg, {
    filter: GLOW_PULSE, duration: 2.4, ease: 'sine.inOut',
    repeat: -1, yoyo: true, delay: 0.5,
  });
})();
