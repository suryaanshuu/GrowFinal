import React, { useState } from 'react';
import axios from 'axios';

const UpdatePricing = () => {
  const [pricingData, setPricingData] = useState({
    plant: '',
    price: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/updatepricing', pricingData);
      setSnackbar({ open: true, message: 'Price updated successfully!', severity: 'success' });
      setPricingData({
        plant: '',
        price: '',
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating pricing. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold text-green-600 mb-6 text-center">Update Plant Pricing</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="plant" className="block text-sm font-medium text-gray-700">Plant Name</label>
            <input
              type="text"
              id="plant"
              name="plant"
              value={pricingData.plant}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={pricingData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Pricing
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

export default UpdatePricing;
