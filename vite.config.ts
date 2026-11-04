import { defineConfig } from "vite";
import events from "./public/events.json";
export default defineConfig({
  plugins: [
    {
      name: "local-agenda",
      configureServer(server) {
        server.middlewares.use("/api/events", (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(events));
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use("/api/events", (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(events));
        });
      },
    },
  ],
});
