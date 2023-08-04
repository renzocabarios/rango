// Import RangoJS and http module
import rango from "rango";
import http from "http";

// Create an instance of the RangoJS app
const app = rango();

// Add route with path params of 'id' in single path
app.add({
  path: "users/:id",
  GET: (context) => {
    const userId = context.params.id;
    return `Hello, user with ID: ${userId}`;
  },
});

// Add route with path params of 'id' in child path
app.add({
  path: "users",
  children: [
    {
      path: ":id",
      GET: (context) => {
        const userId = context.params.id;
        return `Hello, user with ID: ${userId}`;
      },
    },
  ],
});

// Start the server
const port = 3000;
http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
