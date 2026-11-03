# Guía de reemplazo y aprobación

## Configuración

Editar `src/content.ts`:

- `site.draft`: mantiene la nota discreta del boceto y selecciona la carta de demostración. Con `false`, se usa `confirmedProducts`; si está vacío, se muestra un mensaje sin inventar productos. El afiche demostrativo de ramen se oculta fuera del boceto.
- `site.stage`: `coming-soon` o `open`. Cambiar solo tras confirmar el estado con el propietario.
- `site.business.address` y `hours`: `null` hasta su confirmación. Al cargar texto aparecen en contacto.
- `site.business.whatsapp`: `null` hasta recibir un número oficial. Formato internacional solo con dígitos. Al configurarlo aparece el enlace de consulta; no promete una reserva.
- `site.visuals.logo`: ruta como `/images/logo-musashi.svg`, a un recurso autorizado guardado en `public/images/`. Conservar proporciones y aportar un archivo de calidad; una miniatura ampliada no es un original.
- `site.visuals.spacePhoto`: foto autorizada del espacio confirmado, local y optimizada. Ajustar su texto alternativo si cambia el contenido. `provisional` registra el estado editorial del material; no constituye una verificación automática de los archivos.

## Carta

Agregar datos aprobados a `confirmedProducts`; mantener separados los ejemplos de `demoProducts`. El modelo `Product` incluye `name`, `category`, `description`, `priceARS`, `image`, `availability` y `confirmedFeatures`. Precio `null` se omite; no usar cero para representar un precio desconocido. Las imágenes son opcionales: la carta se presenta en filas editoriales sin recuadros vacíos. Al incorporar imágenes, se alternan sus alturas sin convertir la carta en una cuadrícula. Las características alimentarias requieren confirmación expresa.

Las categorías iniciales son Café y Pastelería. Para ampliarlas, actualizar el tipo y las opciones de filtro en el componente `Menu`.

## Eventos y consultas

`CafeEvent` prevé título, descripción, imagen, fecha, hora, precio, condiciones y estados `upcoming`, `full`, `finished`, además de `illustrative` para el ejemplo. Antes de incorporar eventos reales, adaptar el afiche para mostrar esos datos aprobados y retirar la etiqueta demostrativa; el modelo preparado no anuncia automáticamente un calendario.

`reservationLink` genera una consulta con fecha, hora, cantidad de personas y evento opcional solo con un número oficial. El mensaje advierte que no confirma una reserva. El prototipo no incluye un formulario de reservas ni conexión con disponibilidad real.

## Marca

Cambiar colores, familias y espaciados en los tokens de `src/style.css`. La identidad aprobada para este rediseño es negro y blanco, con rojo en menor medida; no reintroducir tonos cálidos de la propuesta anterior. Las familias actuales se declaran en `public/fonts/fonts.css`. Para reemplazarlas, aportar WOFF2 con licencia adecuada, actualizar declaraciones y conservar la licencia de redistribución. Solicitar el favicon original o derivarlo de un logo autorizado; actualmente está pendiente.

Al incorporar fotografías, usar WebP/AVIF cuando corresponda, dimensiones reservadas, textos alternativos útiles y autorización documentada en `RECURSOS.md`. Evitar imágenes con texto como sustituto de carta o información comercial.

## Antes de publicar como sitio oficial

Confirmar datos comerciales y textos, sustituir los materiales provisionales, revisar móvil y escritorio, ejecutar compilación y pruebas. Revisar por separado la retirada de noindex del HTML y de `netlify.toml`. Noindex no equivale a privacidad.

Conservar al final de la página y del README el crédito enlazado: **DESARROLLADO POR NICOLAS AGUIRRES** — https://nicolasaguirrescode.com/.
