var MessagesModel = require('./messages-model');

module.exports = function(io) {
  io.use(function(socket, next) {
    console.log("io middleware");
    next();
  });

  io.on('connection', function(socket) {
    socket.on('global_chat', function(msg) {
      // TODO get true user
      var newMessage = {
        content: msg,
        users_id: 15
      };
      MessagesModel.create(newMessage)
        .then(function(insertedId) {
          return MessagesModel.getById(insertedId);
        })
        .then(function(createdMessage) {
          io.emit('global_chat', createdMessage);
        })
        .fail(function(err) {
          console.error("global_chat", err);
        });
    });
    //socket.broadcast.emit('hi');
    socket.on('disconnect', function(arg) {
      console.log('user disconnected', arg);
    });
  });
};
