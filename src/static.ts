import constants from "./constants";
import { Context } from "./interfaces";
import { promises as fs } from "fs";
import path from "path";
import { MimeTypeExtension } from "./types";

const resolveDir = (filepath: string) => path.resolve(process.cwd(), "./public" + filepath);

export default async (context: Context): Promise<void> => {
  const { res, req } = context;
  let filePath = req.url === "/" ? resolveDir("/index.html") : resolveDir(req.url ?? "");
  const extension = path.extname(filePath).toLowerCase();
  const contentType = constants.MIME_TYPES[extension as MimeTypeExtension] || "application/octet-stream";

  if (!contentType) return res.send({ message: "File format not supported!" }, 415);

  try {
    if (req.url?.includes("/ws-")) {
      filePath = path.resolve(__dirname, [".", req.url].join(""));
    }

    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    return res.end(data, "utf-8");
  } catch (error) {
    return res.send({ message: "File not found!" }, 404);
  }
};
