// Import the RangoJS and http module
import rango, { Context, NextFunction } from "rango";
import http from "http";

// Create an instance of the RangoJS app
const app = rango();

// Create Route-Specific middleware function
const usersMiddleware = (context: Context, next: NextFunction) => {
  console.log(`This middleware is executed for all '/users' routes`);
  // Proceed to the next middleware or route handler
  next();
};

app.add({
  path: "users",
  middlewares: [usersMiddleware],
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
