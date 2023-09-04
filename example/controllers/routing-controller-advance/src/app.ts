import rango from "rango";
import controllers from "./controllers";

const app = rango();

// Add controllers
app.add({
  path: "v1",
  children: controllers,
});

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

// Start RangoJS and listen to port 3000
app.listen(3000);
