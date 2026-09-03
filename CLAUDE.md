# La ventana de la app

**El nombre de esta carpeta engaña.** Se llama "Primera landing page", pero esta
ventana es donde se construyó todo lo técnico de Luna: la app de fichas clínicas,
Supabase, Vercel y también la landing. Todo el historial de esas decisiones vive
acá y en ninguna otra parte.

Luna es médica veterinaria con atención a domicilio. **No es programadora:**
comandos de una sola línea listos para pegar, y decir siempre si algo va en un
archivo local o en un panel web — se pierde cuando eso se mezcla. En español.

## Las dos cosas que se publican

**1. La app — `~/Claude/mvi-vet`** (carpeta hermana, no está dentro de ésta:
hay que pedir acceso a `../mvi-vet` para trabajarla).
React 18 + Vite + Supabase. `npm run dev` para levantarla.
En `scripts/` están las migraciones SQL y `check-rls.mjs`.
En `docs/` están los tres documentos que mandan sobre el negocio:

| Archivo | Qué manda |
|---|---|
| `docs/criterio-operacion.md` | Cómo se responde un WhatsApp y cómo se arma la ruta del día |
| `docs/marketing.md` | El plan de marketing y los cinco embudos |
| `docs/esquemas-vacunacion.md` | Cálculo de próximas dosis. **Nunca va al asistente de WhatsApp** |

**2. La landing — esta carpeta.** Sitio estático, sin backend ni dependencias.
Cada cambio en `main` se republica solo en Vercel. Los datos de contacto se
editan en un solo lugar: el bloque `CONFIG` al inicio de `script.js`.

## Antes de tocar Vercel

Está todo en la memoria de esta carpeta — leerla, no reescribirla acá:

- El `user.email` de Git tiene que ser el correo del negocio, **o Vercel bloquea
  la publicación** — ver [[luna-veterinaria-mvi]].
- **No sondear la app en producción**: el bucle de verificación gatilla el punto
  de seguridad de Vercel y lo termina sufriendo ella — ver
  [[no-sondear-la-app-en-produccion]].
- Qué quedó abierto y qué bloquea venderla — ver [[mvi-estado-seguridad]].
- Nada que genere un cobro se guarda sin que ella lo confirme — ver
  [[revisar-antes-de-automatizar]].

## Qué NO se hace en esta ventana

Marketing, contenido, reels, contabilidad, SII y automatizaciones **se trabajan en
el tronco**: una pestaña abierta en `~/Claude`, que tiene las 23 fichas del negocio
y las skills. Acá se codea; allá se decide.

Trading y Marcoffee tienen sus propias carpetas y no se tocan desde acá.

## No renombrar esta carpeta

El nombre es malo, pero cambiarlo hace que Claude Code la lea como un proyecto
nuevo y pierda esta memoria y todo el historial de haber construido la app. Se
queda como está, a propósito.
