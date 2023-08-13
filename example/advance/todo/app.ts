import rango from "rango";
import TodoRoute from "./routes/todo.routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = rango();
const dbUri = process.env.MONGODB_URI || "";
const dbOptions = {};

mongoose
  .connect(dbUri, dbOptions)
  .then(() => console.log("Database connected!"))
  .catch((err: any) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.add(TodoRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
