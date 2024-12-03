const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');
const { check, validationResult } = require('express-validator');

// Add New Product
router.post('/add', [
    check('name').notEmpty().withMessage('Name is required'),
    check('SKU').notEmpty().withMessage('SKU is required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('supplier').notEmpty().withMessage('Supplier is required'),
    check('price').isDecimal().withMessage('Price must be a valid number'),
    check('quantity').isInt().withMessage('Quantity must be an integer')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, SKU, category, supplier, quantity, price } = req.body;
        const product = await Inventory.create({ name, SKU, category, supplier, quantity, price });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err.message });
    }
});

// Update Product
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

// Delete Product
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

// Stock Alerts
router.get('/stock-alerts', async (req, res) => {
    try {
        const lowStockProducts = await Product.findAll({
            where: {
                quantity: { [Op.lt]: 10 } // Change threshold as needed
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
