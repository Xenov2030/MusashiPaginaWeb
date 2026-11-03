# Recursos de «La mesa de Musashi»

## Auditoría

El checkout no contiene logo original, fotografías autorizadas del propietario, ni fotos verificadas del nuevo espacio. Las imágenes gastronómicas existentes son conceptuales. Se retiraron del paquete público la imagen de lectura/manga y la portada anterior de café con mochis, junto con sus variantes, al cambiar la dirección artística. Las versiones anteriores permanecen en el historial Git.

La fuente comercial de esta iteración es la información transmitida por Nicolas: propietario barista profesional, tea blender y bartender; antecedentes de noches de onigiris y encuentros en tatamis, además de ramen. No se añadieron certificaciones, ingredientes, métodos, recetas, premios ni años de experiencia. No se escucharon audios ni se verificaron nuevas publicaciones de Instagram.

## Imágenes conceptuales

Las imágenes se generaron con la herramienta de imágenes de OpenAI para el proyecto. No se utilizaron fotos documentales de negocios ajenos ni se simularon interiores del nuevo local.

| Archivo             | Contenido y propósito                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mesa.webp`         | Nueva escena ilustrada de carta en blanco, café, té, vaso y onigiris sobre una superficie tejida neutra. Interpretación artística; no una mesa real ni una selección confirmada de Musashi. |
| `mesa-small.webp`   | Variante de portada de 720 px para pantallas pequeñas.                                                                                                                                      |
| `mesa-preview.webp` | Vista previa de 48 px, 408 bytes, para evitar un espacio vacío durante la carga.                                                                                                            |
| `oficio.webp`       | Nueva composición ilustrada de café, hojas de té y herramientas de coctelería. No documenta herramientas utilizadas ni productos vendidos por el propietario.                               |
| `cafe.webp`         | Ilustración de una taza; no confirma grano, preparación ni servicio.                                                                                                                        |
| `mochi.webp`        | Ilustración de mochis; colores y relleno no indican sabores disponibles.                                                                                                                    |
| `dorayaki.webp`     | Ilustración de dorayakis como antecedente gastronómico.                                                                                                                                     |
| `cheesecake.webp`   | Ilustración de cheesecake japonés, sin receta o disponibilidad atribuida al negocio.                                                                                                        |
| `ramen.webp`        | Afiche de ejemplo; los toppings no confirman un plato actual ni son un registro de un evento pasado.                                                                                        |

La portada mide 1400 × 933 px; la composición de oficio, 1122 × 1402 px. Los archivos son WebP optimizados; solo la portada tiene prioridad alta y preload. Los inferiores se cargan de forma diferida. Los PNG originales generados permanecen fuera del checkout en `/workspace/generated_images/` y no se requieren para ejecutar la web.

La nota global identifica el boceto. Las descripciones alternativas y los pies de escena distinguen los recursos conceptuales de fotos reales. Las imágenes conservan sus colores; no se invierte ni desatura la comida.

## Recursos gráficos y tipografía

- Árbol de cerezo SVG original del proyecto, dibujado en `src/Ambient.tsx`. Flores blancas, centros rojos mínimos y ramas grises. Es una decoración ambiental, no un logo o emblema de Musashi.
- Seis pétalos CSS fijos en escritorio, tres en móvil. No se generan partículas ilimitadas. Pausa accesible y preferencia en `sessionStorage`; se suspende con pestaña oculta o fuera de pantalla. Composición estática con movimiento reducido.
- Trama tejida abstracta creada con líneas CSS en grises sobre negro. Evoca tatami sin afirmar reproducir el nuevo espacio.
- Hojas de carta blancas, tinta negra y trazos rojos puntuales. Sombras solo neutras para sugerir papel, sin nueva paleta beige o dorada.
- DM Sans 400/600/800 para texto y controles, distribución Fontsource bajo SIL Open Font License; archivos y licencia en `public/fonts/`. Procedencia: https://fontsource.org/fonts/dm-sans.
- Georgia con serif del sistema como alternativa para los títulos. No se redistribuye un archivo de Georgia ni se afirma que sea una fuente oficial de Musashi. La identificación de las fuentes de las publicaciones sigue pendiente.
- MUSASHI sigue siendo el identificador textual provisional. No se creó un símbolo nuevo; el logo original y favicon autorizado siguen pendientes.

## Historia

No se verificaron los hechos históricos necesarios para «El nombre y su historia». El apartado está desactivado; el intento de consulta, su limitación y los requisitos para completarlo se registran en [HISTORIA.md](HISTORIA.md).
