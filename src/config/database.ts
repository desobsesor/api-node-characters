module.exports = {
  development: {
    username: "root",
    password: "",
    database: "new_schema_search",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "",
    database: "new_schema_search_test",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: "db_user",
    password: "db_password",
    database: "new_schema_search_prod",
    host: "production_db_host",
    dialect: "mysql",
  },
};
