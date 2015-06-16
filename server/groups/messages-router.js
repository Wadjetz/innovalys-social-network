var router = require("express").Router();
var moment = require('moment');
var validate = require("validate.js");
var auth = require('../config/auth');
var GroupsModel = require('./groups-model');
var GroupsFilesModel = require('./groups-files-model');
var MessagesModel = require('./messages-model');
validate.moment = moment;

/**
GET /groups/messages/:slug
Get groups messages by slug
*/
function getMessagesGroups (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  MessagesModel.findAllByGroupSlug(slug, 0)
    .then(function (messages) {
      res.json(messages);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
};
router.get('/:slug', auth.withUser, getMessagesGroups);

/**
Message group validator
*/
var messageGroupValidator = function (req, res, next) {
  var newMessage = {
    content: req.body.content
  };

  var constraints = {
    content: {
      presence: true,
    }
  };

  var validatorRes = validate(newMessage, constraints);
  if (validatorRes === undefined) {
    req._new_message = newMessage;
    next();
  } else {
    res.status(400).json({
      error: true,
      message: validatorRes
    });
  }
}

/**
POST /groups/messages/:slug
Create a message group
*/
var createMessageGroup = function (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug)
    .then(function (group) {
      var newMessage = req._new_message;
      newMessage.users_id = user.id;
      newMessage.groups_id = group.id;
      MessagesModel.create(newMessage)
        .then(function (created_id) {
          return MessagesModel.findById(created_id);
        })
        .then(function (created_group) {
          res.json(created_group);
        })
        .fail(function (err) {
          res.status(400).json(err);
        })
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
};
router.post('/:slug', auth.withUser, messageGroupValidator, createMessageGroup);

/**
DELETE /groups/messages/:id
Delete a message group
*/
function deleteMessageGroupAction(req, res) {
  var user = req.$user;
  var id = req.params.id;
  MessagesModel.findById(id)
    .then(function (message) {
      res.json(message);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.delete('/:id', auth.withUser, deleteMessageGroupAction);

module.exports = router;
