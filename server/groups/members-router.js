var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");
var async    = require('async');
var utils    = require('../../commun/utils');
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var RoomsModel = require('../chat/rooms-model');
var MembersModel = require('./members-model');
var UserModel    = require('../user/user-model');
var MessagesModel = require('./messages-model');

/**
POST /groups/members/join/:slug
Join group
*/
function postJoinGroupeAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    console.log("Join", group);
    RoomsModel.findOneByName(group.slug).then(function (room) {
      console.log("Join room", room);
      RoomsModel.addUser({
        rooms_id: room.id,
        users_id: user.id
      }).then(function (addUserInsertedId) {
        console.log("RoomsModel.addUser ok", addUserInsertedId);
      }).fail(function (err) {
        console.log("RoomsModel.addUser err", err);
      });
    }).fail(function (err) {
      console.log("RoomsModel.findOneByName err", err);
    });

    return MembersModel.create({
      users_id: user.id,
      groups_id: group.id
    });
  }).then(function (id) {
    res.json({
      "message": "ok"
    });
  }).fail(function (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
          error: "Already join"
      });
    } else {
      console.log(err);
      res.status(400).json(err);
    }
  });
}
router.post('/join/:slug', auth.withUser, postJoinGroupeAction);

/**
DELETE /groups/members/join/:slug
Delete member from groupe
*/
function deleteMembersFromGroupAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug)
    .then(function (group) {
      return MembersModel.delete(user.id, group.id);
    })
    .then(function (result) {
      res.json({
        "deleted": result
      });
    })
    .fail(function (err) {
      res.status(400).json(err);
    });
}
router.delete('/join/:slug', auth.withUser, deleteMembersFromGroupAction);

/**
GET /groups/members/:slug
Get members by groupe slug
*/
function getMembersByGroupeSlugAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug)
    .then(function (group) {
      return MembersModel.findByStatus(group.id, "accepted");
    })
    .then(function (members) {
      res.json(members);
    })
    .fail(function (err) {
      res.status(400).json(err);
    });
}
router.get('/:slug', auth.withUser, getMembersByGroupeSlugAction);

/**
GET /groups/members/pending/:slug
Get members pending by slug
*/
function getMembersPendingBySlugAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug)
    .then(function (group) {
      return MembersModel.findByStatus(group.id, "pending");
    })
    .then(function (members) {
      res.json(members);
    })
    .fail(function (err) {
      res.status(400).json(err);
    });
}
router.get('/pending/:slug', auth.withUser, getMembersPendingBySlugAction);

module.exports = router;
