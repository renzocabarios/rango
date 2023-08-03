import { Context, NextFunction } from "rango";

function logger(context: Context, next: NextFunction) {
  const { req } = context;
  console.log(`${req.method}:${req.url}`);
}

export default logger;
