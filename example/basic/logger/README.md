# Logging with RangoJS

RangoJS provides a straightforward way to enable logging and customize its behavior to suit your application's needs. Follow these steps to set up logging in your RangoJS application:

```ts
// Import RangoJS
import rango from "rango";

// Create an instance of the RangoJS app
const app = rango();

// Configure RangoJS application to enable the logging
app.logger(true);
```

Logging is a crucial aspect of any application, and RangoJS simplifies the process with its built-in logging capabilities. Additionally, RangoJS flexibility allows you to customize the logging output to meet your specific requirements.

## Customizing Logging Output

RangJS provides a flexible way to customize the logging output by using a callback function with the **`app.logger()`** method. This callback allows you to modify the existing logging function and modify log messages before they are emitted, add additional metadata, or integrate with external logging systems. You can intercept log messages and modify them as needed. This is particularly useful for adding extra context or customizing the log format:

```ts
// Create custom logger callback
const customLogger = (context: Context, next: NextFunction) => {
  console.log("This is a logging function");
  next();
};

// Mount custom logger to modify default logger
app.logger(customLogger);
```

Customizing logging output with a callback function in RangoJS provides developers with the flexibility to adapt logging messages to their specific needs. By following the steps outlined in this documentation, you can easily implement a custom logger, intercept log messages, and add additional metadata or formatting to suit your application's requirements.
