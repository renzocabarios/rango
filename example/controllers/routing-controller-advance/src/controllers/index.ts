import UserController from "./user.controller";
import PostController from "./user.controller";

export default [
  {
    path: "user",
    controller: UserController,
  },
  {
    path: "post",
    controller: PostController,
  },
];
