var UserModel = require('../user/user-model');
var config = require('../config/config');

module.exports = function(io, cookieParser, sessionStore) {
  io.use(function(socket, next) {
    var request = socket.request;
    if(!request.headers.cookie) {
      console.log("! request.headers.cookie");
      return next(new Error('No cookie transmitted.'));
    } // If we want to refuse authentification, we pass an error to the first callback

    cookieParser(request, {}, function(parseErr) {
      if(parseErr) {
        console.log("! request.headers.cookie");
        return next(new Error('Error parsing cookies.'));
      }
      var sidCookie = (request.secureCookies && request.secureCookies[config.EXPRESS_SID_KEY]) ||
                      (request.signedCookies && request.signedCookies[config.EXPRESS_SID_KEY]) ||
                      (request.cookies && request.cookies[config.EXPRESS_SID_KEY]);
      sessionStore.load(sidCookie, function(err, session) {
        if (err) {
          console.log("sessionStore.load", err);
          return next(err);
        }
        else if(!session) {
          console.log("Session cannot be found/loaded");
          return next(new Error('Session cannot be found/loaded'));
        }
        else if (session.isLogged !== true) {
          console.log("User not logged in");
          return next(new Error('User not logged in'));
        }
        else {
          request.session = session;
          request.sessionId = sidCookie;
          return next();
        }
      });
    });
  });
}
