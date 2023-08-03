// Import the RangoJS and http module
import rango from "rango";
import http from "http";

// Create an instance of the RangoJS app
const app = rango();

// Define a route for the home page
app.add([
  {
    path: "home",
    GET: () => {
      return "Welcome to the RangoJS!";
    },
  },
  {
    path: "about",
    GET: () => {
      return "About Us: Learn more about our library.";
    },
  },
  {
    path: "contact",
    GET: () => {
      return "Contact Us: Reach out to us for any issues/questions.";
    },
  },
]);

// Start the server
const port = 3000;
http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
