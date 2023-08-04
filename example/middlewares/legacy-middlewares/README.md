# Legacy Middlewares

In RangoJS, we can use Express.js middlewares as legacy middlewares. These are the same good old middlewares you're used to in Express.js - they help us manage requests, enhance routes, and more. With RangoJS, you can easily hook 'em into your application, creating a smooth and seamless migration experience.

## How to Use Legacy Middlewares

Here's how we can wrangle them Express.js middlewares into RangoJS:

1. First, install any Express.js middleware using NPM: For this example we install `cors`

    ```sh
    npm install cors
    ```

2. Import the middleware you installed and mount it on RangoJS

    ```ts
    // Import RangoJS and http module
    import rango from "rango";
    import http from "http";

    // Import the Express.js `cors` middleware
    import cors from "cors";

    // Create an instance of the RangoJS app
    const app = rango();

    // Mounting Express.js `cors` middleware
    app.use(cors());

    app.add([
      // Your route configurations will be added here
    ]);

    // Start the server
    const port = 3000;
    http.createServer(app).listen(port, () => {
      console.log(`Server listening on port ${port}.`);
    });
    ```

And that's it, cowboy coder! You've successfully integrated Express.js middlewares as legacy middlewares in your RangoJS application. With RangoJS and Express.js middlewares, you've got yourself a powerful combo that'll keep your application riding smooth and your codebase well-organized.
