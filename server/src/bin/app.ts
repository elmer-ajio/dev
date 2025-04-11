"use strict";
import express from "express";
import path from "node:path";
import http from "node:http";
import debug from "debug";
import cors from "cors";
import { route } from "@src/routes";
import { config } from "@src/config";
import { errorHandler } from "@src/error";

(() => {
  
    try {
     const {PORT, APP_HOST, CORS_ORIGIN, contentSecurityPolicy, xContentSecurityPolicy  } = config;
      const app = express();
    
      const server = http.createServer(app);

      const corsOptions = {
        origin: CORS_ORIGIN,
        credentials: true,
      };
  
      
      const onError = (error: NodeJS.ErrnoException) => {
        if (error.syscall !== "listen") {
          throw error;
        }
  
        const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
  
        switch (error.code) {
          case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
          case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
          default:
            throw error;
        }
      };
  
      const onListening = () => {
        const addr = server.address();
        const bind =
          typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
        debug("Listening on " + bind);
      };
  
      app.set("port", PORT);
  
      app.disable("x-powered-by");
  
      app.use(express.raw({ type: "application/octet-stream" }));

      app.use((_, res, next) => {
        res.setHeader("Content-Security-Policy", contentSecurityPolicy);
        res.setHeader("X-Content-Security-Policy", xContentSecurityPolicy);
        next();
      });

      app.use(cors(corsOptions));
  
      /*express body parser*/
      app.use(express.urlencoded({ limit: "1mb", extended: true }));
  
      app.use(
        express.json({
          limit: "1mb",
        })
      );
  
      app.use(express.static(path.join(__dirname, "server", "public")));
  
    
       app.use(route);
       
       app.use(errorHandler);
  
      server.on("error", onError);
  
      server.on("listening", onListening);


      server.listen(PORT, () => {
        console.log(`Server start running on ${APP_HOST}:${PORT}`);
      });
  
      process.on("SIGTERM", () => {
        console.log("SIGTERM: Gracefully shutting...");
        server.close(() => {
       
          process.exit(0);
        });
      });
  
      process.on("SIGINT", () => {
        console.log("SIGINT: Gracefully shutting down...");
        server.close(() => {
          process.exit(0);
        });
      });
    } catch (error) {
      console.error(`Error: Running the app ${error}`);
      process.exit(1);
    }
  })();