import { ResponseObject } from "./interfaces";
import { refreshScript } from "./websocket";
import { contentType, isFileRequest } from "./file";
import { promises as fs } from "fs";
import http from "http";

function createResponseObject(res: http.ServerResponse): ResponseObject {
  const endResponse = (value: any) => {
    if (value) res.write(`${value}`);
    res.end();
  };

  return Object.assign(res, {
    send(value: any, statusCode = 200) {
      statusCode = statusCode ?? this.statusCode;
      const isText = typeof value === "string";
      const isError = value instanceof Error;
      const code = isError ? 500 : statusCode;
      const htmlPattern = /<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi;

      try {
        if (!isText) value = this.json(value?.message && isError ? { message: value?.message } : value, code);
        else if (htmlPattern.test(value)) value = this.html(value, code);
        else if (isFileRequest(value)) value = this.html(value, code);
        else res.writeHead(code, contentType[0]);
      } catch (error) {
        const message = `${error}`.replace(/file:\/\/\/[A-Z]:.+\/(?=src)|^\s*at.*\)\n?|\(.+\n?/gm, "");
        value = JSON.stringify({ status: "ServerError", message });
        if (isText) res.writeHead(500, contentType[0]);
      }

      this.contentLength = Buffer.byteLength(`${value}`, "utf8");

      endResponse(value);
    },
    json(json: object, statusCode = 200) {
      res.writeHead(statusCode, contentType[1]);
      return JSON.stringify(json);
    },
    html(html: string, statusCode = 200) {
      res.writeHead(statusCode, contentType[2]);
      const body = (value: string) => (value.includes("<body>") ? value : `<body>${value}</body>`);
      const refresher = refreshScript();
      return body(html).replace(/<\/body>/i, `${refresher}</body>`);
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    sendFile(filePath: string, type: string) {
      fs.readFile(filePath).then((data) => {
        res.writeHead(200, { "Content-Type": type });
        return res.end(data, "utf-8");
      });
    },
    setHeaders(options: { [x: string]: string }) {
      Object.keys(options).forEach((key) => res.setHeader(key, options[key]));
    },
    statusCode: 200,
    contentLength: 0,
  });
}

export default createResponseObject;
