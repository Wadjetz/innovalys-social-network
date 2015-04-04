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

module.exports.create = function (user, callback) {
    console.log(user);
    var sql = "INSERT INTO users SET ?";
    var data = [user]
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};


