var router = require("express").Router();
var newsModel = require('./news-model');
var moment = require('moment');
var utils = require('../../commun/utils');
var UserModel = require('../user/user-model');

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
    newsModel.findOneBySlug(slug, function (err, news) {
        if (err) res.sendStatus(500).json(err); // TODO remove private information
        else if (news === undefined || news === null) ;
        else if (news.length > 0) res.json(news[0]);
        else res.sendStatus(405);
    });
});

module.exports = router;
