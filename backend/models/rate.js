const { join } = require('../db');
const Model = require('./model');

class Rate extends Model {
    constructor() {
        super()
        this.model = this.knex('rates')
    }
    async getJoined() {
        let currencies = await this.knex('currencies');
        let rates = await this.knex('rates').orderBy('created_at', 'desc');
        let joinedQuery = currencies
            .map((cur) => {
                let foundRate = rates.find((rate) => cur.id === rate.id_currency)
                return {
                    ...foundRate,
                    currency: cur
                }
            })

        return joinedQuery;
    }
    async getBySymbol(symbolToFind) {
        let query = await this.knex('rates')
            .join('currencies', 'rates.id_currency', 'currencies.id')
            .where('symbol', symbolToFind)
            .orderBy('created_at', 'desc')
            .first()
            .select('rates.*','currencies.description', 'currencies.symbol')
        let {description, symbol, ...rest} = query
        return {
            ...rest,
            currency: {
                id: rest.id_currency,
                description,
                symbol
            }
        }
    }
}

module.exports = new Rate()