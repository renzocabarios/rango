# Lightweight Gunslinging Node.js API Library

<p align="center">
  <img width="100%" height="100%" src="https://github.com/mackignacio/rango/blob/main/rango_logo.png">
</p>

*The name "**Rango**" comes from the animated adventure comedy film released in 2011. The story follows a chameleon named Rango, voiced by the legendary actor Johnny Depp. However, it's worth noting that "Rango" is originally a Spanish word that means "range" or "to range." It seems that the movie title "Rango" is also the same in Tagalog and has been kept as is, possibly due to its original Spanish origin.*

## Introduction

> **"Ace Up, Ride the Code, Bullet Fast Your APIs" - The Wild West of Node.js!**

Welcome to the untamed frontier of wild wild web development with RangoJS, the all-new, gunslinging Node.js library that will revolutionize the way you create APIs. Just like a skilled gunslinger, RangoJS delivers precision, speed, and unmatched performance, making your API development journey a thrilling adventure.

Say goodbye to clunky frameworks and embrace the lightning-fast power of RangoJS. Our lightweight and agile library ensures that your APIs hit the target with bullet-fast response times, leaving your users amazed by the lightning-quick performance.

In the spirit of a sure aim, RangoJS provides you with an intuitive and developer-friendly interface that lets you effortlessly handle routes, middleware, and endpoints. With the confidence of a sharpshooter, you can craft APIs that are robust, scalable, and built to handle any challenge that comes your way.

Speaking of ace-high API development, RangoJS equips you with the tools to secure your applications like a fortress. Our battle-tested security measures and error handling capabilities ensure that your APIs stand strong against any threats that might lurk in the shadows.

## Features

- **Blazingly-Fast Performance**

  Built on top of Node.js and Typescript, RangoJS harnesses the full potential of asynchronous I/O operations to deliver unmatched speed and responsiveness, even under heavy loads.

- **Featherweight Footprint**

  RangoJS streamlined design guarantees minimal resource consumption, allowing you to create lean and efficient APIs without compromising on functionality.

- **Gunslinger-Friendly**

  Embrace the gunslinger way of coding with RangoJS's intuitive syntax approach and well-documented features, making API development a breeze for developers of all backgrounds.

- **In the Saddle Efficiency**

  We take pride in RangoJS's lightweight nature, ensuring minimal overhead and resource consumption, so your APIs can shoot to the top in terms of efficiency.

- **Trail-Wise Routing**

  Simplified route handling empowers developers to structure APIs effortlessly, making it a breeze to define endpoints, request types, and middleware functions.

- **Unyielding Reliability**

  Just like a seasoned gunslinger, RangoJS comes prepared. Built-in error handling and comprehensive testing tools guarantee your APIs stand tall with unwavering stability.

- **Showdown-Ready Extensibility**

  RangoJS embraces the spirit of adventure, providing a modular architecture that lets you customize and enhance functionalities with ease, whether you're drawing from third-party packages or crafting your own solutions.

- **Sharpshooting Community Support**

  At RangoJS, we ride together. Expect continuous updates, active community support, and a lively environment where gunslingers exchange ideas and celebrate triumphs.

Prepare to reload your coding skills and unleash the gunslinging fury of RangoJS. Whether you're an experienced trailblazer or a greenhorn eager to learn, our library invites you to forge powerful APIs with unmatched speed, developer-friendliness, and reliability.

Join us in the fast-paced showdown of API development as we ride into the future with RangoJS. Embrace the gunslinging spirit, and together, we'll paint the wild west of web development with unmatched success and innovation.

## Howdy, Let Start

Welcome to the RangoJS Getting Started Guide, where we'll help you wrangle your way through the wild world of RangoJS and become a true cowboy coder! Saddle up your code and get ready to ride like a seasoned trailblazer!

In this guide, we'll show you how to set up your RangoJS application, lasso those routes, and round up your data like a pro wrangler. So grab your hat, tighten them boots, and let's hit the trail with RangoJS! 🤠🚀

### Prerequisites

