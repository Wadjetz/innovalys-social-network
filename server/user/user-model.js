var db = require('../config/database');

module.exports.status_connection = {
    OFFLINE: "offline",
    ONLINE: "online",
    BUSY: "busy",
    ABSENT: "absent"
};

module.exports.roles = {
    ADMIN: "admin",
    RH: "rh",
    CHEF: "chef",
    USER: "user"
};

module.exports.findOneById = function (id, callback) {
    var sql = "SELECT * FROM users WHERE id = ?";
    var data = [id];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.isExist = function (username, callback) {
    var sql = "SELECT COUNT(*) AS is_exist FROM users WHERE username = ?";
    var data = [username];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results[0].is_exist, fields);
    });
};

module.exports.findOneByUserName = function (username, callback) {
    var sql = "SELECT * FROM users WHERE username = ?";
    var data = [username];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
}

module.exports.create = function (user, callback) {
    console.log(user);
    var sql = "INSERT INTO users SET ?";
    var data = [user]
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};


