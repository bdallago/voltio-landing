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

// Formulario de contacto: arma un mailto con los campos cargados
const formContacto = document.querySelector('#form-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = formContacto.nombre.value.trim();
    const empresa = formContacto.empresa.value.trim();
    const mensaje = formContacto.mensaje.value.trim();
    const error = formContacto.querySelector('.contacto__error');
    if (!nombre || !mensaje) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    const asunto = `Consulta desde la web — ${nombre}${empresa ? ` (${empresa})` : ''}`;
    const cuerpo = `Nombre: ${nombre}\nEmpresa: ${empresa || '-'}\n\n${mensaje}`;
    window.location.href =
      `mailto:bdallago01@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  });
}
