import {
  Middlewares,
  RequestMethod,
  RoutePromiseCallback,
  RouteEndpoints,
  RouteMethodObject,
  BaseRoutes,
  Routes,
} from "./types";
import http from "http";

/**
 *
 */
export interface BaseRoute extends Partial<RouteMethodObject> {
  /**
   *
   */
  path: string;
}

/**
 *
 */
export interface RouteWithMiddleware extends BaseRoute {
  /**
   *
   */
  middlewares: Middlewares;
}

/**
 *
 */
export interface RouteWithChildren extends BaseRoute {
  /**
   *
   */
  children: BaseRoutes;
}

/**
 *
 */
export interface RouteWithMiddleware extends BaseRoute {
  /**
   *
   */
  middlewares: Middlewares;
}

/**
 * An object that controls the flow of the incoming request by defining a set of functions for each request methods.
 * A controller also allows you to define dependencies that you can use inside your route callback functions.
 */
export interface Controller {
  /**
   * A set of route
   */
  routes: Routes;
  /**
   * A set of callable object that can be use inside the controller
   */
  dependencies: any[];
  /**
   * Create a GET route
   */
  get: ControllerRoute;
  /**
   * Create a POST route
   */
  post: ControllerRoute;
  /**
   * Create a PUT route
   */
  put: ControllerRoute;
  /**
   * Create a PATCH route
   */
  patch: ControllerRoute;
  /**
   * Create a DELETE route
   */
  delete: ControllerRoute;
  /**
   * Create a HEAD route
   */
  head: ControllerRoute;
  /**
   * Create a OPTIONS route
   */
  options: ControllerRoute;
}

/**
 *
 */
export interface RouteEndpoint {
  /**
   *
   */
  method: RequestMethod;
  /**
   *
   */
  callback: RoutePromiseCallback;
  /**
   *
   */
  middlewares: Middlewares;
}

/**
 *
 */
export interface CreateRoute {
  /**
   *
   */
  path: string;
  /**
   *
   */
  endpoints?: RouteEndpoints;
  /**
   *
   */
  children?: Map<string, RouteObject>;
  /**
   *
   */
  middlewares?: Middlewares;
}

/**
 *
 */
export interface RouteObjectCallback {
  /**
   *
   */
  path: string;
  /**
   *
   */
  endpoints: RouteEndpoints;
  /**
   *
   */
  children: BaseRoutes;
  /**
   *
   */
}

/**
 *
 */
export interface RouteObject {
  /**
   *
   */
  regex: string;
  /**
   *
   */
  endpoints: RouteEndpoints;
  /**
   *
   */
  path: string;
  /**
   *
   */
  middlewares: Middlewares;
  /**
   *
   */
  hasParam: boolean;
  /**
   *
   */
  children: Map<string, RouteObject>;
}

/**
 * A representation of additional methods for response object
 */
export interface ResponseObjectProps {
  /**
   *
   */
  send(args: any, statusCode?: number): void;
  /**
   *
   */
  json(json: object, statusCode?: number): void;
  /**
   *
   */
  html(html: string, statusCode?: number): void;
  /**
   *
   */
  status(code?: number): ResponseObjectProps;
  /**
   *
   */
  contentLength: number;
}

/**
 * An object representing NodeJS Server Response with additional
 * methods added by the @mayajs/router api
 */
export interface ResponseObject extends http.ServerResponse, ResponseObjectProps {}

/**
 * An object representing NodeJS Incoming Message with additional
 * methods added by the @mayajs/router api
 */
export interface RequestObject extends http.IncomingMessage, Partial<QueryParams> {
  /**
   *
   */
  body: unknown;
  /**
   *
   */
  file: unknown;
}

export interface QueryParams {
  /**
   *
   */
  query: { [x: string]: string | string[] };
  /**
   *
   */
  params: { [x: string]: string };
  /**
   *
   */
  body: unknown;
  /**
   *
   */
  file: unknown;
}

export interface MiddlewareContext {
  /**
   *
   */
  res: ResponseObject;
  /**
   *
   */
  req: RequestObject;
  /**
   *
   */
  setStatus(code: number): void;
  /**
   *
   */
  error?: unknown;
}

/**
 *
 */
export interface Context extends MiddlewareContext, QueryParams {
  /**
   *
   */
  path: string;
  /**
   *
   */
  headers: http.IncomingHttpHeaders;
  /**
   *
   */
  method: RequestMethod;
}
