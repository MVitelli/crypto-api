const Model = require('./model');

class Currency extends Model{
    constructor(){
        super()
        this.model = this.knex('currencies')
    }
}

module.exports = new Currency()