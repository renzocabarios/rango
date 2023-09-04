import mongoose from "mongoose";
import { MODEL } from "../../constants";

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model(MODEL.USERS, schema);
