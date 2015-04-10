var db = require('../config/database');

module.exports = {
    create: function (userId, groupeId, callback) {
        var members = {
            users_id: userId,
            groupe_id: groupeId
        }
        var sql = "INSERT INTO members SET ? ;";
        var data = [members];
        db.query(sql, data, function (error, results, fields) {
            callback(error, results, fields);
        });
    },
    findByStatus: function (groupeId, status, callback) {
        var sql = "SELECT * FROM members WHERE members.id = ? AND members.status = ? ;"
        var data = [groupeId, status];
        db.query(sql, data, function (error, results, fields) {
            callback(error, results, fields);
        });
    }
};
