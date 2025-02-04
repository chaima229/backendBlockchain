const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const axios = require('axios');

const app = express();

mongoose.connect('mongodb://localhost:27017/blockchain');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);


// Remplacez par ta propre clé API
const API_KEY = '1e616a4c-cbee-421b-8026-57a05041e9ab';

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

const options = {
  headers: {
    'X-CMC_PRO_API_KEY': API_KEY,
    'Accept': 'application/json'
  },
  params: {
    'start': '1',
    'limit': '150',
    'convert': 'USD'
  }
};


// Créer la route pour obtenir les données
app.get('/api/cryptocurrency', async (req, res) => {
    try {
      const response = await axios.get(url, options);
      res.json(response.data); // Renvoie les données au frontend
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  
axios.get(url, options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
