const express = require('express');
const Product = require('./models/product');  
const router = express.Router();

const getMonthRange = (month) => {
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  return { startDate, endDate };
};

router.get('/piechart', async (req, res) => {
  try {
    const { month } = req.query;  

    if (!month) {
      return res.status(400).json({ message: 'Month is required in the format YYYY-MM' });
    }

    const { startDate, endDate } = getMonthRange(month);

    const pieChartData = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 } 
        }
      }
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
});

module.exports = router;
