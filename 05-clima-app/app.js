require('dotenv').config();
const {
  inquirerMenu,
  inquirerPausa,
  inquirerLeerInput,
  inquirerListadoLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

console.log('APP CLIMA STARTING');

// console.clear();
const main = async () => {
  await inquirerPausa();
  const busquedas = new Busquedas();
  let opt = '';
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Mostrar Mensaje
        const lugarBusqueda = await inquirerLeerInput('Lugar: ');
        // console.log(lugarBusqueda);
        const lugares = await busquedas.ciudad(lugarBusqueda);
        // console.log(lugares);
        const lugarSelectedId = await inquirerListadoLugares(
          'Seleccione un lugar',
          lugares
        );
        // console.log(lugarSelectedId);

        const lugarSeleccionado = lugares.find((l) => l.id === lugarSelectedId);
        // console.log(lugarSeleccionado);
        const climaLugarSeleccionado = await busquedas.clima(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        // console.log(climaLugarSeleccionado);

        // Buscar los lugares
        // Seleccionar el lugar
        // Obtener clima
        // Mostrar resultados
        console.log('\nInformacion de la ciudad\n'.green);
        console.log(
          `\t${'Ciudad:'.bold} ${lugarSeleccionado.nombre}`.underline
        );
        console.log(`\t${'Latitud:'.bold} ${lugarSeleccionado.lat}`);
        console.log(`\t${'Longitud:'.bold} ${lugarSeleccionado.lng}`);
        console.log(`\t${'Temperatura:'.bold}`);
        console.log(
          `\t${'\t- Actual:'.bold} ${climaLugarSeleccionado.temp}`.green
        );
        console.log(
          `\t${'\t- Mínima:'.bold} ${climaLugarSeleccionado.min}`.cyan
        );
        console.log(
          `\t${'\t- Máxima:'.bold} ${climaLugarSeleccionado.max}`.red
        );
        console.log(`\t${'Tiempo:'.bold} ${climaLugarSeleccionado.desc}`);
        break;
      case '2':
        break;
    }

    if (opt !== '0') {
      await inquirerPausa();
    }
  } while (opt !== '0');
};

main();
