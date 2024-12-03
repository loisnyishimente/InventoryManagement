// controllers/productController.js
const Product = require('../models/product');

const getByCategory = (req, res) => {
  const { category } = req.params;

  Product.getByCategory(category)
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching products by category", error });
    });
};
const search = (req, res) => {
    const { name, category, sku } = req.query;
  
    Product.search({ name, category, sku })
      .then(products => {
        res.status(200).json(products);
      })
      .catch(error => {
        res.status(500).json({ message: "Error searching products", error });
      });
  };
  const checkExpiry = (req, res) => {
    Product.checkExpiry()
      .then(expiredProducts => {
        res.status(200).json(expiredProducts);
      })
      .catch(error => {
        res.status(500).json({ message: "Error fetching expired products", error });
      });
  };
  
module.exports = {
    checkExpiry,
    search,
  getByCategory,
};
