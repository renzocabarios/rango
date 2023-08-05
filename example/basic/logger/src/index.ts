// Import the RangoJS
import rango, { Context, NextFunction } from "rango";

// Create an instance of the RangoJS app
const app = rango();

// Configure RangoJS application to enable the logging
app.logger(true);

// Create custom logger callback
const customLogger = (context: Context, next: NextFunction) => {
  console.log("This is a logging function");
  next();
};

// Mount custom logger to modify default logger
app.logger(customLogger);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
