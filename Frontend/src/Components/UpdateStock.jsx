import React, { useState } from 'react';
import axios from 'axios';

const UpdateStock = () => {
  const [stockData, setStockData] = useState({
    name: '',
    batch_no: '',
    loc: '',
    stock: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/updatestock', stockData);
      setSnackbar({ open: true, message: 'Stock updated successfully!', severity: 'success' });
      setStockData({
        name: '',
        batch_no: '',
        loc: '',
        stock: '',
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating stock. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold text-green-600 mb-6 text-center">Update Plant Stock</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Plant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={stockData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="batch_no" className="block text-sm font-medium text-gray-700">Batch Number</label>
            <input
              type="number"
              id="batch_no"
              name="batch_no"
              value={stockData.batch_no}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="loc" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="loc"
              name="loc"
              value={stockData.loc}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={stockData.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Stock
          </button>
        </form>

        {/* Snackbar */}
        {snackbar.open && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-${snackbar.severity === 'success' ? 'green' : 'red'}-600 text-white p-4 rounded-lg shadow-lg`}
          >
            <div className="flex justify-between items-center">
              <p>{snackbar.message}</p>
              <button
                onClick={handleCloseSnackbar}
                className="ml-2 text-lg font-semibold"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateStock;
