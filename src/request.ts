import { RequestObject } from "./interfaces";
import http from "http";

function createRequestObject(req: http.IncomingMessage): RequestObject {
  return Object.assign(req, { body: null, file: null });
}

export default createRequestObject;
