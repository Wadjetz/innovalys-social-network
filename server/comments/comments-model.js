var db = require('../config/database');

/**
Find All comments by news slug
*/
module.exports.findAllByNewsSlug = function (slug, page) {
  return db.findAll(
    "SELECT " +
      "comments.*, " +
      "users.email, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function " +
    "FROM comments " +
    "JOIN news ON news.id = comments.news_id " +
    "JOIN users ON users.id = comments.users_id " +
    "WHERE slug = ? " +
    "ORDER BY comments.created ASC ; ",
    [slug]
  );
}

/**
Find comment by id
*/
module.exports.findOneById = function (comment_id) {
  return db.findOne(
    "SELECT comments.*, " +
      "users.email, " +
      "users.status_profile, " +
      "users.status_connection, " +
      "users.function " +
    "FROM comments JOIN users ON comments.users_id = users.id " +
    "WHERE comments.id = ? ;",
    [comment_id]
  );
};

/**
Create comment
*/
module.exports.create = function (comment) {
  return db.insert(
    "INSERT INTO comments SET ? ;",
    [comment]
  );
};

/**
 * Update comment
 */
module.exports.update = function (id, comment) {
  return db.update(
    "UPDATE comments SET ? WHERE comments.id = ? ;",
    [comment, id]
  );
};

/**
Delete comment by id
*/
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM comments WHERE comments.id = ? ;",
    [id]
  );
};
