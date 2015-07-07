var db = require('../config/database');

/**
Find one news by id
*/
module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT * FROM news WHERE news.id = ?",
    [id]
  );
};

/**
Find one news by slug
*/
module.exports.findOneBySlug = function (slug) {
  return db.findOne(
    "SELECT * FROM news WHERE news.slug = ?",
    [slug]
  );
};

/**
Find all news by page
*/
module.exports.findAllNews = function (page) {
  return db.findAll(
    "SELECT * FROM news ORDER BY news.created DESC LIMIT 10 OFFSET ? ; ",
    [page]
  );
};

/**
Find all published news by page
*/
module.exports.findAllPunlishedNews = function (page) {
  return db.findAll(
    "SELECT * FROM news WHERE news.publish < NOW() ORDER BY news.created DESC LIMIT 10 OFFSET ? ; ",
    [page]
  );
};

/**
 * Create news
 */
module.exports.create = function (news) {
  return db.insert(
    "INSERT INTO news SET ? ;",
    [news]
  );
};

/**
 * Update news
 */
module.exports.update = function (id, news) {
  return db.update(
    "UPDATE news SET ? WHERE news.id = ? ; ",
    [news, id]
  );
};

/**
 * Delete news
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM news WHERE news.id = ? ; ",
    [id]
  );
};
