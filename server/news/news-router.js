var router = require("express").Router();
var newsModel = require('./news-model');
var moment = require('moment');
var utils = require('../../commun/utils');
var UserModel = require('../user/user-model');

var auth = require('../config/auth');

router.post('/', auth.withRole([UserModel.roles.RH]), function(req, res) {
    // TODO validate data
    // TODO validate date moment.isValid()
    var user = req.$user;
    var news = {
        slug: utils.slug(req.body.title),
        title: req.body.title,
        body: req.body.body,
        publish: moment(req.body.publish, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS"),
        users_id: user.id
    };
    //console.log("news route create", "news", news, "user", user);
    newsModel.create(news, function (err, results, fields) {
        if (err) res({error: err});
        res.json({"affectedRows": results.affectedRows});
    });
});

router.get('/', auth.withUser, function (req, res) {
    // TODO validate data
    var page = req.query.page;
    newsModel.findAllNews(page, function (err, news, fields) {
        if (err) res({error: err});
        else if (news === undefined) res.json([]);
        else res.json(news);
    });
});

router.get('/:slug', auth.withUser, function (req, res) {
    // TODO validate data
    var slug = req.params.slug;
    newsModel.findOneBySlug(slug, function (err, news) {
        if (err) res.sendStatus(500).json(err); // TODO remove private information
        else if (news === undefined || news === null) ;
        else if (news.length > 0) res.json(news[0]);
        else res.sendStatus(405);
    });
});

module.exports = router;
