import http from "http";
import handler from "./handler";
import { BaseRoute, RouteWithChildren, RouteWithController, RouteWithMiddleware } from "./interfaces";
import plugins from "./plugins";
import Logger from "./logger";
import settings from "./settings";

import {
  BaseRoutes,
} from "./types";
import { runWebsocket } from "./websocket";

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

function killPort() {
  settings.set("KILL_PORT", true);
}

function listen(this: Router, port: number, listener: () => void) {
  const server = http.createServer();
  server.on("request", this);

  const runServer = (newPort: number) => {
    const isPortChanged = port !== newPort;
    listener = isPortChanged ? () => console.log(`Server switching port ${port}.`, "Listening to", newPort) : listener;
    runWebsocket(server, newPort);
    server.listen(newPort, listener);
  };

  try {
    freeAddressPort(port, () => runServer(port));
  } catch (error) {
    runServer(findOpenPort(port));
  }
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
  listen: (port: number, listener: () => void) => void;
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
  killPort: () => void;
  headers: { [x: string]: string };
};

export type Router = ((req: http.IncomingMessage, res: http.ServerResponse) => void) & RangoApp;

type ListenFnArgs = [port: number, listener?: (() => void) | undefined];

export default Object.assign(handler, { use, add, logger, listen, killPort, headers: { "X-Powered-By": "RangoJS" } });
