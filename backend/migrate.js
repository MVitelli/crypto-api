require('dotenv').config()

const fs = require('fs')
const mysql = require('mysql')

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

con.connect((err) => {
    if (err) {
        console.log(err)
        process.exit()
    }
    const queryString = fs.readFileSync(__dirname + '/../mysql/currency.sql', 'utf8')
    con.query(queryString, (err, res) => {
        if (err) {
            console.log(err)
            process.exit()
        }
        console.log('result', res)
    })
})