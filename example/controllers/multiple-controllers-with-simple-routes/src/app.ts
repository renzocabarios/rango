import rango from "rango";
import UserController from "./controllers/user.controller";
import PostController from "./controllers/post.controller";

const app = rango();

// Add a single controller with empty path
app.add({
  path: "user",
  controller: UserController,
});

// Add controllers using array
app.add([
  {
    path: "post",
    controller: PostController,
  },
]);

// Add simple route
app.add({
  path: "/simple",
  GET: () => "Simple GET Route",
  POST: () => "Simple POST Route",
  PUT: () => "Simple PUT Route",
  PATCH: () => "Simple PATCH Route",
  DELETE: () => "Simple DELETE Route",
  HEAD: () => "Simple HEAD Route",
  OPTIONS: () => "Simple OPTIONS Route",
});

// Start RangoJS and listen to port 3000
app.listen(3000);
