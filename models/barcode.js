const QRCode = require('qrcode');

const Barcode = {
  generateQRCode: (data) => {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(data, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }
};

module.exports = Barcode;
