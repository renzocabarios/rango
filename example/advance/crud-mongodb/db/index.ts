import mongoose, { ConnectOptions } from "mongoose";
import env from "../env";

const options: ConnectOptions = { useNewUrlParser: true };

const connect = () => {
  mongoose
    .connect(env.MONGODB_URI, options)
    .then(() => console.log("Database connected!"))
    .catch((err: any) => console.log(err));
};

export default connect;
