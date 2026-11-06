import type { Plugin } from "vite";
import { handleChat } from "./chatHandler.ts";

export function devChat(): Plugin {
  return {
    name: "dev-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res) => {
        void (async () => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end();
            return;
          }
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const origin = `http://${req.headers.host ?? "localhost"}`;
          const request = new Request(new URL("/api/chat", origin), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: Buffer.concat(chunks).toString("utf8"),
          });
          const response = await handleChat(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          if (response.body) {
            const reader = response.body.getReader();
            for (;;) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(value);
            }
          }
          res.end();
        })().catch(() => {
          res.statusCode = 500;
          res.end();
        });
      });
    },
  };
}
