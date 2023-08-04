# Configuring Multiple Routes

Now that we have the RangoJS project structure in place, let's configure multiple routes. In this example, we will create three routes: home, about, and contact.

In **app.ts**, update the `app.add` function and replace it with the following code:

```ts
app.add([
  {
    path: "home",
    GET: () => {
      return "Welcome to the RangoJS!";
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
])
```

By updating the `app.add` to handle an array of `routeObject`, you can now efficiently process multiple routes in one function call. This modification enhances the function's versatility, allowing it to adapt to different routing scenarios.
