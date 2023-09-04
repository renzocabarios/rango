import { useController } from "rango";

const controller = useController();

controller.get(() => "SampleController GET Route");

controller.get(":id", ({ params }) => ({ message: `SampleController GET Route`, params }));

controller.post(() => "SampleController POST Route");

controller.put(() => "SampleController PUT Route");

controller.patch(() => "SampleController PATCH Route");

controller.delete(() => "SampleController DELETE Route");

controller.head(() => "SampleController HEAD Route");

controller.options(() => "SampleController OPTIONS Route");

export default controller;
