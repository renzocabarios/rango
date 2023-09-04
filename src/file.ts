import constants from "./constants";
import { MimeTypeExtension } from "./types";

const mimeTypes = constants.MIME_TYPES;
const contentType = Object.keys(mimeTypes).map((key) => ({ "Content-Type": mimeTypes[key as MimeTypeExtension] }));
const extPattern = /\.(?<ext>\w*?)$/g;

export function getContentType(filename: string) {
  const match = fileExtension(filename);
  let output = contentType[0];

  if (match?.groups?.ext) {
    const type = mimeTypes[(match?.groups?.ext || "text") as MimeTypeExtension];
    output = { "Content-Type": type };
  }

  return output;
}

export function fileExtension(filename: string) {
  return filename.match(extPattern);
}

export function isFileRequest(filename: string): boolean {
  const match = fileExtension(filename);
  return match !== null;
}

export { contentType, extPattern };
