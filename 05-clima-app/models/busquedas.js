const axios = require('axios');

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José'];

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
}

module.exports = Busquedas;
