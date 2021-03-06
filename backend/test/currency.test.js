const mocha = require('mocha')
const chai = require('chai')
const should = chai.should()
const knex = require('../db')

const currency = require('../models/currency')

describe("Currency model", () => {
    beforeEach(async () => {
        await knex.raw(`delete from rates`)
        await knex.raw(`delete from currencies`)
        await knex.raw(`
        INSERT INTO currencies(id, description, symbol)
        VALUES
        (1, 'bitcoin', 'BTC'),
        (2, 'etherum', 'ETH'),
        (3, 'cardano', 'ADA');`
        )
    })
    afterEach(async () => {
        await knex.raw(`delete from rates`)
        await knex.raw(`delete from currencies`)
    })
    it("should get any currency", (done) => {
        currency.getAll()
            .then((data) => {
                data.length.should.be.not.equal(0)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it("should get all the currencies", (done) => {
        currency.getAll()
            .then((data) => {
                data.length.should.be.equal(3)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
})