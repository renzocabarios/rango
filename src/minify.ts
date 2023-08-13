import fs from "fs";
import { exec } from "child_process";
import path from "path";

const minify = (filename: string, destination: string) => {
  return exec(`${path.resolve(__dirname, "../node_modules/.bin/minify")} ${destination}`, (err, stdout, stderr) => {
    if (stdout) {
      try {
        const filePath = path.resolve(__dirname, `../lib/${filename}.js`);
        const port = filename.split("-")?.[1] ?? 6969;

        fs.writeFile(filePath, stdout.replace("6969", port), (err) => {
          if (!err) {
            console.log(`JS successfully minified ${filename}.js`);
          }
        });
      } catch (error) {
        console.log(error);
      }

      return;
    }

    console.log(err ?? stderr);
  });
};

export default minify;
