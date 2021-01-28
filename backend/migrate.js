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
    const directoryPath = path.join(__dirname, '../mysql/');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            let queryString = fs.readFileSync(directoryPath + file, 'utf8')
            con.query(queryString, (err, res) => {
                if (err) {
                    console.log(err)
                    process.exit()
                }
            })
        });
    });
})