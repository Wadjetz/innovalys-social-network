var db = require('../config/database');

/**
Find all message group by group slug
*/
module.exports.findAllByGroupSlug = function (slug, page, callback) {
  var sql = "SELECT ";
      sql += "message_groups.*, ";
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
  return db.findAll(sql, [slug]);
};

/**
Find one message by id
*/
module.exports.findById = function (id) {
  var sql = "SELECT ";
      sql += "message_groups.*, ";
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
  return db.findOne(sql, [id]);
};

/**
Create a message group
*/
module.exports.create = function (message) {
  return db.insert(
    "INSERT INTO message_groups SET ? ;",
    [message]
  );
};

module.exports.update = function (message, callback) {
  callback(null, null);
};

module.exports.delete = function (message, callback) {
  callback(null, null);
};
