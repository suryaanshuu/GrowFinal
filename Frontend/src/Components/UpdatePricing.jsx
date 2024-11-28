import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, Button, Snackbar
} from '@mui/material';
import axios from 'axios';

const UpdatePricing = () => {
  const [pricingData, setPricingData] = useState({
    plant: '',
    price: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/updatepricing', pricingData);
      setSnackbar({ open: true, message: 'Price updated successfully!' });
      setPricingData({
        plant: '',
        price: '',
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating pricing. Please try again.' });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Update Plant Pricing
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="plant"
            label="Plant Name"
            name="plant"
            value={pricingData.plant}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            value={pricingData.price}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Pricing
          </Button>
        </Box>
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={() => setSnackbar({ open: false, message: '' })}
          autoHideDuration={3000}
        />
      </Box>
    </Container>
  );
};

export default UpdatePricing;