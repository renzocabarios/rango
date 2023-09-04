import { Controller, BaseRoute } from "./interfaces";
import { RequestMethod, Route, RouteCallback } from "./types";

function createRoute(method: RequestMethod, ...args: any[]): Route {
  let [value, cb] = args[0];
  const isPathString = typeof value === "string";
  const path = isPathString ? `/${value}` : "/";
  cb = !isPathString ? value : cb;
  return { path, [method]: cb };
}

function methodGet(this: Controller, cb: RouteCallback): Controller;
function methodGet(this: Controller, path: string, cb: RouteCallback): Controller;
function methodGet(this: Controller, ...args: any[]): Controller {
  const route = createRoute("GET", args);
  this.routes.push(route);
  return this;
}

function methodPost(this: Controller, cb: RouteCallback): Controller;
function methodPost(this: Controller, path: string, cb: RouteCallback): Controller;
function methodPost(this: Controller, ...args: any[]): Controller {
  const route = createRoute("POST", args);
  this.routes.push(route);
  return this;
}

function methodPut(this: Controller, cb: RouteCallback): Controller;
function methodPut(this: Controller, path: string, cb: RouteCallback): Controller;
function methodPut(this: Controller, ...args: any[]): Controller {
  const route = createRoute("PUT", args);
  this.routes.push(route);
  return this;
}

function methodPatch(this: Controller, cb: RouteCallback): Controller;
function methodPatch(this: Controller, path: string, cb: RouteCallback): Controller;
function methodPatch(this: Controller, ...args: any[]): Controller {
  const route = createRoute("PATCH", args);
  this.routes.push(route);
  return this;
}

function methodDelete(this: Controller, cb: RouteCallback): Controller;
function methodDelete(this: Controller, path: string, cb: RouteCallback): Controller;
function methodDelete(this: Controller, ...args: any[]): Controller {
  const route = createRoute("DELETE", args);
  this.routes.push(route);
  return this;
}

function methodHead(this: Controller, cb: RouteCallback): Controller;
function methodHead(this: Controller, path: string, cb: RouteCallback): Controller;
function methodHead(this: Controller, ...args: any[]): Controller {
  const route = createRoute("HEAD", args);
  this.routes.push(route);
  return this;
}

function methodOptions(this: Controller, cb: RouteCallback): Controller;
function methodOptions(this: Controller, path: string, cb: RouteCallback): Controller;
function methodOptions(this: Controller, ...args: any[]): Controller {
  const route = createRoute("OPTIONS", args);
  this.routes.push(route);
  return this;
}

export function useController(dependencies: any[] = []): Controller {
  return {
    dependencies,
    routes: [],
    get: methodGet,
    post: methodPost,
    put: methodPut,
    patch: methodPatch,
    delete: methodDelete,
    head: methodHead,
    options: methodOptions,
  };
}
