var db = require('../config/database');

module.exports.getAll = function (page, callback) {
    // TODO This is for test chat
    var sql = "SELECT * FROM messages ;";
    var data = [];
    db.query(sql, data, function (error, results, fields) {
        //console.log("getGlobalChatMessages", "error = ", error, "results = ", results);
        callback(error, results, fields);
    });
};

module.exports.getById = function (id, callback) {
    var sql = "SELECT * FROM messages WHERE messages.id = ? ;";
    var data = [id];
    db.query(sql, data, function (error, results, fields) {
        // TODO handle errors
        callback(error, results[0], fields);
    });
};

module.exports.create = function (message, callback) {
    var sql = "INSERT INTO messages SET ?";
    var data = [message];
    db.query(sql, data, function (error, results, fields) {
        //console.log("messages.create", "error = ", error, "results = ", results);
        if (error && results.affectedRows === 1) {
            callback(error, results.insertId, fields);
        } else {
            console.error(error);
            callback(error, null, fields);
        }
    });
};
