require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express'),
    currencies = require('./routes/currencies'),
    rates = require('./routes/rates');

const app = express();
const PORT = 8008

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/rates', rates)
app.use('/currencies', currencies)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = app;