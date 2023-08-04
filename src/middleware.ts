import { LegacyMiddleware, LegacyMiddlewareError, MayaMiddleware, Middlewares } from "./types";
import { Context } from "./interfaces";

/**
 * A helper function for invoking a list of MayaJS or ExpressJS middlewares.
 *
 * @param req Request object from http.IncomingMessage
 * @param res Response object from http.ServerResponse
 * @param middlewares List of middlewares
 * @param message A message from the previous middleware
 */
async function mapMiddlewares(middlewares: Middlewares, context: Context, message?: any): Promise<void> {
  const { req, res } = context;

  if (!middlewares.length) return;

  const current = middlewares[0];

  // Create next function
  const next = async (error: unknown) => {
    if (error) return res.send(error, 400);
    return await mapMiddlewares(
      middlewares.slice(1),
      { ...context, req, res, error, body: req.body, file: req.file },
      error
    );
  };

  // Create middleware for express
  const legacyMiddleware = () =>
    message ? (<LegacyMiddlewareError>current)(message, req, res, next) : (<LegacyMiddleware>current)(req, res, next);

  // Check if arguments are more than 2
  return current.length > 2 ? await legacyMiddleware() : await (<MayaMiddleware>current)(context, next);
}

export default mapMiddlewares;
