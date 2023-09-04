import { IAuth } from "../../interfaces/model";
import { auth } from "../../models";

async function getAll() {
  return await auth.find({ deleted: false });
}

async function create(body: IAuth) {
  return await auth.create(body);
}

async function getById(_id: string) {
  return await auth.findOne({ _id, deleted: false });
}

async function update(_id: string, body: IAuth) {
  return await auth.findByIdAndUpdate({ _id, deleted: false }, body);
}

async function deleteById(_id: string) {
  return await auth.findByIdAndUpdate(
    { _id, deleted: false },
    { deleted: true }
  );
}

export default { getAll, create, getById, update, deleteById };
