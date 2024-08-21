const express  = require('express');
const axios = require('axios')
const app = express();
const port = 3000;

app.get('/api/tasas', async (req, res) => {
  try {
    const response = await axios.get('http://pydolarve.org/api/v1/dollar');
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error); // Añadir más detalles del error
    res.status(500).json({ 
      message: 'Error fetching data', 
      error: error.message,
      config: error.config
    });
  }
});


app.get('/', (req, res) => {
  res.send('hola mundo')
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})