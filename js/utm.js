(function () {
  var STORAGE_KEY = 'voltio_utm';

  // Lee params de la URL actual y los persiste
  function capturarUTM() {
    var params = new URLSearchParams(window.location.search);
    var source   = params.get('utm_source');
    var medium   = params.get('utm_medium');
    var campaign = params.get('utm_campaign');

    if (source || medium || campaign) {
      var data = { source: source, medium: medium, campaign: campaign, ts: Date.now() };
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
      return data;
    }

    // Si no hay params nuevos, recupera los guardados (navegación interna)
    try {
      var saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  }

  // Enriquece todos los links de WhatsApp con la fuente del lead
  function enriquecerWhatsApp(utm) {
    if (!utm || !utm.source) return;

    var label = utm.source;
    if (utm.campaign) label += ' / ' + utm.campaign;

    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      try {
        var url   = new URL(a.href);
        var texto = decodeURIComponent(url.searchParams.get('text') || '');
        if (texto && texto.indexOf('[Origen:') === -1) {
          texto += ' [Origen: ' + label + ']';
          url.searchParams.set('text', texto);
          a.href = url.toString();
        }
      } catch (e) {}
    });

    // También trackea en GA4 si está disponible
    if (typeof gtag === 'function') {
      gtag('event', 'utm_captured', {
        utm_source:   utm.source,
        utm_medium:   utm.medium   || '(none)',
        utm_campaign: utm.campaign || '(none)'
      });
    }
  }

  var utm = capturarUTM();
  if (utm) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { enriquecerWhatsApp(utm); });
    } else {
      enriquecerWhatsApp(utm);
    }
  }
})();
