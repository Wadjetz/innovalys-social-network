var db = require('../config/database');

module.exports.findAllByNewsId = function (news_id, page, callback) {
    var sql = "SELECT comments.id, comments.content, comments.created, comments.updated, ";
    sql += "users.id AS user_id, users.email, users.status_profile, users.status_connection, users.function ";
    sql += "FROM comments JOIN users ON comments.users_id = users.id WHERE news_id = ? ;";
    var data = [news_id];
    db.query(sql, data, function (error, results, fields) {
        //console.log("comments findAllByNewsId", "error", error, "results", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.findAllByNewsSlug = function (slug, page, callback) {
    var sql  = "SELECT ";
        sql += "comments.id, ";
        sql += "comments.content, ";
        sql += "comments.created, ";
        sql += "comments.updated, ";
        sql += "users.id AS user_id, ";
        sql += "users.email, ";
        sql += "users.status_profile, ";
        sql += "users.status_connection, ";
        sql += "users.function ";
        sql += "FROM comments ";
        sql += "JOIN news ON news.id = comments.news_id ";
        sql += "JOIN users ON users.id = comments.users_id ";
        sql += "WHERE slug = ? ; ";
    var data = [slug];
    db.query(sql, data, function (error, results, fields) {
        //console.log("comments findAllByNewsId", "error", error, "results", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
}

module.exports.findOneById = function (comment_id, callback) {
    var sql = "SELECT comments.id, comments.content, comments.created, comments.updated, ";
    sql += "users.id AS user_id, users.email, users.status_profile, users.status_connection, users.function ";
    sql += "FROM comments JOIN users ON comments.users_id = users.id WHERE comments.id = ? ;";
    var data = [comment_id];
    db.query(sql, data, function (error, results, fields) {
        //console.log("comments findOneById", "error", error, "results", results);
        if (error) console.error(error);
        if (results && results.length > 0) {
            callback(error, results[0], fields);
        } else {
            callback(error, null, fields);
        }
    });
};

module.exports.create = function (comment, callback) {
    var sql = "INSERT INTO comments SET ? ;";
    var data = [comment];
    db.query(sql, data, function (error, results, fields) {
        console.log('Comments.create', results, "error", error, "comment", comment);
        if (!error && results && results.affectedRows === 1) {
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
    var sql = "DELETE FROM comments WHERE comments.id = ? ;";
    var data = [id];
    db.query(sql, data, function (error, results, callback) {
        console.log('Comments.delete', "results, results", "error", error, "id", id);
        callback(error, results, fields);
    });
};
