import { ResponseObject } from "./interfaces";
import { refreshScript } from "./websocket";
import http from "http";

const contentTypeValues = ["text/plain", "application/json", "text/html"];
const contentType = contentTypeValues.map((type) => ({ "Content-Type": type }));

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
    statusCode: 200,
    contentLength: 0,
  });
}

export default createResponseObject;
