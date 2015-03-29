var db = require('../config/database');

module.exports.findOneById = function (id, callback) {
    var sql = "SELECT * FROM user_role WHERE id = ?";
    var data = [id];
    db.query(sql, data, function (error, results, fields) {
        callback(error, results, fields);
    });
};

module.exports.create = function (name, callback) {
    var sql = "INSERT INTO user_role SET name = ? ";
    var data = [name];
    db.query(sql, data, function (error, results, fields) {
        console.log(error);
        console.log(results);
        callback(error, results, fields);
    });
};