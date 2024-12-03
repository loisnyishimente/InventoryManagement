const db = require('../config/db');

const Sale = {

  recordSale: (saleData, saleItems) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO sales (customer_name, transaction_date, total_amount, invoice_id) 
                   VALUES (?, NOW(), ?, ?)`;
      db.query(sql, [saleData.customer_name, saleData.total_amount, saleData.invoice_id], (err, results) => {
        if (err) return reject(err);

        const saleId = results.insertId;
        const itemsSql = `INSERT INTO sales_items (sale_id, product_id, quantity, price) VALUES ?`;
        const items = saleItems.map(item => [saleId, item.product_id, item.quantity, item.price]);

        db.query(itemsSql, [items], (err) => {
          if (err) return reject(err);
          resolve({ saleId, invoice_id: saleData.invoice_id });
        });
      });
    });
  },

 
  getPurchaseHistory: (customerName) => {
    const sql = `SELECT s.id, s.transaction_date, s.total_amount, si.product_id, si.quantity, si.price 
                 FROM sales s
                 JOIN sales_items si ON s.id = si.sale_id
                 WHERE s.customer_name = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [customerName], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  getInvoiceDetails: (saleId) => {
    const sql = `SELECT s.id, s.customer_name, s.transaction_date, s.total_amount, 
                        si.product_id, si.quantity, si.price, p.name AS product_name
                 FROM sales s
                 JOIN sales_items si ON s.id = si.sale_id
                 JOIN products p ON si.product_id = p.id
                 WHERE s.id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [saleId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Sale;
