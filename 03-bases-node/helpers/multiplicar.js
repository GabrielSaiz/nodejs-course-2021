const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (base = 1, hasta = 10, listar = false) => {
  let salida = '';
  salida += '==================\n'.grey;
  salida += `Table del ${colors.red(base)}\n`;
  salida += '==================\n'.grey;

  for (let index = 0; index <= hasta; index++) {
    salida += `${base} ${colors.magenta('x')} ${index} = ${colors.blue.bold(
      base * index
    )}\n`;
  }

  if (listar) {
    console.log(salida);
  }

  const fileName = `table-${base}.txt`;

  fs.writeFileSync(`./salida/${fileName}`, salida);

  return fileName;
};

module.exports = {
  crearArchivo
};
