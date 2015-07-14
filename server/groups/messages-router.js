/** Group Message Router
 * @module server/groups/messages-router
 */
var router = require("express").Router();
var moment = require('moment');
var validate = require("validate.js");
var auth = require('../config/auth');
var GroupsModel = require('./groups-model');
var MessagesModel = require('./messages-model');
validate.moment = moment;

/**
 * Get groups messages by slug
 * GET /groups/messages/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getMessagesGroups (req, res) {
  var slug = req.params.slug;
  MessagesModel.findAllByGroupSlug(slug, 0).then(function (messages) {
    res.json(messages);
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
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
};

/**
 * Create a message group
 * POST /groups/messages/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
var createMessageGroup = function (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    var newMessage = req._new_message;
    newMessage.users_id = user.id;
    newMessage.groups_id = group.id;
    MessagesModel.create(newMessage).then(function (created_id) {
      return MessagesModel.findById(created_id);
    }).then(function (created_group) {
      res.json(created_group);
    }).fail(function (err) {
      res.status(400).json(err);
    });
  }).fail(function (err) {
    res.status(404).json(err);
  });
};
router.post('/:slug', auth.withUser, messageGroupValidator, createMessageGroup);

/**
 * Delete a message group
 * DELETE /groups/messages/:id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function deleteMessageGroupAction(req, res) {
  var id = req.params.id;
  MessagesModel.delete(id).then(function (result) {
    res.json({
      "deleted": result
    });
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.delete('/:id', auth.withUser, deleteMessageGroupAction);

module.exports = router;
