import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "new_schema_search",
  "root",
  "Asdf$123",
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
  },
);
