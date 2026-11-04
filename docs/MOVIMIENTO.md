# Movimiento y accesibilidad

La ambientación usa seis pétalos (tres en móvil), con trayectorias de 13–18 segundos y una ramita estática pequeña en el borde. Es decorativa, `aria-hidden`, no captura clics y se detiene con la pestaña oculta o la portada fuera de pantalla. Un control circular con icono permite pausar/reanudar el ambiente, sin recuperar el texto grande «Pausar pétalos». Con movimiento reducido queda una decoración estática y el control innecesario desaparece.

`Visual` conserva carga/imagen lista/error. La portada prioriza la fotografía aportada, incluye una vista previa pequeña y revela la imagen al cargar; si falla, muestra una alternativa sin bloquear las consultas. El contenido estático de `index.html` ofrece bienvenida y contacto si no se ejecuta JavaScript.

La carta cambia mediante filtros con foco conservado y una transición breve de altura. Las gráficas se pueden ampliar en un diálogo nativo, con cierre por botón/Escape, foco contenido y regreso al disparador. No se añaden giros 3D, cursores personalizados, audio automático ni scroll secuestrado.

`motion.ts` revela secciones una sola vez y conserva limpieza de observadores/animaciones. `prefers-reduced-motion` evita transiciones decorativas. La navegación interna soporta hash directo, recarga, atrás/adelante y enlaces desde `/carta`.

El carrusel de la agenda se conserva para eventos anteriores realmente publicados: cada seis segundos, con pausa al recibir foco, puntero, pestaña oculta, salida de pantalla o control manual. No se renderiza si faltan eventos anteriores. No se inventa una galería histórica. El reproductor opcional se conserva con carga voluntaria, pero el video de marca queda fuera de la versión visible hasta revisar su pertinencia y audio.

Las pruebas comprueban carga lenta/error, navegación, filtros, zoom, foco, cinco anchos, contraste, pausa y movimiento reducido. Las capturas y `docs/grabaciones/recorrido.webm` se generan con Chromium local. No sustituyen pruebas en dispositivos físicos ni acreditan publicación o conexión real a Google Calendar.

La metáfora nueva de la puerta es un marco abstracto en CSS, sin reproducción de una fachada ni interacción obligatoria. La imagen principal se descubre desde el centro con una máscara breve de 520 ms al cargar; el texto y los enlaces están disponibles desde el primer render. Con movimiento reducido la escena aparece estática.
