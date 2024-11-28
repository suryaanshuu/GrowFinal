import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, Button, Snackbar
} from '@mui/material';
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
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/updatestock', stockData);
      setSnackbar({ open: true, message: 'Stock updated successfully!' });
      setStockData({
        name: '',
        batch_no: '',
        loc: '',
        stock: '',
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating stock. Please try again.' });
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
          Update Plant Stock
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Plant Name"
            name="name"
            value={stockData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="batch_no"
            label="Batch Number"
            name="batch_no"
            type="number"
            value={stockData.batch_no}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="loc"
            label="Location"
            name="loc"
            value={stockData.loc}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="stock"
            label="Stock"
            name="stock"
            type="number"
            value={stockData.stock}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Stock
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

export default UpdateStock;