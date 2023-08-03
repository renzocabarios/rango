// Import the RangoJS and http module
import rango from "rango";
import http from "http";

// Import the Express.js `cors` middleware
import cors from "cors";

// Create an instance of the RangoJS app
const app = rango();

// Mounting Express.js `cors` middleware
app.use(cors());

app.add([
  // Your route configurations will be added here
]);

// Start the server
const port = 3000;
http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
