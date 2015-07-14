/** Document File Model
 * @module server/groups/files-model
 */
var db = require('../config/database');

/**
 * Find file by id
 * @param  {number} id Document id
 * @return {promise}    Document object
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
 * Create new document file
 * @param  {File} file Document file object 
 * @return {promise}      Insert result
 */
module.exports.create = function (file) {
  return db.insert(
    "INSERT INTO documents SET ? ;",
    [file]
  );
};

/**
 * Find all files by groups
 * @param  {string} slug Group slug
 * @return {promise}      List of documents files
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
