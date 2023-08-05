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
- [Middlewares](#middlewares)
  - [Global Middlewares](#global-middlewares)
  - [Custom Middlewares](#custom-middlewares)
  - [Route Specific Middlewares](#route-specific-middlewares)
  - [Method Specific Middlewares](#method-specific-middlewares)
  - [Error Handling Middlewares](#error-handling-middlewares)
  - [Legacy Middlewares](#legacy-middlewares)

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

Middlewares
===========

Middleware are functions that have access to the [`context`](#context) objects in the application's request-response cycle. They can perform tasks such as parsing request data, logging, authentication, and more. Middleware can be used globally for all routes or specific to certain routes and methods.

## Global Middlewares

Learn about the global middlewares that can used with RangoJS, such as **`body-parser`** , **`cookie-parser`** and **`cors`**:

```ts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/middlewares/global-middlewares/README.md)

## Custom Middlewares

Understand how to create and apply custom middlewares to perform specific tasks:

```ts
// Create custom middleware function
const customMiddleware = (context: Context, next: NextFunction) => {
  console.log("Custom middleware executed!");
  // Proceed to next middleware or route handler
  next();
};

// Mount custom middleware
app.use(customMiddleware);
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/middlewares/custom-middlewares/README.md)

## Route-Specific Middlewares

Learn how to apply middlewares to specific routes:

```ts
// Create Route-Specific middleware function
const usersMiddleware = (context: Context, next: NextFunction) => {
  console.log(`This middleware is executed for all '/users' routes`);
  // Proceed to the next middleware or route handler
  next();
};

app.add({
  path: "users",
  middlewares: [usersMiddleware],
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/middlewares/route-specific-middlewares/README.md)

## Method-Specific Middlewares

Understand how to apply middlewares to specific HTTP methods of a route:

```ts
// Create Method-Specific middleware function
const usersGetMiddleware = (context: Context, next: NextFunction) => {
  console.log(`This middleware is executed for GET '/users' route`);
  // Proceed to the next middleware or route handler
  next();
};

app.add({
  path: "users",
  GET: {
    callback: () => {
        // Logic to handle GET request for '/users'
        return "This is a GET request!";
    },
    middlewares: [usersGetMiddleware],
  }
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/middlewares/method-specific-middlewares/README.md)

## Error Handling Middlewares

Discover how to implement error handling middleware to handle errors gracefully:

```ts
const errorHandler = ({ error, res }: Context, next: NextFunction) => {
  if (error) {
    // Respond with a generic error message
    return res.status(500).send(`Something went wrong!`);
  }

  // Proceed to next middleware or route handler if there are no errors
  next();
};

app.use(errorHandler);
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/middlewares/error-handling-middlewares/README.md)

## Legacy Middlewares

Discover how to Express.js middlewares as legacy middlewares:

```ts
// Create 'Express' middleware
const legacyMiddleware = (req, res, next) => {
  console.log(`This is a 'Express' legacy middleware`);
  next();
};

//  Mount 'Express' legacy middleware
app.use(legacyMiddleware);
```

Implement legacy error handling middleware:

```ts
// Create 'Express' error middleware
const legacyErrorMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    // Perform authentication logic
    next();
  } else {
    res.status(401).send(`Unauthorized`);
  }
};

// Mount 'Express' legacy error middleware
app.use(legacyErrorMiddleware);
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/middlewares/legacy-middlewares/README.md)

