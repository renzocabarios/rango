#!/usr/bin/env node

import { minify } from "minify";
import fs from "fs";

const options = {
  js: {
    mangleClassNames: true,
    removeUnusedVariables: true,
    removeConsole: true,
    removeUselessSpread: true,
  },
};

const FILE_NAME = "scripts/ws.js";
const DESTINATION = "lib/rango.js";

try {
  const minified = await minify(`${FILE_NAME}`, options);
  const tryToWrite = async (retry = 0) => {
    const data = await new Promise((resolve, reject) =>
      fs.writeFile(DESTINATION, minified, (err) => (err ? writeFile(retry + 1) : resolve(minified)))
    );

    if (data) {
      console.log(`JS successfully minified and saved to ${DESTINATION}`);
    }
  };

  const writeFile = async (retry = 0) => {
    if (retry > 3) return;

    if (retry > 0) {
      setTimeout(() => tryToWrite(retry), 1000);
      return;
    }

    await tryToWrite();
  };

  writeFile();
} catch (error) {
  console.log(error);
}
