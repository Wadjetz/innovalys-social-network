var MessagesModel = require('./messages-model');
var config = require('../config/config');

module.exports = function(io, cookieParser, sessionStore) {
  io.use(function(socket, next) {
    var request = socket.request;
    if(!request.headers.cookie) { return next(new Error('No cookie transmitted.')); } // If we want to refuse authentification, we pass an error to the first callback

    cookieParser(request, {}, function(parseErr) {
      if(parseErr) { return next(new Error('Error parsing cookies.')); }
      var sidCookie = (request.secureCookies && request.secureCookies[config.EXPRESS_SID_KEY]) ||
                      (request.signedCookies && request.signedCookies[config.EXPRESS_SID_KEY]) ||
                      (request.cookies && request.cookies[config.EXPRESS_SID_KEY]);
      sessionStore.load(sidCookie, function(err, session) {
        if (err) { return next(err); }
        else if(!session) { return next(new Error('Session cannot be found/loaded')); }
        else if (session.isLogged !== true) { return next(new Error('User not logged in')); }
        else {
          request.session = session;
          request.sessionId = sidCookie;
          return next();
        }
      });
    });
  });

  io.on('connection', function(socket) {
    console.log("user connection");
    socket.on('global_chat', function(msg) {
      console.log("user global_chat", msg, socket.request.session);
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
