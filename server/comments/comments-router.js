var router = require("express").Router();
var commentsModel = require('./comments-model');
var moment = require('moment');

var UserModel = require('../user/user-model');
var auth = require('../config/auth');

var validate = require("validate.js");
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
    //console.log("comments route create", comment, "user", user);
    commentsModel.create(comment, function (createErr, insertedId) {
        //console.log("comment create", "createErr", createErr, "insertedId", insertedId);
        if (createErr) {
            res.sendStatus(500).json(createErr);
        } else if (insertedId) {
            commentsModel.findOneById(insertedId, function (findErr, findRes) {
                if (findErr) {
                    res.sendStatus(500).json(findErr);
                } else {
                    res.json(findRes);
                }
            });
        } else {
            res.sendStatus(400).json(insertedId);
        }
    });
});

router.get('/news/:news_id', auth.withUser, function (req, res) {
    var news_id = req.params.news_id;
    var page = req.query.page || 0;
    //console.log("news_id", news_id, "page", page);
    commentsModel.findAllByNewsId(news_id, page, function (err, comments) {
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
    commentsModel.findOneById(comment_id, function (findErr, findRes) {
        console.log("Comments.delete.findById", comment_id, "findErr", findErr, "findRes", findRes);
        res.json(findRes);
    });
});

module.exports = router;
