const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


module.exports = sequelize;
