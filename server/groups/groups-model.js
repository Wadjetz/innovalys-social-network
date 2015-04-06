var db = require('../config/database');

module.exports.findOneById = function (id, callback) {
    // TODO
    callback(null);
};

module.exports.findAll = function (page, callback) {
    // TODO Suport of pagination
    var sql = "SELECT * FROM groups ORDER BY groups.created DESC LIMIT 10 OFFSET 0 ";
    var data = [page];
    db.query(sql, data, function (error, results, fields) {
        console.log("findAll", "error = ", error, "results = ", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.create = function (group, callback) {
    var sql = "INSERT INTO groups SET ?";
    var data = [group];
    db.query(sql, data, function (error, results, fields) {
        console.log("create", "error = ", error, "results = ", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.addNewUser = function (userId, groupeId, callback) {
    // TODO
    callback(null);
};

module.exports.removeUser = function (userId, groupeId, callback) {
    // TODO
    callback(null);
};

module.exports.addUser = function (userId, groupeId, callback) {
    // TODO
    callback(null);
};


module.exports.update = function (comment, callback) {
    // TODO
    callback(null);
};

module.exports.delete = function (id, callback) {
    // TODO
    callback(null);
};
