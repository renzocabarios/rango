import { Context } from "rango";
import { users, auth } from "../../services";
import { IAuth, IUser } from "../../interfaces/model";
import { ICreateUser } from "../../interfaces/dto";
import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../../env";

async function getAll(context: Context): Promise<any> {
  try {
    const data = await users.getAll();
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function getById(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const data = await users.getById(id.toString());
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function create(context: Context): Promise<any> {
  try {
    const { password, ...res } = context.body as ICreateUser;
    const hashed = await bcrypt.hashSync(password, BCRYPT_SALT);

    const user = res as IUser;
    const data = await users.create(user);

    const authObject = {
      password: hashed,
      email: res.email,
      user: data._id,
    } as IAuth;

    await auth.create(authObject);

    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function update(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const payload = context.body as IUser;
    const data = await users.update(id.toString(), payload);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function deleteById(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const data = await users.deleteById(id.toString());
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

export default { getAll, getById, create, update, deleteById };
