var db = require('../config/database');

module.exports.findOneById = function (id, callback) {
    var sql = "SELECT * FROM users WHERE id = ?";
    var data = [id];
    db.query(sql, data, function (error, results, fields) {
        callback(error, results, fields);
    });
};

module.exports.create = function (user, callback) {
    console.log(user);
    var sql = "INSERT INTO users SET ";
        sql += "email = :email, username = :username, password = :password, ";
        sql += "first_name = :first_name, last_name = :last_name, birthday_date = :birthday_date, ";
        sql += "user_role_id = :user_role_id, user_status_connection_id = :user_status_connection_id ;";
    db.query(sql, user, function (error, results, fields) {

        console.log(results);
        callback(error, results, fields);
    });
};


