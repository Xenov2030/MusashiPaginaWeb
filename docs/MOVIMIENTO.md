# Movimiento y accesibilidad

La ambientación usa seis pétalos (tres en móvil), con trayectorias de 13–18 segundos y una ramita estática pequeña en el borde. Es decorativa, `aria-hidden`, y no captura clics. Por indicación del usuario, los pétalos se reproducen automáticamente en bucle infinito, sin botón de pausa ni interrupción programada al salir de la portada o cambiar de pestaña. Con movimiento reducido queda una decoración estática.

`Visual` conserva carga/imagen lista/error. La portada prioriza la fotografía aportada, incluye una vista previa pequeña y revela la imagen al cargar; si falla, muestra una alternativa sin bloquear las consultas. El contenido estático de `index.html` ofrece bienvenida y contacto si no se ejecuta JavaScript.

La carta cambia mediante filtros con foco conservado y una transición breve de altura. Las gráficas se pueden ampliar en un diálogo nativo, con cierre por botón/Escape, foco contenido y regreso al disparador. No se añaden giros 3D, cursores personalizados, audio automático ni scroll secuestrado.

`motion.ts` revela secciones una sola vez y conserva limpieza de observadores/animaciones. `prefers-reduced-motion` evita transiciones decorativas. La navegación interna soporta hash directo, recarga, atrás/adelante y enlaces desde `/carta`.

El carrusel de la agenda se conserva para eventos anteriores realmente publicados: cada seis segundos, con pausa al recibir foco, puntero, pestaña oculta, o salida de pantalla. Conserva las flechas anterior/siguiente y el avance automático, sin botón de pausa. Usar las flechas no detiene permanentemente el carrusel: continúa al salir el foco o el puntero. No se renderiza si faltan eventos anteriores. No se inventa una galería histórica. El video de marca se incorpora por indicación del usuario. La miniatura está siempre visible. El reproductor solo se monta al pulsar la miniatura o su botón «Ver video», e inicia la reproducción voluntaria silenciada. Los controles nativos permiten pausar, reanudar, activar el sonido o ampliar la imagen. El MP4 no se descarga antes de esa interacción.

Las pruebas comprueban carga lenta/error, navegación, filtros, zoom, foco, cinco anchos, contraste, reproducción automática y movimiento reducido. Las capturas y `docs/grabaciones/recorrido.webm` se generan con Chromium local. No sustituyen pruebas en dispositivos físicos ni acreditan publicación o conexión real a Google Calendar.

La metáfora nueva de la puerta es un marco abstracto en CSS, sin reproducción de una fachada ni interacción obligatoria. La imagen principal se descubre desde el centro con una máscara breve de 520 ms al cargar; el texto y los enlaces están disponibles desde el primer render. Con movimiento reducido la escena aparece estática.

## Carta estacional

`SeasonalMenu` conserva el foco de los filtros y anima la altura durante 240 ms, cancelando la transición anterior si se vuelve a cambiar de categoría. No espera para mostrar resultados ni obliga a arrastrar. Con movimiento reducido se actualiza inmediatamente. El visor mantiene la imagen completa y añade el aviso de demo o inclusión pendiente. Las imágenes inferiores se cargan de forma diferida y tienen dimensiones reservadas.
