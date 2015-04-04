var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use(new LocalStrategy(function (username, password, done) {
    console.log("LocalStrategy", username, password);
    if (username === 'admin' && passport === 'root') {
        return done(null, {
            username: 'admin'
        });
    }

    return done(null, false);
}));

passport.serializeUser(function (user, done) {
    console.log("serializeUser", user);
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    console.log("deserializeUser", username);
    done(null, {
        username: username
    });
});


module.exports = passport;