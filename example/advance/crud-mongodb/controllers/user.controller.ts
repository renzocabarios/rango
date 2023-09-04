import { Context, useController } from "rango";
import { users } from "../services";
import { IUser } from "../interfaces";

async function getAllUsers(context: Context): Promise<any> {
  try {
    const data = await users.getAll();
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function getUserById(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const data = await users.getById(id.toString());
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function createUser(context: Context): Promise<any> {
  try {
    const payload = context.body as IUser;
    const data = await users.create(payload);

    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function updateUser(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const payload = context.body as IUser;
    const data = await users.update(id.toString(), payload);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function deleteUserById(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const data = await users.deleteById(id.toString());
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

const userController = useController();

userController.get(getAllUsers);
userController.get(":id", getUserById);
userController.post(createUser);
userController.put(":id", updateUser);
userController.delete(deleteUserById);

export default userController;
