import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPlant = () => {
  const navigate = useNavigate();
  const [plantData, setPlantData] = useState({
    name: '',
    water: '',
    sunlight: '',
    lifespan: '',
    height: '',
    fruit_nut: '',
    soil_ph: '',
    temperature: '',
    fertilizer: '',
    pest: '',
    comp_plants: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/newplant', plantData);
      setSnackbar({ open: true, message: 'Plant added successfully!' });
      setTimeout(() => navigate('/admin'), 2000);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error adding plant. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-semibold text-green-600 mb-8">Add New Plant</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {Object.keys(plantData).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace('_', ' ')}
            </label>
            {key === 'fruit_nut' || key === 'soil_ph' || key === 'temperature' ? (
              <input
                type="number"
                id={key}
                name={key}
                value={plantData[key]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                step="0.01"
              />
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={plantData[key]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Plant
        </button>
      </form>
      {snackbar.open && (
        <div className="mt-4 text-center text-green-600">
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default AddPlant;
