var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');
var GroupsModel = require('../groups/groups-model');
var UserModel = require('../user/user-model');
var config = require('../config/config');

var chatGlobal = require('./chat-global');
var chatGroups = require('./chat-groups');

module.exports = function(io) {
  io.on('connection', function(socket) {
    log.debug("user connection");

    chatGlobal(io, socket);
    chatGroups(io, socket);

    socket.on('auth_errors', function (msg) {
      log.debug("auth_errors", msg);
    });

    socket.on('disconnect', function(arg) {
      log.debug('user disconnected 1', arg);
    });

    socket.on('disconnect', function(arg) {
      log.debug('user disconnected 2', arg);
    });

    //socket.broadcast.emit('hi');
  });
};
