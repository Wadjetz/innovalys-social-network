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
var GroupsFilesModel = require('./files-model');
validate.moment = moment;

/**
POST /groups/files/:slug
Upload files for groups
*/
var uploadFile = function (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  var file = req.files.file;
  if (file) {
    GroupsModel.findOneBySlug(slug)
      .then(function (group) {
        var groupFile = {
          name: file.originalname,
          mimetype: file.mimetype,
          extension: file.extension,
          size: file.size,
          path: file.path,
          groups_id: group.id,
          users_id: user.id
        };
        GroupsFilesModel.create(groupFile).then(function (createdId) {
          return GroupsFilesModel.findById(createdId);
        }).then(function (groupfile) {
          res.json(groupfile);
        }).fail(function (err) {
          res.status(500).json(err);
        });
      })
      .fail(function (err) {
        res.status(404).json(err);
      });
  } else {
    res.status(400).json({
      error: "file required"
    });
  }
};
router.post('/:slug', auth.withUser, uploadFile);

/**
Find all files group by slug
*/
function getAllGroupBySlugAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsFilesModel.findAllByGroupSlug(slug)
    .then(function (file) {
      res.json(file);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
};
router.get('/:slug', auth.withUser, getAllGroupBySlugAction);

module.exports = router;
