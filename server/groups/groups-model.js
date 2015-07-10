var db = require('../config/database');
var Q = require('q');

function makeSqlUserSelect() {
  return " " +
    "users.email AS users_email, " +
    "users.role AS users_role, " +
    "users.first_name AS users_first_name, " +
    "users.last_name AS users_last_name, " +
    "users.birthday_date AS users_birthday_date, " +
    "users.status_profile AS users_status_profile, " +
    "users.status_connection AS users_status_connection, " +
    "users.function AS users_function, " +
    "users.adress AS users_adress, " +
    "users.description AS users_description, " +
    "users.arrival_date AS users_arrival_date, " +
    "users.last_connection AS users_last_connection ";
}

/**
Create new group
*/
module.exports.create = function (group) {
  return db.insert(
    "INSERT INTO groups SET ?; ",
    [group]
  );
};

/**
Find groupe by id
*/
module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT * FROM groups WHERE groups.id = ? ;",
    [id]
  );
};

/**
Find groupe by slug
*/
module.exports.findOneBySlug = function (slug) {
  return db.findOne(
    "SELECT groups.*, " + 
      makeSqlUserSelect() + 
    "FROM groups JOIN users ON groups.users_id = users.id " +
    "WHERE groups.slug = ? ;",
    [slug]
  );
};

/**
Find all groups
*/
module.exports.findAll = function (page) {
  return db.findAll(
    "SELECT * " +
    "FROM groups " +
    "ORDER BY groups.created " +
    "DESC LIMIT 10 OFFSET ?; ",
    [page]
  );
};

/**
Find all not my groups
*/
module.exports.findAllNotMyGroups = function (page, user) {
  return db.findAll(
    "SELECT groups.* " +
    "FROM groups " +
    "WHERE groups.access != 'private' AND 0 = ( " +
      "SELECT count(*) " +
        "FROM members " +
        "WHERE members.groups_id = groups.id " +
          "AND members.users_id = ?" +
    ") " +
    "ORDER BY groups.created " +
    "DESC LIMIT 50 OFFSET ? ; ",
    [user.id, page]
  );
};

/**
Find all my groups
*/
module.exports.findMyGroups = function (user) {
  return db.findAll(
    "SELECT groups.*, members.status AS members_status " +
    "FROM groups " +
    "JOIN members ON members.groups_id = groups.id " +
    "WHERE members.users_id = ? ;",
    [user.id]
  );
};

module.exports.groupsStatus = {
  open: 'open',
  close: 'close'
};

module.exports.groupsAccess = {
  private: 'private',
  public: 'public'
};

module.exports.groupsTypes = {
  project: 'project',
  discussion: 'discussion',
  other: 'other'
};

module.exports.update = function (id, group) {
  return db.update(
    "UPDATE posts SET ? WHERE groups.id = ? ; ",
    [group, id]
  );
};

module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM groups WHERE groups.id = ? ;",
    [id]
  );
};
