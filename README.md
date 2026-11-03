# MUSASHI · Anime Café

Boceto web funcional para presentar al propietario de **Musashi Anime Café, Mendoza, Argentina**. Propuesta de diseño y desarrollo de Nicolas Aguirres: café de especialidad, pastelería japonesa y cultura como punto de encuentro.

**Estado:** prototipo para revisión. No es un sitio oficial publicado ni una carta comercial confirmada. Preparado para Netlify, conectado por el usuario a `desarrollo/boceto-musashi`. La publicación del rediseño fue autorizada; el estado del despliegue se consulta en Netlify. URL del sitio: `https://musashiweb.netlify.app/`.

## Diseño y contenido

**Segunda iteración gastronómica:** negro y blanco dominantes, rojo como acento. Los colores naturales aparecen únicamente en las ilustraciones de comida. Se conserva React + TypeScript + Vite, sin servicios nuevos ni dependencias para efectos.

- Cabecera compacta y portada con «Café, Japón y algo para compartir», sin la marca gigante ni el rótulo de estudio gráfico.
- Siete ilustraciones originales generadas para el boceto: café, mochi, dorayaki, cheesecake, ramen, portada y una composición de manga con merienda. No son fotografías ni productos reales de Musashi.
- Selección de tres propuestas en portada, con mochi destacado y café y dorayaki secundarios. Filtros con transición breve y cantidad de resultados anunciada.
- **`/carta`** agrega el cheesecake, explicaciones ampliadas de cada preparación, notas de textura y una guía introductoria. Los enlaces de producto llegan a sus detalles mediante anclas estables.
- Experiencia con una ilustración protagonista y dos recortes de detalle de esa misma composición. No se simula el local ni su equipamiento.
- Afiche de ramen con presencia gastronómica, identificación de ejemplo y modal accesible. No anuncia fechas ni habilita reservas.
- Estado activo de navegación, menú móvil, foco visible, cierre del modal con Escape y retorno al disparador.
- Imágenes WebP locales optimizadas, dimensiones reservadas y carga diferida fuera de portada. Sin fotos externas, feed de Instagram, backend, analítica ni cookies de seguimiento.

No se publican dirección, horarios, teléfono, precios, fecha de inauguración, reseñas ni políticas no confirmadas. La carta ilustrativa se mantiene separada de los datos confirmados. El contexto de nuevo espacio procede del brief, no de una comprobación actual del negocio. Los textos son propuestas editoriales para aprobación.

**Rama de desarrollo:** `desarrollo/rediseno-editorial-musashi`. El usuario autorizó publicar esta iteración automáticamente: se avanza `desarrollo/boceto-musashi`, conectada a Netlify, sin modificar `main` ni crear otro sitio. El estado final del despliegue se consulta en Netlify; un push no acredita por sí solo una publicación exitosa.

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
npx playwright install chromium
npm run build
npm run test:e2e
```

Si el entorno ya dispone de Chromium:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Las pruebas arrancan el servidor de producción local en el puerto 4173 y comprueban portada, firma, navegación, ruta directa y recarga de `/carta`, filtros, menú móvil, modal y cierre con Escape, recuperación del foco, noindex, carga sin solicitudes externas y desbordamiento en anchos de 320, 390, 768, 1024 y 1440 px. También verifican el destacado de portada, los enlaces de detalle, el valor adicional de `/carta`, las proporciones de las imágenes y que los colores de la interfaz se limiten a neutros y rojo (las ilustraciones mantienen sus colores naturales). Generan las capturas de `docs/capturas/`.

No constituyen una auditoría completa de accesibilidad ni verifican el estado de sitios externos. En este entorno, la descarga de Chromium de Playwright fue bloqueada por la política de red; se utiliza el Chromium del sistema.

## Estructura

```text
src/
  content.ts        Configuración, modelos y datos separados de la presentación
  main.tsx          Componentes, portada y ruta de carta
  style.css         Tokens y diseño adaptable
public/fonts/       Fuentes WOFF2 locales y licencias OFL
public/images/      Ilustraciones WebP optimizadas
index.html          Idioma, metadatos y noindex
netlify.toml        Build, redirecciones SPA y cabeceras
tests/              Pruebas funcionales de navegador
docs/
  RECURSOS.md       Procedencia y decisiones provisionales
  CONTENIDO.md      Guía de edición y materiales pendientes
  capturas/         Vista de escritorio y móvil
```

## Actualizar marca y contenido

La [guía de contenido](docs/CONTENIDO.md) detalla cómo reemplazar logo, imágenes, fuentes y datos. Los [recursos y aproximaciones](docs/RECURSOS.md) registran su procedencia.

`src/content.ts` centraliza marca, enlaces, modo boceto, estado del negocio y datos confirmados. La carta de demostración está separada de `confirmedProducts`. Los modelos admiten precios ARS, imágenes opcionales, disponibilidad y características confirmadas; los eventos admiten fecha, hora, condiciones y estados.

La estructura para consultas futuras por WhatsApp existe como función `reservationLink`, pero no se activa sin número oficial. Una consulta no confirma una reserva. No se implementan pagos, señas ni disponibilidad automática.

## Publicación en Netlify

1. Revisar la rama `desarrollo/rediseno-editorial-musashi` y obtener aprobación del contenido.
2. Desde **el sitio existente** de Netlify, conectar este repositorio y seleccionar explícitamente la rama que deba publicarse. No crear otro sitio si ya existe uno. El usuario conectó previamente `desarrollo/boceto-musashi`; la publicación de esta iteración ya fue autorizada expresamente.
3. Usar `npm run build`, directorio de publicación `dist` y Node 24. `netlify.toml` ya declara estos valores y la redirección SPA para `/carta`.
4. Publicar solo con autorización; verificar `/`, `/carta` y su recarga directa en el dominio real, recursos, enlaces y vista móvil.

El prototipo incluye `noindex, nofollow` en HTML y `X-Robots-Tag` en Netlify. No genera sitemap. **Noindex no protege el acceso**: una URL pública sigue siendo accesible. Para limitarlo hace falta configurar control de acceso en el hosting. Mantener noindex durante la revisión; retirarlo requiere una decisión expresa para la versión oficial.

## Capturas de la propuesta

[Escritorio](docs/capturas/escritorio.png) · [Móvil](docs/capturas/movil.png) · [Carta](docs/capturas/carta.png)

## Pendiente del propietario

Logo original y su autorización de uso; tipografías o manual de marca; fotografías autorizadas; nueva dirección y horarios; estado y fecha de apertura; carta, descripciones, precios y disponibilidad; características alimentarias verificadas; teléfono o WhatsApp oficial; condiciones y calendario de eventos; política de consultas y reservas. Los audios pendientes no se trataron como requisitos confirmados.

---

[**DESARROLLADO POR NICOLAS AGUIRRES**](https://nicolasaguirrescode.com/)
