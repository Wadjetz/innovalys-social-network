var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'innavalys',
    password : 'esgi',
    port : '3306'
});

module.exports = connection;
