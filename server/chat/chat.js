var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');
var GroupsModel = require('../groups/groups-model');
var UserModel = require('../user/user-model');
var RoomsModel = require('./rooms-model');
var config = require('../config/config');

var chatGlobal = require('./chat-global');

module.exports = function(io) {
  io.on('connection', function(socket) {
    log.debug("user connection");

    //chatGlobal(io, socket);
    socket.on('adduser', function (msg) {
      var user = socket.request.$user;
      console.log("adduser", user.id);
      socket.room = 'global_chat';
      socket.join('global_chat');
      socket.emit('updatechat', 'SERVER', 'you have connected to global_chat');
      socket.broadcast.to('global_chat').emit('updatechat', 'SERVER', user.id + ' has connected to this room');
      
      RoomsModel.findAll(user).then(function (rooms) {
        console.log("adduser get rooms", rooms);
        socket.emit('updaterooms', rooms, 'global_chat');
      }).fail(function (err) {
        console.log("adduser get rooms err", err);
      });
    });

    socket.on('sendchat', function (msg) {
      console.log("sendchat", msg, socket.room, socket.request.$user.id);
      io.sockets.in(socket.room).emit('updatechat', msg, socket.request.$user, socket.room);
    });

    socket.on('switchroom', function (newRoom) {
      console.log('switchroom', newRoom);
      socket.leave(socket.room);
      socket.join(newRoom);
      socket.emit('updatechat', 'SERVER', 'you have connected to '+ newRoom);
      socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.request.$user.id+' has left this room');
      socket.room = newRoom;
      socket.broadcast.to(newRoom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
      socket.emit('updaterooms', newRoom);
    });

    socket.on('auth_errors', function (msg) {
      log.debug("auth_errors", msg);
    });

    socket.on('disconnect', function(arg) {
      log.debug('user disconnected 1', arg);
    });
  });
};
