const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const reportRoutes = require('./routes/reportRoutes');
const barcodeRoutes = require('./routes/barcodeRoutes');
const sequelize = require('./config/db');
const { Sequelize } = require('sequelize');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/barcode', barcodeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', inventoryRoutes); 
app.use('/api/reports', reportRoutes);
app.use('api/sales', salesRoutes);
sequelize.sync({ force: true }).then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch((err) => {
    console.error('Error syncing the database:', err);
});
