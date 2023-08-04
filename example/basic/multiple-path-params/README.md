# Multiple Path Params

You can use multiple Path Params in a single route by defining them in the URL path.

```ts
// Add route with path params of 'id' and 'postId' in a single path
app.add({
  path: "users/:id/posts/:postId",
  GET: (context) => {
    const userId = context.params.id;
    const postId = req.params.postId;
    return `User ${userId} posted with ID: ${postId}`;
  },
});

// Add route with path params of 'id' in parent path
app.add({
  path: "users/:id"
  children: [
    {
      // Add path params 'postId' in child path
      path: "posts/:postId",
      GET: (context) => {
        const userId = context.params.id;
        const postId = req.params.postId;
        return `User ${userId} posted with ID: ${postId}`;
      }
    }
  ],
});

// Add route with nested children and path params
app.add({
  path: "users"
  children: [
    {
      // Add path params 'id'
      path: "/:id",
      children: [
        {
          // Add path for 'users/:id/posts'
          path: "posts",
          children: [
            {
              // Add path params 'postId' in child path
              path: ":postId",
              GET: (context) => {
                const userId = context.params.id;
                const postId = context.params.postId;
                return `User ${userId} posted with ID: ${postId}`;
              }
            }
          ]
        }
      ],
    }
  ],
});
```

In this example, we've defined two Path Params: `id` and `postId`. They will be accessible inside the route callback using `context.params.id` and `context.params.postId`, respectively.

With this powerful feature of Path Params, you can create dynamic and flexible routes to handle various scenarios in your web applications.
