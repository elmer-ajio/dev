"use strict";

import debug from "debug";
import { Request, Response, NextFunction } from "express";

/**
 * Logger class to create and manage namespaced loggers using the `debug` library.
 */
class Logger {
  private namespace: string;
  private logger: debug.Debugger;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.logger = debug(namespace);
  }

  log(message: string, ...args: any[]): void {
    this.logger(`LOG: ${message}`, ...args);
  }

  error(message: string, ...args: any[]): void {
    debug(`${this.namespace}:error`)(`ERROR: ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    debug(`${this.namespace}:warn`)(`WARN: ${message}`, ...args);
  }

  info(message: string, ...args: any[]): void {
    debug(`${this.namespace}:info`)(`INFO: ${message}`, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.logger(`DEBUG: ${message}`, ...args);
  }

  /**
   * Creates an Express middleware that logs request information
   */
  static middleware(namespace: string = "app:http") {
    const logger = new Logger(namespace);

    return (req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();

      // Log request start
      logger.info(`Started ${req.method} ${req.originalUrl}`);

      // Log request body if present (but skip sensitive data)
      if (req.body && Object.keys(req.body).length > 0) {
        const sanitizedBody = { ...req.body };
        if (sanitizedBody.password) sanitizedBody.password = "*****";
        if (sanitizedBody.token) sanitizedBody.token = "*****";
        logger.debug("Request body:", sanitizedBody);
      }

      // Log query parameters if present
      if (req.query && Object.keys(req.query).length > 0) {
        logger.debug("Query parameters:", req.query);
      }

      // Log when response finishes
      res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
          `Completed ${res.statusCode} ${res.statusMessage} in ${duration}ms`
        );
      });

      // Log errors
      res.on("error", (err) => {
        logger.error(`Response error: ${err.message}`, err.stack);
      });

      next();
    };
  }

  /**
   * Enable specific debug namespaces
   * @param namespaces Space-separated list of namespaces to enable
   */
  static enable(namespaces: string): void {
    debug.enable(namespaces);
  }

  /**
   * Create a child logger with an extended namespace
   * @param suffix The suffix to append to the current namespace
   */
  child(suffix: string): Logger {
    return new Logger(`${this.namespace}:${suffix}`);
  }
}

// Enable logging based on environment
Logger.enable(process.env.DEBUG || "app:*");

export default Logger;