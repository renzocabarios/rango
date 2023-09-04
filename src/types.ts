import {
  Context,
  Controller,
  RequestObject,
  ResponseObject,
  BaseRoute,
  RouteEndpoint,
  RouteWithChildren,
  RouteWithController,
  RouteWithMiddleware,
} from "./interfaces";

/**
 * Type of request method
 */
export type RequestMethod = "GET" | "POST" | "DELETE" | "OPTIONS" | "PUT" | "PATCH" | "HEAD";

/**
 *
 */
export type RouteMethodObjectCallback = {
  callback: RoutePromiseCallback;
  middlewares: Middlewares;
};

/**
 *  A record of method name and its callback functions
 * */
export type RouteMethodObject = {
  /**
   * A function that will be executed once the 'path-name' is the same with the request path
   *
   * ```
   * {
   *   GET: ({ req, body, params, query }) => {
   *       return 'Hello, world'; // You can also return a JSON object
   *   }
   * }
   * ```
   */
  [P in RequestMethod]: RoutePromiseCallback | RouteMethodObjectCallback;
};

/**
 *
 */
export type NextFunction = (error?: any) => Promise<void> | void;

/**
 *
 */
export type RoutePromiseCallback = (ctx: Context) => Promise<any> | any;

/**
 *
 */
export type RouteCallback = RoutePromiseCallback | RouteMethodObjectCallback;

/**
 *
 */
export type LegacyMiddleware = (req: RequestObject, res: ResponseObject, next: NextFunction) => Promise<void> | void;

/**
 *
 */
export type LegacyMiddlewareError = (
  error: any,
  req: RequestObject,
  res: ResponseObject,
  next: NextFunction
) => Promise<void> | void;

/**
 *
 */
export type MayaMiddleware = (context: Context, next: NextFunction) => Promise<void> | void;

/**
 *
 */
export type Middleware = LegacyMiddleware | LegacyMiddlewareError | MayaMiddleware;

/**
 *
 */
export type Middlewares = Middleware[];

/**
 *
 */
export type BaseRoutes = BaseRoute[];

/**
 *
 */
export type RouteWithMiddlewares = RouteWithMiddleware[];

/**
 *
 */
export type RouteWithChildrenList = RouteWithChildren[];

/**
 *
 */
export type RouteWithControllers = RouteWithController[];

/**
 *
 */
export type RouteEndpoints = RouteEndpoint[];


/**
 *
 */
export type ControllerRoute = {
  /**
   * Create a route inside a controller using a callback
   */
  (cb: RouteCallback): Controller;
  /**
   * Create a route inside a controller using a callback with a define path
   */
  (path: string, cb: RouteCallback): Controller;
  /**
   * Create a route inside a controller using a callback with set of middlewares
   */
  // (middlewares: Middlewares, cb: RouteCallback): Controller;
  /**
   * Create a route inside a controller using a callback with a define path and set of middlewares
   */
  // (path: string, middlewares: Middlewares, cb: RouteCallback): Controller;
};
