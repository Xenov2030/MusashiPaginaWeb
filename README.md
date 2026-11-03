# MUSASHI · Anime Café

Boceto web funcional para presentar al propietario de **Musashi Anime Café, Mendoza, Argentina**. Propuesta de diseño y desarrollo de Nicolas Aguirres: café de especialidad, pastelería japonesa y cultura como punto de encuentro.

**Estado:** prototipo para revisión. No es un sitio oficial publicado ni una carta comercial confirmada. Preparado para Netlify. El usuario conectó previamente la rama de la propuesta anterior; este rediseño no se desplegó. URL del sitio configurado por el usuario; no verificada para este rediseño: `https://musashiweb.netlify.app/`.

## Diseño y contenido

**Rediseño editorial:** negro `#080808` y blanco `#FFFFFF` dominantes, con rojo `#C51624` como acento. Esta dirección reemplaza por completo la propuesta cálida anterior. Tokens centralizados, títulos de gran escala, líneas rectas y composiciones distintas en cada sección.

- Portada negra asimétrica: MUSASHI como identificador tipográfico provisional, marco blanco, sello rojo y una ilustración monocroma propia. No se creó ni reinterpretó un logo.
- Transición blanca con una frase editorial de gran tamaño, sin las tres tarjetas anteriores.
- Carta HTML en **`/carta`**, filtros funcionales, filas numeradas, separadores y descripciones legibles. Sin imágenes de productos inventadas ni precios sin confirmar.
- Experiencia en paneles de diferentes proporciones, con una trama puntual y un espacio preparado para fotografía real autorizada.
- «Noche de Ramen» como afiche independiente con detalle en un modal accesible. Sigue siendo un ejemplo, sin fechas ni reservas.
- Cierre directo con Instagram y firma del desarrollador.
- Menú móvil, navegación por teclado, foco visible y respeto por movimiento reducido.
- Recursos locales, sin feed de Instagram, backend, analítica ni cookies de seguimiento.

No se publican dirección, horarios, teléfono, fecha de inauguración, reseñas ni políticas no confirmadas. La dirección anterior no se presenta como vigente. El contexto de próxima apertura procede del brief, no de una comprobación actual del negocio. Los textos son propuestas editoriales para aprobación.

**Rama de revisión:** `desarrollo/rediseno-editorial-musashi`. La rama anterior `desarrollo/boceto-musashi` quedó sin cambios porque está conectada a la publicación automática de Netlify. Este rediseño no se fusionó ni se desplegó. Para publicarlo se necesita una indicación posterior.

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

Las pruebas arrancan el servidor de producción local en el puerto 4173 y comprueban portada, firma, navegación, ruta directa y recarga de `/carta`, filtros, menú móvil, modal y cierre con Escape, recuperación del foco, noindex, carga sin solicitudes externas y desbordamiento en anchos de 320, 390, 768, 1024 y 1440 px. También verifican que los colores calculados se limiten a neutros y rojo. Generan las capturas de `docs/capturas/`.

No constituyen una auditoría completa de accesibilidad ni verifican el estado de sitios externos. En este entorno, la descarga de Chromium de Playwright fue bloqueada por la política de red; se utiliza el Chromium del sistema.

## Estructura

```text
src/
  content.ts        Configuración, modelos y datos separados de la presentación
  main.tsx          Componentes, portada y ruta de carta
  style.css         Tokens y diseño adaptable
public/fonts/       Fuentes WOFF2 locales y licencias OFL
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

## Publicación futura en Netlify

1. Revisar la rama `desarrollo/rediseno-editorial-musashi` y obtener aprobación del contenido.
2. Desde **el sitio existente** de Netlify, conectar este repositorio y seleccionar explícitamente la rama que deba publicarse. No crear otro sitio si ya existe uno. El usuario conectó previamente `desarrollo/boceto-musashi`; no cambiar la rama de producción ni activar despliegues del rediseño sin una indicación posterior.
3. Usar `npm run build`, directorio de publicación `dist` y Node 24. `netlify.toml` ya declara estos valores y la redirección SPA para `/carta`.
4. Publicar solo con autorización; verificar `/`, `/carta` y su recarga directa en el dominio real, recursos, enlaces y vista móvil.

El prototipo incluye `noindex, nofollow` en HTML y `X-Robots-Tag` en Netlify. No genera sitemap. **Noindex no protege el acceso**: una URL pública sigue siendo accesible. Para limitarlo hace falta configurar control de acceso en el hosting. Mantener noindex durante la revisión; retirarlo requiere una decisión expresa para la versión oficial.

## Capturas de la propuesta

[Escritorio](docs/capturas/escritorio.png) · [Móvil](docs/capturas/movil.png)

## Pendiente del propietario

Logo original y su autorización de uso; tipografías o manual de marca; fotografías autorizadas; nueva dirección y horarios; estado y fecha de apertura; carta, descripciones, precios y disponibilidad; características alimentarias verificadas; teléfono o WhatsApp oficial; condiciones y calendario de eventos; política de consultas y reservas. Los audios pendientes no se trataron como requisitos confirmados.

---

[**DESARROLLADO POR NICOLAS AGUIRRES**](https://nicolasaguirrescode.com/)
