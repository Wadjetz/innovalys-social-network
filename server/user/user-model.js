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

module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT * FROM users WHERE id = ? ;",
    [id]
  );
};

module.exports.findOneByEmail = function (email) {
  return db.findOne(
    "SELECT * FROM users WHERE email = ? ;",
    [email]
  );
};

module.exports.isExist = function (email, callback) {
    var sql = "SELECT COUNT(*) AS is_exist FROM users WHERE email = ? ;";
    var data = [email];
    db.query(sql, data, function (error, results, fields) {
        //console.log('results', results);
        if (error) {
            console.error(error);
            callback(error, null);
        } else {
            callback(error, results[0].is_exist, fields);
        }
    });
};

module.exports.create = function (user, callback) {
    var sql = "INSERT INTO users SET ? ;";
    var data = [user];
    db.query(sql, data, function (error, results, fields) {
        //console.log('create', results, "error", error, "user", user);
        if (!error && results && results.affectedRows === 1) {
            callback(error, results.insertId, fields);
        } else {
            console.error(error);
            callback(error, null, fields);
        }
    });
};
