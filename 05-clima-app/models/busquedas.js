const axios = require('axios');

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token:
        'pk.eyJ1IjoiZ2FicmllbHNhaXoiLCJhIjoiY2t0ZGZkcjltMDFwcjJxcW55cnFoNGx5ayJ9.MVc0YBsxS_duJUk_LARkFQ',
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
    console.log(resp.data);

    return []; //devuelve las ciudades
  }
}

module.exports = Busquedas;
