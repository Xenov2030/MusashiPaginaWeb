# Incorporar materiales reales

La configuración vive en `src/content.ts`. Los textos de bienvenida y la nota de boceto están en `copy`; la paleta, espaciados y familias, en `src/style.css`. No cambiar la identidad negro/blanco con acento rojo por los colores de una fotografía.

## Inventario y estado

| Material                                               | Estado actual                          | Uso                                                                |
| ------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------ |
| Nombre Musashi e Instagram                             | Aportados en el brief                  | Identificador y contacto; no se verificaron publicaciones en vivo. |
| Logo y fuentes originales                              | Pendientes                             | Identificador tipográfico reemplazable y DM Sans provisional.      |
| Siete ilustraciones gastronómicas                      | Conceptuales, generadas para el boceto | Portada, carta, experiencia y ejemplo de ramen.                    |
| Fotos del nuevo local, fachada, equipo o clientes      | No disponibles                         | No se simulan ni se sustituyen por fotos de otro café.             |
| Fotos del espacio anterior                             | No disponibles                         | No se usan como evidencia del nuevo espacio.                       |
| Dirección, horarios, teléfono y condiciones de reserva | Pendientes                             | Campos desactivados hasta confirmación.                            |

## Recurso visual compartido

`VisualResource` describe cada imagen mediante `src`, `alt`, `width`, `height`, `kind` (`conceptual` o `confirmed`), `source` (procedencia) y `position` opcional (encuadre CSS). El componente `Visual` usa esa información en portada, carta, experiencia y evento, con dimensiones reservadas, prioridad alta para la imagen principal y carga diferida en las inferiores.

Solo asignar `kind: 'confirmed'` a una foto verificada y autorizada. Completar su procedencia y un texto alternativo que describa lo que efectivamente muestra. El cambio de clasificación no valida un archivo por sí solo. Guardar las imágenes optimizadas en `public/images/` y registrar la autorización en `RECURSOS.md`.

## Portada

- `site.visuals.heroScene`: foto confirmada de una escena de mesa o del espacio. Mientras sea `null`, se usa la composición conceptual actual, integrada con el fondo sin oscurecer los alimentos.
- `site.visuals.heroDetail`: detalle gastronómico complementario opcional. Si existe, aparece como una imagen pequeña superpuesta; no es un espacio vacío cuando falta.
- `site.visuals.logo`: ruta local a un logo original autorizado. Se preserva su proporción. El identificador MUSASHI actual no es un logo rediseñado.

## Experiencia

- `site.visuals.experienceSpace`: vista confirmada del nuevo espacio. Por defecto, una única ilustración conceptual identificada como tal, sin repetir recortes de productos.
- `site.visuals.experienceDetail`: detalle representativo autorizado.
- `site.visuals.experienceTable`: escena real de mesa o preparación autorizada.

Los dos detalles se renderizan solo cuando existen. No hay una falsa galería mientras permanecen en `null`. La imagen principal conceptual no afirma que el café tenga mangas, mesas o elementos de esa ilustración.

## Carta

`site.draft` selecciona los ejemplos de `demoProducts`; con `false`, se usa `confirmedProducts`, inicialmente vacío. Conservar separados ejemplos y datos aprobados. El modelo `Product` contiene nombre, categoría, descripción breve, `detail` ampliado, `texture`, precio ARS opcional, `image` como `VisualResource` opcional, disponibilidad y características confirmadas.

La portada muestra tres propuestas; `/carta` agrega más contenido y las explicaciones. Los enlaces `/carta#id` necesitan identificadores estables. Las aclaraciones del prototipo se concentran en una sola nota visible por página. Las descripciones generales de preparaciones no confirman recetas, rellenos, precios, alérgenos ni existencias de Musashi.

Para una nueva categoría, actualizar el tipo y las opciones de filtro. Si falta una foto, no inventarla ni usar una imagen de un producto diferente.

## Negocio, encuentros y consultas

- `site.stage`: `coming-soon` o `open`, solo tras confirmación. No retirar noindex solo por cambiar este estado.
- `site.business.address`, `hours`, `reservationConditions`: `null` hasta recibir los datos oficiales; se muestran en contacto cuando existen.
- `site.business.whatsapp`: número oficial internacional, solo dígitos. Habilita un enlace de consulta, no una reserva automática.
- `reservationLink`: estructura futura con fecha, hora, cantidad de personas y evento opcional. Advierte que la consulta no confirma una reserva.
- `CafeEvent`: modelo futuro de fecha, hora, precio, condiciones y estados. El afiche actual sigue siendo un ejemplo histórico de presentación, no un evento próximo. Adaptar contenido y aprobación antes de anunciar un evento real.

No se incorporan backend, pagos, señas, mapas falsos ni formularios que aparenten enviar consultas.

## Para completar la conexión con el local

Pedir logo original, referencias tipográficas verificables, una foto amplia del nuevo espacio, un detalle representativo y una escena de mesa o preparación. Pedir además fotos de productos autorizadas y datos oficiales de dirección, horarios, carta, contacto y reservas. No usar audios sin transcripción como requisitos confirmados.

La publicación de esta iteración queda pendiente de una indicación posterior. Conservar noindex durante la revisión y el crédito enlazado: **DESARROLLADO POR NICOLAS AGUIRRES** — https://nicolasaguirrescode.com/.
