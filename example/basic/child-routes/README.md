# Configuring Child Routes

In RangoJS, child routes refer to routes that are nested or mounted within another route. This allows you to organize your routes in a hierarchical manner, making your codebase more modular and maintainable. In this section, we'll explore how to create and use child routes in an RangoJS application.

Now, let's create child routes within an existing route. To do this, we'll use the **children** key to define the child routes in our parent `routeObject`.

In **app.ts**, update the `app.add` function and add the following code:

```ts
app.add([

    // Existing routes ....

  {
    path: "parent",
    GET: () => {
      // Logic to handle GET request for '/parent'
      return "This is a GET request  for '/parent'!";
    },
    POST: () => {
      // Logic to handle POST request for '/parent'
      return "This is a POST request  for '/parent'!";
    },
    PUT: () => {
      // Logic to handle PUT request for '/parent'
      return "This is a PUT request  for '/parent'!";
    },
    PATCH: () => {
      // Logic to handle PATCH request for '/parent'
      return "This is a PATCH request  for '/parent'!";
    },
    DELETE: () => {
      // Logic to handle DELETE request for '/parent'
      return "This is a DELETE request  for '/parent'!";
    },
    children: [
      {
        path: "child",
        GET: () => {
          // Logic to handle GET request for '/parent/child'
          return "This is a GET request for '/parent/child'!";
        },
        POST: () => {
          // Logic to handle POST request for '/parent/child'
          return "This is a POST request for '/parent/child'!";
        },
        PUT: () => {
          // Logic to handle PUT request for '/parent/child'
          return "This is a PUT request for '/parent/child'!";
        },
        PATCH: () => {
          // Logic to handle PATCH request for '/parent/child'
          return "This is a PATCH request for '/parent/child'!";
        },
        DELETE: () => {
          // Logic to handle DELETE request for '/parent/child'
          return "This is a DELETE request for '/parent/child'!";
        },
      }
    ]
  }
])
```

You see, in Express.js, when we want to create child routes, we gotta use the `express.Router()` method to wrangle them together. Once we've got them rounded up, we then mount those child routes to a parent route using the `app.use()` method. It's like making a fancy corral for each route, just to keep them all organized and separated.

But RangoJS, now that's a different breed altogether! With RangoJS, we ain't building corral after corral. Nope! RangoJS brings all the routes right into one place, like bringing the whole herd together. That means we manage both the parent route and the child routes, all in a single file. Ain't that something?

This approach in RangoJS makes the codebase incredibly easy to wrangle and scale. No more riding all over the codebase trying to find the right file for each route. Nope, we got them all right there in one place, making it easier to maintain.
