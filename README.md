# Landing page — Veterinaria a domicilio

Sitio estático, sin dependencias. Para verlo: haz doble clic en `index.html`.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Todo el contenido y los textos |
| `styles.css` | Diseño y colores |
| `script.js` | Datos de contacto, menú móvil y formulario |

## 1. Lo primero que debes cambiar

Abre `script.js` y edita el bloque `CONFIG` de arriba:

```js
const CONFIG = {
  marca:    'Vet a Domicilio',      // nombre de tu veterinaria
  whatsapp: '56900000000',          // solo números, con código de país
  telefono: '+56 9 0000 0000',      // cómo se ve en pantalla
  correo:   'contacto@tudominio.cl',
  zonas:    'Comunas de atención a confirmar',
  horario:  'Lunes a sábado · 9:00 a 20:00 h'
};
```

Eso actualiza automáticamente el nombre en el header y el footer, los datos de
contacto, el botón flotante de WhatsApp y el formulario.

> El formulario no necesita servidor: arma el mensaje con los datos que escribe
> el cliente y abre WhatsApp con el texto listo para enviar.

## 2. Textos

Están todos en `index.html`. Busca los comentarios `<!-- EDITAR -->` para los
puntos que dependen de tu información (comunas de cobertura, medios de pago).

## 3. Colores

En `styles.css`, arriba del todo, en `:root`. El acento celeste es
`--celeste-600: #2f7f9e` (versión oscura, para texto y botones) y
`--celeste-400: #79bcd9` (versión clara, para fondos y detalles).
Cambia esos dos valores por los de tu logo y el sitio completo se ajusta solo.

## 4. Logo

El logo actual es un SVG (casita + huella) dentro de `index.html`, en el header
y en el footer. Para usar tu logo real, reemplaza el `<svg>...</svg>` de
`.logo__mark` por:

```html
<img src="logo.png" alt="Nombre de tu veterinaria">
```

## 5. Foto en el hero

El recuadro celeste de la portada es un marcador de posición. Para poner una
foto real, en `index.html` reemplaza todo el bloque `<div class="visual__panel">…</div>`
por:

```html
<img src="tu-foto.jpg" alt="Veterinaria atendiendo a un perro en casa" class="visual__photo">
```

## 6. Publicar

Sube las tres carpetas/archivos (`index.html`, `styles.css`, `script.js`) a
cualquier hosting estático: Netlify, Vercel, GitHub Pages o el hosting de tu
dominio. No requiere base de datos ni backend.

## Pendiente cuando envíes más información

- Nombre real, logo y colores exactos de la marca
- Comunas de cobertura
- Precios o rango de valores por servicio
- Fotos reales
- Redes sociales
- Testimonios de clientes
