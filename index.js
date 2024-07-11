const express  = require('express');
const app = express();
const port = 3000;


let tasas = [
  {
    tasa: 'bcv',
    monto: 0,
    ultimaActualizacion: ''
  },

  {
    tasa: 'monitor',
    monto: 0,
    ultimaActualizacion: ''
  },
]

let text;

const actualizarTasas = async () => {
  try {

    // Ir a la web y recuperar la data
    
  } catch (error) {
    console.log(error)
  }
}

actualizarTasas();

// app.get('/api/tasas', (req, res) => {
//   res.json(tasas)
// });

app.get('/', (req, res) => {
  res.send('hola mundo')
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
  console.log(text)
})