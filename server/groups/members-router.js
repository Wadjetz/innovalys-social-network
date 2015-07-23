/** Group Members Router
 * @module server/groups/members-router
 */
var router   = require("express").Router();
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var RoomsModel = require('../chat/rooms-model');
var MembersModel = require('./members-model');
var UserModel    = require('../user/user-model');

/**
 * Join group
 * POST /groups/members/join/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
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
  }).then(function () {
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
 * Delete member from groupe
 * DELETE /groups/members/join/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function deleteMembersFromGroupAction (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    return MembersModel.delete(user.id, group.id);
  }).then(function (result) {
    res.json({
      "deleted": result
    });
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.delete('/join/:slug', auth.withUser, deleteMembersFromGroupAction);

/**
 * Get members by groupe slug
 * GET /groups/members/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getMembersByGroupeSlugAction (req, res) {
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    return MembersModel.findByStatus(group.id, "accepted");
  }).then(function (members) {
    res.json(members);
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.get('/:slug', auth.withUser, getMembersByGroupeSlugAction);

/**
 * Get members pending by slug
 * GET /groups/members/pending/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getMembersPendingBySlugAction (req, res) {
  var slug = req.params.slug;
  GroupsModel.findOneBySlug(slug).then(function (group) {
    return MembersModel.findByStatus(group.id, "pending");
  }).then(function (members) {
    res.json(members);
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.get('/pending/:slug', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), getMembersPendingBySlugAction);

/**
 * Accept Members
 * PUT /groups/members/accept/:groups_id/:users_id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function acceptMemberAction (req, res) {
  var groups_id = req.params.groups_id;
  var users_id = req.params.users_id;
  MembersModel.getOneMember(users_id, groups_id).then(function () {
    return MembersModel.accept(users_id, groups_id);
  }).then(function (result) {
    res.json(result);
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.put('/accept/:groups_id/:users_id', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), acceptMemberAction);

/**
 * Refuse Members
 * PUT /groups/members/refuse/:groups_id/:users_id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function refuseMemberAction (req, res) {
  var groups_id = req.params.groups_id;
  var users_id = req.params.users_id;
  MembersModel.getOneMember(users_id, groups_id).then(function () {
    RoomsModel.deleteUser(users_id, groups_id).then(function (result) {
      console.log("RoomsModel.deleteUser ok", result);
    }).fail(function (err) {
      console.log("RoomsModel.deleteUser err", err);
    })
    return MembersModel.refuse(users_id, groups_id);
  }).then(function (result) {
    res.json(result);
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.put('/refuse/:groups_id/:users_id', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), refuseMemberAction);

function addGroupMember(req, res) {
  var group = req.$group;
  var id = req.params.id;
  RoomsModel.findOneByName(group.slug).then(function (room) {
    console.log("Join room", room);
    RoomsModel.addUser({
      rooms_id: room.id,
      users_id: id
    }).then(function (addUserInsertedId) {
      console.log("RoomsModel.addUser ok", addUserInsertedId);
    }).fail(function (err) {
      console.log("RoomsModel.addUser err", err);
    });
  }).fail(function (err) {
    console.log("RoomsModel.findOneByName err", err);
  });
  MembersModel.create({
    users_id: id,
    groups_id: group.id,
    status: 'accepted'
  }).then(function (result) {
    res.json(result);
  });
}
router.post('/add/:slug/:id', auth.groupsWithRoleOrOwner([UserModel.roles.CHEF]), addGroupMember);

module.exports = router;
