# Movimiento, navegación y carga

La animación acompaña una acción o un cambio de sección. El contenido no queda oculto esperando a un observador: los revelados se ejecutan mediante Web Animations sobre elementos que ya están en pantalla, con su estado final visible en la hoja de estilos. No se agregaron dependencias.

## Lenguaje de movimiento

| Momento              | Movimiento                                                                                              | Duración aproximada                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Portada              | Dos grupos de líneas, descripción y acciones con entrada corta, parcialmente visibles desde el comienzo | 450–520 ms con escalonamiento de hasta 180 ms; menor en móvil |
| Imagen principal     | Recorte lateral iniciado al recibir la imagen; vista previa ligera detrás                               | 680 ms                                                        |
| Pincelada del título | Trazado horizontal una vez                                                                              | 550 ms                                                        |
| Encabezado de carta  | Aparición y desplazamiento breve al entrar en pantalla                                                  | 440 ms                                                        |
| Filtros              | Entrada del contenido y adaptación de altura del contenedor                                             | 180 / 280 ms                                                  |
| Experiencia          | Texto breve seguido del revelado por recorte de una composición panorámica                              | 440 / 620 ms                                                  |
| Ramen                | Entrada con inclinación mínima del texto, recorte de imagen y trazo rojo                                | 560 / 620 / 440 ms                                            |
| Enlaces y botones    | Flecha de 2 px, cambio de color, subrayado y pulsación                                                  | 180–200 ms                                                    |
| Modal                | Apertura y cierre, incluido fondo, sin perder el ciclo de foco                                          | 220 / 160 ms                                                  |

Cada observador deja de observar el elemento después de su entrada. Se limpian observadores, listeners y animaciones al desmontar. No hay movimiento ambiental continuo, scroll secuestrado, audio, parallax ni esperas obligatorias para navegar.

`prefers-reduced-motion` desactiva las animaciones CSS y los desplazamientos; los efectos JavaScript se omiten o cancelan. El contenido sigue visible y los hashes se resuelven inmediatamente.

## Navegación

La implementación anterior intentaba resolver el hash al montar y delegaba el resto en el comportamiento nativo. Las comprobaciones antiguas de URL y visibilidad DOM no demostraban la posición del destino. El fallo puntual informado de «Experiencia» no se reprodujo de forma consistente en el estado local; por eso no se le atribuye una causa única no demostrada.

`useHashNavigation` coordina ahora:

- Clics normales sobre enlaces internos con destino existente, sin interceptar enlaces externos, modificadores, descargas o nuevas pestañas.
- Hash inicial tras el montaje de React.
- `hashchange`, atrás, adelante y restauración desde la caché de navegación.
- Foco en el destino sin iniciar otro desplazamiento y márgenes de scroll.
- Desplazamiento inmediato en navegación de historial, carga directa y movimiento reducido.

Las pruebas miden la posición real frente al scroll máximo del documento. Comprueban Inicio → Experiencia → Contacto, atrás y adelante, `/#experiencia`, `/carta` → Experiencia y `/carta#mochi`.

## Imágenes y fallos

La portada conserva dimensiones y prioridad alta, añade preload y variantes de 720/1200 px. `hero-preview.webp` pesa 508 bytes y proporciona contexto visual mientras llega el recurso de alta resolución. Las imágenes inferiores mantienen carga diferida.

`Visual` gestiona estados de carga, imagen lista y error. La máscara se reproduce al cargar, no mediante un retraso fijo; al finalizar o cancelar, no queda un estilo que oculte la imagen. En caso de fallo, aparece una alternativa tipográfica con información gastronómica, sin bloquear el texto ni las acciones. La página también incluye bienvenida y contacto estáticos si el módulo JavaScript no llega a ejecutarse.

## Verificación y artefactos

Las pruebas incluyen carga retenida, error de red de la portada, navegación utilizable durante la espera, presencia de la animación al cargar, restauración del estado visible, filtros con foco, revelado sin repetición, teclado, movimiento reducido, contraste y ausencia de desbordamiento en móvil y escritorio.

La grabación `docs/grabaciones/recorrido.webm` se obtiene en `tests/motion.spec.ts`, con pausas breves deliberadas para mostrar transiciones completas. Se usaron Chromium y FFmpeg instalados en este entorno. La grabación dura aproximadamente siete segundos; las capturas estáticas muestran los estados finales sin animaciones.

La revisión se realizó localmente en Chromium, con escritorio y tamaños móviles emulados. No acredita comportamiento en dispositivos físicos ni una publicación en Netlify. El logo, las fuentes de marca y las fotos reales siguen pendientes; las imágenes existentes continúan identificadas como conceptuales.
