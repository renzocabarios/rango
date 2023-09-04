# RangoJS Controller Documentation

RangoJS is a versatile and lightweight JavaScript framework designed to simplify web application development. This documentation focuses on creating and using controllers in RangoJS, a fundamental part of structuring your application's logic and handling user interactions.

## Table of Contents

- [Introduction to Controllers](#introduction)
- [Creating a Controller](#creating-a-controller)
- [Controller Methods](#controller-methods)
- [Routing and Controllers](#routing-and-controllers)
- [Best Practices](#best-practices)

## Introduction

Controllers in RangoJS serve as the intermediaries between your application's models and views. They encapsulate the logic that handles user interactions and decides what data to present to the user. Each controller typically corresponds to a specific route or functionality within your application.

## Creating a Controller

To create a controller in RangoJS, follow these steps:

1. Create a New File: Start by creating a new JavaScript file for your controller (e.g., userController.js).

2. Define Your Controller: In your controller file, define your controller as a JavaScript class. For example:

```ts
// Import RangoJS `useController` method
import { useController } from "rango";

// Create an instance of a RangoJS Controller
const controller = useController();

// Export controller
export default controller;
```

3. Export Your Controller: Make sure to export your controller class so it can be used elsewhere in your application.

## Controller Methods

A controller's methods define the actions that can be performed within that controller. For example, a `UserController` might have methods like **listUsers**, **createUser**, **updateUser**, and **deleteUser**. These methods are responsible for handling HTTP requests, interacting with models, and rendering views.

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

### HEAD and OPTIONS Methods

The **HEAD** and **OPTIONS** HTTP methods are often used for metadata retrieval and request introspection, respectively. They are less common than `GET` or `POST` but serve crucial purposes in RESTful web services and API development.

- **HEAD** Method: This method is used to retrieve metadata about a resource, such as its headers or content length. Unlike `GET`, it doesn't return the resource's body, making it useful for checking resource availability and obtaining basic information without the data payload.

- **OPTIONS** Method: The OPTIONS method is used to determine which HTTP methods and headers are supported by a resource. It allows clients to query the server about the capabilities of a particular endpoint, helping developers understand how to interact with the resource effectively.

```ts
// HEAD method
controller.head(() => "UserController HEAD Route");

// OPTIONS method
controller.options(() => "UserController OPTIONS Route");
```

## Routing and Controllers

To use controllers in routing, you typically define routes in a separate routing file and associate them with specific controller methods. For example:

```ts
import rango from "rango";

// Import UsersController
import UsersController from "./controllers/users.controller";

app.add({
  path: "user",
  controller: UsersController,
});

// Start RangoJS and listen to port 3000
app.listen(3000);
```

## Best Practices

- Keep controllers focused and follow the Single Responsibility Principle.
- Use middleware to handle cross-cutting concerns like authentication and validation.
- Ensure your controllers remain stateless and do not rely on global variables.
- Organize your controllers into a clear directory structure, such as /controllers, to maintain code clarity.

With RangoJS controllers, you can structure your web application's logic efficiently, keeping it organized and maintainable. As your application grows, creating and using controllers will help you manage the complexity and improve the overall structure of your codebase.
