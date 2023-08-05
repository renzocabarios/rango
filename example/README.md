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
- [Request Parameters](#request-parameters)
  - [Path Params](#path-params)
  - [Multiple Path Params](#multiple-path-params)
  - [Query Params](#query-params)
  - [Multiple Query Params](#multiple-query-params)
- [Logging](#logging)
  - [Built-in Logger](#built-in-logger)
  - [Custom Logger](#built-in-logger)
  - [Logging Levels](#logging-levels)
  - [Custom Logging Logic](#custom-logging-logic)
  - [External Loggers](#external-loggers)
- [API References](#api-references)
  - [Application](#application)
    - [app.add](#app-add)
    - [app.use](#app-use)
    - [app.listen](#app-listen)
    - [app.logger](#app-logger)
  - [Context](#context)
    - [context.req](#context-request)
    - [context.res](#context-response)
    - [context.query](#context-query)
    - [context.params](#context-params)
    - [context.body](#context-body)
    - [context.file](#context-file)
    - [context.method](#context-method)
    - [context.headers](#context-headers)
    - [context.path](#context-path)
    - [context.setStatus](#context-set-status)
  - [Next Function](#next-function)
  - [Request](#request)
    - [req.body](#request-body)
    - [req.file](#request-file)
    - [req.query](#request-query)
    - [req.params](#request-params)
    - [req.method](#request-method)
    - [req.headers](#request-headers)
    - [req.path](#request-path)
  - [Response](#response)
    - [res.send](#response-send)
    - [res.json](#response-json)
    - [res.html](#response-html)
    - [res.contentLength](#response-content-length)
  - [Route](#route)
    - [path](#path)
    - [GET](#get)
    - [POST](#post)
    - [PUT](#put)
    - [PATCH](#patch)
    - [DELETE](#delete)
    - [children](#route-children)
    - [middlewares](#route-middlewares)

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

app.listen(3000, () => {
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

Request Parameters
==============

Request parameters refer to the data sent by the client as part of an HTTP request. These parameters can be included in the URL path, known as `path params`, or in the query string of the URL, known as `query params`.

## Path Params

Path parameters are variables within the URL path itself. They are denoted by a colon followed by the parameter name. For example, in the route **'/users/:id',** `:id` is a path parameter. When a request is made to a route with a path parameter, Express extracts the value from the URL and makes it available in the req.params object.

```ts
app.add({
  path: "users/:id",
  GET: (context) => {
    const userId = context.params.id;
    return `Hello, user with ID: ${userId}`;
  },
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/path-params/README.md)

## Multiple Path Params

Discover how to handle multiple path parameters in a single route:

```ts
app.add({
  path: "users/:id/posts/:postsId",
  GET: (context) => {
    const userId = context.params.id;
    const postId = context.params.postId;
    return `User ${userId} posted with ID: ${postId}`;
  },
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/multiple-path-params/README.md)

## Query Params

Query parameters are additional key-value pairs appended to the URL after a question mark **`'?'`**. They are used to pass data to the server in the form of URL parameters. Express automatically parses the query parameters and makes them available in the req.query object.

```ts
// Sample request to '/users?name=cowboy'
app.add({
  path: "users",
  GET: (context) => {
    const userId = context.query.name || "stranger";
    return `Howdy, Cowboy coder ${name}!`;
  },
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/query-params/README.md)

## Multiple Query Params

Learn how to handle multiple query parameters in a single request:

```ts
// Sample request to '/search?q=rangojs&sort=features'
app.add({
  path: "search",
  GET: (context) => {
    const searchTerm = context.query.q || 'No search term';
    const sortBy = context.query.sort || 'date';
    return `Searching for "${searchTerm}" sorted by "${sortBy}"`;
  },
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/multiple-query-params/README.md)

Logging
=======

Logging is a vital aspect of any web application, providing valuable insights into its behavior and helping developers monitor its performance and troubleshoot issues. This documentation focuses on logging in RangoJS, covering both the built-in logger and how to create and implement custom loggers.

## Built-in Logger

RangoJS comes with a built-in logger that allows you to record and analyze application events. This section explores the built-in logger's capabilities and how to utilize it effectively.

```ts
app.logger(true);
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/logger/README.md)

## Logging Levels

Understand the different logging levels provided by the built-in logger and their significance:

- trace
- debug
- info
- warn
- error
- fatal

## Custom Logger

In certain scenarios, you may require a customized logging solution tailored to your application's specific needs. This section guides you on creating and implementing a custom logger in RangoJS.

Learn how to set up and register a custom logger in your RangoJS application:

```ts
// Create custom logger callback
const customLogger = (context: Context, next: NextFunction) => {
  console.log("This is a logging function");
  next();
};

// Mount custom logger to modify default logger
app.logger(customLogger);
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/logger/README.md)

## Custom Logging Logic

Understand how to implement custom logging logic to handle specific events and messages:

```ts
// custom-logging.js
const customLogger = {
  trace: (message) => {
    // Custom trace logging logic
  },
  debug: (message) => {
    // Custom debug logging logic
  },
  // Implement other log levels as needed
};

export default customLogger;
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/logger/README.md)

## External Loggers

Discover how to integrate external logging libraries (e.g., Winston, Bunyan) as custom loggers in your RangoJS application:

```ts
const winston = require('winston');
const winstonLogger = winston.createLogger(/* Configure Winston Logger */);

app.logger(winstonLogger);
```

API References
==============

This is a concise yet comprehensive guide for RangoJS's API. These API references will equip you with the tools needed to craft robust and efficient web applications.

## Application

**`Description`**: The primary application object representing the RangoJS application.

**`Methods`**:

### App Add

Add a `routeObject` to the list of existing route.

**Options**

- `routeObject`
  - An object with type of [`Route`](#route).

  ```ts
  app.add({ /* route object */ })
  ```

- `routeObject[]`
  - An array of `routeObject`.

  ```ts
  app.add([
      { /* route object */ }
  ])
  ```

**Options**

### App Use

Set the incoming callback function as a global middleware.

**Options**

- `callback`
  - Callback function must be a type of [`Middleware`](#route-middlewares).

  ```ts
  app.use(cors())
  app.use(customMiddleware)
  app.use(legacyMiddleware)
  ```

Start the server and listen to incoming request.

**Options**

- `port`
  - Set the port number for the server to listen
- `callback` : *OPTIONAL*
  - A callback function that will be executed once the server starts

### App Logger

Enable the built-in logger for the application.

```ts
app.logger()
app.logger(true) /* or */ app.logger(false)
app.logger(customLogger)
```

**Options**

- `default`
  - Set to `false`
- `Boolean`
  - When set to `true`, logging will be **enabled**
  - When set to `false`, logging will be **disabled**
  - `default` is **disabled**
- `Function`
  - Set the logger with the custom function. The function must be a custom `Middleware`.

> [See detailed example here.](https://github.com/mackignacio/rango/blob/main/example/basic/logger/README.md)

## Context

**`Description`**: The context object representing the execution context of a route handler.

**`Methods`**:

### Context Request

- The request object associated with the context.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const req = context.req;

        // Use destructuring
        const { req } = context.req
    }
    ```

### Context Response

- The response object associated with the context.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const res = context.res;

        // Use destructuring
        const { res } = context.res
    }
    ```

### Context Query

- Object containing the query parameters of the request.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const query = context.query;

        // Use destructuring
        const { query } = context.query
    }
    ```

### Context Params

- Object containing the path parameters of the route.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const params = context.params;

        // Use destructuring
        const { params } = context.params
    }
    ```

### Context Body

- A chunk of incoming data.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const body = context.body;

        // Use destructuring
        const { body } = context.body
    }
    ```

### Context File

- A chunk of incoming file data.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const file = context.file;

        // Use destructuring
        const { file } = context.file
    }
    ```

### Context Method

- A string that denotes the HTTP method.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const method = context.method;

        // Use destructuring
        const { method } = context.method
    }
    ```

### Context Headers

- A list of headers from client request.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const headers = context.headers;

        // Use destructuring
        const { headers } = context.headers
    }
    ```

### Context Path

- The path of current route.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const path = context.path;

        // Use destructuring
        const { path } = context.path
    }
    ```

### Context Set Status

- Set the status of the response object.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const setStatus = context.setStatus;

        // Use destructuring
        const { setStatus } = context.setStatus
    }
    ```

## Next Function

**`Description`**: This function is used in middleware and route handlers to pass control to the next middleware/route handler in the stack.

```ts
function middleware(context, next){
    // Proceed to the next middleware/handler on the stack
    next();
}
```

## Request

**`Description`**: The request object representing the HTTP request received from the client.

### Request Body

- Same as [`context.body`](#context-body). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const body = context.req.body;

        // Use destructuring to 'context.req'
        const { body } = context.req;
    }
    ```

### Request File

- Same as [`context.file`](#context-file). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const file = context.req.file;

        // Use destructuring to 'context.req'
        const { file } = context.req;
    }
    ```

### Request Headers

- Same as [`context.headers`](#context-headers). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const headers = context.req.headers;

        // Use destructuring to 'context.req'
        const { headers } = context.req;
    }
    ```

### Request Method

- Same as [`context.method`](#context-method). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const method = context.req.method;

        // Use destructuring to 'context.req'
        const { method } = context.req;
    }
    ```

### Request Params

- Same as [`context.params`](#context-params). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const params = context.req.params;

        // Use destructuring to 'context.req'
        const { params } = context.req;
    }
    ```

### Request Path

- Same as [`context.path`](#context-path). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const path = context.req.path;

        // Use destructuring to 'context.req'
        const { path } = context.req;
    }
    ```

### Request Query

- Same as [`context.query`](#context-query). Only added for legacy middlewares.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const query = context.req.query;

        // Use destructuring to 'context.req'
        const { query } = context.req;
    }
    ```

## Response

**`Description`**: The response object representing the HTTP response to be sent back to the client.

### Response Send

- Send a `plain text`, `json` or `html` response to the client with the correct content type based on the `return` value of the route handler.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        context.res.send("Sending a response to the client!");

        // Use destructuring to 'context'
        const { res } = context;
        res.send("Sending a response to the client!");
    }
    ```

### Response Json

- Send `json` response to the client with the `Content-Type` of `application/json`.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        context.res.json("Sending a JSON response to the client!");

        // Use destructuring to 'context'
        const { res } = context;
        res.json("Sending a JSON response to the client!");
    }
    ```

### Response HTML

- Send `text` response to the client with the `Content-Type` of `text/html`.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        context.res.html("<h1> Hello, RangoJS! </h1>");

        // Use destructuring to 'context'
        const { res } = context;
        res.html("<h1> Hello, RangoJS! </h1>");
    }
    ```

### Response Content Length

- Calculate the length of the content send back to the client.

    ```ts
    function middleware(context){
        // Get value directly using 'context' object
        const contentLength =   context.res.contentLength;

        // Use destructuring to 'context'
        const { contentLength } = context.res;
    }
    ```

## Route

**`Description`**: The Route object represents a specific route defined in RangoJS.

 ```ts
{
  path: string;
  children?: Routes;
  middlewares?: Middlewares;
  GET: (context: Context) => Promise<any> | any;
  POST: (context: Context) => Promise<any> | any;
  PUT: (context: Context) => Promise<any> | any;
  PATCH: (context: Context) => Promise<any> | any;
  DELETE: (context: Context) => Promise<any> | any;
}
```

### Path

- The URL pattern associated with the route.

    ```ts
    {
        path: ""
    }
    ```

### Route Children

- An array of route associated with the route.

    ```ts
    {
        children: [/* route objects */]
    }
    ```

### Route Middlewares

- An array of middleware associated with the route.

    ```ts
    {
        middlewares: [/* route specific middlewares */]
    }
    ```

### GET

- `Function`
  - A route handler function that only executed for HTTP `GET` Method.

    ```ts
    GET: (context: Context) => {
        // Logic to handle GET request
    }
    ```

- `Object`
  - `callback` : A route handler function that only executed for HTTP `GET` Method.
  - `middleware` : An array of middleware associated with this HTTP `GET` Method.

    ```ts
    GET: {
        callback: () => {

        },
        middlewares: [ /* method specific middleware */]
    }
    ```

### POST

- `Function`
  - A route handler function that only executed for HTTP `POST` Method.

    ```ts
    POST: (context: Context) => {
        // Logic to handle POST request
    }
    ```

- `Object`
  - `callback` : A route handler function that only executed for HTTP `POST` Method.
  - `middleware` : An array of middleware associated with this HTTP `POST` Method.

    ```ts
    POST: {
        callback: () => {

        },
        middlewares: [ /* method specific middleware */]
    }
    ```

### PUT

- `Function`
  - A route handler function that only executed for HTTP `PUT` Method.

    ```ts
    PUT: (context: Context) => {
        // Logic to handle PUT request
    }
    ```

- `Object`
  - `callback` : A route handler function that only executed for HTTP `PUT` Method.
  - `middleware` : An array of middleware associated with this HTTP `PUT` Method.

    ```ts
    PUT: {
        callback: () => {

        },
        middlewares: [ /* method specific middleware */]
    }
    ```

### PATCH

- `Function`
  - A route handler function that only executed for HTTP `PATCH` Method.

    ```ts
    PATCH: (context: Context) => {
        // Logic to handle PATCH request
    }
    ```

- `Object`
  - `callback` : A route handler function that only executed for HTTP `PATCH` Method.
  - `middleware` : An array of middleware associated with this HTTP `PATCH` Method.

    ```ts
    PATCH: {
        callback: () => {

        },
        middlewares: [ /* method specific middleware */]
    }
    ```

### DELETE

- `Function`
  - A route handler function that only executed for HTTP `DELETE` Method.

    ```ts
    DELETE: (context: Context) => {
        // Logic to handle DELETE request
    }
    ```

- `Object`
  - `callback` : A route handler function that only executed for HTTP `DELETE` Method.
  - `middleware` : An array of middleware associated with this HTTP `DELETE` Method.

    ```ts
    DELETE: {
        callback: () => {

        },
        middlewares: [ /* method specific middleware */]
    }
    ```
