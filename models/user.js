const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("user", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM("Admin", "Manager", "Employee"), 
    defaultValue: "Employee",
  },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
