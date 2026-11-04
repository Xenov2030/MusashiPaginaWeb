# MUSASHI · Japón detrás de una puerta

Propuesta de la web de una cafetería oculta y un espacio de inspiración japonesa: café de especialidad, pastelería japonesa, cenas, tatami privado y bienestar. Implementada sobre el proyecto existente con React, TypeScript y Vite. Noindex permanece activo.

## Revisar esta entrega

Implementación preparada en `desarrollo/identidad-musashi`. El usuario autorizó ahora desplegarla para probar las funciones. Se publica mediante la rama `desarrollo/boceto-musashi`, conectada al sitio existente de Netlify, conservando el dominio y noindex. No se hace merge a `main`.

- [Portada con el concepto del propietario](docs/capturas/portada.png)
- [Tatami con la marca](docs/capturas/tatami.png)
- [Bienestar](docs/capturas/bienestar.png)
- [Creaciones y oficio](docs/capturas/creaciones.png)
- [Historia de Musashi](docs/capturas/historia.png)
- [Política de bebidas](docs/capturas/politica-bebidas.png)
- [Inicio en escritorio](docs/capturas/escritorio.png)
- [Inicio en móvil](docs/capturas/movil.png)
- [Carta](docs/capturas/carta.png)
- [Recorrido grabado](docs/grabaciones/recorrido.webm)

## Ejecución y compilación

Node 24 recomendado (mínimo 22.12).

```bash
npm ci
npm run dev
```

Vite muestra la dirección de la vista local, normalmente `http://localhost:5173`. Para revisar la compilación de producción:

```bash
npm run build
npm run preview
```

La ruta `/carta` admite acceso directo y recarga. Los enlaces desde la carta vuelven a la sección correspondiente de Inicio.

## Qué incluye

- Navegación: La experiencia, Carta, Tatami, Cenas, Bienestar, Nuestra historia y Contacto.
- Portada «Japón detrás de una puerta», frase del propietario, con el logo completo aportado, encuadre abstracto de apertura y revelado breve sin bloqueo. Acceso inmediato a la carta y la experiencia. Logo original conservado sin rediseño; la cabecera usa un recorte de presentación del símbolo mediante CSS, con sus trazos y colores intactos. El pie conserva la imagen completa.
- Historia real en tres momentos, sin fechas ni superlativos no verificados. «El camino cambia, la esencia permanece» se reserva al cierre de esa historia.
- Política de bebidas visible en Cafetería y en la carta: receta de autor; no se ofrecen azúcar ni edulcorantes adicionales para agregar a las bebidas. Esto no significa que las recetas sean libres de azúcar ni atribuye propiedades dietéticas.
- Carta sobre trama de tatami con once propuestas: seis creaciones de bebidas, Taiyaki Red Velvet y cuatro piezas con títulos descriptivos provisionales. Las seis bebidas tienen descripciones HTML transcritas de la parte legible de los afiches, con alcohol indicado en Samurai Coffee, Vagabond, Red Dragon y Midori Kensei. En las demás no se infiere ausencia de alcohol. Gráficas completas con `object-fit: contain` y ampliación accesible; precios y disponibilidad pendientes.
- Galería de tres imágenes distintas de pastelería. Se distingue material fotográfico, gráfica promocional y composición conceptual.
- Cenas y antecedentes de onigiris, ramen y tatamis, sin convertirlos en anuncios futuros.
- Tatami privado protagonista, con una composición abstracta en lugar de una falsa fotografía del espacio.
- Bienestar diferenciado: Tui Na, acupuntura y Reiki, sin promesas médicas, con imagen conceptual de toallas, cerámica y piedras.
- Consultas diferenciadas por experiencia. Instagram es el canal oficial confirmado. Se conserva el número personal de Nicolas autorizado para pruebas, identificado como tal en burbuja y formulario; no representa un WhatsApp oficial.
- Dirección privada, comunicada manualmente al confirmar por WhatsApp; el formulario prepara una solicitud y no confirma reservas.
- Pocos pétalos, una ramita ilustrada discreta, control de ambiente solo con icono, pausa fuera de pantalla/pestaña y movimiento reducido.
- Video del cliente incorporado como pieza promocional en Cenas, por indicación expresa del usuario. Se abre voluntariamente desde «Ver video», con portada, controles nativos, sin reproducción automática y silenciado inicialmente. No se atribuyen frases ni se presenta como registro del local o retrato del propietario. El audio no está transcrito.

La historia del nombre sigue desactivada hasta contar con texto verificado. No se anuncia fecha de apertura ni horarios actuales. La agenda ficticia de la revisión anterior fue retirada conforme al nuevo pedido; `public/events.json` está vacío.

## Estructura y actualización de contenido

