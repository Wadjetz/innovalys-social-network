var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');
var GroupsModel = require('../groups/groups-model');
var UserModel = require('../user/user-model');
var RoomsModel = require('./rooms-model');
var config = require('../config/config');

module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.on('add_user', function (msg) {
      var user = socket.request.$user;
      console.log("add_user", user.id);
      socket.room = 'global_chat';
      socket.join(socket.room);
      socket.emit('update_chat', 'SERVER', 'you have connected to global_chat');
      socket.broadcast.to(socket.room).emit('update_chat', 'SERVER', user.id + ' has connected to this room');
      
      RoomsModel.findAll(user).then(function (rooms) {
        socket.emit('update_rooms', rooms, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });

      MessagesModel.findAllByRoomName(socket.room).then(function (messages) {
        socket.emit('update_room_messages', messages, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });

    });

    socket.on('send_message', function (msg) {
      var user = socket.request.$user;
      console.log("send_message", msg, socket.room, user.id);
      RoomsModel.findOneByName(socket.room).then(function (room) {
        MessagesModel.create({
          content: msg,
          users_id: user.id,
          rooms_id: room.id
        }).then(function(insertedId) {
          return MessagesModel.getById(insertedId);
        }).then(function(createdMessage) {
          io.sockets.in(socket.room).emit('new_message', createdMessage, socket.room);
        }).fail(function(err) {
          socket.emit('chaterrors', err);
        });
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });
    });

    socket.on('switch_room', function (newRoom) {
      console.log('switch_room', newRoom);
      socket.leave(socket.room);
      socket.join(newRoom);
      socket.emit('updatechat', 'SERVER', 'you have connected to '+ newRoom);
      socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.request.$user.id+' has left this room');
      socket.room = newRoom;
      MessagesModel.findAllByRoomName(socket.room).then(function (messages) {
        socket.emit('update_room_messages', messages, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });
      socket.broadcast.to(newRoom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
    });

    socket.on('auth_errors', function (msg) {
      log.debug("auth_errors", msg);
    });

    socket.on('disconnect', function(arg) {
      log.debug('user disconnected 1', arg);
    });
  });
};
