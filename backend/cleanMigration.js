require('dotenv').config()

const fs = require('fs')
const mysql = require('mysql')
const dbConfig = require('./config/db.config')

const con = mysql.createConnection(dbConfig)

con.connect((err) => {
    if (err) {
        console.log(err)
        process.exit()
    }
})

let queryString = fs.readFileSync(__dirname + '/../mysql/cleanDB.sql', 'utf8')
con.query(queryString, (err, res) => {
    if (err) {
        console.log(err)
        process.exit()
    }
    console.log('All the tables were deleted')
    con.end();
})