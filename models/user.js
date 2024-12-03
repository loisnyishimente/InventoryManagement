// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import the sequelize instance from db.js
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Staff',  // Default to 'Staff' role
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
      }
 
  }, {
    tableName: 'user',  
  });
  
  module.exports = User;
  

