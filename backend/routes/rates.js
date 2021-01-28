var express = require('express');
const rate = require('../models/rate');

var router = express.Router();

router
    .get('/', function (req, res) {
        rate.getAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            });
    })
    .post('/', function (req, res) {
        rate.insert(req.body)
            .then((id) => {
                res.send({ "idInserted": id })
            })
            .catch(err => {
                res.send(err)
            });

    });

module.exports = router;