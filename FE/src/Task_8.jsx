import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/task_three/statistics?month=${selectedMonth}`
        );
        setStatistics({
          totalSaleAmount: response.data.totalSaleAmount,
          totalSoldItems: response.data.totalSoldItems,
          totalUnsoldItems: response.data.totalUnsoldItems,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="statistics-container card p-1">
      <h2>Transactions Statistics- Task 8   </h2>

      {/* Dropdown for month selection */}
      <div className="month-selector">
        <label>Select Month: </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Statistics boxes */}
      <div className="statistics-boxes">
        <div className="stat-box">
          <h3>Total Sale Amount</h3>
          <p>${statistics.totalSaleAmount}</p>
        </div>

        <div className="stat-box">
          <h3>Total Sold Items</h3>
          <p>{statistics.totalSoldItems} items</p>
        </div>

        <div className="stat-box">
          <h3>Total Unsold Items</h3>
          <p>{statistics.totalUnsoldItems} items</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsStatistics;
