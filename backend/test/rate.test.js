const mocha = require('mocha')
const chai = require('chai')
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
    before(async () => {
        await knex.raw(`delete from rates`)
        await knex.raw(`delete from currencies`)
        await knex.raw(`alter table rates AUTO_INCREMENT=1`)
    })
    beforeEach(async () => {
        await knex.raw(`
        INSERT INTO currencies(id, description, symbol)
        VALUES (1, 'bitcoin', 'BTC'), (2, 'etherum', 'ETH'), (3, 'cardano', 'ADA');`
        )
        await insertQuery()
    })
    afterEach(async () => {
        await knex.raw(`delete from rates`)
        await knex.raw(`delete from currencies`)
        await knex.raw(`alter table rates AUTO_INCREMENT=1`)
    })
    it("should get BTC rate", (done) => {
        rate.getBySymbol('BTC')
            .then((data) => {
                data.currency.symbol.should.be.equal('BTC')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it("should get last BTC rate", (done) => {
        setTimeout(() => {
            insertQuery().then(() => {
                rate.getBySymbol('BTC')
                    .then((data) => {
                        data.id.should.be.equal(4)
                        done()
                    })
                    .catch((err) => {
                        done(err)
                    })
            }
            )
        }, 1500)
    })
    it("should get last rate of each currency", (done) => {
        setTimeout(() => {
            insertQuery().then(() => {
                rate.getJoined()
                    .then(data => {

                        let btcRate = data.find(rate => rate.currency.symbol === 'BTC')
                        let ethRate = data.find(rate => rate.currency.symbol === 'ETH')
                        let adaRate = data.find(rate => rate.currency.symbol === 'ADA')

                        btcRate.id.should.be.equal(4)
                        ethRate.id.should.be.equal(5)
                        adaRate.id.should.be.equal(6)
                        done()
                    })
                    .catch((err) => {
                        done(err)
                    })
            })
        }, 1500)
    })
})