const Model = require('./model');

class Currency extends Model{
    constructor(){
        super()
        this.model = this.knex('currency')
    }
}

module.exports = new Currency()