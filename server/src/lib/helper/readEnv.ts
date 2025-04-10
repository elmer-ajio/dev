"use strict";

import fs from "fs";
import path from "path";



const parser = (data: string) => {

  const obj: Record<string, string> = {};

  const lines = data.split("\n").map((line) => line.replace(/['"]+/g, ""));

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    const [key, value] = trimmed.split("=");
    obj[key] = value;
  }

  return obj;
};


const readEnv = () => {
  try {
    const evnPath = path.resolve(process.cwd(), ".env");
    const encoding = "utf8";
    if (fs.existsSync(evnPath)) {
      
      const data = parser(fs.readFileSync(evnPath, { encoding }));

      Object.keys(data).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
          process.env[key] = data[key];
        }
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default readEnv;