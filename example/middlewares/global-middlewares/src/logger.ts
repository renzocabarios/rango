import { Context, NextFunction } from "rango";

function logger(context: Context, next: NextFunction) {
  const { req, res } = context;
  const startTime = process.hrtime();

  res.addListener("finish", () => {
    const totalTime = process.hrtime(startTime);
    const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
    const elapsedTime = `\x1b[33m${totalTimeInMs.toFixed(4)}\x1b[0m`;
    const method = `\x1b[34m${req.method}\x1b[0m`;
    const statusCode = `\x1b[32m${res.statusCode}\x1b[0m`;
    console.log(`${method} ${req.url} ${statusCode} -- ${elapsedTime} ms - ${res.contentLength}b`);
  });

  next();
}

export default logger;
