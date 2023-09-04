import dotenv from "dotenv";
dotenv.config();
const MYSQL_URI = process.env.MONGODB_URI || "postgres://root:@localhost:3306/test";
const PORT = Number(process.env.PORT) || 3000;

export { MYSQL_URI, PORT };
