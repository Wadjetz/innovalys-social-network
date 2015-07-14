/** Chat Model
 * @module server/chat/messages-model
 */
var db = require('../config/database');

/**
 * Build Select SQL Query for users table
 * @return {string} SQL Query
 */
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
 * Find all news by page
 * @param  {number} page  Page
 * @return {promise}      list of chat messages
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
 * Find one message by id
 * @param  {number} id  Message id
 * @return {promise}    Message
 */
module.exports.getById = function (id) {
  return db.findOne(
    "SELECT messages.*, " +
      makeSqlUserSelect() +
    "FROM messages JOIN users ON messages.users_id = users.id WHERE messages.id = ? ;",
    [id]
  );
};

/**
 * Find Room By Id
 * @param  {number} roomId Room Id
 * @return {promise}       List of chat messages
 */
module.exports.findByRoomId = function (roomId) {
  return db.findAll(
    "SELECT messages.*, " +
      makeSqlUserSelect() +
    "FROM messages " +
      "JOIN users ON users.id = messages.users_id " +
      "JOIN rooms ON messages.rooms_id = rooms.id " +
    "WHERE rooms.id = ? ; ",
    [roomId]
  );
};

/**
 * Find all room by name
 * @param  {string} roomName Room Name
 * @return {promise}         List of rooms
 */
module.exports.findAllByRoomName = function (roomName) {
  return db.findAll(
    "SELECT messages.*, " +
      makeSqlUserSelect() +
    "FROM messages " +
      "JOIN users ON users.id = messages.users_id " +
      "JOIN rooms ON messages.rooms_id = rooms.id " +
    "WHERE rooms.name = ? ; ",
    [roomName]
  );
};

/**
 * Create new chat message
 * @param  {object} message Message object
 * @return {promise}        Insert result object
 */
module.exports.create = function (message) {
  return db.insert(
    "INSERT INTO messages SET ? ; ",
    [message]
  );
};
