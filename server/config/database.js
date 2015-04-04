var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'innavalys',
    password : ''
});

module.exports = connection;
