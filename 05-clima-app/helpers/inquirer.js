require('colors');
const inquirer = require('inquirer');

const menuOpts = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green.bold} Buscar lugar `
      },
      {
        value: '2',
        name: `${'2.'.green.bold} Historial `
      },
      {
        value: '0',
        name: `${'0.'.green} Salir `.bold
      }
    ]
  }
];

const inquirerMenu = async () => {
  console.clear();
  console.log('=============================='.green);
  console.log('   Selecciona una opción: '.white.bold);
  console.log('=============================='.green);
  console.log(` `);

  const opt = await inquirer.prompt(menuOpts);

  return opt.opcion;
};

const inquirerPausa = async () => {
  console.log(`\n`);
  await inquirer.prompt([
    {
      type: 'input',
      name: 'pausa',
      message: `\nPresione ${'ENTER'.green} para continuar\n`
    }
  ]);
};

const inquirerLeerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor introduzca un valor'.red;
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const inquirerLeerConfirmacion = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const inquirerListadoLugares = async (message, lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`
    };
  });
  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`
  });

  const preguntas = {
    type: 'list',
    name: 'lugarSelected',
    message,
    choices
  };

  // console.clear();
  const { lugarSelected } = await inquirer.prompt(preguntas);

  return lugarSelected;
};

const inquirerCheckboxesTareas = async (message, tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false
    };
  });

  const pregunta = {
    type: 'checkbox',
    name: 'tareasSelected',
    message,
    choices
  };

  // console.clear();
  const { tareasSelected } = await inquirer.prompt(pregunta);

  return tareasSelected;
};

module.exports = {
  inquirerMenu,
  inquirerPausa,
  inquirerLeerInput,
  inquirerListadoLugares,
  inquirerLeerConfirmacion,
  inquirerCheckboxesTareas
};
