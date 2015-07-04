var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');

module.exports = function(io, socket) {
  socket.on('global_chat', function(msg) {
    log.debug("user global_chat", msg, socket.request.$user);
    var newMessage = {
      content: msg,
      users_id: socket.request.$user.id,
      conversations_id: 1
    };
    MessagesModel
      .create(newMessage)
      .then(function(insertedId) {
        return MessagesModel.getById(insertedId);
      })
      .then(function(createdMessage) {
        io.emit('global_chat', createdMessage);
      })
      .fail(function(err) {
        log.error("global_chat", err);
      });
  });
}
