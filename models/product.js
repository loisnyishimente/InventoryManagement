const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");
const Warehouse = require("./warehouse");

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  SKU: { type: DataTypes.STRING, allowNull: false, unique: true },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  price: { type: DataTypes.FLOAT, allowNull: false },
  barcode: { type: DataTypes.STRING },
});

Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Warehouse, { foreignKey: "warehouse_id" });

module.exports = Product;
