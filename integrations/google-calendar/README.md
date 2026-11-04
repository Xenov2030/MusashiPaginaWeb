# Agenda independiente de Musashi

El propietario publica encuentros desde Google Calendar, incluso recurrentes cada semana o mes. No necesita editar el sitio después de la conexión inicial. No administra cupos automáticamente: las solicitudes y la dirección se confirman manualmente por WhatsApp.

## Conexión inicial (cuenta del propietario)

1. Crear un calendario exclusivo «Musashi · Eventos web». Mantenerlo privado; no usar un calendario personal. Configurar la zona horaria de Mendoza.
2. En script.google.com crear un proyecto y pegar el archivo `Code.gs` de esta carpeta. En Configuración activar «Mostrar archivo de manifiesto appsscript.json» y reemplazarlo por el `appsscript.json` incluido: solicita acceso de solo lectura a Calendar.
3. En Configuración del proyecto → Propiedades del script agregar `CALENDAR_ID` con el identificador del calendario dedicado (Google Calendar → Configuración → Integrar calendario).
4. Implementar → Nueva implementación → Aplicación web. Ejecutar como el propietario; acceso «Cualquier persona». Autorizar la lectura del calendario con la cuenta propietaria. El endpoint será público y solo devuelve campos publicados explícitamente; el calendario no se hace público.
5. Copiar la URL terminada en `/exec`. En Netlify → Project configuration → Environment variables agregar `MUSASHI_CALENDAR_FEED_URL` con esa URL, disponible para Functions en producción. Volver a desplegar. No hace falta compartir contraseñas ni claves.
6. Crear un encuentro de prueba autorizado, revisar `/api/events` y la sección Agenda. Luego borrar la prueba. Comprobar que no aparece ninguna dirección ni dato privado. Si cambia el script, publicar una nueva versión de la implementación.

## Publicar un evento

Título: `[PUBLICAR] Noche de ramen`.
Elegir fecha y hora, y opcionalmente «Repetir» semanal/mensualmente. No usar eventos de día completo. Mantener visibilidad predeterminada; los marcados explícitamente «Privado» no se publican.

Descripción (solo estas líneas se publican):

```
Texto público: Una noche para compartir alrededor de la mesa.
Precio ARS: 15000
Condición pública: Reserva sujeta a confirmación por WhatsApp.
```

El ejemplo es ilustrativo, no un evento ni precio real. El precio es opcional, numérico, sin separadores de miles. Se pueden repetir líneas `Texto público:` y `Condición pública:`. Nunca poner la dirección en título ni campos públicos. Ubicación, asistentes, correos y el resto de las notas no se exportan. El script solo lee el calendario dedicado y expone 365 días anteriores y 90 próximos; las repeticiones se publican como encuentros individuales.

Para cerrar reservas añadir `[COMPLETO]` al título. Para retirar una publicación quitar `[PUBLICAR]` o eliminar el evento. Los pasados quedan finalizados; no ofrecen reserva. Los cambios pueden tardar aproximadamente un minuto por caché. Si falla Google, se muestra un aviso sin inventar fechas.

## Estado de esta entrega

El conector está preparado; falta que el propietario realice la conexión de su cuenta. Sin URL configurada, la agenda usa `public/events.json` (eventos ficticios autorizados para esta página de muestra). El WhatsApp configurado es el número personal de Nicolas, autorizado solo para pruebas; `src/content.ts` mantiene `whatsappTest: true`. Al recibir el número oficial, cambiarlo y desactivar ese indicador. No prometer reservas reales mientras siga en prueba.

## Imagen promocional y galería de eventos anteriores

Agregar una línea a la descripción del evento:

```
Imagen pública: https://tu-servidor.com/fotos/encuentro.webp
```

Usar un enlace HTTPS directo a una imagen pública autorizada (JPG, PNG o WebP); no una página de vista previa de Drive ni un enlace que requiera iniciar sesión. Verificar el enlace en una ventana privada. Nunca cargar fotos con dirección visible, datos personales ni personas sin autorización. La URL de la imagen sí se publica y el navegador la solicita al servidor de imágenes.

El evento futuro más cercano se destaca con su imagen, fecha y solicitud de reserva. Los eventos pasados marcados `[PUBLICAR]`, de los últimos 365 días, aparecen automáticamente en el carrusel de encuentros anteriores, ordenados del más reciente al más antiguo. Para cargar uno anterior, crear o editar su evento con la fecha real pasada, título, `Texto público:` e `Imagen pública:`. No hace falta editar el sitio. Para retirarlo, quitar `[PUBLICAR]`.

Si no hay fotos cargadas, se usan imágenes conceptuales identificadas; nunca se presentan como registros reales. Si falla una imagen, se muestra la alternativa conceptual. Sin eventos futuros se mantiene un bloque promocional sin inventar una fecha. Para habilitar estas novedades en un script ya desplegado, copiar la versión actual de `Code.gs` y publicar una nueva versión de la implementación conservando su URL.

Los eventos de demostración de `public/events.json` están marcados con `demo: true`. Son datos inventados a pedido del usuario para mostrar la presentación y no se mezclan con Google Calendar: al conectar el calendario, su agenda reemplaza los ejemplos. Antes de la versión oficial, retirar estos ejemplos y configurar el WhatsApp oficial.
