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

  children: Routes;
}

/**
 *
 */
export interface RouteWithMiddlewares extends Partial<RouteMethodObject> {
  /**
   *
   */
  path: string;
  /**
   *
   */
  middlewares: Middlewares;
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
  children: Routes;
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
