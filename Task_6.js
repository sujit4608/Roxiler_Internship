const express = require('express');
const Product = require('./models/product'); 
const router = express.Router();
const axios = require('axios');  

const getMonthRange = (month) => {
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  return { startDate, endDate };
};

router.get('/combined', async (req, res) => {
  try {
    const { month } = req.query; 

    if (!month) {
      return res.status(400).json({ message: 'Month is required in the format YYYY-MM' });
    }

    const [barChartData, pieChartData, statisticsData] = await Promise.all([
      axios.get(`http://localhost:3000/task_four/barchart?month=${month}`),
      axios.get(`http://localhost:3000/task_five/piechart?month=${month}`),
      axios.get(`http://localhost:3000/task_three/statistics?month=${month}`),
    ]);

    const combinedResponse = {
      barChart: barChartData.data,
      pieChart: pieChartData.data,
      statistics: statisticsData.data,
    };
    res.status(200).json(combinedResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching combined data', error: error.message });
  }
});

module.exports = router;
