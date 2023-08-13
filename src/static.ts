import { MIME_TYPES } from "./constants";
import { Context } from "./interfaces";
import { promises as fs } from "fs";
import path from "path";

const resolveDir = (filepath: string) => path.resolve(process.cwd(), "./public" + filepath);

const extPattern = /\.(?<ext>\w*?)$/g;

export const isFileRequest = (url: string): boolean => {
  const ext = url.match(extPattern) ?? [];
  return ext?.length > 0;
};

export default async (context: Context): Promise<void> => {
  const { res, req } = context;
  let filePath = req.url === "/" ? resolveDir("/index.html") : resolveDir(req.url ?? "");
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";

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
