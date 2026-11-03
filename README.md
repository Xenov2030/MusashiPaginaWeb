# MUSASHI · La mesa de Musashi

Boceto web funcional para presentar al propietario de **Musashi, Mendoza, Argentina**. Propuesta de diseño y desarrollo de Nicolas Aguirres: café de especialidad, té, coctelería y gastronomía japonesa como invitación a la mesa.

**Estado:** prototipo para revisión. No es un sitio oficial publicado ni una carta comercial confirmada. Preparado para Netlify, conectado por el usuario a `desarrollo/boceto-musashi`. Esta dirección de «La mesa de Musashi» permanece local y no se ha enviado a Netlify. URL del sitio: `https://musashiweb.netlify.app/`.

## Diseño y contenido

**La mesa de Musashi:** cultura japonesa, hospitalidad y el oficio detrás del café, té y coctelería. Esta dirección reemplaza el protagonismo anterior del anime, manga y estudio editorial; el Instagram oficial conserva su URL. Los textos de portada son propuestas para revisión, no eslóganes oficiales.

- Portada como carta sobre una escena ilustrada de mesa, sin reproducir el nuevo local. Identificador provisional, rama de cerezo parcial y acciones directas.
- Carta sobre trama neutra inspirada en tatami, hojas blancas, texto negro y acentos rojos. Categorías accesibles de Café, Té y blends, Coctelería y Cocina y pastelería japonesa.
- Té y coctelería explican la disciplina cuando no hay productos aprobados: no se inventaron blends, cócteles, precios ni disponibilidad.
- Barista profesional, tea blender y bartender se presentan como un relato de oficio, según la información transmitida por Nicolas, sin credenciales adicionales.
- Onigiris, encuentros en tatamis y ramen como antecedentes, con detalles en modales accesibles. No se anuncian eventos próximos ni reservas.
- Cerezos SVG y seis pétalos CSS en escritorio, tres en móvil. Control de pausa, preferencia de sesión, suspensión fuera de pantalla o con la pestaña oculta, y composición estática con movimiento reducido.
- Entradas y recortes diferenciados, trazado rojo, filtros con transición de altura, foco gestionado y navegación real con hashes e historial.
- Imágenes conceptuales locales, prioridad y vista previa para portada, carga diferida inferior y alternativa ante fallo. Sin backend ni nuevas dependencias.

El logo original, las fotos reales del propietario y del nuevo espacio y la carta comercial siguen pendientes. Los datos de oficio y antecedentes proceden del pedido de Nicolas, no de una escucha de audios. La sección histórica opcional queda desactivada por falta de verificación de fuentes: [registro de historia](docs/HISTORIA.md).

**Rama local:** `desarrollo/bienvenida-musashi`. Esta iteración no se subió, fusionó ni desplegó. La indicación del pedido requiere una autorización posterior para publicar; la rama conectada a Netlify conserva la entrega anterior.

## Ejecutar el proyecto

Requiere **Node.js 22.12 o superior**; validado con Node 24.22.1 y npm 11.9.0.

```sh
npm ci
npm run dev
```

Vite muestra el puerto de desarrollo en la terminal (por defecto 5173). Desde ese servidor se pueden revisar `/` y `/carta`.

```sh
npm run build
npm run preview
```

La compilación comprueba TypeScript y genera `dist/`. `preview` sirve ese resultado para revisión local; no publica en Internet. No se necesitan variables de entorno ni credenciales para ejecutar la web.

## Verificación

Pruebas de navegador con Playwright:

```sh
npx playwright install chromium ffmpeg
npm run build
npm run test:e2e
```

Alternativa validada en este entorno con Chromium y FFmpeg del sistema (la revisión de FFmpeg corresponde al Playwright del lockfile actual):

