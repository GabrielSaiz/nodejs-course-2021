const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    description: 'La base'
  })
  .option('h', {
    alias: 'hasta',
    type: 'number',
    default: 10,
    description: 'Hasta que numero se realiza la multiplicacion'
  })
  .option('l', {
    alias: 'listar',
    type: 'boolean',
    default: false,
    description: 'Listar la tabla en consola'
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw 'La base tiene que ser un numero';
    }
    if (isNaN(argv.hasta)) {
      throw 'Hasta tiene que ser un numero';
    }

    return true;
  }).argv;

module.exports = argv;
