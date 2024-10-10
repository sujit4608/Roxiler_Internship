// transactions.js
const express = require('express');
const Product = require('./models/product');  // Make sure the path is correct
const router = express.Router();

router.get('/getTransaction', async (req, res) => {
  try {
    const { page = 1, perPage = 10, search } = req.query;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { productName: { $regex: search, $options: 'i' } },  
          { price: search } 
        ]
      };
    }

    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    const transactions = await Product.find(filter).skip(skip).limit(limit);
    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({
      data: transactions,
      pagination: {
        totalRecords: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page),
        perPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

module.exports = router;
