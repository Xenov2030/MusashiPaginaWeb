export interface ReservationInquiry {
  date: string;
  time: string;
  people: number;
  event?: string;
  pet?: boolean;
  notes?: string;
  test?: boolean;
}
export function todayInMendoza(now = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Argentina/Mendoza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function whatsappContactUrl(number: string | null): string | null {
  return number && /^[1-9]\d{7,14}$/.test(number)
    ? `https://wa.me/${number}`
    : null;
}
export function buildReservationUrl(
  number: string | null,
  inquiry: ReservationInquiry,
): string | null {
  const contact = whatsappContactUrl(number);
  if (
    !contact ||
    !/^\d{4}-\d{2}-\d{2}$/.test(inquiry.date) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(inquiry.time) ||
    !Number.isSafeInteger(inquiry.people) ||
    inquiry.people < 1
  )
    return null;
  const actualDate = new Date(`${inquiry.date}T12:00:00Z`);
  if (
    !Number.isFinite(actualDate.getTime()) ||
    actualDate.toISOString().slice(0, 10) !== inquiry.date
  )
    return null;
  const [year, month, day] = inquiry.date.split("-");
  const lines = [
    ...(inquiry.test ? ["PRUEBA DE RESERVA — no enviar al local."] : []),
    "Hola Musashi. Quisiera consultar una reserva.",
    `Fecha: ${day}/${month}/${year}`,
    `Horario deseado: ${inquiry.time}`,
    `Personas: ${inquiry.people}`,
    ...(inquiry.event ? [`Encuentro: ${inquiry.event}`] : []),
    ...(inquiry.pet ? ["Voy con mi mascota."] : []),
    ...(inquiry.notes?.trim()
      ? [`Consulta: ${inquiry.notes.trim().slice(0, 300)}`]
      : []),
    "Entiendo que este mensaje es una solicitud y que Musashi debe confirmar la reserva.",
    "Por favor, compartan la dirección por este chat al confirmar.",
  ];
  return `${contact}?text=${encodeURIComponent(lines.join("\n"))}`;
}
