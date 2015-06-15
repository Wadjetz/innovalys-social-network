var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");
var async    = require('async');
var utils    = require('../../commun/utils');
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var MembersModel = require('./members-model');
var UserModel    = require('../user/user-model');
var MessagesModel = require('./messages-model');

router.post('/join/:slug', auth.withUser, function (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    return MembersModel.create(user.id, group.id);
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
      res.status(400).json(err);
    }
  });
});

router.delete('/join/:slug', auth.withUser, function (req, res) {
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
});

router.get('/:slug', auth.withUser, function (req, res) {
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
});

router.get('/pending/:slug', auth.withUser, function (req, res) {
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
});

module.exports = router;
