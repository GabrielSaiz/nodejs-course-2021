require('dotenv').config();
const {
  inquirerMenu,
  inquirerPausa,
  inquirerLeerInput
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

console.log('APP CLIMA STARTING');
console.log(process.env);

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
        const lugar = await inquirerLeerInput('Lugar: ');
        console.log(lugar);
        busquedas.ciudad(lugar);

        // Buscar los lugares
        // Seleccionar el lugar
        // Obtener clima
        // Mostrar resultados
        console.log('\nInformacion de la ciudad\n'.green);
        console.log(`${'Ciudad:'.bold}`);
        console.log(`${'Latitud:'.bold}`);
        console.log(`${'Longitud:'.bold}`);
        console.log(`${'Temperatura:'.bold}`);
        console.log(`${'Mínima:'.bold}`);
        console.log(`${'Máxima:'.bold}`);
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
