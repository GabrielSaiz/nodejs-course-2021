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

}


module.exports = Tareas;