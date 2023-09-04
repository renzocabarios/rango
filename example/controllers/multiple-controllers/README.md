# RangoJS Multiple Controllers Documentation

>Author: [Mack Ignacio](https://github.com/mackignacio)

RangoJS is a versatile JavaScript framework designed to simplify web application development. This documentation focuses on defining and using multiple controllers in RangoJS, enabling you to organize your application's logic more effectively.

## Table of Contents

- [Introduction to Multiple Controllers](#introduction)
- [Creating Multiple Controllers](#creating-multiple-controllers)
- [Routing with Multiple Controllers](#routing-with-multiple-controllers)
- [Best Practices](#best-practices)

## Introduction

In a web application, especially as it grows in complexity, it's essential to organize your code into manageable pieces. Controllers in RangoJS serve as the intermediaries between your application's models and views, and having multiple controllers allows you to separate different parts of your application's logic, making it more maintainable and scalable.

## Creating Multiple Controllers

To create and structure multiple controllers in RangoJS, follow these steps:

1. **Create Controller Files**: Start by creating `TypeScript` files for each of your controllers, following a clear naming convention. For example, you can have `user.controller.ts`, `post.controller.ts`, and so on.

2. **Define Controllers**: In each controller file, define your controllers as JavaScript classes. Each class should encapsulate the logic related to a specific part of your application.

    ```ts
    // user.controller.ts

    import { useController } from "rango";

    const userController = useController();

    export default userController;
    ```

    ```ts
    // post.controller.ts

    import { useController } from "rango";

    const postController = useController();

    export default postController;
    ```

3. **Export Controllers**: Ensure that you export each controller class so they can be imported and used in other parts of your application.

## Routing with Multiple Controllers

RangoJS allows you to define routes in a central routing file and associate them with specific controller methods. Here's how you can do it:

```ts
import rango from "rango";

// Import UserController
import UserController from "./controllers/user.controller";

// Import PostController
import PostController from "./controllers/post.controller";

const app = rango();

// Add multiple controllers
app.add([
  {
    path: "user",
    controller: UserController,
  },
  {
    path: "post",
    controller: PostController,
  },
]);

// Start RangoJS and listen to port 3000
app.listen(3000);
```

## Best Practices

- Organize controllers logically, keeping related actions and functionality together.
- Use clear and meaningful names for both your controller files and methods.
- Document your controllers and their methods for better project understanding.
- Consider using a directory structure (e.g., /controllers) to organize your controller files as your application grows.

With multiple controllers in RangoJS, you can efficiently structure and manage your application's logic, keeping your codebase organized and maintainable. This approach allows for easier collaboration among team members and ensures that your web application can scale gracefully as it grows.
