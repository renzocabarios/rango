import { useController } from "rango";

const controller = useController();

controller.get(() => "AppController GET Route");

controller.get(":id", ({ params }) => ({ message: `AppController GET Route`, params }));

controller.post(() => "AppController POST Route");

controller.put(() => "AppController PUT Route");

controller.patch(() => "AppController PATCH Route");

controller.delete(() => "AppController DELETE Route");

controller.head(() => "AppController HEAD Route");

controller.options(() => "AppController OPTIONS Route");

export default controller;
