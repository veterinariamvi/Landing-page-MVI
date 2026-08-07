# Landing page — Dra. Luna Fuentes · MVI

Sitio estático, sin dependencias ni backend. Para verlo localmente: doble clic en `index.html`.

Publicado en Vercel desde este repositorio: cada cambio en `main` se republica solo.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Todo el contenido y los textos |
| `styles.css` | Diseño y paleta de la marca |
| `script.js` | Datos de contacto, menú móvil y formulario |
| `assets/` | Logo MVI en versión web |

## Datos de contacto

Se editan en **un solo lugar**: el bloque `CONFIG` al inicio de `script.js`.

```js
const CONFIG = {
  marca:    'Dra. Luna Fuentes',
  bajada:   'Veterinaria a domicilio',
  whatsapp: '56984491087',            // solo números, con código de país
  telefono: '+56 9 8449 1087',        // cómo se ve en pantalla
  correo:   'veterinariamvi@gmail.com',
  zonas: [
    'Santiago: Lo Barnechea, Vitacura, Las Condes y Chicureo',
    'V Región: Viña del Mar, Concón, Reñaca y Quilpué'
  ],
  horario:     'Lunes a viernes · 08:00 a 20:00 h',
  horarioNota: 'Sábado y domingo según disponibilidad, con valor de fin de semana'
};
```

Eso actualiza el nombre en el header y el footer, la sección de contacto, el
botón flotante de WhatsApp y el mensaje que arma el formulario.

> El formulario no necesita servidor: toma los datos del cliente y abre WhatsApp
> con el mensaje listo para enviar.

La lista de comunas del **formulario** y de la sección **Cobertura** está en
`index.html` (busca `id="comuna"` y `id="cobertura"`); si agregas una comuna,
actualízala en los tres lugares.

## Paleta

Tomada de tus archivos de marca, definida en `:root` dentro de `styles.css`:

| Uso | HEX | Origen |
|---|---|---|
| Turquesa de marca | `#45c9d0` | color oficial del logo |
| Turquesa oscuro (texto y botones) | `#1d7a80` | derivado, para cumplir contraste AA |
| Gris claro | `#bbbbbb` | gris oficial del logo |
| Gris texto | `#636363` | gris oficial de las letras del logo |

El turquesa original sobre blanco da un contraste de ~2:1, insuficiente para
texto legible, por eso los botones y enlaces usan la variante oscura del mismo
tono. Los fondos y detalles sí usan el turquesa original.

## Logo

Generado desde `MVI_COLOR 1.png` de tu carpeta de marca:

- `assets/logo-mark.png` — solo el isotipo (manos con perro y gato), para el header
- `assets/logo-mvi.png` — logo completo, para la portada
- `assets/favicon.png` — ícono de la pestaña del navegador

## Publicar cambios

```bash
git add -A && git commit -m "descripción del cambio" && git push
```

Vercel detecta el push y republica en 30–60 segundos.

## Pendiente

- Fotos reales de atenciones (reemplazar el panel del logo en la portada)
- Precios o rangos de valores por servicio
- Redes sociales
- Testimonios de clientes
- Dominio propio
- Área de acceso para clientes conectada a la app MVI
