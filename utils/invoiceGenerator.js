const PDFDocument = require('pdfkit');

const InvoiceGenerator = {
  generate: (saleDetails) => {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.text(`Customer: ${saleDetails[0].customer_name}`);
      doc.text(`Transaction Date: ${saleDetails[0].transaction_date}`);
      doc.text(`Invoice ID: ${saleDetails[0].id}`);
      doc.text('\nItems:');
      saleDetails.forEach(item => {
        doc.text(`${item.product_name} - Quantity: ${item.quantity}, Price: ${item.price}`);
      });
      doc.text(`\nTotal Amount: ${saleDetails[0].total_amount}`);
      doc.end();
    });
  }
};

module.exports = InvoiceGenerator;
