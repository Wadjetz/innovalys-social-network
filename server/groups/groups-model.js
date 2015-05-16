var db = require('../config/database');


/**
Cherhces le groupe par son id
*/
var findOneById = function (id, callback) {
    var sql = "SELECT * FROM groups WHERE groups.id = ? ;";
    var data = [id];
    db.query(sql, data, function (error, results, fields) {
        callback(error, results, fields);
    });
};
module.exports.findOneById;

module.exports.groupsStatus = {
    open: 'open',
    close: 'close'
};

module.exports.groupsAccess = {
    private: 'private',
    public: 'public'
}

module.exports.groupsTypes = {
    project: 'project',
    discussion: 'discussion',
    other: 'other'
}

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

module.exports.findMyGroups = function (user, callback) {
    var sql  = "SELECT ";
        sql += "groups.id, ";
        sql += "groups.slug, ";
        sql += "groups.name, ";
        sql += "groups.description, ";
        sql += "groups.created, ";
        sql += "groups.updated, ";
        sql += "groups.status, ";
        sql += "groups.access, ";
        sql += "groups.type, ";
        sql += "groups.users_id, ";
        sql += "members.status AS members_status ";
        sql += "FROM groups ";
        sql += "JOIN members ON members.groups_id = groups.id "
        sql += "WHERE members.users_id = ? ;"
    var data = [user.id];
    db.query(sql, data, function (error, results, fields) {
        console.log("findAll", "error = ", error, "results = ", results);
        if (error) console.error(error);
        callback(error, results, fields);
    });
}   

module.exports.create = function (group, callback) {
    var sql = "INSERT INTO groups SET ?";
    var data = [group];
    db.query(sql, data, function (error, results, fields) {
        //console.log("create", "error = ", error, "results = ", results);
        if (error) {
            callback(error, results, fields);
        } else {
            findOneById(results.insertId, function (error, results, fields) {
                callback(error, results, fields);
            });
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
