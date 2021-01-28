const dbConfig = require('./config/db.config');

require('dotenv').config();

const knex = require('knex')({
    client: 'mysql',
    connection: dbConfig,
    pool: { min: 2, max: 8 }
});

module.exports = knex