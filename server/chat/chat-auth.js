var UserModel = require('../user/user-model');

module.exports = function(io) {
  io.use(function(socket, next) {
    if(socket.request.session.email) {
      UserModel
        .findOneByEmail(socket.request.session.email)
        .then(function (user) {
          socket.request.$user = user;
          return next();
        })
        .fail(function (err) {
          io.emit('auth_errors', "Unauthorized");
          console.log("Chat auth Unauthorized user not found", err);
          return next(new Error('Unauthorized user not found'));
        });
    } else {
      console.log("Chat auth socket.request.session.email", err);
      io.emit('auth_errors', "Unauthorized");
      return next(new Error('Unauthorized no session'));
    }
  });
}
