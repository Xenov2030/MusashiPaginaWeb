# MUSASHI — Japón detrás de una puerta

Web de una cafetería oculta en Mendoza, con café de especialidad, pastelería japonesa, cenas, tatami privado y bienestar. React, TypeScript y Vite; identidad negro/blanco/rojo, hojas sobre tatami, logo original y movimientos suaves.

## Esta entrega

Rama local: `desarrollo/carta-estacional`. El nuevo pedido exige revisión sin merge ni despliegue automático: esta entrega no se envía a las ramas remotas ni a Netlify.

- `/carta` es la dirección permanente para enlaces y un eventual QR, independientemente de la temporada.
- «Una muestra del próximo verano»: seis productos con imágenes, cuatro ejemplos nuevos de bebidas frías y dos referencias de la marca pendientes de inclusión. No se anuncia una carta vigente ni un año no confirmado.
- Filtros de categoría, detalles accesibles, precios por confirmar y avisos de prueba. Los productos demo no permiten pedidos ni reservas.
- Reservas con acceso destacado en cabecera y portada: Mesa en cafetería, Tatami privado y Bienestar, con tres contactos independientes. Actualmente los tres WhatsApp están pendientes; cada recorrido explica que la consulta provisional se dirige a Instagram oficial.
- Política actualizada: «Cada bebida, tal como fue elaborada». No implica ausencia de azúcar ni una propiedad dietética.
- Se conservan historia, materiales de la marca, afiches completos, video con miniatura y reproducción voluntaria, privacidad de la dirección, pet friendly, noindex y firma.

## Revisar

```bash
npm ci
npm run dev
```

Node 24 recomendado; mínimo 22.12. Vite muestra la dirección local, normalmente `http://localhost:5173`. Abrir `/carta` para la muestra completa.

```bash
npm run build
npm run preview
npm run test:e2e
```

En este entorno, Chromium está en `/usr/bin/chromium`; las pruebas admiten `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` y `PLAYWRIGHT_BROWSERS_PATH=/tmp/musashi-playwright`. La grabación requiere FFmpeg.

[Inicio escritorio](docs/capturas/escritorio.png) · [Inicio móvil](docs/capturas/movil.png) · [Carta escritorio](docs/capturas/carta-verano-escritorio.png) · [Carta móvil](docs/capturas/carta-verano-movil.png) · [Reservas](docs/capturas/reservas.png) · [Recorrido](docs/grabaciones/recorrido.webm).

## Seleccionar una temporada

Editar `src/menu/seasons.json`. `selectedSeasonId` determina manualmente la temporada mostrada. No se consulta el calendario para activarla. Cada registro conserva `id`, `name`, `year` opcional, `status`, categorías y asociaciones de productos.

- `draft`: borrador interno, no se muestra como carta.
- `demo`: muestra revisable, precios comerciales ocultos y consultas de productos deshabilitadas.
- `published`: carta aprobada por el propietario.
- `archived`: temporada anterior conservada internamente.

Una selección inexistente, borrador o archivada no se publica accidentalmente: la página muestra que la carta está pendiente. Las temporadas anteriores pueden permanecer en el archivo. [Guía de edición completa](docs/CARTA_ESTACIONAL.md).

## Sustituir la demo por la carta oficial

1. Agregar los productos confirmados a `src/menu/catalog.ts`, o reutilizar los identificadores de creaciones documentadas de Musashi.
2. Crear una temporada en `src/menu/seasons.json`, con descripciones, imágenes, categorías, precios y disponibilidad confirmados. Los cambios particulares van en las asociaciones de esa temporada, sin duplicar todo el producto.
3. Después de la aprobación del propietario, usar `status: "published"`, `role: "official"` y la disponibilidad correspondiente. Seleccionar su identificador en `selectedSeasonId` y archivar la temporada anterior si corresponde.
4. No publicar los identificadores `demo-*`: son ejemplos inventados. El modelo rechaza su publicación accidental y las asociaciones de prueba o inclusión pendiente dentro de una carta marcada publicada.
5. Compilar, probar y revisar. La presentación usa los mismos componentes; no hace falta rehacer la web. El despliegue requiere una indicación posterior del usuario.

Los precios se guardan como números ARS cuando se confirmen; mientras sean `null`, se muestra «Precio por confirmar». En modo demo se fuerzan precios pendientes, disponibilidad no confirmada y ausencia de acciones de pedido o reserva, incluso si alguien completa un precio en la muestra.

## Contactos y reservas

Editar únicamente los números oficiales en `src/reservation-config.ts`:

```ts
{
  gastronomiaWhatsApp: null,
  tatamiWhatsApp: null,
  bienestarWhatsApp: null
}
```

