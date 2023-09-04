import { useController } from "rango";

const userController = useController();

userController.get(() => "UserController GET Route");

userController.get(":id", ({ params }) => ({ message: `UserController GET Route`, params }));

userController.post(() => "UserController POST Route");

userController.put(":id", ({ params }) => ({ message: `UserController PUT Route`, params }));

userController.patch(":id", ({ params }) => ({ message: `UserController PATCH Route`, params }));

userController.delete(":id", ({ params }) => ({ message: `UserController DELETE Route`, params }));

userController.head(() => "UserController HEAD Route");

userController.options(() => "UserController OPTIONS Route");

export default userController;
