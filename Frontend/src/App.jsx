import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPageBody from './Components/LandingPageBody';
import PlantInfo from './Components/PlantInfo';
import AddPlant from './Components/AddPlant';
import UpdateStock from './Components/UpdateStock';
import QRCodeGenerator from './Components/QRCodeGenerator';
import Invoice from './Components/Invoice';
import Login from './Components/Login';
import Admin from './Components/Admin';
import UpdatePricing from './Components/UpdatePricing';
import PlantList from './Components/PlantList';

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/addplant" element={
          <ProtectedRoute>
            <AddPlant />
          </ProtectedRoute>
        } />
        <Route path="/updatestock" element={
          <ProtectedRoute>
            <UpdateStock />
          </ProtectedRoute>
        } />
        <Route path="/updatepricing" element={
          <ProtectedRoute>
            <UpdatePricing />
          </ProtectedRoute>
        } />
        
        {/* Public Routes */}
        <Route path="/" element={<LandingPageBody />} exact />
        <Route path="/plant/:plantName" element={<PlantInfo />} />
        <Route path='/Invoice' element={<Invoice />} />
        <Route path='/QRCodeGenerator' element={<QRCodeGenerator />} />
        <Route path='/PlantList' element={<PlantList />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;