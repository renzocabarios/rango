# RangoJS with MongoDB using MVC Pattern

>Author: [Arjay Tuñacao](https://github.com/Uchihabeats)

This project demonstrates the creation of a simple **TODO API**. It allows you to manage tasks, mark them as completed, and delete them.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/mackignacio/rango.git
   cd example/advance/todo
   ```

2. Install dependencies

    ```sh
    npm install
    ```

## Usage

1. Run the server:

    ```sh
    npm start
    ```

    The server will start on port `3000` by default. You can configure the port in the **app.ts** file.

2. Open your preferred API testing tool (such as `Postman` or `Insomnia`).
3. Use the provided API endpoints to interact with the TODO API.

## API Endpoints

- `GET` **/todo** : Get a list of all **TODO** tasks.
- `GET` **/todo/:id** : Get details of a specific **TODO** task.
- `POST` **/todo** : Create a new **TODO** task.
- `PUT` **/todo/:id** : Update an existing **TODO** task.
- `DELETE` **/todo/:id** : Delete a **TODO** task.

For more detailed information on `request` and `response` formats, refer to the API documentation in the [api-docs](https://github.com/mackignacio/rango/tree/main/example#request-and-response-handling) folder.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request. Please ensure to follow the code of conduct and maintain a clean commit history.
