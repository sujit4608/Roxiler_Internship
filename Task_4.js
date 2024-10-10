const express = require('express');
const Product = require('./models/product');  
const router = express.Router();

const getMonthRange = (month) => {
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  return { startDate, endDate };
};

router.get('/barchart', async (req, res) => {
  try {
    const { month } = req.query; 

    if (!month) {
      return res.status(400).json({ message: 'Month is required in the format YYYY-MM' });
    }

    const { startDate, endDate } = getMonthRange(month);

    const barChartData = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate } 
        }
      },
      {
        $bucket: {
          groupBy: "$price",  
          boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901, Infinity], 
          default: "901-above",  
          output: {
            count: { $sum: 1 } 
          }
        }
      }
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
});

module.exports = router;
