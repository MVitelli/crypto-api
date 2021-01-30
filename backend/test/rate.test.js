const mocha = require('mocha')
const chai = require('chai')
const describe = mocha.describe
const it = mocha.it
const should = chai.should()
const knex = require('../db')

const rate = require('../models/rate')
const insertQuery = () => {
    return knex.raw(`
            INSERT INTO rates(id_currency, value)
            VALUES
            (1, 11924.231233),
            (2, 308.313553),
            (3, 0.0990881)`
    )
}


describe("Rate model", () => {
    beforeEach(async () => {
        // await knex.raw(`
        // INSERT INTO currencies(id, description, symbol)
        // VALUES
        // (1, 'bitcoin', 'BTC'),
        // (2, 'etherum', 'ETH'),
        // (3, 'cardano', 'ADA');`
        // )
        // await insertQuery()
    })
    afterEach(async () => {
        // await knex.raw(`delete from rates`)
        // await knex.raw(`delete from currencies`)
    })
    it.skip("should get BTC rate", () => {
        rate.getBySymbol('BTC')
            .then((data) => {
                data.currency.symbol.should.be.equal('BTC')
            })
            .catch((err) => {
                done(err)
            })
    })
    it("should get last BTC rate", (done) => {
        insertQuery().then(
            rate.getBySymbol('BTC')
                .then((data) => {
                    console.log(data)
                    data.id.should.be.equal(4)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        )
    })
})