const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    creadaEn = null;
    completadoEn = null;

    constructor ( desc ) {

        this.id = uuidv4();
        this.desc = desc;
        this.creadaEn = new Date().toISOString;
    }

}

module.exports = Tarea;


