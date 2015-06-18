var db = require('../config/database');

/**
Find All comments by news slug
*/
module.exports.findAllByNewsSlug = function (slug, page) {
  var sql  = "SELECT ";
      sql += "comments.id, ";
      sql += "comments.content, ";
      sql += "comments.created, ";
      sql += "comments.updated, ";
      sql += "users.id AS user_id, ";
      sql += "users.email, ";
      sql += "users.status_profile, ";
      sql += "users.status_connection, ";
      sql += "users.function ";
      sql += "FROM comments ";
      sql += "JOIN news ON news.id = comments.news_id ";
      sql += "JOIN users ON users.id = comments.users_id ";
      sql += "WHERE slug = ? ; ";
  return db.findAll(sql, [slug]);
}

/**
Find comment by id
*/
module.exports.findOneById = function (comment_id) {
  var sql = "SELECT comments.id, comments.content, comments.created, comments.updated, ";
  sql += "users.id AS user_id, users.email, users.status_profile, users.status_connection, users.function ";
  sql += "FROM comments JOIN users ON comments.users_id = users.id WHERE comments.id = ? ;";
  return db.findOne(sql, [comment_id]);
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

// TODO update

/**
Delete comment by id
*/
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM comments WHERE comments.id = ? ;",
    [id]
  );
};
