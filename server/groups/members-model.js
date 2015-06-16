var db = require('../config/database');
var Q = require('q');

/**
Create group messages
*/
module.exports.create = function (userId, groupeId) {
  var members = {
    users_id: userId,
    groups_id: groupeId
  }
  var sql = "INSERT INTO members SET ? ;";
  var data = [members];
  return db.insert(sql, data);
};

/**
Find all group messages by group id and status
*/
module.exports.findByStatus = function (groupeId, status) {
  var sql = "SELECT " +
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
              "AND members.status = ? ;";
  var data = [groupeId, status];
  return db.findAll(sql, data);
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
