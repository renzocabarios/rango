import http from "http";
import handler from "./handler";
import { createRouteMapper } from "./routes";
import { Route, RouteWithChildren, RouteWithMiddlewares } from "./interfaces";
import { checkUsedPort, findOpenPort, freeAddressPort } from "./port";
import { Middleware } from "./types";
import plugins from "./plugins";
import Logger from "./logger";
import settings from "./settings";
import { createWebSocket, runWebsocket } from "./websocket";

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

function listen(this: Router, port: number, listener?: (() => void) | undefined) {
  const server = http.createServer();

  server.on("request", this);

  if (settings.get("KILL_PORT")) {
    const callback = () => server.listen(port, runWebsocket(server, port, listener));
    return checkUsedPort(port, freeAddressPort(port, callback), callback);
  }

  // Run websocket for non-production environment
  if (process?.env?.PRODUCTION === undefined && settings.get("WEBSOCKET")) {
    [
      "exit",
      "disconnect",
      "SIGBREAK",
      "SIGHUP",
      "SIGKILL",
      "SIGINT",
      "SIGUSR1",
      "SIGUSR2",
      "SIGSTOP",
      "uncaughtException",
      "SIGTERM",
      "beforeExit",
    ].forEach((eventType: any) => {
      process.on(eventType, (code) => createWebSocket(server, port));
    });
  }

  const newPort = findOpenPort(port);
  const isPortChange = port !== newPort;
  listener = isPortChange ? () => console.log(`Server switching port ${port}.`, "Listening to", newPort) : listener;

  server.listen(newPort, runWebsocket(server, newPort, listener));
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
  killPort: () => void;
  headers: { [x: string]: string };
};

export type Router = ((req: http.IncomingMessage, res: http.ServerResponse) => void) & RangoApp;

type ListenFnArgs = [port: number, listener?: (() => void) | undefined];

export default Object.assign(handler, { use, add, logger, listen, killPort, headers: { "X-Powered-By": "RangoJS" } });
