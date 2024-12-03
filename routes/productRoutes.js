// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for getting products by category
router.get('/search', productController.search);
router.get('/category/:category', productController.getByCategory);
router.get('/expired', productController.checkExpiry);
module.exports = router;
