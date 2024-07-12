const { chromium } = require('playwright');

let montos = {
  tasas : {
    bcv : {
      monto: 0,
      ultimaActualizacion: ''
    },
    paralelo : {
      monto: 0,
      ultimaActualizacion: ''
    }
  }
}

let ultimaActualizacion = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000

const actualizarTasaBcv = async () => {

  const browser = await chromium.launch( { headless: true } )
  const page = await browser.newPage()
  const selector = '#promedios > div:nth-of-type(2) > div:nth-of-type(2) > div > p'

  try {
    // Ir a la web y recuperar la data
    await page.goto('https://monitordolarvenezuela.com/', { waitUntil: 'networkidle' })
    // Espera a que el selector esté disponible
    await page.waitForSelector(selector)

    const content = await page.$eval(selector, el  => el.innerText)

    // Parsear el contenido para poder aplicarlo a las tasas 
    const bcvMonto = parseFloat(content.split('=')[1].trim().replace(',', '.'))
    montos.tasas.bcv.monto = bcvMonto;
    montos.tasas.bcv.ultimaActualizacion = Date.now()
    ultimaActualizacion = Date.now()
    
  } catch (error) {
    console.log(error)
  } finally {
    await browser.close()
  }
}

const actualizarTasaParalelo = async () => {

  const browser = await chromium.launch( { headless: true } )
  const page = await browser.newPage()
  const selector = '#promedios > div:nth-of-type(2) > div:nth-of-type(3) > div > p'

  try {
    // Ir a la web y recuperar la data
    await page.goto('https://monitordolarvenezuela.com/', { waitUntil: 'networkidle' })
    // Espera a que el selector esté disponible
    await page.waitForSelector(selector)

    const content = await page.$eval(selector, el  => el.innerText)

    // Parsear el contenido para poder aplicarlo a las tasas 
    const paraleloMonto = parseFloat(content.split('=')[1].trim().replace(',', '.'))
    montos.tasas.paralelo.monto = paraleloMonto;
    montos.tasas.paralelo.ultimaActualizacion = Date.now()
    ultimaActualizacion = Date.now()
    
  } catch (error) {
    console.log(error)
  } finally {
    await browser.close()
  }
}

const actualizarTasas = async () => {
  const ahora = Date.now();

  if(!ultimaActualizacion || (ahora - ultimaActualizacion) > CACHE_DURATION ) {
    await actualizarTasaBcv();
    await actualizarTasaParalelo();
  };
};

const obtenerTasas = () => montos

module.exports = { actualizarTasas, obtenerTasas };
