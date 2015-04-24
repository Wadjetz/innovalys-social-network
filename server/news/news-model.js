var db = require('../config/database');

module.exports.findOneById = function (id, callback) {
    var sql = "SELECT * FROM news WHERE news.id = ?";
    var data = [id];
    db.query(sql, data, function (error, results, fields) {
        //console.log("news model findOneBySlug", "error", error, "results", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.findOneBySlug = function (slug, callback) {
    var sql = "SELECT * FROM news WHERE news.slug = ?";
    var data = [slug];
    db.query(sql, data, function (error, results, fields) {
        console.log("news model findOneBySlug", "error", error, "results", results);
        if (error) {
            console.error(error);
            callback(error, results, fields);
        } else if (results.length > 0) {
            callback(error, results[0], fields);
        } else {
            callback(error, null, fields);
        }
    });
};

module.exports.findAllNews = function (page, callback) {
    // TODO offset from request
    var sql = "SELECT * FROM news ORDER BY news.created DESC LIMIT 10 OFFSET 0 ";
    var data = [page];
    db.query(sql, data, function (error, results, fields) {
        //console.log("news model findAllNews", "error", error, "results", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.findAllGroupeNews = function (callback) {
    // TODO
    callback(null);
};

module.exports.create = function (news, callback) {
    //console.log("news model create", news);
    var sql = "INSERT INTO news SET ?";
    var data = [news];
    db.query(sql, data, function (error, results, fields) {
        //console.log("news model create", "error", error, "results", results);
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
    // TODO
    callback(null);
};
