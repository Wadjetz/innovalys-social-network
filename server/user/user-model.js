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
    "users.description, " +
    "users.arrival_date, " +
    "users.last_connection ";
}

module.exports.findAll = function (user) {
  return db.findAll(
    "SELECT " +
      makeSqlUserSelect() +
    "FROM users " +
    "WHERE users.id != ? " +
    "ORDER BY users.status_connection DESC ; ",
    [user.id]
  );
};

module.exports.findByRoomId = function (roomId) {
  return db.findAll(
    "SELECT " +
      makeSqlUserSelect() +
    "FROM users " +
      "JOIN rooms_users ON rooms_users.users_id = users.id " +
    "WHERE rooms_users.rooms_id = ? ; ",
    [roomId]
  );
};

module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT " +
      makeSqlUserSelect() +
    "FROM users WHERE id = ? ;",
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
};

module.exports.connect = function (id) {
  return db.update(
    "UPDATE users SET users.status_connection = 'online' WHERE users.id = ? ; ",
    [id]
  );
};

module.exports.deconnect = function (id) {
  return db.update(
    "UPDATE users SET users.status_connection = 'offline' WHERE users.id = ? ; ",
    [id]
  );
};

/**
 * Update users
 */
module.exports.update = function (id, user) {
  return db.update(
    "UPDATE users SET ? WHERE users.id = ? ; ",
    [user, id]
  );
};

/**
 * Delete users
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM users WHERE users.id = ? ; ",
    [id]
  );
};

