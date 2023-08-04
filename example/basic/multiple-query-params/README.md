# Multiple Query Params

You can use multiple Query Params in a single route by adding them to the URL query string.

```ts
app.add({
  path: "search",
  GET: (context) => {
    const searchTerm = context.query.q || 'No search term';
    const sortBy = context.query.sort || 'date';
    return `Searching for "${searchTerm}" sorted by "${sortBy}"`;
  },
});
```

In this example, we've used two Query Params: `q` for the search term and sort to specify the sorting order. With this nifty feature, you can pass data to your server in a flexible and convenient way.
