// Import the RangoJS and http module
import rango, { Context, NextFunction } from "rango";

// Create an instance of the RangoJS app
const app = rango();

// Create custom middleware function
const customMiddleware = (context: Context, next: NextFunction) => {
  console.log("Custom middleware executed!");
  next();
};

// Mount custom middleware
app.use(customMiddleware);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
