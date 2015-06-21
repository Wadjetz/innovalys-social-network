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

module.exports.findAll = function (user) {
  return db.findAll(
    "SELECT " +
      "users.id, " +
      "users.email, " +
      "users.role, " +
      "users.first_name, " +
      "users.last_name, " +
      "users.birthday_date, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function, " +
      "users.description, " +
      "users.arrival_date, " +
      "users.last_connection " +
    "FROM users " +
    "WHERE users.id != ?",
    [user.id]
  );
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

module.exports.changePassword = function (user, newPassword) {
  return db.update(
    "UPDATE users SET ? WHERE users.id = ?",
    [newPassword, user.id]
  );
}
