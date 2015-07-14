/** Groups Router
 * @module server/groups/groups-router
 */
var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");
var utils    = require('../../commun/utils');
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var MembersModel = require('./members-model');
var UserModel    = require('../user/user-model');
var RoomsModel = require('../chat/rooms-model');
var GroupsValidator = require('../../commun/groups-validator');
validate.moment = moment;

/**
 * Get all groups
 * GET /groups
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
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
 * Get group by slug
 * GET /groups/by-slug/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getBySlugAction (req, res) {
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    res.json(group);
  }).fail(function (err) {
    res.sendStatus(404).json(err);
  });
}
router.get('/by-slug/:slug', auth.inGroups, getBySlugAction);

/**
 * Get all my groups
 * GET /groups/my-groups
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
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

/**
 * Group Validator middleware
 * @param  {request} req request
 * @param  {result} res result
 * @param  {Function} next Next middleware
 * @return {void}
 */
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
 * Create new Group
 * POST /groups
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
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
      }).then(function () {
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
 * Update group, only for Chef and Admin
 * PUT /groups/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function updateGroupAction (req, res) {
  var group = req.$group;
  var newGroup = req._new_group;
  var slug = req.params.slug;
  GroupsModel.update(group.id, newGroup).then(function () {
    return GroupsModel.findOneBySlug(slug);
  }).then(function (updatedGroup) {
    res.json(updatedGroup);
  }).fail(function (err) {
    res.status(500).json(err);
  });
}
router.put('/:slug', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), groupsValidator, updateGroupAction);

/**
 * Get type of group
 * GET /groups/types
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
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
 * DELETE /groups/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function deleteGroup (req, res) {
  var group = req.$group;
  GroupsModel.delete(group.id).then(function () {
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