Formato internacional, solo dígitos y sin `+`. Cada campo se valida por separado; vacío o inválido usa Instagram con destino visible. Tatami y Mesa pueden compartir el mismo número solo si el propietario lo confirma y se completa expresamente en ambos campos. Bienestar no hereda el contacto gastronómico.

El acceso flotante lleva a Reservas mientras falta el canal gastronómico. Si se confirma ese número, puede abrir WhatsApp para una consulta general de mesa. Los enlaces de Tatami y Bienestar siempre resuelven su propio campo. Se retiró el uso del teléfono personal de pruebas anterior para estos recorridos.

Enviar una consulta no confirma una reserva. No hay calendario de disponibilidad, pagos, señas ni confirmaciones automáticas. La dirección permanece fuera del código y se comparte al confirmar por el canal acordado con el equipo. El combo del tatami sigue pendiente, sin inclusiones, tarifas, capacidad ni duración inventadas.

## Archivos principales

| Archivo | Uso |
| --- | --- |
| `src/menu/catalog.ts` | Identidad, imagen y descripción base de productos reutilizables. |
| `src/menu/seasons.json` | Selección manual, estados y cambios por temporada. |
| `src/menu/model.ts` | Validación y resolución del contenido; protección de la demo. |
| `src/SeasonalMenu.tsx` | Carta compartida por demo y publicación, filtros, precios y detalle. |
| `src/ProductMedia.tsx`, `src/Visual.tsx` | Visor completo y estados de carga/error con dimensiones reservadas. |
| `src/reservation-config.ts`, `src/Reservations.tsx` | Contactos separados y tres recorridos de consulta. |
| `src/content.ts`, `src/media.ts` | Identidad, historia, política de bebidas y material del cliente. |
| `src/ExperienceSections.tsx` | Experiencia, oficio, cenas, tatami, bienestar y contacto. |
| `resources/inventory.json`, `resources/originals/` | Los trece originales del cliente, sin modificar, con procedencia y SHA-256. |
| `resources/generated/verano/inventory.json` | Cuatro imágenes conceptuales nuevas, originales y versiones web. |

## Materiales e inventario de la muestra

[Inventario de los seis productos e imágenes](docs/INVENTARIO_VERANO.md). Cuatro imágenes de bebidas frías se generaron con OpenAI imagegen específicamente para la demo; no son fotos de Musashi ni de otro negocio. Se conservan los originales y las variantes optimizadas WebP de 1000 y 540 px. Los otros dos productos usan afiches aportados por el cliente, sin cambiar sus recetas ni presentarlos como bebidas frías.

El desplegable «Creaciones de la marca» conserva las once propuestas documentadas en revisiones anteriores, con transcripciones HTML y visor completo. No afirma inclusión estacional ni disponibilidad. Los hashes existentes como `/carta#samurai` abren esa referencia cuando no forma parte de la temporada seleccionada.

Ver también [recursos](docs/RECURSOS.md), [contenido](docs/CONTENIDO.md) y [movimiento](docs/MOVIMIENTO.md).

## Verificación y límites

Compilación de producción completada y **35 pruebas automatizadas aprobadas**.

Se comprueban acceso directo y recarga de `/carta`, enlaces desde Inicio, hashes de las creaciones, atrás/adelante, filtros, precio pendiente, ausencia de pedidos en demo, detalle con aviso, imágenes, originales, tres recorridos de reserva, números faltantes o inválidos, independencia de contactos, teclado, foco, movimiento reducido, cinco anchos y ausencia de desbordamientos. Hay pruebas del modelo para reutilización de productos y separación entre borrador, demo, publicación y archivo.

La revisión es local con Chromium emulado; no acredita dispositivos físicos, un despliegue nuevo o una conexión real con el calendario opcional de eventos ya preparado en revisiones anteriores. No se agrega backend, panel de administración, base de datos ni servicio pago.

## Netlify

Se conservan `netlify.toml`, `musashiweb.netlify.app`, `/carta`, la redirección SPA y noindex. El build es `npm run build`, salida `dist`. No se crea otro sitio ni se hace merge a `main`. El envío a la rama remota `desarrollo/boceto-musashi` activa el despliegue del sitio existente; **esta entrega no se envía allí sin una indicación posterior**.

## Pendientes del propietario

Carta oficial de verano, año si corresponde, descripciones definitivas, precios, disponibilidad, imágenes aprobadas para cada producto, combo de tatami, condiciones de reserva, los tres WhatsApp oficiales, dirección y horarios actuales. También siguen pendientes fotografías documentales de los espacios y transcripción/subtítulos del video si se desean.

---

[**DESARROLLADO POR NICOLAS AGUIRRES**](https://nicolasaguirrescode.com/)
