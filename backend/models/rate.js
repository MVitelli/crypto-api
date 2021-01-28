const Model = require('./model');

class Rate extends Model{
    constructor(){
        super()
        this.model = this.knex('rate')
    }
}

module.exports = new Rate()