| Archivo | Responsabilidad |
| --- | --- |
| `src/media.ts` | Recursos centrales: portada, cafetería, pastelería, cenas, tatami, bienestar, propietario, logo y video; procedencia y naturaleza de las imágenes. |
| `src/content.ts` | Identidad, propuesta, productos aportados, datos del negocio, especialidades e historia opcional. |
| `src/main.tsx` | Cabecera, portada, carta reutilizable, rutas y composición de la página. |
| `src/ExperienceSections.tsx` | Esencia, cafetería, galería, cenas, tatami, bienestar y consultas. |
| `src/OwnerHistory.tsx`, `src/BeveragePolicy.tsx` | Relato y política del propietario, con textos centrales en `src/content.ts`. |
| `src/ProductMedia.tsx` | Ampliación de imágenes originales, cierre por botón/Escape y retorno del foco. |
| `src/ConsultLink.tsx` | Consultas por tema: Instagram mientras no se configure un WhatsApp oficial. |
| `src/Reservations.tsx` | Solicitudes por WhatsApp, privacidad de la dirección y mascotas. |
| `src/Ambient.tsx`, `src/motion.ts` | Decoración y movimiento accesible. |
| `resources/inventory.json`, `resources/originals/` | Inventario con equivalencias por contenido, estado, sección y SHA-256; los doce JPEG y el MP4 originales, sin modificar. |
| `public/media/musashi` | Imágenes optimizadas WebP, variantes pequeñas y video MP4. |
| `integrations/google-calendar` | Conector opcional de agenda, preparado en revisiones anteriores; requiere conexión inicial del propietario. |

Para reemplazar imágenes, editar sus referencias en `src/media.ts`, con dimensiones, texto alternativo y procedencia. `cenas`, `tatami` y `propietario` permanecen en `null` hasta recibir fotografías correspondientes. `bienestar` usa una imagen conceptual identificada; se puede reemplazar por una foto autorizada. Al incorporar una foto, indicar `kind: "confirmed"` y `format: "photo"`. Las gráficas de producto usan `format: "graphic"` y se muestran completas al ampliarlas. No usar un flyer como fotografía de una experiencia, ni una escena de ficción como retrato del propietario.

Para un anuncio temporal de apertura, editar `copy.hero.stage` solo con texto confirmado. `site.business` mantiene dirección privada, pet friendly confirmado, horarios sin confirmar y contacto de prueba. La selección de carta es `suppliedProducts`; comprobar disponibilidad con el propietario antes de publicarla como vigente. Ver [guía de contenido](docs/CONTENIDO.md), [recursos](docs/RECURSOS.md) y [movimiento](docs/MOVIMIENTO.md).

## Agenda y Netlify

Se conserva `netlify.toml`, el dominio previsto `musashiweb.netlify.app`, la redirección SPA y el adaptador de agenda ya existente. No se agrega un servicio pago ni un backend nuevo. Sin conexión de Calendar, la agenda usa el archivo vacío. Al conectar la cuenta del propietario se mostrarán únicamente eventos publicados por él; [instrucciones](integrations/google-calendar/README.md).

Publicación autorizada para pruebas: usar el **sitio existente**, compilar con `npm run build` y publicar `dist`. La rama remota conectada en revisiones anteriores es `desarrollo/boceto-musashi`; enviar cambios a esa rama dispara el despliegue automático. El envío actual a esa rama responde a la indicación expresa del usuario de desplegar para probar las funciones. No crear otro sitio ni hacer merge a `main`. Mantener noindex durante la revisión.

## Verificación

Última revisión local: compilación correcta y **32 pruebas aprobadas** en Chromium. Se verificó también la integridad de los trece originales mediante SHA-256.

```bash
npm run build
npm run test:e2e
```

Las pruebas de navegador usan Chromium mediante Playwright. En este entorno se puede usar `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` y `PLAYWRIGHT_BROWSERS_PATH=/tmp/musashi-playwright`. La grabación requiere FFmpeg.

Se verifican escritorio/móvil, cinco anchos, acceso directo y recarga, atrás/adelante, filtros, ampliación de gráficas, foco, carga voluntaria y reproducción técnica del video sin sonido automático, estado de carga/error de la portada, contraste, pausa y movimiento reducido. La revisión local no acredita un despliegue ni comportamiento en dispositivos físicos o una conexión real con Google Calendar.

## Pendientes del cliente

Fotografías específicas de cenas, tatami y bienestar; retrato autorizado si se desea; nombres exactos de la pastelería sin rótulo; carta vigente, precios, ingredientes y alérgenos; horarios y estado de apertura; WhatsApp oficial; condiciones de reserva; próximos eventos confirmados; fuentes tipográficas originales y subtítulos/transcripción del video. La dirección debe seguir fuera del código y de los campos públicos de la agenda.

El relato del propietario menciona haber sido el primer Anime Café y la primera cafetería japonesa oculta de Mendoza. Esas primacías no se verificaron y se omitieron del sitio y sus metadatos. La historia del negocio está separada de la historia opcional de Miyamoto Musashi, que sigue desactivada.

---

[**DESARROLLADO POR NICOLAS AGUIRRES**](https://nicolasaguirrescode.com/)
