import { auth } from "../../controllers";
import { PATH } from "../../constants";

export default {
  path: PATH.AUTH,
  GET: auth.getAll,
  POST: auth.create,
  children: [
    {
      path: ":id",
      GET: auth.getById,
      PUT: auth.update,
      DELETE: auth.deleteById,
    },
    {
      path: "login",
      POST: auth.login,
    },
  ],
};
