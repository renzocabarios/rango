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

const FILE_NAME = "ws.js";
const DESTINATION = "lib/rango.js";

try {
  const minified = await minify(`scripts/${FILE_NAME}`, options);
  const data = await new Promise((resolve, reject) =>
    fs.writeFile(DESTINATION, minified, (err) => (err ? reject() : resolve(minified)))
  );
  console.log(data);
} catch (error) {
  console.log(error);
}
