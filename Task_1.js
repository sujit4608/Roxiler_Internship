const express = require('express');
const Product = require('./models/product');  
const router = express.Router();
const axios = require('axios');


router.post('/seed-database', async (req, res) => {
    try {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const products = response.data;
  
      await Product.deleteMany({});
  
      await Product.insertMany(products);
  
      res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
      console.error('Error seeding database:', error);
      res.status(500).json({ message: 'Error seeding database' });
    }
  });
  
  const getMonthFromDate = (date) => {
    const month = new Date(date).getMonth() + 1; 
    return month;
  };
  
router.get('/products/:month', async (req, res) => {
    const month = parseInt(req.params.month); 
  
    if (month < 1 || month > 12) {
      return res.status(400).json({ message: 'Invalid month. Please provide a month between 1 and 12.' });
    }
  
    try {
      const products = await Product.find({});
      const filteredProducts = products.filter(product => getMonthFromDate(product.dateOfSale) === month);
  
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error('Error fetching products by month:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  });

  module.exports = router;