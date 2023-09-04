import rango from "rango";

// Import AppController instance
import AppController from "./app.controller";

const app = rango();

// Add a single controller with empty path
app.add({ path: "", controller: AppController });

// Start RangoJS and listen to port 3000
app.listen(3000);
