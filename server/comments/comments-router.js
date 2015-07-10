var router        = require("express").Router();
var moment        = require('moment');
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
    req._new_comment = newComment;
    next();
  } else {
    res.status(400).json({
      error: true,
      message: validatorRes
    });
  }
}

/**
POST /comments
Create comment
*/
function postCreateCommentAction (req, res) {
  var user = req.$user;
  var comment = req._new_comment;
  comment.users_id = user.id;
  NewsModel.findOneById(comment.news_id)
    .then(function (news) {
      return CommentsModel.create(comment);
    })
    .then(function (createdId) {
      return CommentsModel.findOneById(createdId);
    })
    .then(function (comment) {
      res.json(comment);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.post('/', commentsValidator, auth.withUser, postCreateCommentAction);

/**
GET /comments/news/:slug
Get all comments by news slug
*/
function getCommentsByNewsSlug (req, res) {
  var slug = req.params.slug;
  var page = req.query.page || 0;
  CommentsModel.findAllByNewsSlug(slug, page)
    .then(function (comments) {
      res.json(comments);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.get('/news/:slug', auth.withUser, getCommentsByNewsSlug);

router.delete('/:comment_id', auth.withUser, function (req, res) {
  var user = req.$user;
  var comment_id = req.params.comment_id;
  CommentsModel.findOneById(comment_id).then(function (comment) {
    return CommentsModel.delete(comment.id);
  }).then(function (result) {
    res.json(result);
  }).fail(function (err) {
    res.status(404).json(err);
  });
});

module.exports = router;
