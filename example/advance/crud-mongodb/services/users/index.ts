import { IUser } from "../../interfaces/model";
import { users } from "../../models";

async function getAll() {
  return await users.find({ deleted: false });
}

async function getById(_id: string) {
  return await users.findOne({ _id, deleted: false });
}

async function create(body: IUser) {
  return await users.create(body);
}

async function update(_id: string, body: IUser) {
  return await users.findByIdAndUpdate({ _id, deleted: false }, body);
}

async function deleteById(_id: string) {
  return await users.findByIdAndUpdate({ _id, deleted: false }, { deleted: true });
}

export default { getAll, create, getById, update, deleteById };
