var router = require("express").Router();
var newsModel = require('./news-model');
var moment = require('moment');
var async = require('async');
var utils = require('../../commun/utils');
var UserModel = require('../user/user-model');
var CommentsModel = require('../comments/comments-model');

var auth = require('../config/auth');

var validate = require("validate.js");
validate.moment = moment;

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
        //console.log("signupValidator", validatorRes, newComment);
        req._new_news = news;
        next();
    } else {
        res.status(400).json({
            error: true,
            message: validatorRes
        });
    }
}

router.post('/', newsValidator, auth.withRole([UserModel.roles.RH]), function(req, res) {
    var user = req.$user;
    var news = req._new_news;
    //console.log("news route create", "news", news, "user", user);
    news.users_id = user.id;
    newsModel.create(news, function (err, results, fields) {
        //console.log("news route create", "err", err, "results", results);
        if (err) {
            res.status(500).json(err);
        } else if (results) {
            // TODO get news from database
            res.status(201).json(results);
        } else {
            res.status(400)
        }
    });
});

router.get('/', auth.withUser, function (req, res) {
    var page = req.query.page || 0;
    newsModel.findAllNews(page, function (err, news, fields) {
        if (err) {
            res.sendStatus(500).json(err);
        } else {
            res.json(news)
        }
    });
});

router.get('/:slug', auth.withUser, function (req, res) {
    var slug = req.params.slug;
    async.waterfall([
        function (callback) {
            newsModel.findOneBySlug(slug, function (err, news) {
                callback(err, news);
            });
        },
        function (news, callback) {
            CommentsModel.findAllByNewsId(news.id, 0, function (err, comments) {
                callback(err, {
                    news: news,
                    comments: comments
                });
            });
        }
    ], function (err, result) {
        if (err) res.sendStatus(500).json(err);
        else if (result) {
            var article = result.news;
            article.comments = result.comments;
            res.json(article);
        }
        else res.sendStatus(404);
    });
});

module.exports = router;
