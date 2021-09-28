const axios = require('axios');
const { guardarDB, leerDB } = require('../helpers/database');

class Busquedas {
  historial = leerDB();

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_TOKEN,
      autocomplete: true,
      limit: 5,
      language: 'es'
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    };
  }

  async ciudad(lugar = '') {
    // peticion http
    const axiosInstance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
      params: this.paramsMapbox
    });

    const resp = await axiosInstance.get();
    //console.log(resp.data.features);
    return resp.data.features.map((lugar) => ({
      id: lugar.id,
      nombre: lugar.place_name,
      lng: lugar.center[0],
      lat: lugar.center[1]
    }));
  }

  async clima(lat, lon) {
    const axiosInstance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: { ...this.paramsOpenWeather, lat, lon }
    });

    const resp = await axiosInstance.get();
    // console.log('Response = ' + resp.data);
    const { weather, main } = resp.data;
    // console.log(weather);
    return {
      desc: weather[0].description,
      min: main.temp_min,
      max: main.temp_max,
      temp: main.temp
    };
  }

  async agregarHistorial(lugar = '') {
    // console.log(this.historial);
    const index = this.historial.indexOf(lugar);
    if (index > -1) {
      this.historial.splice(index, 1);
      // console.log(this.historial);
    }

    this.historial.unshift(lugar);
    // console.log(this.historial);

    if (index < 0 && this.historial.length > 5) {
      this.historial.splice(-1);
    }
    // console.log(this.historial);

    // Salvar historial
    guardarDB(this.historial);
  }
}

module.exports = Busquedas;
