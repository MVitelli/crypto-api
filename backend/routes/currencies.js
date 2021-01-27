var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    let currencies =
        [
            {
                id: 1,
                description: 'bitcoin',
                symbol: 'BTC'
            },
            {
                id: 2,
                description: 'etherum',
                symbol: 'ETH'
            },
            {
                id: 3,
                description: 'cardano',
                symbol: 'ADA'
            }
        ]
    res.send(currencies);
});

module.exports = router;