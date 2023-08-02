import { URL } from "url";
import { RouterContext } from "./interfaces";
import { RequestMethod } from "./types";
import { pathUrl, statusCodeFactory } from "./utils";
import response from "./response";
import request from "./request";
import http from "http";
import send from "./send";

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const protocol = req.headers.referer ? req.headers.referer.split(":")[0] : "http";
  const fullUrl = protocol + "://" + req.headers.host;
  const parsedURL = new URL(req.url || "", fullUrl);
  const path = pathUrl(parsedURL.pathname);
  const query = Object.fromEntries(parsedURL.searchParams);
  const headers = req.headers;
  const method = (req.method || "") as RequestMethod;
  const resObj = response(res);

  // Create Router Context object
  const context: RouterContext = {
    req: request(req),
    res: resObj,
    query,
    params: {},
    body: null,
    file: null,
    method,
    headers,
    path,
    setStatus: statusCodeFactory(resObj),
  };

  // Sends result back and end request
  send(context);
};

export default handler;
