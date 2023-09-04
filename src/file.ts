import constants from "./constants";
import { MimeTypeExtension } from "./types";

const contentTypeValues = [
  "text/plain",
  "application/json",
  "text/html",
  "text/javascript",
  "audio/aac",
  "application/x-abiword",
  "application/x-freearc",
  "image/avif",
  "video/x-msvideo",
  "application/vnd.amazon.ebook",
  "application/octet-stream",
  "image/bmp",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-cdf",
  "application/x-csh",
  "text/css",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-fontobject",
  "application/epub+zip",
  "application/gzip",
  "image/gif",
  "image/vnd.microsoft.icon",
  "text/calendar",
  "application/java-archive",
  "image/jpeg",
  "application/ld+json",
  "audio/midi",
  "audio/x-midi",
  "audio/mpeg",
  "video/mp4",
  "video/mpeg",
  "application/vnd.apple.installer+xml",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "audio/ogg",
  "video/ogg",
  "application/ogg",
  "audio/opus",
  "font/otf",
  "image/png",
  "application/pdf",
  "application/x-httpd-php",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.rar",
  "application/rtf",
  "application/x-sh",
  "image/svg+xml",
  "application/x-tar",
  "image/tiff",
  "video/mp2t",
  "font/ttf",
  "application/vnd.visio",
  "audio/wav",
  "audio/webm",
  "video/webm",
  "image/webp",
  "font/woff",
  "font/woff2",
  "application/xhtml+xml",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/xml",
  "application/atom+xml",
  "application/vnd.mozilla.xul+xml",
  "application/zip",
  "video/3gpp",
  "audio/3gpp",
  "video/3gpp2",
  "audio/3gpp2",
  "application/x-7z-compressed",
];

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
