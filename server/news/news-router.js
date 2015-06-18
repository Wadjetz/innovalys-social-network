var router = require("express").Router();
var moment = require('moment');
var validate = require("validate.js");
var NewsModel = require('./news-model');
var utils = require('../../commun/utils');
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
  NewsModel.findAllNews(page)
    .then(function (news) {
      res.json(news);
    })
    .fail(function (err) {
      res.status(500).json(err);
    });
}
router.get('/', auth.withUser, getAllNewsAction);

function newsValidator (req, res, next) {
  var news = {
    slug: utils.slug(req.body.title),
    title: req.body.title,
    body: req.body.body,
    publish: moment(req.body.publish, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS")
  };
  // TOTO Move this in commun module
  var constraints = {
    title: {
      presence: true,
    },
    body: {
      presence: true,
    },
    publish: {
      presence: true,
    }
  };
  var validatorRes = validate(news, constraints);
  if (validatorRes === undefined) {
    req._new_news = news;
    next();
  } else {
    res.status(400).json({
      error: true,
      message: validatorRes
    });
  }
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
router.post('/', newsValidator, auth.withRole([UserModel.roles.RH]), postCreateNewsAction);

module.exports = router;
