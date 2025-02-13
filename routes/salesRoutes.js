const express = require('express');
const router = express.Router();
const InvoiceGenerator = require('../utils/invoiceGenerator');


const db = require('../config/db');

router.post('/', async (req, res) => {
  const { customerName, product, quantity, price } = req.body;

  if (!customerName || !product || !quantity || !price) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO sales (customerName, product, quantity, price) VALUES (?, ?, ?, ?)',
      [customerName, product, quantity, price]
    );

    res.status(201).json({ message: 'Sale recorded successfully!', saleId: result.insertId });
  } catch (error) {
    console.error('Error inserting sale:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;


router.get('/history/:customer_name', async (req, res) => {
  try {
    const history = await Sale.getPurchaseHistory(req.params.customer_name);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate invoice
router.get('/invoice/:saleId', async (req, res) => {
  try {
    const saleDetails = await Sale.getInvoiceDetails(req.params.saleId);
    const invoice = await InvoiceGenerator.generate(saleDetails);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
