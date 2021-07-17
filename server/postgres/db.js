const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

db.authenticate()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
