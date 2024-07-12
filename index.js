const express  = require('express');
const { actualizarTasas, obtenerTasas } = require('./api/tasas')
const app = express();
const port = 3000;


app.get('/api/tasas', async (req, res) => {
  await actualizarTasas();
  res.json(obtenerTasas())
});

app.get('/', async (req, res) => {
  // res.send('Dolar API, desarrollado por Gabriel Maestre')
  await actualizarTasas();
  res.json(obtenerTasas())
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
  actualizarTasas()
})