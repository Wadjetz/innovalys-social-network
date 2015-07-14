/** Rooms Model
 * @module server/chat/rooms-model
 */
var db = require('../config/database');

/**
 * Find all my rooms
 * @param  {User} user User Object
 * @return {promise}      List of rooms
 */
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

/**
 * Create new chat room
 * @param  {Room} room Chat room object
 * @return {promise}      InsertResult
 */
module.exports.create = function (room) {
  return db.insert(
    "INSERT INTO rooms SET ? ;",
    [room]
  );
};

/**
 * Add user into room
 * @param {User} user User object
 */
module.exports.addUser = function (user) {
  return db.insert(
    "INSERT INTO rooms_users SET ? ;",
    [user]
  );
};

/**
 * Find chat room by id
 * @param  {number} id Room Id
 * @return {promise}    Room object
 */
module.exports.findById = function (id) {
  return db.findOne(
    "SELECT * FROM rooms WHERE rooms.id = ? ; ",
    [id]
  );
};

/**
 * Find chat room by name
 * @param  {string} name Room name
 * @return {promise}      Room object
 */
module.exports.findOneByName = function (name) {
  return db.findOne(
    "SELECT * FROM rooms WHERE rooms.name = ? ; ",
    [name]
  );
};

/**
 * Delete chat room
 * @param  {number} id Room Id
 * @return {promise}    DeleteResult
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM rooms WHERE rooms.id = ? ; ",
    [id]
  );
};
