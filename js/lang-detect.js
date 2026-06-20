(function () {
  var STORAGE_KEY = 'voltio_lang';
  var EN_PREFIX = '/en/';

  var path = window.location.pathname;
  var isEnPage = path.indexOf(EN_PREFIX) !== -1;

  // Map each page to its counterpart
  function getCounterpart(currentPath, toEn) {
    var pages = ['index.html', 'productos.html', 'proder.html', 'nosotros.html'];
    if (toEn) {
      // Spanish root → /en/
      if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
        return EN_PREFIX + 'index.html';
      }
      for (var i = 0; i < pages.length; i++) {
        if (currentPath.indexOf(pages[i]) !== -1) return EN_PREFIX + pages[i];
      }
    } else {
      // /en/page → /page
      for (var j = 0; j < pages.length; j++) {
        if (currentPath.indexOf(EN_PREFIX + pages[j]) !== -1) return '/' + pages[j];
      }
    }
    return null;
  }

  // Check if user already has a stored preference (set by language switcher)
  var stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) return; // User has made a manual choice — respect it

  // Detect browser language
  var lang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  var isEnglish = lang.indexOf('en') === 0;

  if (isEnglish && !isEnPage) {
    var target = getCounterpart(path, true);
    if (target) {
      sessionStorage.setItem(STORAGE_KEY, 'en');
      window.location.replace(target);
    }
  } else if (!isEnglish && isEnPage) {
    var targetEs = getCounterpart(path, false);
    if (targetEs) {
      sessionStorage.setItem(STORAGE_KEY, 'es');
      window.location.replace(targetEs);
    }
  }
})();
