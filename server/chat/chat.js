/** Chat Module
 * @module server/chat/chat
 */
var MessagesModel = require('./messages-model');
var UserModel = require('../user/user-model');
var RoomsModel = require('./rooms-model');

/**
 * Generate room name
 * @param  {User} user   User
 * @param  {User} target User Target
 * @return {string}      Generated Room Name
 */
function makeRoomUserName(user, target) {
  return user.first_name + "_" + user.last_name + "_" + target.first_name + "_" + target.last_name;
}

/**
 * Chat Config
 * @param  {Server} io Server IO
 * @return {void}
 */
module.exports = function(io) {
  io.on('connection', function(socket) {
    UserModel.connect(socket.request.$user.id).then(function (result) {
      console.log("connect ok", socket.request.$user.email, "result", result);
    }).fail(function (err) {
      console.log("connect err", err, socket.request.$user.email);
    });

    socket.on('connect', function (msg) {
      console.log("io connect", msg);
    });

    socket.on('leave_room', function () {
      socket.broadcast.to(socket.room).emit('user_leave', socket.request.$user);
    });

    socket.on('get_rooms', function () {
      var user = socket.request.$user;
      RoomsModel.findAll(user).then(function (rooms) {
        socket.emit('update_rooms', rooms, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });
    });

    socket.on('get_room_messages', function (room) {
      MessagesModel.findAllByRoomName(room).then(function (messages) {
        socket.emit('update_room_messages', messages, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });
    });

    socket.on('send_message', function (msg) {
      var user = socket.request.$user;
      console.log("io send_message receive", msg, socket.room, user.id);
      RoomsModel.findOneByName(socket.room).then(function (room) {
        MessagesModel.create({
          content: msg,
          users_id: user.id,
          rooms_id: room.id
        }).then(function(insertedId) {
          return MessagesModel.getById(insertedId);
        }).then(function(createdMessage) {
          console.log('io send new_message', socket.room, createdMessage.content);
          io.sockets.in(socket.room).emit('new_message', createdMessage);
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
      socket.room = newRoom;
      MessagesModel.findAllByRoomName(socket.room).then(function (messages) {
        socket.emit('update_room_messages', messages, socket.room);
      }).fail(function (err) {
        socket.emit('chaterrors', err);
      });
    });

    socket.on('join_user_room', function (target) {
      var user = socket.request.$user;
      var userRoomName = makeRoomUserName(user, target);
      console.log("join_user_room", userRoomName);
      // if room exist
      RoomsModel.findOneByName(userRoomName).then(function (room) {
        console.log("findOneByName", room);
        // Add users into room
        return RoomsModel.addUser({
          rooms_id: room.id,
          users_id: user.id
        }).then(function (res) {
          return RoomsModel.addUser({
            rooms_id: room.id,
            users_id: target.id
          });
        }).then(function (res) {
          console.log("user_join_room addUser", user.id, 'target', target.id, "res", res);
          socket.emit('user_join_room', userRoomName);
        });
      }).fail(function (err) {
        if (err.error === 'Not Found') {
          RoomsModel.create({
            name: userRoomName
          }).then(function (roomCreatedId) {
            return RoomsModel.findById(roomCreatedId);
          }).then(function (room) {
            return RoomsModel.addUser({
              rooms_id: room.id,
              users_id: user.id
            }).then(function (res) {
              return RoomsModel.addUser({
                rooms_id: room.id,
                users_id: target.id
              });
            }).then(function (res) {
              console.log("user_join_room create addUser", user.id, 'target', target.id, "res", res);
              socket.emit('user_join_room', userRoomName);
            });
          }).fail(function (err) {
            console.log(err);
            socket.emit('chaterrors', err);
          });
        } else if (err.error === "Already exist") {
          console.log("user_join_room Already exist");
          socket.emit('user_join_room', userRoomName);
        } else {
          console.log(err);
          socket.emit('chaterrors', err);
        }
      });
    });

    socket.on('disconnect', function() {
      socket.leave(socket.room);
      UserModel.deconnect(socket.request.$user.id).then(function (result) {
        console.log("deconnect ok", socket.request.$user.email, "result", result);
      }).fail(function (err) {
        console.log("deconnect err", err, socket.request.$user.email);
      });
    });
  });
};
