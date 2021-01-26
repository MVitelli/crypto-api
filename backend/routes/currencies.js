var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /currencies route.');
});

module.exports = router;