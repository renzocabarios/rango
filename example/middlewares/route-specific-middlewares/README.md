# Route-Specific Middleware

Route-specific middleware is applied only to specific routes or route groups. You can't add them using `app.use()` with a specific route path or directly within your route definition. You need to define them using the `middlewares` key inside your route definition.

```ts
// Import RangoJS and http module
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
```
