# Define a Single Route with Multiple HTTP Methods

Now, let's create a single route that supports multiple HTTP methods (**GET**, **POST**, **PUT**, **DELETE**, and **DELETE**). We'll handle each method differently based on the action we want to perform using a `callback` function. We call these callback function route `endpoints`.

In **app.ts**, update the `app.add` function and add the following code:

```ts
app.add([

    // Existing routes ....

  {
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
    },
  }
])
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/single-route/README.md)

In this example, we use a common name for each `HTTP Methods` (**GET**, **POST**, **PUT**, **PATCH**, and **DELETE**) as function to handle all the supported HTTP methods. This makes your application more flexible and efficient, as it can perform different actions based on the HTTP method used and managing it in one place.

## Why this Approach in Routing

In Express.js, there are two ways to define routes to handle HTTP requests: using individual route methods (**app.get**, **app.post**, etc.) or using a single route method (**app.all**) to handle multiple HTTP methods. Let's compare the two approaches and discuss their use cases:

### Individual Route Methods (app.get, app.post, etc.)

With individual route methods, you define separate route handlers for each specific HTTP method:

```ts
// Using individual route methods
app.get('/users', (req, res) => {
  // Logic to handle GET request for '/users'
  res.send('GET request for /users');
});

app.post('/users', (req, res) => {
  // Logic to handle POST request for '/users'
  res.send('POST request for /users');
});

app.put('/users', (req, res) => {
  // Logic to handle PUT request for '/users'
  res.send('PUT request for /users');
});

app.patch('/users', (req, res) => {
  // Logic to handle PATCH request for '/users'
  res.send('PATCH request for /users');
});

app.delete('/users', (req, res) => {
  // Logic to handle DELETE request for '/users'
  res.send('DELETE request for /users');
});
```

> [See the full code here.](https://github.com/mackignacio/rango/blob/main/example/basic/child-routes/README.md)

### Single Route Method (app.all)

With the single route method approach, you use **app.all** to define a route that handles all HTTP methods:

```ts
// Using a single route method
const handleUsersRequest = (req, res) => {
  switch (req.method) {
    case 'GET':
      // Logic to handle GET request for '/users'
      res.send('GET request for /users');
      break;
    case 'POST':
      // Logic to handle POST request for '/users'
      res.send('POST request for /users');
      break;
    case 'PUT':
      // Logic to handle PUT request for '/users'
      res.send('PUT request for /users');
      break;
    case 'PATCH':
      // Logic to handle PATCH request for '/users'
      res.send('PATCH request for /users');
      break;
    case 'DELETE':
      // Logic to handle DELETE request for '/users'
      res.send('DELETE request for /users');
      break;
    default:
      res.status(405).send('Method not allowed!');
  }
};

app.all('/users', handleUsersRequest);
```

## Which Approach to Choose?

The choice between individual route methods and the single route method approach depends on the complexity and organization of your application.

Use **Individual Route Methods** when you have different actions and significant logic for each HTTP method and want the code to be more explicit.

Use the **Single Route Method** when you have shared logic between multiple HTTP methods and want a more concise and DRY codebase.

By combining the Individual Route Methods approach and the Single Route Method approach in one. RangoJS can provide a balanced and flexible approach to handling HTTP requests. By using both approaches strategically, you can take advantage of their respective strengths and address their limitations.

## Pros of Combining both Approaches in RangoJS

- **Explicitness**: Each HTTP method has its dedicated route handler, making the code easier to read and understand.

- **Granular Control**: You can handle different HTTP methods differently, which is useful when the actions vary significantly for each method.

- **No Code Duplication**: If you have shared logic between different methods, you don't need to duplicate the code across multiple route handlers, leading to  DRY (Don't Repeat Yourself) code.

- **Decreased Number of Route Handlers**: For complex applications with many routes and methods, the number of individual route handlers can grow significantly, making the codebase larger and harder to manage. Managing each route handler in a single `routeObject` makes it easier.

- **Code Reusability**: With this approach, you can centralize the shared logic for multiple HTTP methods within a single route object.

- **Conciseness**: The codebase can be more concise with fewer route handlers, especially when handling similar actions for different HTTP methods.

Overall, combining the Individual Route Methods approach and the Single Route Method approach allows you to create a well-structured and maintainable application. By choosing the appropriate approach for each route based on the complexity and similarity of actions, you can achieve a codebase that is both expressive and efficient.

> **Code Cowboy Advice**
>
> Listen up, buckaroo! In this wild frontier of code, remember that keepin' your code maintainable and easy on the eyes is as important as water in the desert. Strive to strike that perfect harmony between makin' your code crystal clear and wranglin' it to be reusable, all while keepin' in mind the unique needs and demands of your blazinfly-fast application. So saddle up, partner, and ride steady on that fine line 'cause in this coding rodeo, balancin' is the name of the game!
