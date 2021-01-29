var express = require('express');
const rate = require('../models/rate');

var router = express.Router();

router
    .get('/:symbol', (req, res, next) => {
        let symbol = req.params.symbol
        rate.getBySymbol(symbol)
            .then(data => {
                if (!data) res.send([])
                res.send(data)
            })
            .catch(err => {
                next(err)
            });
    })
    .get('/', (req, res, next) => {
        rate.getJoined()
            .then(data => {
                if (!data) res.send([])
                res.send(data)
            })
            .catch(err => {
                next(err)
            });
    })
    .post('/', (req, res) => {
        rate.insert(req.body)
            .then((id) => {
                res.send({ "idInserted": id })
            })
            .catch(err => {
                next(err)
            });

    });

module.exports = router;