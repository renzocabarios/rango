import { exec } from "child_process";
import { AddressInfo } from "net";
import http from "http";
import handler from "./handler";
import { createRouteMapper } from "./routes";
import { Route, RouteWithChildren, RouteWithMiddlewares } from "./interfaces";
import { Middleware } from "./types";
import plugins from "./plugins";
import Logger from "./logger";

function logger(enable: boolean): void;
function logger(logFn: Middleware): void;
function logger(arg: boolean | Middleware): void {
  if (typeof arg === "boolean" && arg) {
    plugins.push(Logger);
  }

  if (typeof arg === "function") {
    plugins.push(arg);
  }
}

function use(plugin: Middleware) {
  plugins.push(plugin);
}


function switchPort(port: number, server: http.Server) {
  return (stdout: string) => {
    console.log("Port", port, "already in use!", "Switching to any random open port.");

    server.listen(0, () => {
      const newPort = (server.address() as AddressInfo).port;
      console.log(`Server is listening on port`, newPort);
    });
  };
}

function checkUsedPort(port: number, callback: (stdout: string) => void, start: () => void) {
  exec(`netstat -ano | findstr ${port}`, (err, stdout, stderr) => {
    if (stdout) {
      return callback;
    }

    start();
  });
}

function listen(this: Router, port: number, listener?: (() => void) | undefined) {
  const server = http.createServer(this);
  const callback = () => server.listen(port, listener);

  if (KILL_PORT) {
    return checkUsedPort(port, freeAddressPort(port, callback), callback);
  }

  checkUsedPort(port, switchPort(port, server), callback);
}

function add(route: Route): void;
function add(route: Route[]): void;
function add(routes: RouteWithChildren): void;
function add(routes: RouteWithChildren[]): void;
function add(routes: RouteWithMiddlewares): void;
function add(routes: RouteWithMiddlewares[]): void;
function add(
  args: Route | RouteWithChildren | RouteWithMiddlewares | Route[] | RouteWithChildren[] | RouteWithMiddlewares[]
): void {
  Array.isArray(args) ? args.forEach(createRouteMapper) : createRouteMapper(args);
}

export type RangoApp = {
  use: (plugin: Middleware) => void;
  listen: (port: number, listener?: () => void) => void;
  add: {
    (routes: RouteWithChildren): void;
    (routes: RouteWithMiddlewares): void;
    (route: Route): void;
    (routes: RouteWithChildren[]): void;
    (routes: RouteWithMiddlewares[]): void;
    (routes: Route[]): void;
  };
  logger: {
    (logFn: Middleware): void;
    (enable: boolean): void;
  };
  headers: { [x: string]: string };
};

export type Router = ((req: http.IncomingMessage, res: http.ServerResponse) => void) & RangoApp;

type ListenFnArgs = [port: number, listener?: (() => void) | undefined];

export default Object.assign(handler, { use, add, logger, listen, headers: { "X-Powered-By": "RangoJS" } });
