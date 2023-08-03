import { Context, RequestObject, ResponseObject } from "./interfaces";

/**
 * Type of request method
 */
export type RequestMethod = "GET" | "POST" | "DELETE" | "OPTIONS" | "PUT" | "PATCH";

/**
 *
 */
export type RouteMethodObjectCallback = {
  callback: RouteCallback;
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
  [P in RequestMethod]: RouteCallback | RouteMethodObjectCallback;
};

/**
 *
 */
export type NextFunction = (error?: any) => Promise<void> | void;

/**
 *
 */
export type RouteCallback = (ctx: Context) => Promise<unknown>;

/**
 *
 */
export type LegacyMiddleware = (req: RequestObject, res: ResponseObject, next: NextFunction) => void;

/**
 *
 */
export type LegacyMiddlewareError = (error: any, req: RequestObject, res: ResponseObject, next: NextFunction) => void;

/**
 *
 */
export type MayaMiddleware = (context: Context, next: NextFunction) => void;

/**
 *
 */
export type Middleware = LegacyMiddleware | LegacyMiddlewareError | MayaMiddleware;

/**
 *
 */
export type Middlewares = Middleware[];
