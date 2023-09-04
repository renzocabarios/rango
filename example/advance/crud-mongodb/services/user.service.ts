import { IUser } from "../interfaces";
import { userModel } from "../models";

async function getAll() {
  return await userModel.find({ deleted: false });
}

async function getById(_id: string) {
  return await userModel.findOne({ _id, deleted: false });
}

async function create(body: IUser) {
  return await userModel.create(body);
}

async function update(_id: string, body: IUser) {
  return await userModel.findByIdAndUpdate({ _id, deleted: false }, body);
}

async function deleteById(_id: string) {
  return await userModel.findByIdAndUpdate({ _id, deleted: false }, { deleted: true });
}

export default { getAll, create, getById, update, deleteById };
