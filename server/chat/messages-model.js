var db = require('../config/database');

/**
Find all news by page
*/
module.exports.getAll = function (page) {
  return db.findAll(
    "SELECT messages.*, " +
      "users.role, " +
      "users.first_name, " +
      "users.last_name, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function " +
    "FROM messages JOIN users ON messages.users_id = users.id " +
    "ORDER BY messages.created ASC ; ",
    []
  );
};

/**
Find one message by id
*/
module.exports.getById = function (id) {
  return db.findOne(
    "SELECT messages.*, " +
      "users.role, " +
      "users.first_name, " +
      "users.last_name, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function " +
    "FROM messages JOIN users ON messages.users_id = users.id WHERE messages.id = ? ;",
    [id]
  );
};

/**
Create message
*/
module.exports.create = function (message) {
  return db.insert(
    "INSERT INTO messages SET ? ; ",
    [message]
  );
};
