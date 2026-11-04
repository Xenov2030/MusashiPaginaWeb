# Editar la carta estacional

La URL pública es siempre `/carta`. No hace falta cambiar el enlace ni un QR al seleccionar otra temporada. No hay activación automática por mes, hemisferio o fecha.

## Catálogo reutilizable

`src/menu/catalog.ts` contiene `productCatalog`, con identidad, nombre, descripción base, imagen y alcohol indicado cuando el afiche lo declara. Las creaciones documentadas se reutilizan desde `suppliedProducts` de `src/content.ts`; no se duplican sus recetas en cada temporada. Los ejemplos nuevos tienen identificadores `demo-*` y no pueden publicarse como oferta confirmada.

Conservar el identificador de un producto si sigue siendo el mismo. Para cambiar algo solo durante una temporada, editar su asociación en `seasons.json`, no su base global. Así otras temporadas conservan sus propias variaciones. Antes de cambiar datos globales compartidos, conservar las descripciones e imágenes históricas como overrides en las temporadas anteriores que deban mantenerlas.

## Temporadas

`src/menu/seasons.json` tiene dos partes:

- `selectedSeasonId`: registro que se mostrará, seleccionado por una persona.
- `seasons`: registros con `id`, `name`, `year`, `status`, `heading`, `intro`, `categories` y `products`.

El año es `null` mientras no esté confirmado. Los estados son `draft`, `demo`, `published` y `archived`. Solo `demo` y `published` son visibles. No se muestra un selector público de temporadas internas ni un panel de edición.

Cada asociación puede usar estos campos:

```json
{
  "productId": "vagabond",
  "category": "Creaciones de autor",
  "role": "brand-reference",
  "priceARS": null,
  "availability": "unconfirmed"
}
```

`productId` debe existir en el catálogo y no repetirse dentro de la misma temporada. La categoría debe estar en `categories`.

Opcionalmente puede agregarse `name`, `description` o `image` para reemplazar el dato base **en esa temporada**. Una imagen usa la misma estructura de `VisualResource`: `src`, `alt`, `width`, `height`, `kind`, `source`, y opcionalmente `srcSet`, `sizes`, `format` y `placeholder`.

- `role: demonstration`: producto o combinación inventados exclusivamente para la demo.
- `role: brand-reference`: creación del cliente documentada, pero no confirmada para esa temporada.
- `role: official`: inclusión aprobada por el propietario.
- `availability`: `unconfirmed`, `available` o `unavailable`.
- `priceARS`: número confirmado en pesos o `null`; no escribir un precio de ejemplo.

En `demo` se fuerzan precio pendiente y disponibilidad no confirmada. No hay botones para pedir o reservar productos. Los detalles repiten el aviso de prueba. En `published`, únicamente los productos `official` y `available` pueden ofrecer una consulta; esa consulta tampoco confirma una reserva.

## Pasar a una carta oficial

1. Recibir productos, descripciones, imágenes, categorías, precios y disponibilidad del propietario.
2. Crear una nueva temporada como `draft`. Usar los productos reales existentes o crear sus identidades confirmadas en el catálogo; no reutilizar identificadores `demo-*` para simular productos aprobados.
3. Completar las variaciones de temporada en sus asociaciones. No convertir por intuición una bebida de un afiche en una bebida fría.
4. Tras la confirmación, marcar las asociaciones como `official` y cambiar la temporada a `published`. El modelo rechaza una publicación con referencias de prueba o inclusión pendiente.
5. Seleccionar su identificador en `selectedSeasonId`. La temporada anterior puede pasar a `archived`, sin eliminarla del archivo.
6. Ejecutar compilación y pruebas, revisar desktop/móvil y solicitar publicación cuando corresponda. No cambiar `/carta`.

La demo y la carta oficial usan `SeasonalMenu`, `SeasonalProduct`, `Visual` y `ProductMedia`. Cambiar datos no requiere rehacer componentes.

## Imágenes

`resources/generated/verano/inventory.json` registra las cuatro imágenes conceptuales. Los PNG originales están junto al inventario; las variantes WebP se sirven desde `public/media/verano`. Se identifican como ilustrativas, sin atribuirlas al propietario. No son imágenes de otro establecimiento.

Vagabond y Taiyaki Red Velvet reutilizan los afiches originales del cliente y sus descripciones base. Se muestran como «Creación de la marca · Inclusión en temporada por confirmar». No se modifican recetas ni se presupone temperatura o disponibilidad. El visor mantiene el afiche entero con `contain`.

## Contactos de reserva

`src/reservation-config.ts` separa `gastronomiaWhatsApp`, `tatamiWhatsApp` y `bienestarWhatsApp`. Valores iniciales: `null`. Solo números internacionales confirmados, sin `+`, letras ni espacios. Un valor inválido no produce un enlace roto: utiliza Instagram y lo indica en el texto visible.

No hay herencia entre campos. Si el cliente confirma un mismo canal para Mesa y Tatami, completar explícitamente ambos. Bienestar nunca usa automáticamente el canal gastronómico.

La selección de recorrido está en `Reservations`. Los accesos por URL admiten `/?reserva=tatami#reservas` y `/?reserva=bienestar#reservas`. Los contactos aún no confirmados se anuncian como consulta provisional por Instagram. El combo de tatami y las condiciones se explican como pendientes. No existe calendario de cupos, pago ni confirmación automática.
