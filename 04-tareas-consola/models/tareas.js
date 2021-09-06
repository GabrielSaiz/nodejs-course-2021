const colors = require('colors');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })

        return listado;
    }

    constructor () {
        this._listado = {};
    }

    cargarTareasFromArray (tareas =  []) {
        tareas.forEach( tarea => {
            console.log(`${tarea}`.bgRed)
            console.log(`${tarea.id}:${tarea.desc} `.bgMagenta)
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea (descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto () {

        console.log(' ');
        this.listadoArr.forEach( (tarea, index) => {
            console.log(`${colors.green(index + 1)}. ${tarea.desc} :: ${(tarea.completadoEn === null)? 'Pendiente'.red: 'Completada'.green}`);
            
        })
    }

    listadoPendienteCompletadas(completado = true) {
        console.log(' ');
        let index = 1;
        this.listadoArr.forEach( (tarea) => {
            const {desc, completadoEn} = tarea;

            if (completado && completadoEn !== null) {
                console.log(`${colors.green(index++)}. ${desc} :: ${'Completada'.green} (${completadoEn})`);
            } else if (!completado && completadoEn === null) {
                console.log(`${colors.green(index++)}. ${desc} :: ${'Pendiente'.red}`);
            }
            
        })
    }

    borrarTarea( id = '') {        
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    completarTareas (ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            console.log('1 ' + tarea);
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString;
                console.log(tarea);
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}


module.exports = Tareas;