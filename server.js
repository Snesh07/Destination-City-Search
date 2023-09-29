const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/search', async (req, res) => {
  const { source, destination } = req.query;

  if (source === destination) {
    return res.status(400).json({ error: 'Source and destination cities cannot be the same.' });
  }

  try {
    const response = await axios.get('https://gowithgbi.com/api/city');
    const data = response.data;

    const matchingCities = data.filter((city) => city.name === source);
    if (matchingCities.length === 0) {
      return res.status(404).json({ error: 'Source city not found in the API.' });
    }

    const destinationCity = matchingCities[0].destination;
    res.json({ destinationCity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
