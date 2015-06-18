
module.exports = function(io){

    io.use(function (socket, next) {
        console.log("io middleware");
        next();
    });

    io.on('connection', function (socket) {
        //console.log(socket);
        socket.on('news_notification', function (msg) {
            // TODO get true user
            var newMessage = {
                content: msg,
                users_id: 13
            };
            messagesModel.create(newMessage, function (createError, insertId) {
                //console.log("global_chat.create", "createError", createError, "insertId", insertId);
                // TODO handle errors
                messagesModel.getById(insertId, function (findError, createdMessage) {
                    //console.log("global_chat.getById", "findError", findError, "createdMessage", createdMessage);
                    // TODO handle errors
                    io.emit('global_notification', createdMessage);
                });
            });
        });
        //socket.broadcast.emit('hi');
        socket.on('disconnect', function (arg) {
            console.log('user disconnected', arg);
        });
    });
};