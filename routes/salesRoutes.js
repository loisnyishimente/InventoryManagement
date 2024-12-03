const express = require('express');
const router = express.Router();
const Sale = require('../models/sales');
const InvoiceGenerator = require('../utils/invoiceGenerator');

// Record a new sale
router.post('/add', async (req, res) => {
  try {
    const { customer_name, total_amount, invoice_id, items } = req.body;
    const saleData = { customer_name, total_amount, invoice_id };
    const result = await Sale.recordSale(saleData, items);
    res.status(201).json({ message: 'Sale recorded successfully', saleId: result.saleId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get purchase history for a customer
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
