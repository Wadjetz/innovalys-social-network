var db = require('../config/database');

function makeSqlUserSelect() {
  return " " +
    "users.role, " +
    "users.first_name, " +
    "users.last_name, " +
    "users.status_profile, " +
    "users.status_connection, " +
    "users.function ";
}

/**
Find all news by page
*/
module.exports.getAll = function (page) {
  return db.findAll(
    "SELECT messages.*, " +
      makeSqlUserSelect() +
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
      makeSqlUserSelect() +
    "FROM messages JOIN users ON messages.users_id = users.id WHERE messages.id = ? ;",
    [id]
  );
};


module.exports.findByConversationId = function (conversationsId) {
  return db.findAll(
    "SELECT messages.*, " +
      makeSqlUserSelect() +
    "FROM messages " +
      "JOIN users ON users.id = messages.users_id " +
      "JOIN conversations ON messages.conversations_id = conversations.id " +
    "WHERE conversations.id = ? ; ",
    [conversationsId]
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
