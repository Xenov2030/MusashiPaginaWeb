# Recursos de la segunda iteración

## Auditoría previa

El repositorio contenía fuentes DM Sans y dos dibujos SVG simples, sin logo original ni fotografías autorizadas. Los SVG de taza y ramen, los estilos de paneles tipográficos y las tramas de la versión anterior se retiraron. No se descargaron publicaciones ni se hizo scraping de Instagram: el acceso previo desde el entorno devolvió HTTP 403.

## Ilustraciones gastronómicas

Se generaron siete imágenes originales con la herramienta de generación de imágenes de OpenAI para este prototipo. La dirección común fue ilustración gastronómica detallada, trazo de tinta y texturas, cerámica oscura y fondo negro, con colores naturales en los alimentos. No son fotografías de productos de Musashi, no confirman recetas, sabores o disponibilidad, ni recrean el local o al equipo.

| Archivo local                   | Uso y contenido                                                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/hero.webp`       | Portada: café y mochis, composición distinta de las imágenes de carta.                                                                       |
| `public/images/cafe.webp`       | Categoría de café, taza ilustrada.                                                                                                           |
| `public/images/mochi.webp`      | Mochis de colores y uno abierto. Los colores y el relleno no indican sabores confirmados.                                                    |
| `public/images/dorayaki.webp`   | Dorayakis con un ejemplo de relleno; no es una receta de Musashi.                                                                            |
| `public/images/cheesecake.webp` | Porción de cheesecake japonés como referencia visual.                                                                                        |
| `public/images/experience.webp` | Manga de viñetas abstractas, café y dorayaki. Un panel principal y dos acercamientos de la misma ilustración; no representa el espacio real. |
| `public/images/ramen.webp`      | Ramen ilustrativo para el afiche demostrativo; toppings y presentación no confirman una oferta comercial.                                    |

Las imágenes se guardaron localmente, con versiones WebP de hasta 1200 px y calidad 84. El conjunto pesa aproximadamente 2,2 MB. Solo la portada carga con prioridad alta; el resto usa carga diferida. Los originales generados quedan fuera del checkout, en `/workspace/generated_images/`, y no se requieren para ejecutar el sitio.

La nota global del pie identifica las ilustraciones como conceptuales y aclara que no son productos reales de Musashi. Para la versión definitiva, pedir fotos autorizadas y registrar su procedencia antes de reemplazarlas.

## Marca y tipografía

- Identificador MUSASHI como texto provisional, sin emblema nuevo. No hay logo oficial utilizable ni favicon original; siguen pendientes.
- DM Sans 400, 600 y 800, distribución Fontsource, SIL Open Font License; archivos y licencia en `public/fonts/`. Procedencia: https://fontsource.org/fonts/dm-sans. No se afirma que sea la fuente oficial.
- Negro `#080808`, blanco `#FFFFFF` y rojo `#C51624` para la interfaz, más grises neutros. Los tonos naturales de las ilustraciones se limitan al recurso gastronómico, no a fondos, textos ni botones.
- Dos recursos de identidad recurrentes: ilustración de tinta gastronómica y acentos rojos breves. Sin collage de símbolos, kanji, personajes de terceros, numeraciones editoriales ni fondos decorativos.
- Textos para revisión, sin atribuir eslóganes al propietario. Los datos del negocio proceden del brief y se mantienen separados de los ejemplos.

No hay solicitudes de fuentes, imágenes ni scripts de terceros al navegar la página.
