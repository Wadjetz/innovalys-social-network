/** News Model
 * @module server/news/news-model
 */
var db = require('../config/database');

/**
 * Find one news by id
 * @param  {number} id News id
 * @return {promise}    News object
 */
module.exports.findOneById = function (id) {
  return db.findOne(
    "SELECT * FROM news WHERE news.id = ?",
    [id]
  );
};

/**
 * Find one news by slug
 * @param  {string} slug News slug
 * @return {promise}      News object
 */
module.exports.findOneBySlug = function (slug) {
  return db.findOne(
    "SELECT * FROM news WHERE news.slug = ?",
    [slug]
  );
};

/**
 * Find all news by page
 * @param  {number} page Page
 * @return {promise}      List of news
 */
module.exports.findAllNews = function (page) {
  return db.findAll(
    "SELECT * FROM news ORDER BY news.created DESC LIMIT 10 OFFSET ? ; ",
    [page]
  );
};

/**
 * Find all published news by page
 * @param  {number} page Page
 * @return {promise}      List of news
 */
module.exports.findAllPunlishedNews = function (page) {
  return db.findAll(
    "SELECT * FROM news WHERE news.publish < NOW() ORDER BY news.created DESC LIMIT 10 OFFSET ? ; ",
    [page]
  );
};

/**
 * Create news
 * @param  {News} news News object
 * @return {promise}      Insert result
 */
module.exports.create = function (news) {
  return db.insert(
    "INSERT INTO news SET ? ;",
    [news]
  );
};

/**
 * Update news
 * @param  {number} id   News id
 * @param  {News} news News object
 * @return {promise}      Update result
 */
module.exports.update = function (id, news) {
  return db.update(
    "UPDATE news SET ? WHERE news.id = ? ; ",
    [news, id]
  );
};

/**
 * Delete news
 * @param  {number} id News id
 * @return {promise}    Delete result
 */
module.exports.delete = function (id) {
  return db.delete(
    "DELETE FROM news WHERE news.id = ? ; ",
    [id]
  );
};
