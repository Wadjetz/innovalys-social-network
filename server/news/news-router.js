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
GET /news/:slug
Get news by slug
*/
function getNewsBySlugAction (req, res) {
  var slug = req.params.slug;
  NewsModel.findOneBySlug(slug)
    .then(function (news) {
      res.json(news);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.get('/:slug', auth.withUser, getNewsBySlugAction);

/**
GET /news
Get all news
*/
function getAllNewsAction (req, res) {
  var page = req.query.page || 0;
  NewsModel.findAllPunlishedNews(page)
    .then(function (news) {
      res.json(news);
    })
    .fail(function (err) {
      res.status(500).json(err);
    });
}
router.get('/', auth.withUser, getAllNewsAction);

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
POST /news
Create news
*/
function postCreateNewsAction (req, res) {
  var user = req.$user;
  var news = req._new_news;
  news.users_id = user.id;
  NewsModel.create(news)
    .then(function (newsId) {
      res.status(201).json({
        message: "News Created"
      })
    })
    .fail(function (err) {
      res.status(400).json(err);
    });
}
router.post('/', auth.withRole([UserModel.roles.RH]), newsValidator, postCreateNewsAction);

/**
 * PUT /news/:id
 * Update news
 * Permissions: RH, Admin
 */
function updateNewsAction (req, res) {
  var user = req.$user;
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
 * DELETE /news/:id
 * Delete news
 * Permissions: RH, Admin
 */
function deleteNewsAction(req, res) {
  var user = req.$user;
  var id = req.params.id;
  NewsModel.findOneById(id).then(function (article) {
    return NewsModel.delete(id);
  }).then(function (result) {
    res.json({ "delete": result });
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.delete('/:id', auth.withRole([UserModel.roles.RH]), deleteNewsAction);

module.exports = router;
