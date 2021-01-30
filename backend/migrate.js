require('dotenv').config()

const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const dbConfig = require('./config/db.config')

const con = mysql.createConnection(dbConfig)

con.connect((err) => {
    if (err) {
        console.log(err)
        process.exit()
    }
})

const directoryPath = path.join(__dirname, '../mysql/');
fs.readdir(directoryPath, async (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    await files.forEach((file) => {
        if (file != "cleanDB.sql") {
            let queryString = fs.readFileSync(directoryPath + file, 'utf8')
            con.query(queryString, (err, res) => {
                if (err) {
                    console.log(err)
                    process.exit()
                }
            })
        }
    });
    console.log("Succesfull migration")
    con.end()
});