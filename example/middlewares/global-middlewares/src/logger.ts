import { Context, NextFunction } from "rango";

function logger(context: Context, next: NextFunction) {
  console.log("This is a logging function");
  next();
}

export default logger;
