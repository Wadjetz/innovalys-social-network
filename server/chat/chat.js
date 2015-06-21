var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');
var UserModel = require('../user/user-model');
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
    log.debug("user connection");
    socket.on('global_chat', function(msg) {
      log.debug("user global_chat", msg, socket.request.session);
      if(socket.request.session.email) {
        UserModel
          .findOneByEmail(socket.request.session.email)
          .then(function (user) {
            var newMessage = {
              content: msg,
              users_id: user.id,
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
          })
          .fail(function (err) {
            io.emit('auth_errors', err);
          })
      }
    });

    socket.on('auth_errors', function (msg) {
      log.debug("auth_errors", msg);
    });

    socket.on('disconnect', function(arg) {
      log.debug('user disconnected', arg);
    });

    //socket.broadcast.emit('hi');
  });
};
