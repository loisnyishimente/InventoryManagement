const Barcode = require('../models/barcode');
exports.generateProductQRCode = async (req, res) => {
  try {
    const { productId, productName } = req.body;

    if (!productId || !productName) {
      return res.status(400).json({ message: 'Product ID and name are required.' });
    }

    const data = `Product ID: ${productId}, Name: ${productName}`;
    const qrCodeUrl = await Barcode.generateQRCode(data);

    res.status(200).json({ qrCodeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
