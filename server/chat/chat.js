var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');
var GroupsModel = require('../groups/groups-model');
var UserModel = require('../user/user-model');
var RoomsModel = require('./rooms-model');
var config = require('../config/config');

function makeRoomUserName(user, target) {
  return user.first_name + "_" + user.last_name + "_" + target.first_name + "_" + target.last_name;
}

module.exports = function(io) {
  io.on('connection', function(socket) {

    UserModel.connect(socket.request.$user.id).then(function (result) {
      console.log("connect ok", socket.request.$user);
    }).fail(function (err) {
      console.log("connect err", socket.request.$user);
    })

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
      var user = socket.request.$user;
      console.log('switch_room', newRoom);
      socket.leave(socket.room);
      socket.join(newRoom);
      socket.emit('update_chat', 'SERVER', 'you have connected to '+ newRoom);
      socket.broadcast.to(socket.room).emit('update_chat', 'SERVER', user.id+' has left this room');
      socket.room = newRoom;
      MessagesModel.findAllByRoomName(socket.room).then(function (messages) {
        socket.emit('update_room_messages', messages, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });
      socket.broadcast.to(newRoom).emit('update_chat', 'SERVER', user.id+' has joined this room');
    });

    socket.on('join_user_room', function (target) {
      var user = socket.request.$user;
      var userRoomName = makeRoomUserName(user, target);
      console.log("join_user_room", userRoomName);
      RoomsModel.findOneByName(userRoomName).then(function (room) {
        console.log(room);
        return RoomsModel.addUser({
          rooms_id: room.id,
          users_id: user.id
        }).then(function (res) {
          return RoomsModel.addUser({
            rooms_id: room.id,
            users_id: target.id
          })
        }).then(function (res) {
          console.log(res);
        });
      }).fail(function (err) {
        if (err.error === 'Not Found') {
          RoomsModel.create({
            name: userRoomName
          }).then(function (roomCreatedId) {
            return RoomsModel.findById(roomCreatedId)
          }).then(function (room) {
            return RoomsModel.addUser({
              rooms_id: room.id,
              users_id: user.id
            }).then(function (res) {
              return RoomsModel.addUser({
                rooms_id: room.id,
                users_id: target.id
              })
            }).then(function (res) {
              console.log(res);
            });
          }).fail(function (err) {
            console.log(err);
            socket.emit('chaterrors', err);
          })
        } else {
          console.log(err);
          socket.emit('chaterrors', err);
        }
      });
    });

    socket.on('disconnect', function() {
      var user = socket.request.$user;
      io.sockets.emit('update_users', user.id);
      // echo globally that this client has left
      socket.broadcast.emit('update_chat', 'SERVER', user.id + ' has disconnected');
      socket.leave(socket.room);
      UserModel.deconnect(socket.request.$user.id).then(function (result) {
        console.log("deconnect ok", socket.request.$user);
      }).fail(function (err) {
        console.log("deconnect err", socket.request.$user);
      });
    });
  });
};
