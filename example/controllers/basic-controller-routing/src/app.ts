import rango from "rango";

// Import UserController
import UserController from "./user.controller";

const app = rango();

// Add a single controller route
app.add({
  path: "user",
  controller: UserController,
});

// Start RangoJS and listen to port 3000
app.listen(3000);
