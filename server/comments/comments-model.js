/** Comment Model
 * @module server/comments/comments-model
 */
var db = require('../config/database');

/**
 * Find All comments by news slug
 * @param  {string} slug Slug of news
 * @param  {number} page Page
 * @return {promise}      List of news comments
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
};

/**
 * Find comment by id
 * @param  {number} comment_id Comment id
 * @return {promise}           Comment object
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
 * Create new comment
 * @param  {Comment} comment Comment object
 * @return {promise}         InsertResult
 */
module.exports.create = function (comment) {
  return db.insert(
    "INSERT INTO comments SET ? ;",
    [comment]
  );
};

/**
 * Update comment
 * @param  {number} id      Comment id
 * @param  {Comment} comment Comment object
 * @return {promise}         UpdateResult
 */
module.exports.update = function (id, comment) {
  return db.update(
    "UPDATE comments SET ? WHERE comments.id = ? ;",
    [comment, id]
  );
};

/**
 * Delete comment by id
 * @param  {number} id Comment id
 * @return {promise}    DeleteResult
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM comments WHERE comments.id = ? ;",
    [id]
  );
};
