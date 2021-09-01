const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors');

console.clear();

console.log(argv);

console.log('base: ', argv.base);
// const [, , arg3] = process.argv;
// const [, base = 1] = arg3.split('=');

// console.log(arg3);
// console.log(base);

// // const base = 3;

crearArchivo(argv.base, argv.hasta, argv.listar)
  .then((nombreArchivo) => console.log(nombreArchivo.rainbow, ' creado'))
  .catch((err) => console.log(err));
