import { Guard, Guards } from "./types";
import { Context } from "./interfaces";

/**
 * A helper function for invoking a list of guards.
 *
 * @param req Request object from http.IncomingMessage
 * @param res Response object from http.ServerResponse
 * @param guards List of middlewares
 */
async function mapGuards(guards: Guards, context: Context): Promise<boolean> {
  const { req, res } = context;
  if (!guards.length) return true;
  const current = () => (<Guard>guards[0])(context);
  const guarded = await current();

  if (guarded && guards.length > 1) {
    return await mapGuards(guards.slice(1), { ...context, req, res, body: req.body, file: req.file });
  }

  return guarded;
}

export default mapGuards;
