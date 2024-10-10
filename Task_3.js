// transactions.js
const express = require('express');
const Product = require('./models/product'); 
const router = express.Router();

const getMonthRange = (month) => {
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);  
  return { startDate, endDate };
};

router.get('/statistics', async (req, res) => {
  try {
    const { month } = req.query; 

    if (!month) {
      return res.status(400).json({ message: 'Month is required in the format YYYY-MM' });
    }

    const { startDate, endDate } = getMonthRange(month);

    const statistics = await Product.aggregate([
      {
        $facet: {
          totalSales: [
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } }, 
            { $group: { _id: null, totalAmount: { $sum: "$price" }, totalSold: { $sum: 1 } } }
          ],
          notSold: [
            { $match: { dateOfSale: { $exists: false } } },
            { $count: "totalNotSold" }
          ]
        }
      }
    ]);

    const totalSales = statistics[0].totalSales[0] || { totalAmount: 0, totalSold: 0 };
    const notSold = statistics[0].notSold[0] ? statistics[0].notSold[0].totalNotSold : 0;

    res.status(200).json({
      totalSaleAmount: totalSales.totalAmount,
      totalSoldItems: totalSales.totalSold,
      totalNotSoldItems: notSold
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
});

module.exports = router;
