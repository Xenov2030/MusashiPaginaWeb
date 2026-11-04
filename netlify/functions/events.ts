import { parseOfficialEvents } from "../../src/events";
import localEvents from "../../public/events.json";
declare const process: { env: Record<string, string | undefined> };
export default async () => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=60",
  };
  try {
    const source = process.env.MUSASHI_CALENDAR_FEED_URL;
    if (!source)
      return new Response(JSON.stringify(parseOfficialEvents(localEvents)), {
        headers,
      });
    const url = new URL(source);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "script.google.com" ||
      !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname)
    )
      throw new Error("Invalid source");
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Calendar unavailable");
    const body = await response.text();
    if (body.length > 500000) throw new Error("Feed too large");
    return new Response(JSON.stringify(parseOfficialEvents(JSON.parse(body))), {
      headers,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Agenda no disponible" }), {
      status: 503,
      headers: { ...headers, "Cache-Control": "no-store" },
    });
  }
};
