import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlantList = () => {
  const [plants, setPlants] = useState([]); // State to store plant data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch data from the API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/plantdeets");
        if (!response.ok) {
          throw new Error("Failed to fetch plant data");
        }
        const data = await response.json();
        setPlants(data); // Set the plant data in state
      } catch (err) {
        setError(err.message); // Set any error message
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchPlants();
  }, []);

  // Display a loading message
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading plants...</p>
      </div>
    );
  }

  // Display an error message if there is an error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Render the list of plants
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Plant List
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/plant/${encodeURIComponent(plant.name)}`)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {plant.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {plant.description || "Click to get the description"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantList;
