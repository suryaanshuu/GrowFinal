//backend/index.js
const express = require('express');
const app = express();
const cors = require('cors');
const getUserById = require("./dbQueries/getUserByID");
const getPriceByID = require("./dbQueries/getPriceByID");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // In a real app, use an environment variable for this

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.adminuser.findFirst({
      where: { username: username },
    });
    if (user && await bcrypt.compare(password, user.hashedpassword)) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      console.log('Login successful, sending token');
      res.json({ token });
    } else {
      console.log('Login failed');
      res.status(401).json({ error: 'Invalid username or password' });
    }
  }catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/api/signup', async (req, res) => {
  console.log("heyallalsdknsdk");
  const { username, email, password } = req.body;
  try {
    const existingUser = await prisma.adminuser.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.adminuser.create({
      data: {
        username: username,
        email: email,
        hashedpassword: hashedPassword
      }
    });
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Signup successful, sending token');
    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});

app.post('/api/newplant', async (req, res) => {
  try {
    const plantData = req.body;
    const plant = {
      ...plantData,
      lifespan: plantData.lifespan ? parseInt(plantData.lifespan) : null,
      height: plantData.height ? parseFloat(plantData.height) : null,
      soil_ph: plantData.soil_ph ? parseFloat(plantData.soil_ph) : null,
      temperature: plantData.temperature ? parseFloat(plantData.temperature) : null,
    };
    const newPlant = await prisma.plant.create({
      data: plant,
    });
    res.status(201).json(newPlant);
  } catch (error) {
    console.log("Error handling plants", error);
    res.status(500).json({ error: 'An error occurred while adding the plant.' });
  }
});

app.post('/api/updatestock', async (req, res) => {
  const { name, batch_no, loc, stock } = req.body;
  batchNumber = parseInt(batch_no, 10);
  stockNumber = parseInt(stock, 10);
  try{
    await prisma.nurseplant.create({
      data: {
        name: name,     // Provide the plant name
        batch_no: batchNumber,              // Provide the batch number
        loc: loc,         // Set the location
        stock: stockNumber                // Set the stock count
      }
    });
    res.status(201).json({ message: 'Stock updated successfully!' });
  }catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Error updating stock. Please try again.' });
  }
})

app.post('/api/updatepricing', async (req, res) => {
  const { plant, price } = req.body;
  priceno = parseFloat(price);
  try{
    await prisma.pricing.upsert({
      where: {
        pl_name: plant
      },
      update: {
        unit_price: priceno
      },
      create: {
        pl_name: plant,
        unit_price: priceno
      }
    });
    res.status(201).json({ message: 'Price updated successfully!' });
  }catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ error: 'Error updating price. Please try again.' });
  }
});

app.get('/api/plantprice', async (req, res) => {
  const plantName = req.query.name;  
  try {
    const data = await getPriceByID(plantName);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving data' });
  }
});

app.get('/api/plantdeets', async (req, res) => {  
  try {
        const plants = await prisma.plant.findMany({
      select: {
        name: true,
      },
    });
    console.log(plants);
    res.json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving data' });
  }
});

app.get('/api/plant', async (req, res) => {
  const plantName = req.query.name;  
  //get the plantName and send it to getUserByID
  //send the relevant response back to the client
  try {
    const data = await getUserById(plantName);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});