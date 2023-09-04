# RangoJS MongoDB Routing Documentation

RangoJS is a versatile JavaScript framework designed to simplify web application development. This documentation focuses on using MongoDB for routing in RangoJS, enabling you to create web applications that interact with a MongoDB database effectively.

## Table of Contents

- [Introduction to MongoDB Routing](#introduction)
- [Setting Up MongoDB](#setting-up)
- [Defining Routes with MongoDB](#defining-routes)
- [Using MongoDB Models](#models)
- [Routing with MongoDB](#routing)
- [Best Practices](#best-practices)

## Introduction

MongoDB is a popular NoSQL database that works well with RangoJS for web applications. MongoDB routing in RangoJS enables you to interact with a MongoDB database while handling HTTP requests and responses seamlessly.

## Setting Up

Before using MongoDB with RangoJS, ensure you have MongoDB installed and running. You can install MongoDB locally or use a cloud-hosted solution like MongoDB Atlas. Configure your application to connect to your MongoDB instance using a library like Mongoose.

```ts
import mongoose, { ConnectOptions } from "mongoose";
import { MONGODB_URI } from "../env";

const options: ConnectOptions = { useNewUrlParser: true };

// Connect to MongoDB
const connect = () => {
  mongoose
    .connect(MONGODB_URI, options)
    .then(() => console.log("Database connected!"))
    .catch((err: any) => console.log(err));
};
```

## Defining Routes

Define routes in RangoJS using HTTP Methods sames as Express.js framework, which RangoJS builds upon. These routes map URL patterns to specific controller methods.

```ts
const userController = useController();

// List Users
userController.get(getAllUsers);

// Get User by id
userController.get(":id", getUserById);

// Create User
userController.post(createUser);

// Update User
userController.put(":id", updateUser);

// Delete User
userController.delete(":id", deleteUserById);
```

## Models

In RangoJS, you can define MongoDB models using Mongoose. Models define the structure of your data and provide an interface to interact with MongoDB collections.

```ts
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    // User Model property
});

export default mongoose.model("User", schema);

```

## Routing

To integrate MongoDB with RangoJS routing, use your MongoDB models within your controller methods. Here's an example of how to retrieve users from a MongoDB database and send them as a JSON response:

```ts
// Add a single controller route
app.add({
  path: "user",
  controller: UserController,
});
```

## Best Practices

- Organize your MongoDB models and controllers logically, adhering to the Single Responsibility Principle.
- Use clear and meaningful names for your model files, controller files, and methods to enhance code readability.
- Document your MongoDB models, controllers, and their methods thoroughly for better project understanding.
- Implement error handling to gracefully handle database errors and provide meaningful error responses to clients.

With MongoDB routing in RangoJS, you can efficiently create web applications that interact with a MongoDB database. This approach allows you to build dynamic and data-driven web applications with ease.
