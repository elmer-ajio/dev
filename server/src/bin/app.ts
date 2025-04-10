"use strict";
import express from "express";
import path from "node:path";
import http from "node:http";
import debug from "debug";

(() => {
    try {
   
      const app = express();
  
     
      const __dirname = path.dirname(process.cwd());
  
      const port = process.env.PORT || 3005;
      const APP_HOST = process.env.APP_HOST || "localhost";
  
      const server = http.createServer(app);
  
      
      const onError = (error: NodeJS.ErrnoException) => {
        if (error.syscall !== "listen") {
          throw error;
        }
  
        const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  
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
  
      app.set("port", port);
  
      app.disable("x-powered-by");
  
      app.use(express.raw({ type: "application/octet-stream" }));
  
      
  
     
  
      /*express body parser*/
      app.use(express.urlencoded({ limit: "1mb", extended: true }));
  
      app.use(
        express.json({
          limit: "20gb",
        })
      );
  
      app.use(express.static(path.join(__dirname, "server", "public")));
  
    
  
      
  
      server.on("error", onError);
  
      server.on("listening", onListening);
  
     
  
      server.listen(port, () => {
        console.log(`Server start running on ${APP_HOST}:${port}`);
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