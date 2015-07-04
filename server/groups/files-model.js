var db = require('../config/database');

/**
Find file by id
*/
module.exports.findById = function (id) {
  return db.findOne(
    "SELECT documents.*, " +
      "users.role, " +
      "users.first_name, " +
      "users.last_name, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function " +
    "FROM documents " +
      "JOIN users ON users.id = documents.users_id " +
    "WHERE documents.id = ? " +
    "ORDER BY documents.created ASC ; ",
    [id]
  );
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
  return db.findAll(
    "SELECT documents.*, " +
      "users.role, " +
      "users.first_name, " +
      "users.last_name, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function " +
    "FROM documents " +
      "JOIN users ON users.id = documents.users_id " +
      "JOIN groups ON groups.id = documents.groups_id " +
    "WHERE groups.slug = ? " +
    "ORDER BY documents.created ASC ; ",
    [slug]
  );
};
