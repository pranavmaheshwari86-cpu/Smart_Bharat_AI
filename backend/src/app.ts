import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { config } from "./config";

const app = express();

// Enable trust proxy for Vercel reverse proxy environment
app.set("trust proxy", 1);

// Dynamic CORS origin — in dev, allow any localhost port so Next.js hot-reload port changes never break login
const corsOrigin =
  config.nodeEnv === "production"
    ? config.allowedOrigins
    : (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (server-to-server, curl, Postman)
        if (!origin) return callback(null, true);
        // Allow any localhost / 127.0.0.1 origin in development
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
          return callback(null, true);
        }
        callback(new Error(`CORS: origin ${origin} not allowed`));
      };

// Hardened Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", ...config.allowedOrigins],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

// Body & Cookie Parsers with Size Limits to Prevent JSON Bombs
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Health & Root Check Endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    service: "Smart Bharat AI Backend API",
    status: "ONLINE",
    health: "/health",
    api: "/api",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api", routes);

// Global Production Error Handler — never leak stack traces to client
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled Backend Error:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message =
    config.nodeEnv === "production" && statusCode === 500
      ? "An internal server error occurred."
      : err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

export default app;
