const Report = require('../models/report');

exports.getSalesReport = async (req, res) => {
  try {
    const { interval } = req.query; 
    if (!["daily", "weekly", "monthly"].includes(interval)) {
      return res.status(400).json({ error: "Invalid interval specified." });
    }
    const report = await Report.getSalesReport(interval);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate sales report." });
  }
};
exports.getStockMovementReport = async (req, res) => {
  try {
    const report = await Report.getStockMovementReport();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate stock movement report." });
  }
};
