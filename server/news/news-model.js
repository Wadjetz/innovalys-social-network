var db = require('../config/database');

module.exports.findOneById = function (id, callback) {
    // TODO
    callback(null);
};

module.exports.findAllNews = function (page, callback) {
    var sql = "SELECT * FROM news ORDER BY news.created DESC LIMIT 10 OFFSET ? ";
    var data = [page];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.findAllGroupeNews = function (callback) {
    // TODO
    callback(null);
};

module.exports.create = function (news, callback) {
    console.log("news model create", news);
    var sql = "INSERT INTO news SET ?";
    var data = [news];
    db.query(sql, data, function (error, results, fields) {
        if (error) console.error(error);
        callback(error, results, fields);
    });
};

module.exports.update = function (comment, callback) {
    // TODO
    callback(null);
}

module.exports.delete = function (id, callback) {
    // TODO
    callback(null);
}


