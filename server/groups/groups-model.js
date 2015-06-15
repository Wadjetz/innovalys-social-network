var db = require('../config/database');
var Q = require('q');

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
    "SELECT * FROM groups WHERE groups.slug = ? ;",
    [slug]
  );
};

/**
Find all groups
*/
module.exports.findAll = function (page) {
  return db.findAll(
    "SELECT * FROM groups ORDER BY groups.created DESC LIMIT 10 OFFSET ?; ",
    [page]
  );
};

/**
Find all my groups
*/
module.exports.findMyGroups = function (user) {
  var sql  = "SELECT groups.*, members.status AS members_status ";
      sql += "FROM groups ";
      sql += "JOIN members ON members.groups_id = groups.id "
      sql += "WHERE members.users_id = ? ;"
  return db.findAll(sql, [user.id]);
};

module.exports.groupsStatus = {
    open: 'open',
    close: 'close'
};

module.exports.groupsAccess = {
    private: 'private',
    public: 'public'
}

module.exports.groupsTypes = {
    project: 'project',
    discussion: 'discussion',
    other: 'other'
}

module.exports.update = function (comment, callback) {
    // TODO
    callback(null);
};

module.exports.delete = function (id, callback) {
    // TODO
    callback(null);
};
