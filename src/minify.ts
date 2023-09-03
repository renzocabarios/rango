import fs from "fs";
import path from "path";

const minify = (filename: string, destination: string) => {
  fs.readFile(`${path.resolve(__dirname, "ws.js")}`, (err, data) => {
    if (data) {
      const strOut = data.toString();
      const port = filename.split("-")?.[1] ?? 6969;
      const filePath = path.resolve(__dirname, `${filename}.js`);

      fs.writeFile(filePath, strOut.replace("6969", port), (err) => {
        if (!err && process?.env?.PRODUCTION === undefined && !process?.env?.PRODUCTION) {
          console.log(`Hot reload ready.`);
        }
      });
    }
  });
};

export default minify;
