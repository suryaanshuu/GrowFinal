import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, Button, 
  FormControl, InputLabel, Select, MenuItem, Snackbar
} from '@mui/material';
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
          Add New Plant
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Plant Name"
            name="name"
            autoFocus
            value={plantData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="water"
            label="Water Needs"
            name="water"
            value={plantData.water}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="sunlight"
            label="Sunlight Needs"
            name="sunlight"
            value={plantData.sunlight}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lifespan"
            label="Lifespan (years)"
            name="lifespan"
            type="number"
            value={plantData.lifespan}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="height"
            label="Height (meters)"
            name="height"
            type="number"
            step="0.01"
            value={plantData.height}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="fruit-nut-label">Fruit/Nut Bearing</InputLabel>
            <Select
              labelId="fruit-nut-label"
              id="fruit_nut"
              name="fruit_nut"
              value={plantData.fruit_nut}
              label="Fruit/Nut Bearing"
              onChange={handleChange}
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="soil _ph"
            label="Soil pH"
            name="soil_ph"
            type="number"
            step="0.01"
            value={plantData.soil_ph}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="temperature"
            label="Temperature (°C)"
            name="temperature"
            type="number"
            step="0.01"
            value={plantData.temperature}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="fertilizer"
            label="Fertilizer Needs"
            name="fertilizer"
            value={plantData.fertilizer}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="pest"
            label="Pest Susceptibility"
            name="pest"
            value={plantData.pest}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="comp_plants"
            label="Companion Plants"
            name="comp_plants"
            value={plantData.comp_plants}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Plant
          </Button>
        </Box>
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={() => setSnackbar({ open: false, message: '' })}
          autoHideDuration={2000}
        />
      </Box>
    </Container>
  );
};

export default AddPlant;