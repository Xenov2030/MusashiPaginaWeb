# MUSASHI · Anime Café

Boceto web funcional para presentar al propietario de **Musashi Anime Café, Mendoza, Argentina**. Propuesta de diseño y desarrollo de Nicolas Aguirres: café de especialidad, pastelería japonesa y cultura como punto de encuentro.

**Estado:** prototipo para revisión. No es un sitio oficial publicado ni una carta comercial confirmada. Preparado para Netlify, conectado por el usuario a `desarrollo/boceto-musashi`. La publicación de la bienvenida y las animaciones fue autorizada; se entrega mediante la rama conectada y el estado final se consulta en Netlify. URL del sitio: `https://musashiweb.netlify.app/`.

## Diseño y contenido

**Blanco y negro invertidos, con movimiento y navegación reforzada:** se invierten los fondos y textos neutros: portada y cabecera blancas; carta, experiencia y cierre oscuros. El rojo sigue como acento y las imágenes mantienen sus colores. Los botones rojos conservan texto blanco por contraste. La composición evoluciona sin inventar la apariencia del nuevo local.

- Portada integrada con una bienvenida directa, encuadre ligeramente desplazado y trazo rojo. Acciones claras hacia carta e Instagram; aviso discreto de nuevo espacio.
- Carta visual, filtros accesibles y `/carta` con explicaciones breves. Una nota visible por página concentra el carácter conceptual y la disponibilidad pendiente.
- Experiencia breve: una sola imagen conceptual y un texto de bienvenida. Se retiró el mosaico repetido de recortes de productos.
- Ramen como invitación a un encuentro, con imagen primero y contenido a su lado; permanece identificado como ejemplo, sin fechas ni reservas.
- Modelo `VisualResource` y componente `Visual` para sustituir recursos conceptuales por imágenes autorizadas sin rehacer los componentes. Portada principal y detalle opcional; experiencia con vista, detalle y escena de mesa.
- Logo reemplazable, recursos locales, imágenes WebP con dimensiones reservadas y carga diferida fuera de portada. Sin nuevas dependencias, backend ni efectos invasivos.
- Entradas coordinadas de texto y un revelado de portada que empieza al cargar la imagen. Vista previa ligera, variantes responsive y estado de error usable.
- Revelados distintos por sección: aparición, recorte y trazado rojo. Filtros con transición de altura; modal con apertura y cierre suaves. Se respeta movimiento reducido.
- Navegación por hash e historial comprobada mediante la posición del destino, incluido acceso directo, atrás/adelante y enlaces desde `/carta`.
- Teclado, foco contenido en el modal, Escape y retorno al disparador, contraste de lectura y respaldo de bienvenida sin JavaScript.

Los siete recursos de comida siguen siendo ilustraciones generadas para el boceto, no productos, interiores ni instalaciones reales de Musashi. No se añadieron imágenes del local ni materiales de terceros. No se inventan datos comerciales; la nota junto a la carta permite leer el sitio sin una sucesión de advertencias.

**Rama de desarrollo:** `desarrollo/bienvenida-musashi`. Tras la autorización del usuario, esta entrega se sube a `desarrollo/boceto-musashi`, conectada al despliegue automático de Netlify, sin modificar `main`. Un push no confirma por sí solo que la compilación remota haya terminado.

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

Los detalles de movimiento, investigación de hashes y pruebas de carga están en [MOVIMIENTO.md](docs/MOVIMIENTO.md). Se incluyen pruebas de imágenes lentas/fallidas y una grabación del recorrido. Las pruebas no constituyen una auditoría completa de accesibilidad ni verifican el estado de sitios externos. En este entorno, la descarga de Chromium de Playwright fue bloqueada por la política de red; se utiliza el Chromium del sistema.

## Estructura

```text
src/
  content.ts        Configuración, modelos y datos separados de la presentación
  main.tsx          Componentes, portada y ruta de carta
  style.css         Tokens, diseño adaptable y movimiento
  motion.ts         Hashes, historial y revelados progresivos
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

1. Revisar `desarrollo/bienvenida-musashi`. El usuario autorizó la publicación de esta entrega.
2. Desde **el sitio existente** de Netlify, conectar este repositorio y seleccionar explícitamente la rama que deba publicarse. No crear otro sitio si ya existe uno. El usuario conectó previamente `desarrollo/boceto-musashi`; esta entrega se publica avanzando esa rama, sin cambiar el sitio ni el dominio.
3. Usar `npm run build`, directorio de publicación `dist` y Node 24. `netlify.toml` ya declara estos valores y la redirección SPA para `/carta`.
4. Publicar solo con autorización; verificar `/`, `/carta` y su recarga directa en el dominio real, recursos, enlaces y vista móvil.

El prototipo incluye `noindex, nofollow` en HTML y `X-Robots-Tag` en Netlify. No genera sitemap. **Noindex no protege el acceso**: una URL pública sigue siendo accesible. Para limitarlo hace falta configurar control de acceso en el hosting. Mantener noindex durante la revisión; retirarlo requiere una decisión expresa para la versión oficial.

## Capturas de la propuesta

[Escritorio](docs/capturas/escritorio.png) · [Móvil](docs/capturas/movil.png) · [Carta](docs/capturas/carta.png) · [Grabación de movimiento](docs/grabaciones/recorrido.webm)

## Pendiente del propietario

Logo original y su autorización de uso; tipografías o manual de marca; fotografías autorizadas; nueva dirección y horarios; estado y fecha de apertura; carta, descripciones, precios y disponibilidad; características alimentarias verificadas; teléfono o WhatsApp oficial; condiciones y calendario de eventos; política de consultas y reservas. Los audios pendientes no se trataron como requisitos confirmados.

---

[**DESARROLLADO POR NICOLAS AGUIRRES**](https://nicolasaguirrescode.com/)
