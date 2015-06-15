var db = require('../config/database');

var findById = function (id, callback) {
  var sql  = "SELECT documents.*, ";
      sql += "users.role, ";
      sql += "users.first_name, ";
      sql += "users.last_name, ";
      sql += "users.status_profile, ";
      sql += "users.status_connection, ";
      sql += "users.function ";
      sql += "FROM documents ";
      sql += "JOIN users ON users.id = documents.users_id ";
      sql += "WHERE documents.id = ?; ";
  var data = [id];
  db.query(sql, data, function (error, results, fields) {
    callback(error, results, fields);
  });
};

module.exports.findById = findById;

module.exports.create = function (file, callback) {
  var sql = "INSERT INTO documents SET ? ;";
  var data = [file];
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

module.exports.findAllByGroupSlug = function (slug, callback) {
  var sql  = "SELECT documents.*, ";
      sql += "users.role, ";
      sql += "users.first_name, ";
      sql += "users.last_name, ";
      sql += "users.status_profile, ";
      sql += "users.status_connection, ";
      sql += "users.function ";
      sql += "FROM documents ";
      sql += "JOIN users ON users.id = documents.users_id ";
      sql += "JOIN groups ON groups.id = documents.groups_id ";
      sql += "WHERE groups.slug = ? ; ";
  var data = [slug];
  db.query(sql, data, function (error, results, fields) {
    callback(error, results, fields);
  });
};
