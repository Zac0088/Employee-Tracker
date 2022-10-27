const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PatBob271055?',
    database: 'tracker_db'
});
module.exports = db;