import { useController } from "rango";

const userController = useController();

userController.get(() => "UserController GET Route");

userController.get(":id", ({ params }) => ({ message: `UserController GET Route`, params }));

userController.post(() => "UserController POST Route");

userController.put(":id", () => "UserController PUT Route");

userController.patch(":id", () => "UserController PATCH Route");

userController.delete(":id", () => "UserController DELETE Route");

userController.head(() => "UserController HEAD Route");

userController.options(() => "UserController OPTIONS Route");

export default userController;
