/** Publica exclusivamente campos autorizados de un calendario privado dedicado. */
function doGet() {
  var id = PropertiesService.getScriptProperties().getProperty("CALENDAR_ID");
  if (!id) throw new Error("Configurar CALENDAR_ID");
  var now = new Date();
  var start = new Date(now.getTime() - 365 * 86400000);
  var end = new Date(now.getTime() + 90 * 86400000);
  var calendar = CalendarApp.getCalendarById(id);
  if (!calendar) throw new Error("Calendario no disponible");
  var events = calendar
    .getEvents(start, end)
    .filter(function (event) {
      return (
        event.getTitle().indexOf("[PUBLICAR]") !== -1 &&
        !event.isAllDayEvent() &&
        event.getVisibility() !== CalendarApp.Visibility.PRIVATE
      );
    })
    .map(function (event) {
      var title = event
        .getTitle()
        .replace(/\[(PUBLICAR|COMPLETO)\]/g, "")
        .trim()
        .slice(0, 150);
      var lines = event
        .getDescription()
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div)>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .split(/\r?\n/)
        .map(function (line) {
          return line.trim();
        });
      function fields(prefix) {
        return lines
          .filter(function (line) {
            return line.indexOf(prefix) === 0;
          })
          .map(function (line) {
            return line.slice(prefix.length).trim();
          });
      }
      var priceText = fields("Precio ARS:")[0];
      var price =
        priceText && /^\d+(\.\d{1,2})?$/.test(priceText)
          ? Number(priceText)
          : null;
      var date = event.getStartTime();
      var digest = Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256,
        event.getId() + "-" + date.getTime(),
      );
      var publicId = digest
        .map(function (b) {
          return ("0" + ((b + 256) % 256).toString(16)).slice(-2);
        })
        .join("");
      return {
        id: publicId,
        title: title,
        description: fields("Texto público:").join("\n").slice(0, 2000),
        date: Utilities.formatDate(
          date,
          "America/Argentina/Mendoza",
          "yyyy-MM-dd",
        ),
        time: Utilities.formatDate(date, "America/Argentina/Mendoza", "HH:mm"),
        status:
          date < now
            ? "finished"
            : event.getTitle().indexOf("[COMPLETO]") !== -1
              ? "full"
              : "upcoming",
        priceARS: price,
        imageUrl: fields("Imagen pública:")[0] || null,
        conditions: fields("Condición pública:").map(function (s) {
          return s.slice(0, 500);
        }),
      };
    })
    .filter(function (event) {
      return Boolean(event.title);
    })
    .sort(function (a, b) {
      return (a.date + a.time).localeCompare(b.date + b.time);
    });
  return ContentService.createTextOutput(JSON.stringify(events)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
