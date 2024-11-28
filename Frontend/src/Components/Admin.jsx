import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
  }

  const TileButton = ({ icon: Icon, title, onClick, color }) => (
    <Paper 
      elevation={6}
      sx={{
        width: 200,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s',
        borderRadius: 4,
        background: `linear-gradient(45deg, ${color[500]} 30%, ${color[300]} 90%)`,
        color: 'white',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: `0 12px 20px -10px ${color[500]}`,
        },
      }}
      onClick={onClick}
    >
      <Icon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
    </Paper>
  );

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography 
          component="h1" 
          variant="h3" 
          sx={{ 
            mb: 6, 
            fontWeight: 'bold', 
            color: 'black', // Dark green color
            fontFamily: "'Playfair Display', serif", // Elegant serif font
            letterSpacing: '0.05em', // Slight letter spacing for better readability
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)', // Subtle text shadow for depth
          }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mb: 6 }}>
          <TileButton 
            icon={AddIcon} 
            title="Add Plant" 
            onClick={handleAddPlant} 
            color={{ 300: '#4CAF50', 500: '#2E7D32' }} 
          />
          <TileButton 
            icon={UpdateIcon} 
            title="Update Stock" 
            onClick={handleUpdateStock} 
            color={{ 300: '#2196F3', 500: '#1565C0' }} 
          />
          <TileButton 
            icon={AttachMoneyIcon} 
            title="Change Pricing" 
            onClick={handleChangePricing} 
            color={{ 300: '#BA68C8', 500: '#8E24AA' }} 
          />
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 3, py: 1, px: 4, fontSize: '1.1rem' }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Admin;