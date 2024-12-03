// models/product.js
const db = require('../config/db');  // Ensure the database connection is imported

const Product = {
  // Method to add a new product
  add: (product) => {
    const sql = 'INSERT INTO products (name, sku, category, supplier, quantity, price, batch, expiry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [
        product.name, 
        product.sku, 
        product.category, 
        product.supplier, 
        product.quantity, 
        product.price, 
        product.batch, 
        product.expiry_date
      ], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Method to fetch all products
  getAll: () => {
    const sql = 'SELECT * FROM products';
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Method to get products by category
  getByCategory: (category) => {
    const sql = 'SELECT * FROM products WHERE category = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [category], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Method to search products by name, category, or SKU
  search: (query) => {
    let sql = 'SELECT * FROM products WHERE 1=1';
    if (query.name) {
      sql += ` AND name LIKE '%${query.name}%'`;
    }
    if (query.category) {
      sql += ` AND category LIKE '%${query.category}%'`;
    }
    if (query.sku) {
      sql += ` AND sku = '${query.sku}'`;
    }
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Method to check for expired products
  checkExpiry: () => {
    const sql = 'SELECT * FROM products WHERE expiry_date < NOW()';
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Product;
