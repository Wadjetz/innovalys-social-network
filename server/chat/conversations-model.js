var db = require('../config/database');

module.exports.findAll = function (page, user) {
  return db.findAll(
    "SELECT conversations.* " +
    "FROM conversations " +
    "WHERE 0 < ( " +
      "SELECT count(*) " +
      "FROM conversations_users " +
      "WHERE conversations_users.conversations_id = conversations.id " +
        "AND conversations_users.users_id = 15 " +
    ") ; ",
    []
  );
};



module.exports.create = function (conversation) {
  return db.insert(
    "INSERT INTO conversations SET ? ;",
    [conversation]
  );
};

module.exports.addUser = function (conversationUser) {
  return db.insert(
    "INSERT INTO conversations_users SET ? ;",
    [conversationUser]
  );
};

module.exports.findById = function (id) {
  return db.findOne(
    "SELECT * FROM conversations WHERE conversations.id = ? ; ",
    [id]
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
