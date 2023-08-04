import { RouterContext } from "./interfaces";
import mapMiddlewares from "./middleware";
import { checkEndpointExist, checkRoutePathExist } from "./routes";
import sendFile, { isFileRequest } from "./static";
import { RouteCallback } from "./types";
import plugins from "./plugins";
import RegEx from "./regex";

/**
 * A function that manage an incoming request.
 *
 * @param context - The current router context.
 * @returns A promise that will be resolved when the router is ready.
 */
async function send(context: RouterContext): Promise<void> {
  // Get method, path and res in context object
  const { method, path, res } = context;

  // Check if route path is a file
  if (isFileRequest(path)) {
    // Send back the file buffer with correct mime-type
    return sendFile(context);
  }

  // Check if route path exist
  // If exist will return a route object
  const routePathExist = checkRoutePathExist(path);

  if (!routePathExist) {
    // Send error message if path is not found
    return res.send({ message: `Path of ${path} is missing.`, status: "PathNotFound", error: true }, 406);
  }

  // Set path `params` if RegEx group result is not undefined
  context.params = RegEx(routePathExist.regex, true).exec("/" + path)?.groups ?? {};

  // Check if endpoint exist in route object
  // If exist will return an endpoint object
  const routeMethodExist = checkEndpointExist(routePathExist, method);

  if (!routeMethodExist) {
    // Send error message if method is not found or not allowed
    const message = `${method} method on path of ${path} is missing.`;
    return res.send({ message, status: "MethodNotAllowed", error: true }, 405);
  }

  const callback: RouteCallback = async (context) => {
    const response = (await routeMethodExist.callback(context)) as { statusCode: number };

    // Send back the response
    // Set the status code of the response
    return res.send(response, response?.statusCode);
  };

  try {
    // Loop thru all middlewares and inject context
    // If middleware doesn't have a "next()" function
    // It will end the loop and proceed to execute the endpoint callback
    await mapMiddlewares(
      [...plugins, ...routePathExist.middlewares, ...routeMethodExist.middlewares, callback],
      context
    );
  } catch (error) {
    if (error) {
      // Send error message if middleware has an error or failed to execute
      res.send({ message: error, status: "ServerError", error: true }, 403);
    }
  }
}

export default send;
