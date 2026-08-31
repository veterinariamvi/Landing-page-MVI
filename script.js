/* ============================================================
   CONFIGURACIÓN — edita solo este bloque
   ============================================================ */
const CONFIG = {
  marca:    'Dra. Luna Fuentes',
  bajada:   'Veterinaria a domicilio',
  whatsapp: '56984491087',                  // solo números, con código de país
  telefono: '+56 9 8449 1087',              // cómo se muestra en pantalla
  correo:   'veterinariamvi@gmail.com',
  zonas: [
    'Santiago: Lo Barnechea, Vitacura y Las Condes',
    'V Región: Viña del Mar, Concón, Reñaca y Quilpué'
  ],
  horario:     'Lunes a viernes · 08:00 a 20:00 h',
  horarioNota: 'Sábado y domingo según disponibilidad, con valor de fin de semana',

  // Reseñas de Google. Actualiza el número cuando consigas más: es el único
  // dato de esta sección que envejece.
  google: {
    opiniones: 14,
    ficha: 'https://www.google.com/maps?cid=13481371529160765209'
  }
};

/* ============================================================
   Aplicar configuración al contenido
   ============================================================ */
const setText = (sel, valor) =>
  document.querySelectorAll(sel).forEach(el => el.textContent = valor);

setText('[data-brand]', CONFIG.marca);
setText('[data-bajada]', CONFIG.bajada);
setText('[data-horario]', CONFIG.horario);
setText('[data-horario-nota]', CONFIG.horarioNota);

document.querySelectorAll('[data-tel]').forEach(el => {
  el.textContent = CONFIG.telefono;
  el.href = 'tel:+' + CONFIG.whatsapp;
});

document.querySelectorAll('[data-mail]').forEach(el => {
  el.textContent = CONFIG.correo;
  el.href = 'mailto:' + CONFIG.correo;
});

setText('[data-opiniones]', CONFIG.google.opiniones);

document.querySelectorAll('[data-ficha]').forEach(el => {
  el.href = CONFIG.google.ficha;
});

document.querySelectorAll('[data-zonas]').forEach(el => {
  el.innerHTML = '';
  CONFIG.zonas.forEach(z => {
    const li = document.createElement('li');
    li.textContent = z;
    el.appendChild(li);
  });
});

const waUrl = texto =>
  'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);

/* Mensajes con que se abre WhatsApp. El formulario de más abajo sigue estando
   para quien prefiera llenarlo, pero los botones de "Agendar" abren WhatsApp
   directo: el formulario terminaba en WhatsApp igual, así que eran tres pasos
   para llegar al mismo lugar. */
const MENSAJES = {
  agendar:  'Hola ' + CONFIG.marca + ', quiero agendar una visita a domicilio para mi mascota.',
  consulta: 'Hola ' + CONFIG.marca + ', quiero consultar por un servicio que no aparece en la página.',

  /* A propósito no dice la palabra: quien escribe desde ahí no tiene por qué
     tener que escribirla antes de enviar. */
  despedida: 'Hola ' + CONFIG.marca + ', quisiera conversar sobre mi mascota.'
};

/* El href="#contacto" del HTML queda como respaldo: si el JavaScript no carga,
   el botón igual lleva al formulario en vez de no hacer nada. */
document.querySelectorAll('[data-wa-cta]').forEach(el => {
  const clave = el.getAttribute('data-wa-cta') || 'agendar';
  el.href = waUrl(MENSAJES[clave] || MENSAJES.agendar);
  el.target = '_blank';
  el.rel = 'noopener';
});

const waFab = document.querySelector('[data-wa]');
if (waFab) {
  waFab.href = waUrl(MENSAJES.agendar);
  waFab.target = '_blank';
  waFab.rel = 'noopener';
}

/* ============================================================
   Conversión de Google Ads
   ============================================================
   Se marca cuando alguien se va a WhatsApp, por cualquiera de los dos
   caminos que tiene la página: los botones (que son enlaces a wa.me) y
   el formulario (que abre WhatsApp con window.open, sin ser un enlace).
   Si la etiqueta no cargó, por un bloqueador o lo que sea, no pasa nada:
   la página sigue funcionando igual. */
const CONVERSION_WHATSAPP = 'AW-10880362465/YoVLCNeN9uocEOHPlMQo';

function marcarConversion() {
  if (typeof gtag !== 'function') return;
  gtag('event', 'conversion', { send_to: CONVERSION_WHATSAPP });
}

document.addEventListener('click', (e) => {
  if (e.target.closest('a[href*="wa.me"]')) marcarConversion();
});

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

  marcarConversion();
  window.open(waUrl(lineas.join('\n')), '_blank', 'noopener');
});

form.querySelectorAll('input').forEach(input =>
  input.addEventListener('input', () => input.closest('.field').classList.remove('has-error'))
);
