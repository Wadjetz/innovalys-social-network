var db = require('../config/database');

module.exports.findOneById = function (id, callback) {
    // TODO
    callback(null);
};

module.exports.findOneBySlug = function (slug, callback) {
    var sql = "SELECT * FROM groups WHERE groups.slug = ? ;";
    var data = [slug];
    db.query(sql, data, function (error, results, fields) {
        if (error || (results.length === 0)) {
            console.error(error);
            callback(error, null, fields);
        } else {
            callback(error, results[0], fields);
        }
    });
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
        //console.log("create", "error = ", error, "results = ", results);
        if (error && results.affectedRows === 1) {
            callback(error, results.insertId, fields);
        } else {
            console.error(error);
            callback(error, null, fields);
        }
    });
};

module.exports.update = function (comment, callback) {
    // TODO
    callback(null);
};

module.exports.delete = function (id, callback) {
    // TODO
    callback(null);
};
