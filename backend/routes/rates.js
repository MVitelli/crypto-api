var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /rates route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /rates route.');
});

module.exports = router;