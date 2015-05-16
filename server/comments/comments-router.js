var router        = require("express").Router();
var moment        = require('moment');
var async         = require('async');
var CommentsModel = require('./comments-model');
var NewsModel     = require('../news/news-model');
var UserModel     = require('../user/user-model');
var auth          = require('../config/auth');
var validate      = require("validate.js");

validate.moment = moment;

function commentsValidator (req, res, next) {

    var newComment = {
        content: req.body.content,
        news_id: req.body.news_id
    };

    // TOTO Move this in commun module
    var constraints = {
        content: {
            presence: true,
        },
        news_id: {
            presence: true,
        }
    };
    var validatorRes = validate(newComment, constraints);
    if (validatorRes === undefined) {
        //console.log("signupValidator", validatorRes, newComment);
        req._new_comment = newComment;
        next();
    } else {
        res.status(400).json({
            error: true,
            message: validatorRes
        });
    }
};

router.post('/', commentsValidator, auth.withUser, function (req, res) {
    var user = req.$user;
    var comment = req._new_comment;
    comment.users_id = user.id;
    async.waterfall([
        function (callback) {
            NewsModel.findOneById(comment.news_id, function (findErr, findRes) {
                console.log("findOneById", findErr, findRes);
                if (findRes) {
                    callback(null);
                } else if (findErr) {
                    callback(findErr);
                } else {
                    callback({error: "Article not found"}, null);
                }
            });
        },
        function (callback) {
            CommentsModel.create(comment, function (createErr, insertedId) {
                callback(createErr, insertedId);
            });
        },
        function (insertedId, callback) {
            CommentsModel.findOneById(insertedId, function (findErr, findRes) {
                callback(findErr, findRes);
            });
        }
    ], function (error, result) {
        console.log(error, result);
        if (error) {
            res.status(500).json(error);
        } else if (result) {
            res.json(result);
        } else {
            res.sendStatus(404)
        }
    });
});

router.get('/news/:slug', auth.withUser, function (req, res) {
    var slug = req.params.slug;
    var page = req.query.page || 0;
    //console.log("slug", slug, "page", page);
    CommentsModel.findAllByNewsSlug(slug, page, function (err, comments) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(comments);
        }
    });
});

router.delete('/:comment_id', auth.withUser, function (req, res) {
    var user = req.$user;
    var comment_id = req.params.comment_id;
    CommentsModel.findOneById(comment_id, function (findErr, findRes) {
        console.log("Comments.delete.findById", comment_id, "findErr", findErr, "findRes", findRes);
        res.json(findRes);
    });
});

module.exports = router;
