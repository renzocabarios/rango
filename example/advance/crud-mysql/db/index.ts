import { Sequelize } from "sequelize";
import { MYSQL_URI } from "../env";
export const sequelize = new Sequelize(MYSQL_URI);

const connect = () => {
  sequelize
    .authenticate()
    .then((_) => {
      console.log("Connection has been established successfully.");
    })
    .catch((_) => {
      console.error("Unable to connect to the database:", _);
    });
};

export default connect;
