import handler from "./handler";
import http from "http";
import { createRouteMapper } from "./routes";
import { Route, RouteWithChildren, RouteWithMiddlewares } from "./interfaces";

function use(plugin: any) {
  // TODO: "I'm still working on this" - Rango
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
  use: (plugin: any) => void;
  add: {
    (routes: RouteWithChildren): void;
    (routes: RouteWithMiddlewares): void;
    (route: Route): void;
    (routes: RouteWithChildren[]): void;
    (routes: RouteWithMiddlewares[]): void;
    (routes: Route[]): void;
  };
  headers: { [x: string]: string };
};

export type Router = ((req: http.IncomingMessage, res: http.ServerResponse) => void) & RangoApp;

export default Object.assign(handler, { use, add, headers: { "X-Powered-By": "RangoJS" } });
