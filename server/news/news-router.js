/** News Router
 * @module server/news/news-router
 */
var router = require("express").Router();
var moment = require('moment');
var validate = require("validate.js");
var NewsModel = require('./news-model');
var utils = require('../../commun/utils');
var NewsValidator = require('../../commun/news-validator');
var UserModel = require('../user/user-model');
var auth = require('../config/auth');
validate.moment = moment;

/**
 * Get news by slug
 * GET /news/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getNewsBySlugAction (req, res) {
  var slug = req.params.slug;
  NewsModel.findOneBySlug(slug).then(function (news) {
    res.json(news);
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.get('/:slug', auth.withUser, getNewsBySlugAction);

/**
 * Get all news
 * GET /news
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getAllNewsAction (req, res) {
  var page = req.query.page || 0;
  NewsModel.findAllPunlishedNews(page).then(function (news) {
    res.json(news);
  }).fail(function (err) {
    res.status(500).json(err);
  });
}
router.get('/', auth.withUser, getAllNewsAction);

/**
 * News Validator middleware
 * @param  {request} req request
 * @param  {result} res result
 * @param  {Function} next Next middleware
 * @return {void}
 */
function newsValidator (req, res, next) {
  NewsValidator.newsValidate({
    slug: utils.slug(req.body.title || ""),
    title: req.body.title,
    body: req.body.body,
    publish: moment(req.body.publish, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS")
  }).then(function (news) {
    req._new_news = news;
    next();
  }).fail(function (err) {
    res.status(400).json(err);
  });
}

/**
 * Create news
 * POST /news
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function postCreateNewsAction (req, res) {
  var user = req.$user;
  var news = req._new_news;
  news.users_id = user.id;
  NewsModel.create(news).then(function () {
    res.status(201).json({
      message: "News Created"
    });
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.post('/', auth.withRole([UserModel.roles.RH]), newsValidator, postCreateNewsAction);

/**
 * Update news
 * Permissions: RH, Admin
 * PUT /news/:id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function updateNewsAction (req, res) {
  var news = req._new_news;
  var id = req.params.id;
  NewsModel.findOneById(id).then(function (article) {
    return NewsModel.update(article.id, news);
  }).then(function (result) {
    console.log(result);
    return NewsModel.findOneById(id);
  }).then(function (updatedNews) {
    res.json(updatedNews);
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.put('/:id', auth.withRole([UserModel.roles.RH]), newsValidator, updateNewsAction);

/**
 * Delete news
 * Permissions: RH, Admin
 * DELETE /news/:id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function deleteNewsAction(req, res) {
  var id = req.params.id;
  NewsModel.findOneById(id).then(function () {
    return NewsModel.delete(id);
  }).then(function (result) {
    res.json({ "delete": result });
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.delete('/:id', auth.withRole([UserModel.roles.RH]), deleteNewsAction);

module.exports = router;
