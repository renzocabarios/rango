import { Context } from "rango";
import todoService from "../services/todo.service";
import { Todo } from "../interfaces/todo.interface";

async function all(context: Context): Promise<any> {
  try {
    const data = await todoService.getAllTodos();
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function view(context: Context): Promise<any> {
  try {
    const userId = context.params.id;
    const data = await todoService.getTodoById(userId);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function create(context: Context): Promise<any> {
  try {
    const payload = context.body as Todo;
    const data = await todoService.createTodo(payload);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function update(context: Context): Promise<any> {
  try {
    const userId = context.params.id;
    const payload = context.body as Todo;
    const data = await todoService.updateTodo(userId, payload);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

async function remove(context: Context): Promise<any> {
  try {
    const userId = context.params.id;
    const data = await todoService.deleteTodo(userId);
    return context.res.json({ data: data, status: "success" });
  } catch (err: any) {
    return context.res.status(500).json({ error: err.message });
  }
}

export default { all, view, create, update, remove };
