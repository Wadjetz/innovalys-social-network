/** User Model
 * @module server/user/user-model
 */
var db = require('../config/database');

/**
 * User's status connection
 * @type {Object}
 */
module.exports.status_connection = {
  OFFLINE: "offline",
  ONLINE: "online",
  BUSY: "busy",
  ABSENT: "absent"
};

/**
 * User's roles
 * @type {Object}
 */
module.exports.roles = {
  ADMIN: "admin",
  RH: "rh",
  CHEF: "chef",
  USER: "user"
};

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
 * Find all users
 * @param  {User} user User object
 * @return {promise}      List of users
 */
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

/**
 * Find users by room id
 * @param  {number} roomId Chat Room id
 * @return {promise}        List of user
 */
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

/**
 * Find user by id
 * @param  {number} id User id
 * @return {promise}    User object
 */
module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT " +
      makeSqlUserSelect() +
    "FROM users WHERE id = ? ;",
    [id]
  );
};

/**
 * Find user by email
 * @param  {string} email Email
 * @return {promise}       User object
 */
module.exports.findOneByEmail = function (email) {
  return db.findOne(
    "SELECT * FROM users WHERE email = ? ;",
    [email]
  );
};

/**
 * Create new user
 * @param  {User} user User object
 * @return {promise}      Insert result
 */
module.exports.create = function (user) {
  return db.insert(
    "INSERT INTO users SET ? ;",
    [user]
  );
};

/**
 * Change user's password
 * @param  {User} user        User object
 * @param  {string} newPassword new password
 * @return {promise}             Update result
 */
module.exports.changePassword = function (user, newPassword) {
  return db.update(
    "UPDATE users SET ? WHERE users.id = ?",
    [newPassword, user.id]
  );
};

/**
 * User connection
 * @param  {number} id User id
 * @return {promise}    Update result
 */
module.exports.connect = function (id) {
  return db.update(
    "UPDATE users SET users.status_connection = 'online' WHERE users.id = ? ; ",
    [id]
  );
};

/**
 * User deconnection
 * @param  {number} id User id
 * @return {promise}    Update result
 */
module.exports.deconnect = function (id) {
  return db.update(
    "UPDATE users SET users.status_connection = 'offline' WHERE users.id = ? ; ",
    [id]
  );
};

/**
 * Update users
 * @param  {number} id   User id
 * @param  {User} user User object
 * @return {promise}      Update result
 */
module.exports.update = function (id, user) {
  return db.update(
    "UPDATE users SET ? WHERE users.id = ? ; ",
    [user, id]
  );
};

/**
 * Delete users
 * @param  {number} id User id
 * @return {promise}    Delete result
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM users WHERE users.id = ? ; ",
    [id]
  );
};
