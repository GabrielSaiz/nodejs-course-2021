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
}

module.exports = Busquedas;
