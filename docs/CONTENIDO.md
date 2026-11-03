# Completar «La mesa de Musashi»

La configuración vive en `src/content.ts`: `site`, `copy`, `categories`, `disciplines`, `craft`, `encounters` e `historicalContext`. Los colores y materiales se centralizan en los tokens de `src/style.css`.

## Lo confirmado y lo pendiente

Los datos transmitidos por Nicolas confirman los tres oficios del propietario y los antecedentes de encuentros. No implican carta vigente, recetas, métodos, servicios diarios, instalaciones o disponibilidad. Logo, nombre y foto del propietario, fotos reales y datos comerciales siguen pendientes. No usar audios sin transcripción como requisitos adicionales.

## Carta y categorías

`site.draft` usa `demoProducts`; desactivarlo selecciona `confirmedProducts`, inicialmente vacío. Mantener separados los ejemplos y los productos aprobados.

Las categorías son Café, Té y blends, Coctelería y Cocina y pastelería japonesa. `disciplines` explica té y coctelería cuando no existen productos confirmados; no son recetas ni ítems a la venta. No añadir blends o cócteles para llenar la interfaz.

Cada `Product` incluye `id`, nombre, categoría, descripción, detalle, textura, precio ARS opcional, recurso visual opcional, disponibilidad y características confirmadas. Precio `null` se omite. Los enlaces `/carta#id` requieren identificadores estables. No afirmar alérgenos, ingredientes o características alimentarias sin confirmación.

## Imágenes y propietario

`VisualResource` reúne `src`, `alt`, dimensiones, `kind` (`conceptual` o `confirmed`), procedencia y encuadre opcional. Admite vista previa, `srcSet` y `sizes`. `kind` no valida un archivo automáticamente: verificar permiso y procedencia antes de marcarlo como confirmado.

- `site.visuals.heroScene`: reemplaza la interpretación ilustrada de mesa por una imagen real autorizada. Ajustar dimensiones y texto alternativo, sin llamar foto del local a una escena conceptual.
- `site.owner.name`: nombre real, actualmente `null`. No inventarlo.
- `site.owner.portrait`: retrato autorizado, actualmente `null`. Puede sustituir el recurso conceptual de oficio.
- `site.visuals.experienceSpace`, `experienceDetail`, `experienceTable`: campos preparados para fotos verificadas de vista del espacio, detalle y escena de mesa o preparación. Mientras falten se usa una sola composición conceptual, sin falsa galería ni recuadros vacíos.
- `site.visuals.logo`: archivo original autorizado. El texto MUSASHI actual es reemplazable y no constituye un rediseño del logo.

Guardar imágenes optimizadas en `public/images/`, registrar derechos y procedencia en `RECURSOS.md` y describir con precisión cada recurso. No mezclar fotos históricas del local anterior con el nuevo sin contexto.

## Oficios, encuentros e historia

`craft` contiene la presentación general de barista, tea blender y bartender, sin prometer granos, métodos, blends o cócteles concretos. `encounters` reúne tres antecedentes, cada uno con su detalle accesible mediante modal. No publicar fechas, precios, cupos ni reservas hasta recibir datos oficiales.

`historicalContext` queda desactivado y vacío. Para completar «El nombre y su historia», consultar [HISTORIA.md](HISTORIA.md). Su activación requiere verificación y fuentes; no atribuir la elección del nombre a una filosofía del propietario sin su explicación directa.

## Negocio y contacto

`site.stage` puede ser `coming-soon` u `open`, solo tras confirmación. Los campos `address`, `hours`, `whatsapp` y `reservationConditions` permanecen en `null`. Instagram es el canal aportado. No inventar una dirección ni publicar la anterior como vigente.

`reservationLink` prepara consultas futuras, pero no confirma reservas ni habilita pagos, señas o disponibilidad automática.

## Materiales a pedir

Logo y fuentes originales; nombre y retrato autorizado del propietario; fotos del nuevo espacio, detalle y mesa; fotos de productos; carta con precios y disponibilidad; datos comerciales y condiciones; información aprobada de futuros encuentros; explicación directa del nombre, si quiere incorporarla.

El usuario autorizó publicar esta iteración completa en el sitio Netlify existente mediante la rama conectada. Mantener noindex y el crédito enlazado: **DESARROLLADO POR NICOLAS AGUIRRES** — https://nicolasaguirrescode.com/.
