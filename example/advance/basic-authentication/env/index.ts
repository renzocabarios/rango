import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "";
const PORT = Number(process.env.PORT) || 3000;
const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;

export { MONGODB_URI, PORT, BCRYPT_SALT };
