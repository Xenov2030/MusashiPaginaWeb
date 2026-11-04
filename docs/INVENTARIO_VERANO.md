# Productos e imágenes de la carta de prueba

Temporada: `verano-prueba`. Nombre: Verano. Año no confirmado, sin asignar. Estado: `demo`. Seis productos; todos muestran precio pendiente y carecen de acciones de pedido o reserva.

| ID | Nombre | Categoría | Imagen / procedencia | Naturaleza |
| --- | --- | --- | --- | --- |
| `demo-cafe-hielo` | Negro sobre hielo | Café frío | `public/media/verano/cafe-hielo.webp`; OpenAI imagegen | Café con hielo inventado para mostrar el diseño. No atribuido al propietario. |
| `demo-latte-frio` | Latte frío de vainilla | Café frío | `public/media/verano/latte-frio.webp`; OpenAI imagegen | Combinación ilustrativa de café, leche y vainilla con hielo. |
| `demo-infusion-citrica` | Infusión cítrica fría | Té e infusiones frías | `public/media/verano/infusion-citrica.webp`; OpenAI imagegen | Infusión fría y cítricos como combinación de prueba. |
| `demo-te-frutal` | Té frío de frutos rojos | Té e infusiones frías | `public/media/verano/te-frutal.webp`; OpenAI imagegen | Té frío y frutos rojos como combinación de prueba. |
| `vagabond` | Vagabond | Creaciones de autor | Afiche del cliente: `public/media/musashi/vagabond.webp` | Creación documentada de la marca. Inclusión en temporada por confirmar; no se presume que sea fría. Afiche indica licor. |
| `taiyaki` | Taiyaki Red Velvet | Pastelería | Afiche del cliente: `public/media/musashi/taiyaki-red-velvet.webp` | Creación de la marca. Inclusión por confirmar, sin inventar relleno o receta. |

Los nombres y combinaciones `demo-*` son ejemplos, no una propuesta comercial ni recetas atribuidas a Musashi. No incluyen precio, alérgenos, propiedades nutricionales o aptitudes alimentarias inventadas. El énfasis en bebidas frías no declara excluidas las propuestas calientes.

Las cuatro imágenes nuevas se generaron específicamente para la propuesta con OpenAI imagegen. Muestran vasos con hielo, sin vapor ni marcas de otro negocio, y son distintas entre sí. Se conservaron PNG originales en `resources/generated/verano` y se generaron WebP de 1000 y 540 píxeles. Registro estructurado: `resources/generated/verano/inventory.json`. Son imágenes conceptuales, no fotografías de Musashi.

Los originales del cliente y sus equivalencias por contenido permanecen en `resources/inventory.json` y `resources/originals`. La carta no transforma un afiche existente para fingir una bebida fría. El visor abre la composición completa, acompañada por el nombre, la descripción HTML y el estado de prueba o confirmación pendiente.
