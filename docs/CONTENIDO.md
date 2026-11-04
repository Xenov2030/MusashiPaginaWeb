# Contenido de Musashi

El modelo de negocio del propietario y el material multimedia aportado guían esta revisión. La propuesta es una cafetería oculta con cultura japonesa y hospitalidad, no una experiencia centrada en anime o manga.

## Identidad y recursos

`src/media.ts` reúne recursos reemplazables. El logo `logo.webp` proviene del primer JPEG del ZIP; no fue rediseñado ni recoloreado. Solo se utiliza un recorte de presentación del símbolo en la cabecera; el archivo completo se conserva intacto. Las referencias documentales de `tatami`, `cenas` y `propietario` siguen vacías. `bienestar` tiene una imagen conceptual identificada y reemplazable. La portada usa el logo completo y la cabecera suma MUSASHI junto al símbolo. El círculo del tatami contiene el logo original. No inferir que una escena del video o un fondo de publicación es el local o su propietario. La galería usa tres archivos diferentes.

## Carta

`suppliedProducts` contiene once propuestas. Siete nombres aparecen en las gráficas: Red Dragon, Vagabond, Samurai Coffee, Taiyaki Red Velvet, Bubble Yakuza, Praliné Negro y Midori Kensei. Las cuatro piezas fotográficas usan títulos descriptivos provisionales: porción rectangular, pieza con forma de panda, piezas inspiradas en Totoro y pieza con forma de gato. Las tres figuras aparecen además en la galería; la porción rectangular se usa en carta y portada. No se inventan nombres comerciales ni rellenos.

Las categorías «Café y creaciones de autor» y «Pastelería» agrupan el material aportado. «Té y blends» y «Coctelería» explican las especialidades del propietario sin añadir productos desconocidos. Tui Na, acupuntura y Reiki pertenecen a Bienestar y nunca a estos filtros.

Los precios son `null` y la disponibilidad sigue `pending`. Recibir publicaciones no confirma una carta actual ni un precio vigente. No agregar recetas, ingredientes, etiquetas alimentarias o alérgenos sin aprobación. Las gráficas conservan su texto original, accesible en ampliación; la web invita a consultar con el equipo.

## Experiencias y contacto

`ExperienceSections.tsx` organiza la calma y atención personalizada, el oficio, las cenas, el tatami privado y bienestar. No inventar capacidad, tarifas, duración, equipamiento ni política de uso del tatami. En bienestar no agregar beneficios médicos, curaciones, acreditaciones ni profesionales no identificados por el cliente.

Los enlaces de `ConsultLink.tsx` usan Instagram, el canal oficial confirmado. Si se configura un WhatsApp oficial y se desactiva `whatsappTest`, preparan consultas diferenciadas por tema. Actualmente el número personal de Nicolas está autorizado solo para pruebas: se identifica en burbuja y formulario y no recibe consultas como si fuera el negocio.

La dirección no se almacena en el frontend. Se comparte manualmente por WhatsApp al confirmar la reserva. El envío de una solicitud no confirma un lugar ni un horario. No hay pagos ni gestión automática de cupos.

## Agenda, apertura e historia

`public/events.json` está vacío: la última dirección sustituye los eventos ficticios de la muestra anterior. No volver a presentarlos como próximos. Se conserva el conector opcional de [Calendar](../integrations/google-calendar/README.md), sin conexión efectiva configurada desde aquí. Las noches de onigiris, ramen y tatamis se mencionan como antecedentes, sin fechas ni condiciones inventadas.

`site.stage` está en `unconfirmed`, los horarios en `null` y `copy.hero.stage` vacío. Este último permite incorporar luego un aviso temporal confirmado, separado de la propuesta permanente. `historicalContext` permanece desactivado: ver [HISTORIA.md](HISTORIA.md).

El crédito de Nicolas se conserva en el pie y al final del README. Noindex continúa activo. El pedido actual exige revisión sin despliegue automático.

## Actualización del relato del propietario

Concepto confirmado: **MUSASHI — Japón detrás de una puerta**. `copy.hero.title`, `headline` e `intro` alimentan la portada; el concepto también aparece en el cierre de marca. No se usa una fachada inventada: el encuadre representa una apertura de forma abstracta sobre la foto aportada. El revelado al cargar dura 520 ms y nunca condiciona el acceso al texto, la navegación o la carta.

`ownerStory` contiene los tres momentos autorizados: origen como Anime Café, exploración de propuestas y nueva etapa como cafetería japonesa oculta. Sin fechas, hitos añadidos ni afirmaciones de primacía. Los superlativos de «primero en Mendoza» no cuentan con verificación independiente y se omiten. La frase «El camino cambia, la esencia permanece» se usa una sola vez, como cierre de la historia del negocio. No confundir esta sección con la historia del nombre/Miyamoto, que permanece desactivada.

`beveragePolicy` centraliza el título «Cada creación, tal como fue concebida» y el texto autorizado. `BeveragePolicy` lo muestra en Cafetería y antes de los filtros/productos de la carta, también en `/carta`. La política solo habla de azúcar y edulcorantes adicionales para agregar: no declara ausencia de azúcar en las recetas, aptitud para diabetes, beneficios de salud ni un perfil de sabor. Esos datos individuales siguen pendientes de confirmación.

## Transcripciones y alcohol

Las seis descripciones de bebidas se transcribieron desde ingredientes o descripciones legibles de sus afiches. Se omiten eslóganes de sabor y no se completan recetas por intuición. `Product.transcription` distingue `legible` de `not-provided`. Las piezas de pastelería sin receta legible no reciben una transcripción inventada. No hay fragmentos dudosos incorporados.

`Product.alcohol: "indicated"` se usa únicamente cuando el afiche menciona licor: Samurai Coffee, Vagabond, Red Dragon y Midori Kensei. La etiqueta aparece junto a la descripción HTML, antes de consultar. `not-stated` no significa sin alcohol ni apto para niños: no se publica una etiqueta de ausencia de alcohol para Bubble Yakuza o Praliné Negro.

El inventario central está en `resources/inventory.json`. Conserva la ruta original, SHA-256, alias del brief, versión web, descripción, sección y estado. Los nombres numéricos se vincularon visualmente con los archivos del ZIP anterior; no se afirma que tengan el mismo nombre o idéntica codificación. No falta ninguno de los trece contenidos solicitados.
