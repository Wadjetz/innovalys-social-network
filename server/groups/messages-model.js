var db = require('../config/database');

/**
Find all message group by group slug
*/
module.exports.findAllByGroupSlug = function (slug, page, callback) {
  var sql = "SELECT ";
      sql += "message_groups.id, ";
      sql += "message_groups.content, ";
      sql += "message_groups.created, ";
      sql += "message_groups.updated, ";
      sql += "users.role, "; 
      sql += "users.first_name, ";
      sql += "users.last_name, ";
      sql += "users.status_profile, ";
      sql += "users.status_connection, ";
      sql += "users.function ";
      sql += "FROM message_groups ";
      sql += "JOIN users ON users.id = message_groups.users_id ";
      sql += "JOIN groups ON groups.id = message_groups.groups_id ";
      sql += "WHERE groups.slug = ? ";
  var data = [slug];
  db.query(sql, data, function (error, results, fields) {
    callback(error, results, fields);
  });
};

var findById = function (id, callback) {
  var sql = "SELECT ";
      sql += "message_groups.id, ";
      sql += "message_groups.content, ";
      sql += "message_groups.created, ";
      sql += "message_groups.updated, ";
      sql += "users.role, "; 
      sql += "users.first_name, ";
      sql += "users.last_name, ";
      sql += "users.status_profile, ";
      sql += "users.status_connection, ";
      sql += "users.function ";
      sql += "FROM message_groups ";
      sql += "JOIN users ON users.id = message_groups.users_id ";
      sql += "JOIN groups ON groups.id = message_groups.groups_id ";
      sql += "WHERE message_groups.id = ? ";
  var data = [id];
  db.query(sql, data, function (error, results, fields) {
    callback(error, results, fields);
  });
};
module.exports.findById = findById;

module.exports.create = function (message, callback) {
  // TODO
  var sql = "INSERT INTO message_groups SET ? ;";
  var data = [message]
  db.query(sql, data, function (error, results, fields) {
    if (error) {
      callback(error, results, fields);
    } else {
      findById(results.insertId, function (error, results, fields) {
        callback(error, results, fields);
      });
    }
  });
};

module.exports.update = function (message, callback) {
  
  callback(null, null);
};

module.exports.delete = function (message, callback) {
  // TODO
  callback(null, null);
};
