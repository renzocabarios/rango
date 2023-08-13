import { Todo } from "../interfaces/todo.interface";
import TodoModel from "../models/todo.model";

async function getAllTodos() {
  return await TodoModel.find();
}
async function createTodo(todo: Todo) {
  return await TodoModel.create(todo);
}
async function getTodoById(id: string) {
  return await TodoModel.findById(id);
}
async function updateTodo(id: string, todo: Todo) {
  return await TodoModel.findByIdAndUpdate(id, todo);
}
async function deleteTodo(id: string) {
  return await TodoModel.findByIdAndDelete(id);
}

export default { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo };
