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
var RoomsModel = require('../chat/rooms-model');
var GroupsValidator = require('../../commun/groups-validator');
validate.moment = moment;

/**
GET /groups
Get all groups
*/
function getGroupsAction (req, res) {
  var user = req.$user;
  var page = req.query.page || 0;
  GroupsModel.findAllNotMyGroups(page, user).then(function (groups) {
    res.json(groups);
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.get('/', auth.withUser, getGroupsAction);

/**
GET /groups/by-slug/:slug
Get group by slug
*/
function getBySlugAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    res.json(group);
  }).fail(function (err) {
    res.sendStatus(404);
  });
}
router.get('/by-slug/:slug', auth.inGroups, getBySlugAction);

/**
GET /groups/my-groups
Get all my groups
*/
function getMyGroupsAction (req, res) {
  var user = req.$user;
  GroupsModel.findMyGroups(user).then(function (groups) {
    res.json(groups);
  }).fail(function (err) {
    console.log(err);
    res.status(400).json(err);
  });
}
router.get('/my-groups', auth.withUser, getMyGroupsAction);

function groupsValidator(req, res, next) {
  GroupsValidator.groupValidate({
    name: req.body.name,
    description: req.body.description || "",
    status: req.body.status || 'open',
    access: req.body.access || 'private',
    type: req.body.type || 'project'
  }).then(function (group) {
    req._new_group = group;
    next();
  }).fail(function (err) {
    res.status(400).json(err);
  });
}

/**
POST /groups
*/
function postCreateGroupeAction(req, res) {
  var user = req.$user;
  var group = req._new_group;
  group.slug = utils.slug(group.name);
  group.users_id = user.id;
  GroupsModel.create(group).then(function (id) {
    return GroupsModel.findOneById(id);
  }).then(function (group) {
    RoomsModel.create({
      name: group.slug
    }).then(function (createdRoomId) {
      RoomsModel.addUser({
        rooms_id: createdRoomId,
        users_id: user.id
      }).then(function (addUserInsertedId) {
        console.log("RoomsModel.addUser ok", createdRoomId);
      }).fail(function (err) {
        console.log("RoomsModel.addUser err", err);
      });
    }).fail(function (err) {
      console.log("RoomsModel.create err", err);
    });

    MembersModel.create({
      users_id: user.id,
      groups_id: group.id,
      status: 'accepted'
    }).then(function (memberId) {
      console.log("MembersModel.create ok", memberId);
    }).fail(function (err) {
      console.log("MembersModel.create err", err);
    });

    res.json(group);

  }).fail(function (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        error: "Already exist"
      });
    } else {
      res.status(500).json(err);
    }
  });
}
router.post('/', groupsValidator, auth.withUser, postCreateGroupeAction);

/**
 * PUT /groups/:slug
 * Update group
 */
function updateGroupAction (req, res) {
  var user = req.$user;
  var group = req.$group;
  var newGroup = req._new_group;
  var slug = req.params.slug;
  GroupsModel.update(group.id, newGroup).then(function (result) {
    return GroupsModel.findOneBySlug(slug);
  }).then(function (updatedGroup) {
    res.json(updatedGroup);
  }).fail(function (err) {
    res.status(500).json(err);
  });
}
router.put('/:slug', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), groupsValidator, updateGroupAction);

/*
GET /groups/types
Get type of group
*/
function getGroupsTypesAction(req, res) {
  var status = GroupsModel.groupsStatus;
  var access = GroupsModel.groupsAccess;
  var types = GroupsModel.groupsTypes;
  res.json({
    status: [
      status.open,
      status.close
    ],
    accesses: [
      access.public,
      access.private
    ],
    types: [
      types.project,
      types.discussion,
      types.other
    ]
  });
}
router.get('/types', auth.withUser, getGroupsTypesAction);


/**
 * Delete group
 */
function deleteGroup (req, res) {
  var user = req.$user;
  var group = req.$group;
  GroupsModel.delete(group.id).then(function (result) {
    return RoomsModel.findOneByName(group.slug);
  }).then(function (room) {
    return RoomsModel.delete(room.id);
  }).then(function (result) {
    res.json(result);
  }).fail(function (err) {
    res.status(500).json(err);
  });
}
router.delete('/:slug', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), deleteGroup);

module.exports = router;
