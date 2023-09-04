import { Context } from "rango";
import { auth, users } from "../../services";
import { IAuth } from "../../interfaces/model";
import { ILoginUser } from "../../interfaces/dto";
import bcrypt from "bcrypt";

async function login(context: Context): Promise<any> {
  try {
    const payload = context.body as ILoginUser;
    const user = await users.getByEmail(payload.email);

    if (!user) {
      return context.res.json({ data: [], status: "fail" });
    }
    if (!(await bcrypt.compare(payload.password, user.password))) {
      return context.res.json({ data: [], status: "fail" });
    }
    return context.res.json({ data: [], status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function getAll(context: Context): Promise<any> {
  try {
    const data = await auth.getAll();
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function getById(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const data = await auth.getById(id.toString());
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function create(context: Context): Promise<any> {
  try {
    const payload = context.body as IAuth;
    const data = await auth.create(payload);

    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function update(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const payload = context.body as IAuth;
    const data = await auth.update(id.toString(), payload);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function deleteById(context: Context): Promise<any> {
  try {
    const { id } = context.params;
    const data = await auth.deleteById(id.toString());
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

export default { login, getAll, getById, create, update, deleteById };
