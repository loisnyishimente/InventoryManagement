const { validationResult } = require('express-validator');

exports.addProduct = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation error:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, SKU, category, supplier, price, quantity } = req.body;

        // You can add database logic here to save the product
        console.log(`Adding product: ${name}, ${SKU}, ${category}`);

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
