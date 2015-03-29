var User = require('../models/user');
var UserRole = require('../models/user-role');
var UserStatus = require('../models/user-status-connection');

module.exports = function (app, express, passport) {
    app.get('/', function (req, res) {
        User.findOneById(1, function (err, result) {
            res.end("Hello World " + result);
        })
    });

    app.get('/user', isLoggedIn, function (req, res) {
        res.end("Welcome");
    });

    // app.post('/login', passport.authenticate('local', {
    //     failureRedirect: '/login',
    //     successRedirect: '/user'
    // }));

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            console.log("login", user);
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).end();
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).end();
            });
        })(req, res, next);
    });

    app.post('/user-role', function (req, res) {
        var name = req.body.name;
        console.log("Post /user-role name = ", name);
        UserRole.create(name, function (err, result) {
            console.log("UserRole.create result = ", result);
            if (err) return res.end(err);
            return res.end(result + "");
        })
    });

    app.post('/user-status', function (req, res) {
        var name = req.body.name;
        console.log("Post /user-role name = ", name);
        UserStatus.create(name, function (err, result) {
            console.log("UserRole.create result = ", result);
            if (err) return res.end(err);
            return res.end(result + "");
        })
    });

    app.post('/signup', function (req, res) {
        var user = {
            email: "egor@egor.fr",
            username: "egor",
            password: "root",
            first_name: "Egor",
            last_name: "Berezovskiy",
            birthday_date: "1988-05-06",
            description: "Boss",
            user_role_id: 1,
            user_status_connection_id: 1
        }
        User.create(user, function (err, result) {
            if (err) return res.end(err + "");
            return res.end(result + "");
        })
    });
}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    //res.redirect('/login');
    return res.status(401).end();
}
