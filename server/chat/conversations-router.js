var router = require("express").Router();
var validate = require("validate.js");
var moment = require('moment');
var UserModel = require('../user/user-model');
var MessagesModel = require('./messages-model');
var ConversationsModel = require('./conversations-model');
var auth = require('../config/auth');
validate.moment = moment;

/**
GET /chat/conversations
Get my conversations
*/
function getMyConversationsAction (req, res) {
  var user = req.$user;
  // TODO implement pagination
  ConversationsModel.findAll(0, user)
    .then(function (conversations) {
      res.json(conversations);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.get('/', auth.withUser, getMyConversationsAction);

function conversationValidator(req, res, next) {
  console.log(req.body);
  var newConversation = {
    target_id: req.body.target_id,
    status: req.body.status,
    type: req.body.type
  };
  // TOTO Move this in commun module
  var constraints = {
    target_id: {
      presence: true,
    },
    status: {
      presence: true
    },
    type: {
      presence: true
    }
  };
  var validatorRes = validate(newConversation, constraints);
  if (validatorRes === undefined) {
    req._newConversation = newConversation;
    next();
  } else {
    res.status(400).json(validatorRes);
  }
}

/**
POST /chat/conversations
Create new conversation
*/
function createConversationsAction (req, res) {
  var user = req.$user;
  var newConversation = req._newConversation;
  ConversationsModel
    .create({
      status: newConversation.status,
      type: newConversation.type
    })
    .then(function (conversationInsertedId) {
      return ConversationsModel
        .addUser({
          conversations_id: conversationInsertedId,
          users_id: newConversation.target_id
        })
        .then(function (addTargetInsertedId) {
          return ConversationsModel
            .addUser({
              conversations_id: conversationInsertedId,
              users_id: user.id
            })
            .then(function (addMeInsertedId) {
              return ConversationsModel.findById(conversationInsertedId)
            });
        });
    })
    .then(function (conversation) {
      UserModel
        .findByConversationId(conversation.id)
        .then(function (users) {
          res.json({
            conversation: conversation,
            users: users
          });
        })
        .fail(function (err) {
          res.status(400).json(err);
        });
    })
    .fail(function (err) {
      res.status(400).json(err);
    });
}
router.post('/', conversationValidator, auth.withUser, createConversationsAction);

module.exports = router;
