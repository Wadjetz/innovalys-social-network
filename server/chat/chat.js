var messagesModel = require('./messages-model');

module.exports = function (io) {

    io.use(function (socket, next) {
        console.log("USE");
        next();
    });

    io.on('connection', function (socket) {
        //console.log(socket);
        socket.on('global_chat', function (msg) {
            // TODO get true user
            var newMessage = {
                content: msg,
                users_id: 13
            };
            messagesModel.create(newMessage, function (createError, results) {
                // TODO handle errors
                messagesModel.getById(results.insertId, function (findError, createdMessage) {
                    // TODO handle errors
                    io.emit('global_chat', createdMessage);
                });
            });
        });
        //socket.broadcast.emit('hi');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
};
