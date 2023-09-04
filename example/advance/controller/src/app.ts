import rango from "rango";
import AppController from "./controllers/app.controller";
import SampleController from "./controllers/sample.controller";
import FirstController from "./controllers/first.controller";
import SecondController from "./controllers/second.controller";

const app = rango();

// Initialize logger
app.logger(true);

// Add a single controller with empty path
app.add({
  path: "",
  controller: AppController,
});

// Add a single controller with path
app.add({
  path: "sample",
  controller: SampleController,
});

// Add a multiple controllers
app.add([
  {
    path: "first",
    controller: FirstController,
  },
  {
    path: "second",
    controller: SecondController,
  },
]);

// Add single route
app.add({
  path: "/single",
  GET: () => "Single GET Route",
  POST: () => "Single POST Route",
  PUT: () => "Single PUT Route",
  PATCH: () => "Single PATCH Route",
  DELETE: () => "Single DELETE Route",
  HEAD: () => "Single HEAD Route",
  OPTIONS: () => "Single OPTIONS Route",
});

// Add another route in an array
app.add([
  {
    path: "another",
    GET: () => "Another GET Route",
    POST: () => "Another POST Route",
    PUT: () => "Another PUT Route",
    PATCH: () => "Another PATCH Route",
    DELETE: () => "Another DELETE Route",
    HEAD: () => "Another HEAD Route",
    OPTIONS: () => "Another OPTIONS Route",
  },
]);

// Define port number
const PORT = 3000;

// Start RangoJS and listen to port 3000
app.listen(PORT, () => console.log("Server listening on port", PORT));
