require('colors');

const { guardarDB } = require('./helpers/database');
const { 
    inquirerMenu, 
    inquirerPausa, 
    inquirerLeerInput 
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');



console.clear();
const main = async() => {
    
    const tareas = new Tareas();

    let opt = ''
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //   1. Crear tarea  
                const desc = await inquirerLeerInput('Descripción: '.blue);
                const tarea = new Tarea(desc);        
                tareas._listado[tarea.id] = tarea;
                console.log(tarea);

                guardarDB (tareas.listadoArr)
            break;
            case '2':
                //   2. Listar tareas  
                console.log(tareas.listadoArr);
            break;
            case '3':
                //   3. Listar tareas completadas  
            break;
            case '4':
                //   4. Listar tareas pendientes  
            break;
            case '5':
                //   5. Completar tarea(s)  
            break;
            case '6':
                //   6. Borrar tarea  
            break;

        }

        // console.log({opt});
        
        

        if (opt !== '0') {
            await inquirerPausa();
        }

    } while (opt !== '0');
    
}

main()