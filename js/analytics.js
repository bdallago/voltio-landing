(function () {
  if (typeof gtag !== 'function') return;

  function track(event_name, params) {
    gtag('event', event_name, params || {});
  }

  // CTAs
  document.querySelectorAll('.hero__cta, .proceso__cta').forEach(function (el) {
    el.addEventListener('click', function () { track('cta_click'); });
  });

  // WhatsApp
  document.querySelectorAll('.btn-icono--wsp, .footer__col a[href*="wa.me"], .wsp-float').forEach(function (el) {
    el.addEventListener('click', function () { track('whatsapp_click'); });
  });

  // Calendly
  document.querySelectorAll('.agenda__btn, .btn-icono--calendario').forEach(function (el) {
    el.addEventListener('click', function () { track('calendly_click'); });
  });

  // Email
  document.querySelectorAll('.btn-icono--email, .footer__col a[href*="mailto"]').forEach(function (el) {
    el.addEventListener('click', function () { track('email_click'); });
  });

  // Nav
  var navProductos = document.querySelector('.nav__links a[href="productos.html"]');
  if (navProductos) navProductos.addEventListener('click', function () {
    track('nav_click_productos');
  });

  // Scroll depth
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY + window.innerHeight;
    var total = document.documentElement.scrollHeight;
    var pct = Math.round((scrolled / total) * 100);

    [25, 50, 75, 100].forEach(function (mark) {
      if (!scrollMarks[mark] && pct >= mark) {
        scrollMarks[mark] = true;
        track('scroll_' + mark);
      }
    });
  }, { passive: true });

})();
