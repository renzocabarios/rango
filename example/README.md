# RangoJS Documentation

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup Project](#setup-project)
- [Getting Started](#getting-started)
- [Routing](#routing)
  - [Basic Routing](#basic-routing)
  - [Request and Response Handling](#request-and-response-handling)
  - [Multiple Routes](#multiple-routes)
  - [Single Route](#single-route)
  - [Child Routes](#child-routes)

Introduction
============

RangoJS is a powerful and flexible web framework for Node.js, designed to create web applications and APIs with ease. This documentation aims to provide examples and information about using RangoJS to build robust web applications.

Prerequisites
=============

To use RangoJS, make sure you have the following prerequisites installed on your system:

1. **`Node.js`** is a JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser. You can download and install Node.js from the [official website](https://nodejs.org).

    To verify that Node.js is installed, open a terminal or command prompt and type the following command:

    ```sh
    node -v
    ```

    It should display the installed Node.js version.

2. **`npm`** (Node Package Manager) is a package manager that comes bundled with Node.js and allows you to install and manage various packages and dependencies for your Node.js projects.

    To check if npm is installed, run the following command in your terminal:

    ```sh
    npm -v
    ```

    It will show the installed npm version.

Setup Project
=============

1. Create a new project directory:

    ```sh
    mkdir my-rangojs-app
    cd my-rangojs-app
    ```

2. Initialize a new Node.js project:

    ```sh
    npm init -y
    ```

3. Install Typescript and Nodemon:

    ```sh
    npm install typescript ts-node nodemon -D
    ```

Getting Started
===============

Before diving into examples and middlewares, make sure you have RangoJS installed in your project:

```sh
npm install rango
```

To create a simple RangoJS application, create a new file (e.g., **`app.ts`**) and require the RangoJS module:

```ts
const rango = require("rango");
const app = rango();
const port = 3000;

app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/getting-started/README.md)

Routing
===============

RangoJS provides a simple and flexible routing mechanism through its app object. The most common HTTP methods used for routing are GET, POST, PUT, DELETE, etc. Each of these methods is used to define routes for different types of HTTP requests.

## Basic Routing

Define basic routes and route handlers to handle incoming requests:

```ts
app.add({
    path: "",
    GET: () => {
        return "Hello, RangoJS!";
    }
});
```

## Request and Response Handling

Discover how to access **`request`** and **`response`** objects and handle different types of requests:

```ts
app.add([
  {
    path: "",
    GET: ({ req, res }) => {
      return "'Hello, RangoJS!'";
    },
  }
]);
```

## Multiple Routes

Learn how to handle multiple routes with different paths:

```ts
app.add([
  {
    path: "home",
    GET: () => {
      return "Welcome Home to the RangoJS!";
    },
  },
  {
    path: "about",
    GET: () => {
      return "About Us: Learn more about our library.";
    },
  },
  {
    path: "contact",
    GET: () => {
      return "Contact Us: Reach out to us for any issues/questions.";
    },
  }
]);
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/multiple-routes/README.md)

## Single Route

Understand how to define a single route with multiple HTTP methods:

```ts
app.add({
    path: "users",
    GET: () => {
      // Logic to handle GET request for '/users'
      return "This is a GET request!";
    },
    POST: () => {
      // Logic to handle POST request for '/users'
      return "This is a POST request!";
    },
    PUT: () => {
      // Logic to handle PUT request for '/users'
      return "This is a PUT request!";
    },
    PATCH: () => {
      // Logic to handle PATCH request for '/users'
      return "This is a PATCH request!";
    },
    DELETE: () => {
      // Logic to handle DELETE request for '/users'
      return "This is a DELETE request!";
    }
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/single-route/README.md)

## Child Routes

Learn how to implement child routes for better route organization:

```ts
app.add({
    path: "parent",
    // You can put single route methods here
    // i.e. "GET","POST","DELETE","OPTIONS","PUT","PATCH"
    children: [
        {
            path: "child",
            // You can put single route methods here
            // i.e. "GET","POST","DELETE","OPTIONS","PUT","PATCH"
        }
    ]
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/child-routes/README.md)

