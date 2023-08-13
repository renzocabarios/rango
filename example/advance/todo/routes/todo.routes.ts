import todo from "../controllers/todo.controller";

export default {
  path: "todo",
  GET: todo.all,
  POST: todo.create,
  children: [
    {
      path: ":id",
      GET: todo.view,
      PUT: todo.update,
      DELETE: todo.remove,
    },
  ],
};
