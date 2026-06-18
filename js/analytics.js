(function () {
  if (typeof gtag !== 'function') return;

  function track(event_name, params) {
    gtag('event', event_name, params || {});
  }

  // --- Clicks en CTAs y canales de contacto ---

  // Hero: "Quiero resolverlo"
  var heroCta = document.querySelector('.hero__cta');
  if (heroCta) heroCta.addEventListener('click', function () {
    track('cta_click', { location: 'hero', label: 'Quiero resolverlo' });
  });

  // Proceso: "Diagnóstico gratis"
  var procesoCta = document.querySelector('.proceso__cta');
  if (procesoCta) procesoCta.addEventListener('click', function () {
    track('cta_click', { location: 'proceso', label: 'Diagnóstico gratis' });
  });

  // Agenda: "Agendá una reunión" (botón grande)
  var agendaBtn = document.querySelector('.agenda__btn');
  if (agendaBtn) agendaBtn.addEventListener('click', function () {
    track('calendly_click', { location: 'agenda' });
  });

  // Contacto: WhatsApp (ícono en banner)
  var wspBanner = document.querySelector('.btn-icono--wsp');
  if (wspBanner) wspBanner.addEventListener('click', function () {
    track('whatsapp_click', { location: 'contacto_banner' });
  });

  // Contacto: Email (ícono en banner)
  var emailBanner = document.querySelector('.btn-icono--email');
  if (emailBanner) emailBanner.addEventListener('click', function () {
    track('email_click', { location: 'contacto_banner' });
  });

  // Contacto: Calendly (ícono en banner)
  var calBanner = document.querySelector('.btn-icono--calendario');
  if (calBanner) calBanner.addEventListener('click', function () {
    track('calendly_click', { location: 'contacto_banner' });
  });

  // Footer: WhatsApp
  var wspFooter = document.querySelector('.footer__col a[href*="wa.me"]');
  if (wspFooter) wspFooter.addEventListener('click', function () {
    track('whatsapp_click', { location: 'footer' });
  });

  // Footer: Email
  var emailFooter = document.querySelector('.footer__col a[href*="mailto"]');
  if (emailFooter) emailFooter.addEventListener('click', function () {
    track('email_click', { location: 'footer' });
  });

  // Flotante WhatsApp
  var wspFloat = document.querySelector('.wsp-float');
  if (wspFloat) wspFloat.addEventListener('click', function () {
    track('whatsapp_click', { location: 'flotante' });
  });

  // Nav: Productos
  var navProductos = document.querySelector('.nav__links a[href="productos.html"]');
  if (navProductos) navProductos.addEventListener('click', function () {
    track('nav_click', { label: 'Productos' });
  });

  // --- Scroll depth ---
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY + window.innerHeight;
    var total = document.documentElement.scrollHeight;
    var pct = Math.round((scrolled / total) * 100);

    [25, 50, 75, 100].forEach(function (mark) {
      if (!scrollMarks[mark] && pct >= mark) {
        scrollMarks[mark] = true;
        track('scroll_depth', { depth: mark });
      }
    });
  }, { passive: true });

})();
