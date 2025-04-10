#!/usr/bin/env node

"use strict";
 import path from "path";

 const run = path.join(path.dirname(import.meta.url), 'bin/app.js');

 (async () => {
    try {
      await import(run);
    } catch (error) {
      console.error("Failed to run the application:", error);
      process.exit(1);
    }
  })();