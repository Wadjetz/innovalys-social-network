var db = require('../config/database');

/**
Find all news by page
*/
module.exports.getAll = function (page) {
  return db.findAll(
    "SELECT * FROM messages ; ",
    []
  );
};

/**
Find one message by id
*/
module.exports.getById = function (id) {
  return db.findOne(
    "SELECT * FROM messages WHERE messages.id = ? ;",
    [id]
  );
};

/**
Create message
*/
module.exports.create = function (message) {
  return db.insert(
    "INSERT INTO messages SET ? ; ",
    [message]
  );
};
