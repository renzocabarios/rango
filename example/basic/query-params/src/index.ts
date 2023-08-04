// Import RangoJS and http module
import rango from "rango";
import http from "http";

// Create an instance of the RangoJS app
const app = rango();

// Using Query Params in route
app.add({
  path: "users",
  GET: (context) => {
    const name = context.query.name || "stranger";
    return `Howdy, Cowboy coder ${name}!`;
  },
});

// Start the server
const port = 3000;
http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
