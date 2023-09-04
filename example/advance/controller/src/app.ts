import rango from "rango";
import AppController from "./controllers/app.controller";
import SampleController from "./controllers/sample.controller";

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

// Define port number
const PORT = 3000;

// Start RangoJS and listen to port 3000
app.listen(PORT, () => console.log("Server listening on port", PORT));
