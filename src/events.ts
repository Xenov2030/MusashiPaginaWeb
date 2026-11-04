export interface OfficialEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: "upcoming" | "full" | "finished";
  priceARS: number | null;
  conditions: string[];
}
// Public information only: deliberately no address, guest list or private contact fields.
export function parseOfficialEvents(value: unknown): OfficialEvent[] {
  if (!Array.isArray(value)) throw new Error("Formato de agenda no válido");
  const seen = new Set<string>();
  return value.map((item) => {
    if (!item || typeof item !== "object") throw new Error("Evento no válido");
    const event = item as Record<string, unknown>;
    if (
      typeof event.id !== "string" ||
      !/^[a-z0-9-]{1,80}$/.test(event.id) ||
      seen.has(event.id) ||
      typeof event.title !== "string" ||
      !event.title.trim() ||
      event.title.length > 150 ||
      typeof event.description !== "string" ||
      event.description.length > 2000 ||
      typeof event.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(event.date) ||
      typeof event.time !== "string" ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.time) ||
      !["upcoming", "full", "finished"].includes(String(event.status)) ||
      !(
        event.priceARS === null ||
        (typeof event.priceARS === "number" &&
          Number.isFinite(event.priceARS) &&
          event.priceARS >= 0)
      ) ||
      !Array.isArray(event.conditions) ||
      !event.conditions.every((x) => typeof x === "string" && x.length <= 500)
    )
      throw new Error("Datos de evento no válidos");
    const date = new Date(`${event.date}T${event.time}:00-03:00`);
    if (
      !Number.isFinite(date.getTime()) ||
      new Date(`${event.date}T12:00:00Z`).toISOString().slice(0, 10) !==
        event.date
    )
      throw new Error("Fecha de evento no válida");
    seen.add(event.id);
    return {
      id: event.id,
      title: event.title.trim(),
      description: event.description,
      date: event.date,
      time: event.time,
      status: event.status as OfficialEvent["status"],
      priceARS: event.priceARS as number | null,
      conditions: event.conditions as string[],
    };
  });
}
export function isEventPast(event: OfficialEvent, now = new Date()): boolean {
  return (
    new Date(`${event.date}T${event.time}:00-03:00`).getTime() < now.getTime()
  );
}
