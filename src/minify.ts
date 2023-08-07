import fs from "fs";
import { exec } from "child_process";
import path from "path";

const minify = (filename: string, destination: string) => {
  return new Promise((resolve, reject) => {
    const minifyExec = exec(
      `${path.resolve(__dirname, "../node_modules/.bin/minify")} ${destination}`,
      async (err, stdout, stderr) => {
        if (stdout) {
          try {
            const filePath = path.resolve(__dirname, `../lib/${filename}.js`);

            const data = await new Promise((resolve, reject) =>
              fs.writeFile(filePath, stdout, (err) => (err ? reject() : resolve(stdout)))
            );

            if (data) {
              console.log(`JS successfully minified and saved to ${filePath}`);
              minifyExec.kill();
            }
          } catch (error) {
            console.log(error);
          }

          return;
        }

        console.log(err ?? stderr);
      }
    );
  });
};

export default minify;
