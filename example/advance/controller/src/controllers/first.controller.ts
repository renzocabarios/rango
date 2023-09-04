import { useController } from "rango";

const controller = useController();

controller.get(() => "FirstController GET Route");

controller.get(":id", ({ params }) => ({ message: `FirstController GET Route`, params }));

controller.post(() => "FirstController POST Route");

controller.put(() => "FirstController PUT Route");

controller.patch(() => "FirstController PATCH Route");

controller.delete(() => "FirstController DELETE Route");

controller.head(() => "FirstController HEAD Route");

controller.options(() => "FirstController OPTIONS Route");

export default controller;
