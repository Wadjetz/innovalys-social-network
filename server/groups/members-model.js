var db = require('../config/database');
var Q = require('q');

module.exports = {
    create: function (userId, groupeId) {
        var members = {
            users_id: userId,
            groups_id: groupeId
        }
        var sql = "INSERT INTO members SET ? ;";
        var data = [members];
        return db.insert(sql, data);
    },
    findByStatus: function (groupeId, status, callback) {
        var sql  = "SELECT " +
                        "users.id, " +
                        "users.role, " +
                        "users.first_name, " +
                        "users.last_name, " +
                        "users.status_profile, " +
                        "users.status_connection, " +
                        "users.function, " +
                        "users.last_connection, " +
                        "users.arrival_date, " +
                        "members.status AS memeber_status " +
                    "FROM members " +
                    "JOIN users ON users.id = members.users_id " +
                    "WHERE members.groups_id = ? " +
                    "AND members.status = ? ;";
        var data = [groupeId, status];
        db.query(sql, data, function (error, results, fields) {
            callback(error, results, fields);
        });
    },
    findAllByGroupId: function (groupId, callback) {
        var sql  = "SELECT users.*, members.status AS member_status FROM users ";
        sql += "JOIN members ON members.users_id = users.id ";
        sql += "JOIN groups ON groups.users_id = users.id ";
        sql += "WHERE groups.id = ? ;";
        var data = [groupId];
        db.query(sql, data, function (error, results, fields) {
            if (error) {
                console.error(error);
                callback(error, null, fields);
            } else if (results.length > 0) {
                callback(error, results[0], fields);
            } else {
                callback(error, [], fields);
            }
        });
    },
    findAllByGroupSlug: function (slug, callback) {
        var sql  = "SELECT users.*, members.status AS member_status FROM users ";
        sql += "JOIN members ON members.users_id = users.id ";
        sql += "JOIN groups ON groups.users_id = users.id ";
        sql += "WHERE groups.slug = ? ;";
        var data = [slug];
        db.query(sql, data, function (error, results, fields) {
            if (error) {
                console.error(error);
                callback(error, null, fields);
            } else if (results.length > 0) {
                callback(error, results[0], fields);
            } else {
                callback(error, [], fields);
            }
        });
    },

    delete: function (user_id, groupe_id, callback) {
      var sql = "DELETE FROM members WHERE members.user_id = ? AND members.groupe_id = ? ;";
      var data = [user_id, groupe_id];
      db.query(sql, data, function (error, results, fields) {
          if (error) {
              console.error(error);
              callback(error, null, fields);
          } else if (results.length > 0) {
              callback(error, results[0], fields);
          } else {
              callback(error, [], fields);
          }
      });
    }
};
