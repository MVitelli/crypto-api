const express = require('express');
const router = express.Router();
const currency = require('../models/currency');

router.get('/', function (req, res, next) {
    currency.getAll().then((data) => {
        if (!data) res.send([])
        res.send(data);
    }).catch(err => next(err))
});

module.exports = router;