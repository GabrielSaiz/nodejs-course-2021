require('colors')
const inquirer = require('inquirer');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green.bold} Crear tarea `
            },
            {
                value: '2',
                name: `${'2.'.green.bold} Listar tareas `
            },
            {
                value: '3',
                name: `${'3.'.green.bold} Listar tareas completadas `
            },
            {
                value: '4',
                name: `${'4.'.green.bold} Listar tareas pendientes `
            },
            {
                value: '5',
                name: `${'5.'.green.bold} Completar tarea(s) `
            },
            {
                value: '6',
                name: `${'6.'.green.bold} Borrar tarea `
            },
            {
                value: '0',
                name: `${'0.'.green} Salir `.bold
            },
            ]

    }

]

const inquirerMenu = async() => {
    
    console.clear();
    console.log('=============================='.green);
    console.log('   Selecciona una opción: '.white.bold);
    console.log('=============================='.green);
    console.log(` `);

    const opt = await inquirer.prompt(menuOpts);

    return opt.opcion;

}

const inquirerPausa = async() => {
    
    console.log(`\n`);
    await inquirer.prompt([{
        type: 'input',
        name: 'pausa',
        message: `\nPresione ${'ENTER'.green} para continuar\n`
    }])
        

}

const inquirerLeerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if ( value.length === 0) {
                    return 'Por favor introduzca un valor'.red;
                }
                return true;
            }
        }
    ];

    const { desc }= await inquirer.prompt(question);
    return desc;
}

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

}

const inquirerListadoTareas = async(message, tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        };
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const preguntas = {
        type: 'list',
        name: 'tareaSelected',
        message,
        choices
    }

    console.clear();
    const {tareaSelected} = await inquirer.prompt(preguntas);

    return tareaSelected;

    
}


module.exports = {
    inquirerMenu,
    inquirerPausa,
    inquirerLeerInput,
    inquirerListadoTareas,
    inquirerLeerConfirmacion
}