import dotenv from "dotenv";
dotenv.config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "",
  PORT: Number(process.env.PORT) || 3000,
};
