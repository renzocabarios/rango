import { Router } from "rango/lib/app";
import users from "./users";
import auth from "./auth";

const routes = [users, auth];

const addRoutes = (app: Router) => {
  routes.forEach((route: any) => {
    app.use(route);
  });
};

export default addRoutes;
