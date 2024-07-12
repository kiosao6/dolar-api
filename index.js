const express  = require('express');
const { actualizarTasas, obtenerTasas } = require('./api/tasas')
const app = express();
const port = 3000;


app.get('/api/tasas', async (req, res) => {
  await actualizarTasas();
  res.json(obtenerTasas())
});

app.get('/', (req, res) => {
  res.send('Dolar API, desarrollado por Gabriel Maestre')
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
  actualizarTasas()
})