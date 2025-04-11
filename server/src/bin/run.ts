"use strict";
import { readEnv } from "@src/lib";
import cluster from "cluster";
import os from "os";
import path from "path";
readEnv();
const numCPUs: number = process.env.NODE_ENV === "development" ? 1 : os.cpus().length;
const app = path.join(__dirname, "app.js");

cluster.setupPrimary({
    exec: app,
  });
  
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
  
    worker.on("error", (err) => {
      console.error(`Worker ${worker.process.pid} encountered an error:`, err);
    });
  
    worker.on("message", (message) => {
      worker.send(message);
    });
  }
  
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });