# Recursos y procedencia

## Material proporcionado por el cliente

ZIP: **WhatsApp Image 2026-11-03 at 11.42.25 PM.zip**. Incluye doce JPEG y un MP4. Se conservaron colores y composiciones. Se prepararon WebP de hasta 1400 px, variantes de 540 px, logo de 512 px y un MP4 H.264 optimizado. Se eliminan metadatos de las imágenes optimizadas. Los originales se conservan sin modificar en `resources/originals/`, fuera de `public` y del sitio publicado. El inventario central `resources/inventory.json` incluye SHA-256, equivalencia con los nombres numéricos del brief, sección y estado. Las equivalencias se identificaron por contenido, sin presumir igualdad binaria con archivos de otro nombre. No faltan contenidos: doce imágenes y un video.

| Archivo original (WhatsApp Image 2026-11-03 at…) | Recurso en `public/media/musashi` | Uso / naturaleza |
| --- | --- | --- |
| `11.42.25 PM.jpeg` | `logo.webp` | Logo original completo, sin rediseño; recorte del símbolo en CSS solo para cabecera, versión completa en pie. |
| `11.47.51 PM.jpeg` | `red-dragon.webp` | Gráfica de producto Red Dragon. |
| `11.47.52 PM (1).jpeg` | `vagabond.webp` | Gráfica de producto Vagabond. |
| `11.47.52 PM (2).jpeg` | `samurai-coffee.webp` | Gráfica de producto Samurai Coffee. |
| `11.47.52 PM.jpeg` | `taiyaki-red-velvet.webp` | Gráfica de producto Taiyaki Red Velvet. |
| `11.47.53 PM (1).jpeg` | `bubble-yakuza.webp` | Gráfica de producto Bubble Yakuza. |
| `11.47.53 PM (2).jpeg` | `praline-negro.webp` | Gráfica de producto Praliné Negro. |
| `11.47.53 PM.jpeg` | `midori-kensei.webp` | Gráfica de producto Midori Kensei. |
| `11.47.54 PM (1).jpeg` | `pasteleria-japonesa.webp` | Fotografía de pastelería, portada y carta; nombre exacto pendiente. |
| `11.47.54 PM.jpeg` | `pasteleria-personajes.webp` | Fotografía aportada, galería de pastelería. |
| `11.47.55 PM (1).jpeg` | `pasteleria-gato.webp` | Fotografía aportada, galería de pastelería. |
| `11.47.55 PM.jpeg` | `pasteleria-panda.webp` | Fotografía aportada, galería de pastelería. |

Las publicaciones contienen ilustraciones y referencias visuales propias de la marca. Se conservan como **gráficas promocionales** ampliables, sin presentarlas como fotos reales de productos, del local o de personas. No se trasladan sus fondos de manga a la interfaz general. Las fotografías aportadas no acreditan la dirección ni el estado actual de una sede.

El archivo **WhatsApp Video 2026-11-03 at 11.45.26 PM.mp4** se optimizó como `pieza-promocional.mp4`. `film-poster.webp` es un fotograma. Es una escena promocional de ficción; no es un retrato del dueño ni un registro de Musashi. El video se revisó visualmente mediante fotogramas y metadatos: se ve un personaje de época junto a una taza y piezas de pastelería. El audio no pudo verificarse con precisión. Se conserva **fuera de la versión visible**, porque no documenta el oficio ni una experiencia real del negocio; no se atribuye ninguna frase. `media.video.enabled` queda en `false`; el reproductor voluntario con controles y sin carga inicial queda preparado si más adelante se confirma pertinencia y audio/subtítulos.

El cliente aporta los recursos para esta implementación; el equipo deberá conservar sus permisos de publicación y el de cualquier tercero que aparezca en material futuro.

## Composiciones provisionales

- `public/images/ramen.webp`: ilustración conceptual generada con OpenAI en una revisión anterior. Se mantiene solo en Cenas, señalada como conceptual; no confirma receta, disponibilidad ni una convocatoria futura.
- Tatami: composición propia de CSS con trama, papel y cerámica abstracta; no reproduce ni documenta el espacio real.
- Bienestar: composición abstracta de círculos y papel, sin fotografía ni representación de una terapia.
- Pétalos y ramita: SVG/CSS decorativos propios, sin dependencias, personas ni local ficticio.
- Los demás archivos conceptuales de `public/images` se conservan por compatibilidad con revisiones anteriores; no se usan como una falsa galería del negocio.

Las imágenes faltantes se sustituyen desde `src/media.ts`. Se debe usar una fotografía autorizada, texto alternativo descriptivo y dimensiones reales. No mostrar una sede ajena como si fuera Musashi.

## Tipografía

Georgia/Times New Roman (fuentes del sistema) para títulos y DM Sans alojada localmente para lectura. DM Sans está bajo SIL Open Font License 1.1, disponible en el paquete `@fontsource/dm-sans` y en `public/fonts`. No se afirmó conocer las fuentes originales de las publicaciones ni se usó una fuente oriental caricaturesca. Las gráficas conservan su tipografía original como imagen.

## Registro de transcripción

| Afiche | Texto legible incorporado como HTML | Alcohol indicado |
| --- | --- | --- |
| Samurai Coffee | Doble espresso, leche, crema de leche y un touch de licor de chocolate con menta. | Sí, licor de chocolate con menta. |
| Vagabond | Doble espresso, leche, crema de leche, chocolate blanco y touch de licor de dulce de leche. | Sí, licor de dulce de leche. |
| Red Dragon | Espresso, red velvet, frambuesa, licor de chocolate blanco y leche texturizada. | Sí, licor de chocolate blanco. |
| Praliné Negro | Leche texturizada, sésamo negro, praliné de maní, caramelo, miel y vainilla. | No se declara en el afiche; no se presume ausencia. |
| Bubble Yakuza | Latte de vainilla cremosa con perlas de tapioca caramelizadas. | No se declara en el afiche; no se presume ausencia. |
| Midori Kensei | Latte con chocolate blanco & touch de licor de pistacho. | Sí, licor de pistacho. |

Se normalizaron mayúsculas, listas y puntuación. Solo se transcribió lo legible. La frase «cremosa» de Bubble Yakuza se conserva tal como aparece. Taiyaki Red Velvet no aporta receta legible; sus rellenos no se infieren por la imagen. Los cuatro productos fotográficos no aportan receta ni nombre comercial confirmado. El registro no certifica disponibilidad, recetas actuales ni información alimentaria completa.
