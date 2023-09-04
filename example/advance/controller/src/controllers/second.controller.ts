import { useController } from "rango";

const controller = useController();

controller.get(() => "SecondController GET Route");

controller.get(":id", ({ params }) => ({ message: `SecondController GET Route`, params }));

controller.post(() => "SecondController POST Route");

controller.put(() => "SecondController PUT Route");

controller.patch(() => "SecondController PATCH Route");

controller.delete(() => "SecondController DELETE Route");

controller.head(() => "SecondController HEAD Route");

controller.options(() => "SecondController OPTIONS Route");

export default controller;
