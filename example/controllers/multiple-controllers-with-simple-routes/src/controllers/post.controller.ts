import { useController } from "rango";

const postController = useController();

postController.get(() => "PostController GET Route");

postController.get(":id", ({ params }) => ({ message: `PostController GET Route`, params }));

postController.post(() => "PostController POST Route");

postController.put(":id", ({ params }) => ({ message: `PostController PUT Route`, params }));

postController.patch(":id", ({ params }) => ({ message: `PostController PATCH Route`, params }));

postController.delete(":id", ({ params }) => ({ message: `PostController DELETE Route`, params }));

postController.head(() => "PostController HEAD Route");

postController.options(() => "PostController OPTIONS Route");

export default postController;
