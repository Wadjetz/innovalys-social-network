var db = require('../config/database');

/**
Create group messages
*/
module.exports.create = function (member) {
  return db.insert(
    "INSERT INTO members SET ? ;",
    [member]
  );
};

/**
Find all group messages by group id and status
*/
module.exports.findByStatus = function (groupeId, status) {
  return db.findAll(
    "SELECT " +
      "users.id, " +
      "users.role, " +
      "users.first_name, " +
      "users.last_name, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function, " +
      "users.last_connection, " +
      "users.arrival_date, " +
      "members.status AS memeber_status " +
    "FROM members " +
    "JOIN users ON users.id = members.users_id " +
    "WHERE members.groups_id = ? " +
    "AND members.status = ? ;",
    [groupeId, status]
  );
};

/**
Delete group messages by user id
*/
module.exports.delete = function (user_id, groupe_id) {
  return db.delete(
    "DELETE FROM members WHERE members.users_id = ? AND members.groups_id = ? ;",
    [user_id, groupe_id]
  );
};

/**
Find all group messages by group slug
*/
module.exports.findAllByGroupSlug = function (slug) {
  var sql  = "SELECT users.*, members.status AS member_status FROM users ";
  sql += "JOIN members ON members.users_id = users.id ";
  sql += "JOIN groups ON groups.users_id = users.id ";
  sql += "WHERE groups.slug = ? ;";
  return db.findAll(sql, [slug]);
};

/**
Find all group messages by group id
*/
module.exports.findAllByGroupId = function (groupId) {
  var sql  = "SELECT users.*, members.status AS member_status FROM users ";
  sql += "JOIN members ON members.users_id = users.id ";
  sql += "JOIN groups ON groups.users_id = users.id ";
  sql += "WHERE groups.id = ? ;";
  return db.findAll(sql, [groupId]);
};

/**
 * Get Members
 */
module.exports.getOneMember = function (users_id, groups_id) {
  return db.findOne(
    "SELECT * FROM members WHERE members.users_id = ? AND members.groups_id = ? ; ",
    [users_id, groups_id]
  );
};

/**
 * Accept member in group
 */
module.exports.accept = function (users_id, groups_id) {
  return db.update(
    "UPDATE members SET status = 'accepted' WHERE members.users_id = ? AND members.groups_id = ? ; ",
    [users_id, groups_id]
  );
};

/**
 * Refuse Member
 */
module.exports.refuse = function (users_id, groups_id) {
  return db.delete(
    "DELETE FROM members WHERE members.users_id = ? AND members.groups_id = ? ; ",
    [users_id, groups_id]
  );
};

