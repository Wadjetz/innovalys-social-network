var db = require('../config/database');

module.exports.findAllByNewsId = function (news_id, page, callback) {
    var sql = "SELECT comments.*, users.id, users.username, users.status_profile, users.status_connection, users.function ";
    sql    += "FROM comments JOIN users ON comments.users_id = users.id WHERE news_id = ? ;"
    var data = [news_id];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.findOneById = function (comment_id, callback) {
    var sql = "SELECT * FROM comments WHERE id = ?";
    var data = [comment_id];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.create = function (comment, callback) {
    var sql = "INSERT INTO comments SET ? ;";
    var data = [comment];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
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
