// Import the RangoJS and http module
import rango, { NextFunction, ResponseObject, RequestObject } from "rango";

// Create an instance of the RangoJS app
const app = rango();

// Create Express middleware
const legacyMiddleware = (req: RequestObject, res: ResponseObject, next: NextFunction) => {
  console.log(`This is a 'Express' legacy middleware`);
  next();
};

// Create Express error middleware
const legacyErrorMiddleware = (req: RequestObject, res: ResponseObject, next: NextFunction) => {
  if (req.headers.authorization) {
    // Perform authentication logic
    next();
  } else {
    res.status(401).send(`Unauthorized`);
  }
};

// Legacy middleware mounted as global middleware
app.use(legacyMiddleware);

// Legacy error middleware mounted
app.use(legacyErrorMiddleware);

app.add({
  path: "users",
  // Legacy middleware mounted as route-specific middleware
  middlewares: [legacyMiddleware],
  GET: {
    callback: () => {
      // Logic to handle GET request for '/users'
      return "This is a GET request!";
    },
    // Legacy middleware mounted as method-specific middleware
    middlewares: [legacyMiddleware],
  },
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
