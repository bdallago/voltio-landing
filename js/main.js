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
