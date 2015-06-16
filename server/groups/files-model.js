var db = require('../config/database');

/**
Find file by id
*/
module.exports.findById = function (id) {
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
  return db.findOne(sql, [id]);
};

/**
Create file
*/
module.exports.create = function (file) {
  return db.insert(
    "INSERT INTO documents SET ? ;",
    [file]
  );
};

/**
Find all files by groups
*/
module.exports.findAllByGroupSlug = function (slug) {
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
  return db.findAll(sql, [slug]);
};
