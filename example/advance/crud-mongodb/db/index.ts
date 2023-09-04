import mongoose, { ConnectOptions } from "mongoose";
import { MONGODB_URI } from "../env";

const options: ConnectOptions = { useNewUrlParser: true };

const connect = () => {
  mongoose
    .connect(MONGODB_URI, options)
    .then(() => console.log("Database connected!"))
    .catch((err: any) => console.log(err));
};

export default connect;
