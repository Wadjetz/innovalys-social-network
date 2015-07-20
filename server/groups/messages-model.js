/** Group Message Model
 * @module server/groups/messages-model
 */
var db = require('../config/database');

/**
 * Generate Select user SQL query
 * @return {string} SQL query
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
 * Find all message group by group slug
 * @param  {string} slug Group slug
 * @param  {number} page Page
 * @return {promise}      List of group's messages
 */
module.exports.findAllByGroupSlug = function (slug, page) {
  return db.findAll(
    "SELECT " +
      "message_groups.*, " +
      makeSqlUserSelect() +
    "FROM message_groups " +
    "JOIN users ON users.id = message_groups.users_id " +
    "JOIN groups ON groups.id = message_groups.groups_id " +
    "WHERE groups.slug = ? " +
    "ORDER BY message_groups.created ASC ; ",
    [slug]
  );
};

/**
 * Find one message by id
 * @param  {number} id Group message id
 * @return {promise}    Group message object
 */
module.exports.findById = function (id) {
  return db.findOne(
    "SELECT " +
      "message_groups.*, " +
      makeSqlUserSelect() +
    "FROM message_groups " +
    "JOIN users ON users.id = message_groups.users_id " +
    "JOIN groups ON groups.id = message_groups.groups_id " +
    "WHERE message_groups.id = ? ; ",
    [id]
  );
};

/**
 * Create a message group
 * @param  {Message} message Group Message object
 * @return {promise}         Insert result
 */
module.exports.create = function (message) {
  return db.insert(
    "INSERT INTO message_groups SET ? ;",
    [message]
  );
};

/**
 * Update a message group
 * @param  {number} id      Group Message id
 * @param  {Message} message Group Message object
 * @return {promise}         Update result
 */
module.exports.update = function (id, message) {
  return db.update(
    "UPDATE message_groups SET ? WHERE message_groups.id = ? ; ",
    [message, id]
  );
};

/**
 * Delete a message group by id
 * @param  {number} id Group Message id
 * @return {promise}    Delete resutl
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM message_groups WHERE message_groups.id = ? ",
    [id]
  );
};
