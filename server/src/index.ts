#!/usr/bin/env node

"use strict";
import path from "path";

  const run = path.join(__dirname, "bin/run.js");
  
  (async () => {
    try {
      await import(run);
    } catch (error) {
      console.error("Failed to run the application:", error);
      process.exit(1);
    }
  })();
