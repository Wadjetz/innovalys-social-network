var router = require("express").Router();
var validate = require("validate.js");
var moment = require('moment');
var UserModel = require('../user/user-model');
var MessagesModel = require('./messages-model');
var RoomsModel = require('./rooms-model');
var auth = require('../config/auth');
validate.moment = moment;

/**
GET /chat/rooms
Get my rooms
*/
function getMyRoomsAction (req, res) {
  var user = req.$user;
  // TODO implement pagination
  RoomsModel.findAll(0, user)
    .then(function (rooms) {
      res.json(rooms);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.get('/', auth.withUser, getMyRoomsAction);

function roomsValidator(req, res, next) {
  console.log(req.body);
  var newRoom = {
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
  var validatorRes = validate(newRoom, constraints);
  if (validatorRes === undefined) {
    req._newRoom = newRoom;
    next();
  } else {
    res.status(400).json(validatorRes);
  }
}

function getRoomsAction(req, res) {
  var user = req.$user;
  var roomId = req.params.id;
  RoomsModel
    .findById(roomId)
    .then(function (rooms) {
      UserModel
        .findByRoomId(rooms.id)
        .then(function (users) {
          res.json({
            rooms: rooms,
            users: users
          });
        })
        .fail(function (err) {
          res.status(404).json(err);
        })
    })
    .fail(function (err) {
      res.status(404).json(err);
    })
}
router.get('/:id', auth.withUser, getRoomsAction);

function withTargetUser (req, res, next) {
  var newRoom = req._newRoom;
  UserModel
    .findById(newRoom.target_id)
    .then(function (targetUser) {
      req._targetUser = targetUser;
      next();
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}

/**
POST /chat/rooms
Create new room
*/
function createRoomAction (req, res) {
  var user = req.$user;
  var newRoom = req._newRoom;
  var targetUser = req._targetUser;
  console.log(targetUser);
  RoomsModel
    .create({
      status: newRoom.status,
      type: newRoom.type
    })
    .then(function (roomInsertedId) {
      return RoomsModel
        .addUser({
          rooms_id: roomInsertedId,
          users_id: newRoom.target_id
        })
        .then(function (addTargetInsertedId) {
          return RoomsModel
            .addUser({
              rooms_id: roomInsertedId,
              users_id: user.id
            })
            .then(function (addMeInsertedId) {
              return RoomsModel.findById(roomInsertedId)
            });
        });
    })
    .then(function (rooms) {
      UserModel
        .findByRoomId(rooms.id)
        .then(function (users) {
          res.json({
            rooms: rooms,
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
router.post('/', roomsValidator, auth.withUser, withTargetUser, createRoomAction);

module.exports = router;
