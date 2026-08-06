/* ============================================================
   CONFIGURACIÓN — edita solo este bloque
   ============================================================ */
const CONFIG = {
  marca:    'Vet a Domicilio',              // Nombre de tu veterinaria
  whatsapp: '56900000000',                  // Solo números, con código de país. Ej: 56912345678
  telefono: '+56 9 0000 0000',              // Cómo se muestra el teléfono en pantalla
  correo:   'contacto@tudominio.cl',
  zonas:    'Comunas de atención a confirmar',
  horario:  'Lunes a sábado · 9:00 a 20:00 h'
};

/* ============================================================
   Aplicar configuración al contenido
   ============================================================ */
document.querySelectorAll('[data-brand]').forEach(el => el.textContent = CONFIG.marca);

const telLink = document.querySelector('[data-tel]');
if (telLink) {
  telLink.textContent = CONFIG.telefono;
  telLink.href = 'tel:+' + CONFIG.whatsapp;
}

const mailLink = document.querySelector('[data-mail]');
if (mailLink) {
  mailLink.textContent = CONFIG.correo;
  mailLink.href = 'mailto:' + CONFIG.correo;
}

const zonasEl = document.querySelector('[data-zonas]');
if (zonasEl) zonasEl.textContent = CONFIG.zonas;

const horarioEl = document.querySelector('[data-horario]');
if (horarioEl) horarioEl.textContent = CONFIG.horario;

const waUrl = texto =>
  'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);

const waFab = document.querySelector('[data-wa]');
if (waFab) {
  waFab.href = waUrl('Hola ' + CONFIG.marca + ', quiero agendar una visita a domicilio para mi mascota.');
  waFab.target = '_blank';
  waFab.rel = 'noopener';
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   Menú móvil
   ============================================================ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const abierto = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(abierto));
  burger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* ============================================================
   Sombra del header al hacer scroll
   ============================================================ */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ============================================================
   Animación de entrada de secciones
   ============================================================ */
const reveals = document.querySelectorAll('.reveal');
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (sinMovimiento || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('is-visible'), i * 70);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

  reveals.forEach(el => io.observe(el));
}

/* ============================================================
   Formulario → arma el mensaje y abre WhatsApp
   ============================================================ */
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const dato = id => document.getElementById(id).value.trim();
  const campoNombre = document.getElementById('nombre');

  if (!campoNombre.value.trim()) {
    campoNombre.closest('.field').classList.add('has-error');
    campoNombre.focus();
    return;
  }
  campoNombre.closest('.field').classList.remove('has-error');

  const lineas = [
    'Hola ' + CONFIG.marca + ', quiero agendar una visita a domicilio.',
    '',
    'Nombre: ' + dato('nombre'),
    dato('mascota') ? 'Mascota: ' + dato('mascota') : '',
    'Servicio: ' + dato('servicio'),
    dato('comuna') ? 'Comuna: ' + dato('comuna') : '',
    dato('mensaje') ? 'Detalle: ' + dato('mensaje') : ''
  ].filter(Boolean);

  window.open(waUrl(lineas.join('\n')), '_blank', 'noopener');
});

form.querySelectorAll('input').forEach(input =>
  input.addEventListener('input', () => input.closest('.field').classList.remove('has-error'))
);
