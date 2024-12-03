const db = require('../config/db');

const Report = {
  getSalesReport: (interval) => {
    const intervalMapping = {
      daily: "DATE(order_date)",
      weekly: "YEARWEEK(order_date)",
      monthly: "MONTH(order_date), YEAR(order_date)"
    };
    const sql = `
      SELECT ${intervalMapping[interval]} AS period, SUM(total_amount) AS total_sales
      FROM sales
      GROUP BY period
      ORDER BY period DESC;
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  getStockMovementReport: () => {
    const sql = `
      SELECT p.name, m.type, m.quantity, m.date, m.source
      FROM stock_movements m
      JOIN products p ON m.product_id = p.id
      ORDER BY m.date DESC;
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Report;
