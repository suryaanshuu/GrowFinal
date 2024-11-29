import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon, Update as UpdateIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddPlant = () => {
    navigate('/addplant');
  };

  const handleUpdateStock = () => {
    navigate('/updatestock');
  };

  const handleChangePricing = () => {
    navigate('/updatepricing');
  };

  const TileButton = ({ icon: Icon, title, onClick, gradient }) => (
    <div
      className={`w-64 h-64 bg-gradient-to-br ${gradient} text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-center items-center`}
      onClick={onClick}
    >
      <Icon className="text-6xl mb-4" />
      <p className="text-xl font-medium">{title}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <TileButton
          icon={AddIcon}
          title="Add Plant"
          onClick={handleAddPlant}
          gradient="from-green-400 to-green-600"
        />
        <TileButton
          icon={UpdateIcon}
          title="Update Stock"
          onClick={handleUpdateStock}
          gradient="from-blue-400 to-blue-600"
        />
        <TileButton
          icon={AttachMoneyIcon}
          title="Change Pricing"
          onClick={handleChangePricing}
          gradient="from-purple-400 to-purple-600"
        />
      </div>
      <button
        onClick={handleLogout}
        className="mt-12 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
