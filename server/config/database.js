var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'innovalys',
    password : ''
});

module.exports = connection;
