# RangoJS Basic Controller Routing Documentation

>Author: [Mack Ignacio](https://github.com/mackignacio)

RangoJS is a versatile JavaScript framework designed to simplify web application development. This documentation focuses on the basics of setting up controller routing in RangoJS, enabling you to define routes and connect them to controller methods effectively.

## Table of Contents

- [Introduction to Controller Routing](#introduction)
- [Creating Controller](#creating-controller)
- [Defining Routes](#defining-routes)
- [Routing with Controllers](#routing-with-controllers)
- [Best Practices](#best-practices)

## Introduction

Controller routing is a fundamental aspect of web application development. It involves mapping specific URLs (routes) to corresponding controller methods that handle HTTP requests. RangoJS simplifies this process by providing an organized way to structure your application's logic using controllers and routes.

## Creating Controller

To create a controller in RangoJS, follow these steps:

1. Create a New File: Start by creating a new TypeScript file for your controller (e.g., **`user.controller.ts`**).

2. Define Your Controller: In your controller file, define your controller using `useController`. For example:

    ```ts
    // user.controller.ts

    // Import RangoJS `useController` method
    import { useController } from "rango";

    // Create an instance of a RangoJS Controller
    const controller = useController();

    // Export controller
    export default controller;
    ```

3. Export Your Controller: Make sure to export your controller class so it can be used elsewhere in your application.

## Defining Routes

In RangoJS, you define routes using HTTP Methods same as Express.js framework, which RangoJS builds upon. A route maps a URL pattern to a specific controller method.

```ts
// List Users
controller.get(() => "UserController GET Route");

// Get User by id
controller.get(":id", ({ params }) => ({ message: `UserController GET Route`, params }));

// Create User
controller.post(() => "UserController POST Route");

// Update User
controller.put(() => "UserController PUT Route");

// Update specific User field
controller.patch(() => "UserController PATCH Route");

// Delete User
controller.delete(() => "UserController DELETE Route");
```

## Routing with Controllers

To connect routes to controller methods, import the controllers into your main application file and use the router's HTTP methods (e.g., get, post, put, delete) to define the routes.

## Best Practices

- Keep controllers focused and adhere to the `Single Responsibility` Principle.
- Use clear and meaningful route names and controller method names for better code readability.
- Document your routes and controller methods to ensure that your team understands the application's structure.

 With RangoJS, you can efficiently organize your web application's logic using controllers and routes. This approach promotes code reusability, maintainability, and scalability, making it easier to develop and maintain complex web applications.
