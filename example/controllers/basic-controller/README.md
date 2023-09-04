# RangoJS Basic Controller

>Author: [Mack Ignacio](https://github.com/mackignacio)

RangoJS is a versatile and lightweight JavaScript framework designed to simplify web application development. This documentation focuses on creating and using controllers in RangoJS, a fundamental part of structuring your application's logic and handling user interactions.

## Table of Contents

- [Introduction to Controllers](#introduction)
- [Creating a Controller](#creating-a-controller)
- [Controller Methods](#controller-methods)
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

Here's a brief overview of the common HTTP methods and their purposes:

### **GET**

Retrieve data from the server.

```ts
controller.get(() => "UserController List Users Route");

controller.get(":id", ({ params }) => ({ message: `UserController Get User By ID Route`, params }));
```

### **POST**

Send data to the server to create a new resource.

```ts
controller.post(() => "UserController Create Users Route");
```

### **PUT**

Update an existing resource on the server.

```ts
controller.put("/:id", () => "UserController Update User Route");
```

### **PATCH**

Update an existing resource on the server.

```ts
controller.patch("/:id", () => "UserController Update User Route");
```

### **DELETE**

Remove a resource from the server.

```ts
controller.delete("/:id", () => "UserController Delete User Route");
```

HTTP methods, also known as HTTP verbs, define the actions that can be performed on a resource. They play a crucial role in web applications, allowing clients (e.g., browsers or API consumers) to interact with server resources. Common HTTP methods include `GET`, `POST`, `PUT`, `DELETE`, `HEAD`, and `OPTIONS`.

Controller methods define the actions that can be performed on a resource. They handle the incoming HTTP requests, interact with models, execute business logic, and send responses back to clients.

In RangoJS, you can define routes that map to specific controller methods. The routing mechanism determines which controller method should handle a particular HTTP request based on the request's URL and HTTP method.

### Defining multiple controller methods example

```ts
// List Users
controller.get(() => "UserController GET Route");

// Get User by id
controller.get(":id", ({ params }) => ({ message: `UserController GET Route`, params }));

// Create User
controller.post(() => "UserController POST Route");

// Update User
controller.put("/:id", () => "UserController PUT Route");

// Update specific User field
controller.patch("/:id", () => "UserController PATCH Route");

// Delete User
controller.delete("/:id", () => "UserController DELETE Route");
```

The **HEAD** and **OPTIONS** HTTP methods are often used for metadata retrieval and request introspection, respectively. They are less common than `GET` or `POST` but serve crucial purposes in RESTful web services and API development.

- **HEAD** Method: This method is used to retrieve metadata about a resource, such as its headers or content length. Unlike `GET`, it doesn't return the resource's body, making it useful for checking resource availability and obtaining basic information without the data payload.

- **OPTIONS** Method: The OPTIONS method is used to determine which HTTP methods and headers are supported by a resource. It allows clients to query the server about the capabilities of a particular endpoint, helping developers understand how to interact with the resource effectively.

```ts
// HEAD method
controller.head(() => "UserController HEAD Route");

// OPTIONS method
controller.options(() => "UserController OPTIONS Route");
```

## Best Practices

- Use HTTP methods that adhere to the RESTful principles for predictable and clear resource manipulation.
- Keep controller methods focused on a single responsibility.
- Use middleware to handle cross-cutting concerns, ensuring code reusability and maintainability.
- Implement proper error handling and status codes in your responses for effective client communication.
- Document your routes and controller methods for better project understanding.

With RangoJS controllers, you can create structured and maintainable web applications that handle a wide range of HTTP methods efficiently. By following best practices and understanding how to use HTTP methods effectively, you can develop robust and scalable web applications with ease.
