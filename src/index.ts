import { websocket, wsDisconnect } from "./websocket";
import app, { Router } from "./app";

/**
 * A Nodejs library for managing routes. MayaJs use a declarative way of defining routes.
 * It also cache visited routes for faster execution of route callback.
 *
 * ```
 * // Import the RangoJS and http module
 * import rango from "rango";
 * import http from "http";
 *
 * // Create an instance of the RangoJS app
 * const app = rango();
 *
 * // Define a route for the home page
 * app.add({
 *   path: "/",
 *   GET: () => {
 *     return "Hello, RangoJS!";
 *   }
 * });
 *
 * // Start the server
 * const port = 3000;
 * http.createServer(app).listen(PORT, () => {
 *   console.log(`Server listening on port ${port}.`);
 * });
 * ```
 *
 * @return Router
 */
function rango(): Router {
  // Run websocket for non-production environment
  if (!process?.env?.PRODUCTION) {
    websocket();

    process
      .on("SIGKILL", wsDisconnect)
      .on("SIGINT", wsDisconnect)
      .on("exit", wsDisconnect)
      .on("disconnect", wsDisconnect);
  }

  // Return Router Instance
  return app;
}

export default rango;