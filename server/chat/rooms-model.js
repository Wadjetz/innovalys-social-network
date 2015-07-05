var db = require('../config/database');

module.exports.findAll = function (user) {
  return db.findAll(
    "SELECT rooms.* " +
    "FROM rooms " +
    "WHERE 0 < ( " +
      "SELECT count(*) " +
      "FROM rooms_users " +
      "WHERE rooms_users.rooms_id = rooms.id " +
        "AND rooms_users.users_id = ? " +
    ") ; ",
    [user.id]
  );
};

module.exports.create = function (room) {
  return db.insert(
    "INSERT INTO rooms SET ? ;",
    [room]
  );
};

module.exports.addUser = function (user) {
  return db.insert(
    "INSERT INTO rooms_users SET ? ;",
    [user]
  );
};

module.exports.findById = function (id) {
  return db.findOne(
    "SELECT * FROM rooms WHERE rooms.id = ? ; ",
    [id]
  );
};

module.exports.findOneByName = function (name) {
  return db.findOne(
    "SELECT * FROM rooms WHERE rooms.name = ? ; ",
    [name]
  );
};

module.exports.delteUser = function (articleId, page, callback) {
    // TODO
    callback(null);
};

module.exports.update = function (comment, callback) {
    // TODO
    callback(null);
};

module.exports.delete = function (id, callback) {
    // TODO
    callback(null);
};