Listen up, code cowboy! Before you saddle up and ride the RangoJS trail, make sure you've got the essentials roped and ready on your local machine:

1. Your trusty steed, **Node.js**. You can download it from the official website [here](https://nodejs.org).

2. A sturdy sidekick **NPM** (Node Package Manager) comes bundled with Node.js. However, it's essential to have the latest version. To update npm, run the following command in your terminal:

    ```sh
    npm install -g npm
    ```

Once you've got these mighty tools, you're all set to wrangle RangoJS and conquer the digital frontier like a true code cowboy! Giddy-up and let's hit the trail!

### Setting up a New RangoJS Project

Let's begin by setting up a new RangoJS project. Follow these steps:

1. Create a new project directory:

    ```sh
    mkdir my-rangojs-app
    cd my-rangojs-app
    ```

2. Initialize a new Node.js project:

    ```sh
    npm init -y
    ```

3. Install RangoJS:

    ```sh
    npm install rango
    ```

4. Install Typescript:

    ```sh
    npm install typescript ts-node -D
    ```

5. Install Nodemon:

    ```sh
    npm install nodemon -D
    ```

### Creating a Basic RangoJS Server

Well, howdy, cowboy coder! Now that we've got RangoJS lassoed and ready, it's high time to build ourselves a sturdy corral for our code. So, saddle up and crack open that trusty ol' text editor or IDE of yours - the one that feels like an old friend.

With your cowboy hat on tight, let's wrangle some code and create a basic server that'll stand tall like a strong, dependable stallion. Get ready to ride the RangoJS wave and blaze the trail in this digital frontier! Happy ridin' and happy codin', cowboy!

1. Create a new file named **app.ts** in the project root directory.

2. In **app.ts**, add the following code:

    ```ts
    // Import the RangoJS and http module
    import rango from "rango";
    import http from "http";

    // Create an instance of the RangoJS app
    const app = rango();

    // Define a route for the home page
    app.add({
      path: "/",
      GET: () => {
        return "Hello, RangoJS!";
      }
    });

    // Start the server
    const port = 3000;
    http.createServer(app).listen(port, () => {
      console.log(`Server listening on port ${port}.`);
    });
    ```

## Starting the RangoJS Server

To kickstart that trusty server, just mosey on over to your terminal and wrangle up this command:

```sh
nodemon app.ts
```

Now that our trusty server's up and runnin', it's time to hitch our wagon to the trail and see what RangoJS has rustled up for us! Head on over to your web browser, and pay a visit to this link:

[http://localhost:3000](http://localhost:3000)

There, right before your very eyes, you'll find the message **"Hello, RangoJS!"** all shiny and gleamin' like the stars in the night sky. Ain't that somethin'? RangoJS sure knows how to make an impression!

So kick back, relax, and enjoy the ride with RangoJS as your trusty sidekick. Happy trails and happy codin', cowboy! 🌵🤠🚀

### Understanding the Code

Let's break down the code in **app.ts**:

We imported the RangoJS module using `import rango from 'rango'`.

We created an instance of the RangoJS app with `const app = rango()`.

We defined a route for the home page using

```ts
app.add({
  path: "",
  GET: () => {
    return "Hello, RangoJS!";
  },
})
```

When a user accesses the root URL (i.e., /), the provided callback function is executed, and the response **"Hello, RangoJS!"** is sent back. RangoJS automatically detects the returned data from the callback and assign the correct `content-type` in the header.

We started the server on `port 3000` using

```ts
const port = 3000;
http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
```

The server is now running and ready to handle incoming requests.

> You've successfully set up an RangoJS project, created a basic server, and sent a response to a user request. Now you can dive deeper into RangoJS and explore its powerful features to build robust and sophisticated web applications.
>
> Happy coding! 🚀

## Contributing

Join the pioneers of web development and set out on a wild west adventure with RangoJS. Get ready to experience bullet-fast performance, sure aim precision, and ace-high results like never before. It's time to strap on your coding holster and let RangoJS lead you to API greatness. Are you up for the challenge? Let's ride into the sunset of web development together with RangoJS!
