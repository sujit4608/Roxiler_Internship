import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('03'); // Default to March
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ];

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/task_two/getTransaction?month=${selectedMonth}&page=${currentPage}`);
      setTransactions(response.data); 
      setTotalPages(response.data.pagination.totalPages); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`http://localhost:3000/task_two/getTransaction?month=${selectedMonth}&search=${searchTerm}&page=${currentPage}`);
        setTransactions(response.data);
        setTotalPages(response.data.pagination.totalPages); // Adjust based on API response structure
      } catch (err) {
        setError(err.message);
      }
    } else {
      fetchTransactions(); // If search box is cleared, fetch original transactions
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1); // Reset to first page when month changes
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='container card p-2 m-3 '>
      <h1>Transactions- Task -7</h1>
      <div>
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>

        <div className=''>
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
        />
        </div>
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setSearchTerm('') & fetchTransactions()}>Clear Search</button>
      </div>

      {loading && <p>Loading transactions...</p>}
      {error && <p>Error: {error}</p>}
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
