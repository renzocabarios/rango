// Import RangoJS and http module
import rango, { Context, NextFunction } from "rango";

// Create an instance of the RangoJS app
const app = rango();

// Middleware for handling GET requests
const getUserMiddleware = (context: Context, next: NextFunction) => {
  console.log("This middleware is executed for GET requests.");
  // You can perform additional logic or tasks specific to GET requests here if needed.
  next(); // Call 'next()' to move on to the next middleware or the final route handler.
};

// Middleware for handling POST requests
const postUserMiddleware = (context: Context, next: NextFunction) => {
  console.log("This middleware is executed for POST requests.");
  // You can perform additional logic or tasks specific to POST requests here if needed.
  next(); // Call 'next()' to move on to the next middleware or the final route handler.
};

app.add([
  {
    path: "users",
    GET: {
      callback: (context) => {
        // Route handler for GET requests to '/users'
        return "This is a GET request.";
      },
      middlewares: [
        // This middleware will be executed only for this GET method
        getUserMiddleware,

        // You can add more middleware here as you please
      ],
    },
    POST: {
      callback: (context) => {
        // Route handler for POST requests to '/users'
        return "This is a POST request.";
      },
      middlewares: [
        // This middleware will be executed only for this POST method
        postUserMiddleware,

        // You can add more middleware here as you please
      ],
    },
  },
]);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
