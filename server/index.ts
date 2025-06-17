import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

/* ─────────────────────────────
   ▸ Middlewares básicos
───────────────────────────────*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ─────────────────────────────
   ▸ Logger compacto para /api
───────────────────────────────*/
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJson: Record<string, any> | undefined;

  const originalJson = res.json;
  res.json = function (bodyJson: any) {
    capturedJson = bodyJson;
    return originalJson.call(res, bodyJson);
  };

  res.on("finish", () => {
    if (!path.startsWith("/api")) return;

    const duration = Date.now() - start;
    let line = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

    if (capturedJson) line += ` :: ${JSON.stringify(capturedJson)}`;
    if (line.length > 80) line = line.slice(0, 79) + "…";

    log(line);
  });

  next();
});

(async () => {
  /* ▸ Registra rotas e devolve o http.Server */
  const server = await registerRoutes(app);

  /* ▸ Tratador de erros genérico */
  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    },
  );

  /* ▸ Vite em DEV   |  Arquivos buildados em PROD */
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  /* ─────────────────────────────
     ▸ Start do servidor
     - HOST 127.0.0.1 evita ENOTSUP no Windows
     - reusePort removido (incompatível no Win)
  ──────────────────────────────*/
  const PORT = Number(process.env.PORT) || 5000;
  const HOST = process.env.HOST || "127.0.0.1";

  server.listen(PORT, HOST, () => {
    log(`serving on http://${HOST}:${PORT}`);
  });
})();
