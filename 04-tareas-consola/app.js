require('colors');

const { guardarDB, leerDB } = require('./helpers/database');
const { 
    inquirerMenu, 
    inquirerPausa, 
    inquirerLeerInput,
    inquirerListadoTareas,
    inquirerLeerConfirmacion,
    inquirerCheckboxesTareas
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');



console.clear();
const main = async() => {
    
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

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
                tareas.listadoCompleto();
            break;
            case '3':
                //   3. Listar tareas completadas  
                tareas.listadoPendienteCompletadas(true);
            break;
            case '4':
                //   4. Listar tareas pendientes  
                tareas.listadoPendienteCompletadas(false);
            break;
            case '5':
                //   5. Completar tarea(s)  
                const ids = await inquirerCheckboxesTareas('Seleccione las tareas que desea completar:', tareas.listadoArr);
                
                if (ids !== undefined) {
                    const ok = await inquirerLeerConfirmacion('¿Está seguro que desea completarla/s?');

                    if (ok) {   
                        // tareas.borrarTarea(ids);
                        tareas.completarTareas(ids);

                        guardarDB (tareas.listadoArr)                    
                    }
                }
            break;
            case '6':
                //   6. Borrar tarea  
                const id = await inquirerListadoTareas('¿Qué tarea desea borrar?', tareas.listadoArr);
                const ok = await inquirerLeerConfirmacion('¿Está seguro que desea borrarlo?');
                
                if (ok) {                    
                    tareas.borrarTarea(id);

                    guardarDB (tareas.listadoArr)                    
                }
                
            break;

        }

        // console.log({opt});
        
        

        if (opt !== '0') {
            await inquirerPausa();
        }

    } while (opt !== '0');
    
}

main()