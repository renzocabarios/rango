# RangoJS Advanced Controller Routing Documentation

>Author: [Mack Ignacio](https://github.com/mackignacio)

RangoJS is a versatile TypeScript framework designed to simplify web application development. This documentation focuses on using advanced multiple controllers with simple routing in RangoJS, enabling you to organize and manage complex application logic effectively.

## Table of Contents

- [Introduction to Advanced Multiple Controllers](#introduction)
- [Creating Multiple Controllers](#creating-multiple-controllers)
- [Defining Simple Routes](#defining-simple-routes)
- [Centralized Routes](#centralized-routes)
- [Advanced Routing](#advanced-routing)
- [Best Practices](#best-practices)

## Introduction

As web applications become more complex, organizing code into multiple controllers becomes essential. RangoJS supports advanced multiple controllers to handle various parts of your application's logic effectively. This approach enhances maintainability and scalability.

## Creating Multiple Controllers

To create and structure multiple controllers in RangoJS, follow these steps:

1. **Create Controller Files**: Start by creating `TypeScript` files for each of your controllers, following a clear naming convention. For example, you can have `user.controller.ts`, `post.controller.ts`, and so on.

2. **Define Controllers**: In each controller file, define your controllers as TypeScript classes. Each class should encapsulate the logic related to a specific part of your application.

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

## Defining Simple Routes

In RangoJS, you define routes using HTTP Methods same as Express.js framework, which RangoJS builds upon. A route maps a URL pattern to a specific controller method.

```ts
// Add single route
app.add({
  path: "/single",
  GET: () => "Single GET Route",
  POST: () => "Single POST Route",
  PUT: () => "Single PUT Route",
  PATCH: () => "Single PATCH Route",
  DELETE: () => "Single DELETE Route",
  HEAD: () => "Single HEAD Route",
  OPTIONS: () => "Single OPTIONS Route",
});

// Add another route in an array
app.add([
  {
    path: "another",
    GET: () => "Another GET Route",
    POST: () => "Another POST Route",
    PUT: () => "Another PUT Route",
    PATCH: () => "Another PATCH Route",
    DELETE: () => "Another DELETE Route",
    HEAD: () => "Another HEAD Route",
    OPTIONS: () => "Another OPTIONS Route",
  },
]);
```

## Centralized Routes

RangoJS allows you to define routes in a central routing file and associate them with specific controller methods. Here's how to do it:

1. Create a Routing File: Establish a separate TypeScript file for your routes, like `index.ts`. Import your advanced controllers and define routes in this file.

```ts
import UserController from "./user.controller";
import PostController from "./user.controller";

export default [
  {
    path: "user",
    controller: UserController,
  },
  {
    path: "post",
    controller: PostController,
  },
];
```

## Advanced Routing

RangoJS allows you to define routes in a central routing file and associate them with specific controller methods. Here's how you can do it:

```ts
import rango from "rango";
import controllers from "./controllers";

const app = rango();

// Add controllers
app.add({
  path: "v1",
  children: controllers,
});

// Add single route
app.add({
  path: "/single",
  GET: () => "Single GET Route",
  POST: () => "Single POST Route",
  PUT: () => "Single PUT Route",
  PATCH: () => "Single PATCH Route",
  DELETE: () => "Single DELETE Route",
  HEAD: () => "Single HEAD Route",
  OPTIONS: () => "Single OPTIONS Route",
});

// Add another route in an array
app.add([
  {
    path: "another",
    GET: () => "Another GET Route",
    POST: () => "Another POST Route",
    PUT: () => "Another PUT Route",
    PATCH: () => "Another PATCH Route",
    DELETE: () => "Another DELETE Route",
    HEAD: () => "Another HEAD Route",
    OPTIONS: () => "Another OPTIONS Route",
  },
]);

// Start RangoJS and listen to port 3000
app.listen(3000);
```

## Best Practices

- Organize advanced controllers logically, adhering to the Single Responsibility Principle.
- Use clear and meaningful names for your controller files and methods to enhance code readability.
- Document your advanced controllers and their methods thoroughly for better project understanding.
- Consider employing a directory structure (e.g., /controllers) to organize your advanced controller files.

With advanced multiple controllers and simple routing in RangoJS, you can efficiently structure and manage your application's complex logic. This approach encourages code reusability, maintainability, and scalability, enabling you to develop and maintain sophisticated web applications with ease.
