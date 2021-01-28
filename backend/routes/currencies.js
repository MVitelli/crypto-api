const express = require('express');
const currency = require('../models/currency');
const router = express.Router();

router.get('/', function (req, res) {
    currency.getAll().then((data)=>{
        res.send(data);
    })
});

module.exports = router;