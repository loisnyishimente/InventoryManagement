const express = require('express');

const Inventory = require('../models/inventory');
const { check } = require('express-validator');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();
const express = require('express');
const inventoryController = require('../controllers/inventoryController');

router.post('/add', inventoryController.addInventory);



router.get('/get', async (req, res) => {
    try {
        const products = await Inventory.findAll();  
        res.status(200).json({ products });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

module.exports = router;


router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, SKU, category, supplier, quantity, price } = req.body;

    try {
        const product = await Inventory.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.SKU = SKU || product.SKU;
        product.category = category || product.category;
        product.supplier = supplier || product.supplier;
        product.quantity = quantity || product.quantity;
        product.price = price || product.price;

        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Inventory.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});

router.get('/stock-alerts', async (req, res) => {
    try {
        const lowStockProducts = await Product.findAll({
            where: {
                quantity: { [Op.lt]: 10 } 
            }
        });
        if (lowStockProducts.length === 0) {
            return res.status(200).json({ message: 'All products have sufficient stock' });
        }
        res.status(200).json({ message: 'Low stock products found', lowStockProducts });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching low stock products', error: err.message });
    }
});

module.exports = router;
