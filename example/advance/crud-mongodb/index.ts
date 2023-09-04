import rango from "rango";
import connect from "./db";
import { Router } from "rango/lib/app";
import env from "./env";
import { userController } from "./controllers";

connect();

const app: Router = rango();

app.add([
  {
    path: "user",
    controller: userController,
  },
]);

app.listen(env.PORT);
