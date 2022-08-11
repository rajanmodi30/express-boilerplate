import express, { Application, ErrorRequestHandler } from "express";
import helmet from "helmet";
import compression from "compression";
import errorhandler from "errorhandler";
import apiRouter from "../../routes/api/api";
import webRouter from "../../routes/web/web";
import { Logger } from "pino";
import pinoHttp from "pino-http";
import { env } from "../../env";
import rateLimit from "express-rate-limit";
import { logger } from "./logger";
export class Express {
  app: Application;
  logger: Logger;

  constructor() {
    this.app = express();
    this.logger = logger;
  }

  initializeApp = () => {
    const port = process.env.APP_PORT;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.disable("x-powered-by");

    if (process.env.NODE_ENV !== "production") {
      // only use in development
      this.app.use(errorhandler());
    }

    // error handler
    this.app.set("port", port);
  };

  configureViews = (currentDirectory: any, serverAdapter: any) => {
    if (!env.app.api_only) {
      this.app.set("views", currentDirectory + "/views");
      this.app.use("/", webRouter);
    }
    this.app.use(`/${env.app.api_prefix}`, apiRouter);
    this.app.set("view engine", "hbs");

    this.app.use("/queues", serverAdapter.getRouter());
  };

  configureLocale = (middleware: any, i18next: any) => {
    this.app.use(middleware.handle(i18next));
  };

  configureLogger = () => {
    // this.app.use(pinoHttp({ logger: this.logger }));
  };

  configureRateLimiter = async () => {
    this.app.use(
      rateLimit({
        // Rate limiter configuration
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: env.app.api_rate_limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      })
    );
  };

  errorHandler: ErrorRequestHandler = (err, req, res) => {
    res.locals.message = err;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    this.logger?.error(err);
    res.status(err.status || 500);
    res.render("error");
  };
}
