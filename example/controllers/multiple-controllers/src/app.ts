import rango from "rango";
import UserController from "./controllers/user.controller";
import PostController from "./controllers/post.controller";

const app = rango();

// Add a multiple controllers
app.add([
  {
    path: "user",
    controller: UserController,
  },
  {
    path: "post",
    controller: PostController,
  },
]);

// Start RangoJS and listen to port 3000
app.listen(3000);
