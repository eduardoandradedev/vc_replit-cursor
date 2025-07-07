import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from "helmet";

// Importar o utilitário de log seguro
import { safeLog } from "./routes";


const app = express();

// Remover o header X-Powered-By para não expor a stack
app.disable('x-powered-by');

/* ─────────────────────────────
   ▸ Middlewares de segurança
───────────────────────────────*/
// Rate limit para /api (protege contra brute force e DoS)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api', apiLimiter);

// Aplicar cabeçalhos de segurança com Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://www.google-analytics.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com", "https://webhooks.e2no.com.br"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: {
    maxAge: 15552000, // 180 dias
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' } // Proteção contra clickjacking
}));

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

    // Sanitizar dados sensíveis antes de logar
    if (capturedJson) {
      // Verificar se estamos em ambiente de produção
      const isProd = process.env.NODE_ENV === 'production';
      
      if (isProd) {
        // Em produção, não incluir o corpo da resposta nos logs
        line += ' :: [Response data omitted in production]';
      } else {
        // Em desenvolvimento, sanitizar dados sensíveis de forma genérica
        const SENSITIVE_KEYS = [
          'leads', 'email', 'whatsapp', 'phone', 'token', 'password', 'senha', 'apiKey', 'accessToken', 'refreshToken'
        ];
        const deepSanitize = (obj: any): any => {
          if (Array.isArray(obj)) return obj.map(deepSanitize);
          if (obj && typeof obj === 'object') {
            const out: Record<string, any> = {};
            for (const key of Object.keys(obj)) {
              if (SENSITIVE_KEYS.includes(key)) {
                out[key] = '[REDACTED]';
              } else {
                out[key] = deepSanitize(obj[key]);
              }
            }
            return out;
          }
          return obj;
        };
        const sanitizedJson = deepSanitize(capturedJson);
        // Limitar o tamanho da string JSON para evitar logs muito grandes
        const jsonStr = JSON.stringify(sanitizedJson);
        line += ` :: ${jsonStr.length > 100 ? jsonStr.substring(0, 100) + '...' : jsonStr}`;
      }
    }
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
