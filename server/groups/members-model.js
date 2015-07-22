/** Group Members Model
 * @module server/groups/members-model
 */
var db = require('../config/database');

/**
 * Generate Select user SQL query
 * @return {string} SQL query
 */
function makeSqlUserSelect() {
  return " " +
    "users.id, " +
    "users.email, " +
    "users.role, " +
    "users.first_name, " +
    "users.last_name, " +
    "users.birthday_date, " +
    "users.status_profile, " +
    "users.status_connection, " +
    "users.function, " +
    "users.adress, " +
    "users.description, " +
    "users.arrival_date, " +
    "users.last_connection ";
}

/**
 * Create group messages
 * @param  {Member} member Group Member object
 * @return {promise}        Insert Result
 */
module.exports.create = function (member) {
  return db.insert(
    "INSERT INTO members SET ? ;",
    [member]
  );
};

/**
 * Find all group messages by group id and status
 * @param  {number} groupeId Group id
 * @param  {string} status   Group status
 * @return {promise}          List of group members
 */
module.exports.findByStatus = function (groupeId, status) {
  return db.findAll(
    "SELECT " +
      "members.status AS memeber_status, " +
      makeSqlUserSelect() +
    "FROM members " +
    "JOIN users ON users.id = members.users_id " +
    "WHERE members.groups_id = ? " +
    "AND members.status = ? ;",
    [groupeId, status]
  );
};

/**
 * Delete group messages by user id
 * @param  {number} user_id   User id
 * @param  {number} groupe_id Group id
 * @return {promise}           Delete result
 */
module.exports.delete = function (user_id, groupe_id) {
  return db.delete(
    "DELETE FROM members WHERE members.users_id = ? AND members.groups_id = ? ;",
    [user_id, groupe_id]
  );
};

/**
 * Find all group messages by group slug
 * @param  {string} slug Groups slug
 * @return {promise}      List of members
 */
module.exports.findAllByGroupSlug = function (slug) {
  return db.findAll(
    "SELECT users.*, " +
      "members.status AS member_status, " +
      makeSqlUserSelect() +
      "FROM users " +
    "JOIN members ON members.users_id = users.id " +
    "JOIN groups ON groups.users_id = users.id " +
    "WHERE groups.slug = ? ; ",
    [slug]
  );
};

/**
 * Find all group messages by group id
 * @param  {number} groupId Group id
 * @return {promise}         List of members
 */
module.exports.findAllByGroupId = function (groupId) {
  return db.findAll(
    "SELECT " +
      "members.status AS member_status " +
      makeSqlUserSelect() +
    "FROM users " +
    "JOIN members ON members.users_id = users.id " +
    "JOIN groups ON groups.users_id = users.id " +
    "WHERE groups.id = ? ;",
    [groupId]
  );
};

/**
 * Get Member
 * @param  {number} users_id  User id
 * @param  {number} groups_id Group id
 * @return {promise}           Member object
 */
module.exports.getOneMember = function (users_id, groups_id) {
  return db.findOne(
    "SELECT * FROM members WHERE members.users_id = ? AND members.groups_id = ? ; ",
    [users_id, groups_id]
  );
};

/**
 * Accept member in group
 * @param  {number} users_id  User id
 * @param  {number} groups_id Group id
 * @return {promise}           Update result
 */
module.exports.accept = function (users_id, groups_id) {
  return db.update(
    "UPDATE members SET status = 'accepted' WHERE members.users_id = ? AND members.groups_id = ? ; ",
    [users_id, groups_id]
  );
};

/**
 * Refuse Member
 * @param  {number} users_id  User id
 * @param  {number} groups_id Group id
 * @return {promise}           Delete result
 */
module.exports.refuse = function (users_id, groups_id) {
  return db.delete(
    "DELETE FROM members WHERE members.users_id = ? AND members.groups_id = ? ; ",
    [users_id, groups_id]
  );
};
