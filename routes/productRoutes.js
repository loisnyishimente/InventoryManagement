const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/search', productController.search);

router.get('/category/:category', productController.getByCategory);

router.get('/expired', productController.checkExpiry);

router.get('/', productController.getAllProducts);

module.exports = router;
