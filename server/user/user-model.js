var db = require('../config/database');

module.exports.status_connection = {
  OFFLINE: "offline",
  ONLINE: "online",
  BUSY: "busy",
  ABSENT: "absent"
};

module.exports.roles = {
  ADMIN: "admin",
  RH: "rh",
  CHEF: "chef",
  USER: "user"
};

module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT * FROM users WHERE id = ? ;",
    [id]
  );
};

module.exports.findOneByEmail = function (email) {
  return db.findOne(
    "SELECT * FROM users WHERE email = ? ;",
    [email]
  );
};

module.exports.create = function (user) {
  return db.insert(
    "INSERT INTO users SET ? ;",
    [user]
  );
};