```sh
mkdir -p /tmp/musashi-playwright/ffmpeg-1013
ln -sfn /usr/bin/ffmpeg /tmp/musashi-playwright/ffmpeg-1013/ffmpeg-linux
PLAYWRIGHT_BROWSERS_PATH=/tmp/musashi-playwright PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Las pruebas arrancan el servidor de producción local en el puerto 4173 y comprueban portada, firma, navegación, ruta directa y recarga de `/carta`, filtros, menú móvil, modal y cierre con Escape, recuperación del foco, noindex, carga sin solicitudes externas y desbordamiento en anchos de 320, 390, 768, 1024 y 1440 px. También verifican el destacado de portada, los enlaces de detalle, el valor adicional de `/carta`, las proporciones de las imágenes el foco en el modal, movimiento reducido, contraste y que los colores de la interfaz se limiten a neutros y rojo (las ilustraciones mantienen sus colores naturales). Generan las capturas de `docs/capturas/`.

Los detalles de movimiento, investigación de hashes y pruebas de carga están en [MOVIMIENTO.md](docs/MOVIMIENTO.md). Se incluyen pruebas de imágenes lentas/fallidas y una grabación del recorrido. Además se prueban las cuatro categorías, sus estados sin productos, las tres invitaciones y la pausa de pétalos. Las pruebas no constituyen una auditoría completa de accesibilidad ni verifican el estado de sitios externos. En este entorno, la descarga de Chromium de Playwright fue bloqueada por la política de red; se utiliza el Chromium del sistema.

## Estructura

```text
src/
  content.ts        Configuración, modelos y datos separados de la presentación
  main.tsx          Componentes, portada y ruta de carta
  style.css         Tokens, diseño adaptable y movimiento
  motion.ts         Hashes, historial y revelados progresivos
  Ambient.tsx       Rama, pétalos y pausa accesible
public/fonts/       Fuentes WOFF2 locales y licencias OFL
public/images/      Ilustraciones WebP optimizadas
index.html          Idioma, metadatos y noindex
netlify.toml        Build, redirecciones SPA y cabeceras
tests/              Pruebas funcionales de navegador
docs/
  RECURSOS.md       Procedencia y decisiones provisionales
  CONTENIDO.md      Guía de edición y materiales pendientes
  capturas/         Vista de escritorio, móvil y carta
  grabaciones/      Recorrido WebM de animaciones
```

## Actualizar marca y contenido

La [guía de contenido](docs/CONTENIDO.md) detalla cómo reemplazar logo, imágenes, fuentes y datos. Los [recursos y aproximaciones](docs/RECURSOS.md) registran su procedencia.

`src/content.ts` centraliza marca, enlaces, modo boceto, estado del negocio y datos confirmados. La carta de demostración está separada de `confirmedProducts`. Los modelos admiten precios ARS, imágenes opcionales, disponibilidad y características confirmadas; los eventos admiten fecha, hora, condiciones y estados.

La estructura para consultas futuras por WhatsApp existe como función `reservationLink`, pero no se activa sin número oficial. Una consulta no confirma una reserva. No se implementan pagos, señas ni disponibilidad automática.

## Publicación posterior en Netlify

1. Revisar `desarrollo/bienvenida-musashi` y obtener una nueva indicación de publicación para esta dirección artística.
2. Desde **el sitio existente** de Netlify, conectar este repositorio y seleccionar explícitamente la rama que deba publicarse. No crear otro sitio si ya existe uno. El usuario conectó previamente `desarrollo/boceto-musashi`; no avanzar esa rama sin indicación posterior; no cambiar el sitio ni el dominio.
3. Usar `npm run build`, directorio de publicación `dist` y Node 24. `netlify.toml` ya declara estos valores y la redirección SPA para `/carta`.
4. Publicar solo con autorización; verificar `/`, `/carta` y su recarga directa en el dominio real, recursos, enlaces y vista móvil.

El prototipo incluye `noindex, nofollow` en HTML y `X-Robots-Tag` en Netlify. No genera sitemap. **Noindex no protege el acceso**: una URL pública sigue siendo accesible. Para limitarlo hace falta configurar control de acceso en el hosting. Mantener noindex durante la revisión; retirarlo requiere una decisión expresa para la versión oficial.

## Capturas de la propuesta

[Escritorio](docs/capturas/escritorio.png) · [Móvil](docs/capturas/movil.png) · [Carta](docs/capturas/carta.png) · [Grabación de movimiento](docs/grabaciones/recorrido.webm)

## Pendiente del propietario

Logo original y su autorización de uso; tipografías o manual de marca; fotografías autorizadas; nueva dirección y horarios; estado y fecha de apertura; carta, descripciones, precios y disponibilidad; características alimentarias verificadas; teléfono o WhatsApp oficial; condiciones y calendario de eventos; política de consultas y reservas. Los audios pendientes no se trataron como requisitos confirmados.

---

[**DESARROLLADO POR NICOLAS AGUIRRES**](https://nicolasaguirrescode.com/)
