const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const rawData = fs.readFileSync('cities.json');
const citiesData = JSON.parse(rawData);

app.get('/search', (req, res) => {
  const { source, destination } = req.query;

  if (source === destination) {
    return res.status(400).json({ error: 'Source and destination cities cannot be the same.' });
  }

  const matchingCity = citiesData.find((city) => city.name === source);

  if (!matchingCity) {
    return res.status(404).json({ error: 'Source city not found in the data.' });
  }

  try {
    const resultCity = matchingCity.state.name;
    res.json({ destinationCity: resultCity });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
