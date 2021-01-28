const knex = require('../db');

class Model {
    constructor(){
        this.knex = knex;
    }
    getAll() {
        return this.model.select();
    }
    insert(data){
        return this.model.insert(data)
    }
}

module.exports = Model