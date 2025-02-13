const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory_db", "root", "password123", {
  host: "127.0.0.1",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

module.exports = sequelize;
