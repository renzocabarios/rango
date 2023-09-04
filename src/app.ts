import http from "http";
import freePort from "./port";
import handler from "./handler";
import plugins from "./plugins";
import Logger from "./logger";
import settings from "./settings";

import {
  Middleware,
  BaseRoutes,
  RouteWithControllers,
  RouteWithChildrenList,
  RouteWithMiddlewares,
  Routes,
  Route,
  RangoMessages,
} from "./types";
import { BaseRoute, RouteWithChildren, RouteWithController, RouteWithMiddleware } from "./interfaces";
import { createRouteMapper } from "./routes";
import { runWebsocket } from "./websocket";
import UseMessage from "./message";

const [setMessage, _] = UseMessage();

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

function listen(this: Router, port: number, listener?: () => void) {
  const server = http.createServer();
  server.on("request", this);

  const runServer = (newPort: number) => {
    const [_, useMessage] = UseMessage();
    const isPortChanged = port !== newPort;
    const message = [useMessage("listen"), newPort];
    !isPortChanged || message.unshift(`${useMessage("server-switch")} ${port}.`);
    listener = !isPortChanged && listener ? listener : () => console.log(...message);
    runWebsocket(server, newPort);
    server.listen(newPort, listener);
  };

  freePort(port, () => runServer(port));
}

function add(route: Route): void;
function add(routes: Routes): void;
function add(route: BaseRoute): void;
function add(routes: BaseRoutes): void;
function add(route: RouteWithChildren): void;
function add(route: RouteWithController): void;
function add(route: RouteWithMiddleware): void;
function add(routes: RouteWithChildrenList): void;
function add(routes: RouteWithMiddlewares): void;
function add(routes: RouteWithControllers): void;
function add(args: Route | Routes): void {
  Array.isArray(args) ? args.forEach(createRouteMapper) : createRouteMapper(args);
}

export type RangoApp = {
  use: (plugin: Middleware) => void;
  listen: (port: number, listener?: () => void) => void;
  add: {
    (route: Route): void;
    (routes: Routes): void;
    (route: BaseRoute): void;
    (routes: BaseRoutes): void;
    (route: RouteWithChildren): void;
    (route: RouteWithMiddleware): void;
    (route: RouteWithController): void;
    (routes: RouteWithChildrenList): void;
    (routes: RouteWithMiddlewares): void;
    (routes: RouteWithControllers): void;
  };
  logger: {
    (logFn: Middleware): void;
    (enable: boolean): void;
  };
  killPort: () => void;
  message: (key: RangoMessages, value: string) => void;
  headers: { [x: string]: string };
};

export type Router = ((req: http.IncomingMessage, res: http.ServerResponse) => void) & RangoApp;

type ListenFnArgs = [port: number, listener?: (() => void) | undefined];

export default Object.assign(handler, {
  use,
  add,
  logger,
  listen,
  killPort,
  message: setMessage,
  headers: { "X-Powered-By": "RangoJS" },
});
