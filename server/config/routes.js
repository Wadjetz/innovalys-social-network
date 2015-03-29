var User = require('../models/user');
var bcrypt = require('bcrypt');
var generatePassword = require('password-generator');
var NewsRouter = require('../news/news-router');
var CommentsRouter = require('../comments/comments-router');

module.exports = function (app, express, passport) {
    app.use('/news', NewsRouter);
    app.use('/comments', CommentsRouter);

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

    app.post('/signup', function (req, res) {
        var user = {
            email: req.body.email,
            role: req.body.role,
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday_date: req.body.birthday_date,
            description: req.body.description
        }
        // TODO chiffrer le password avec bcrypt
        user.password = generatePassword(6, false);
        user.username = user.first_name.substring(0, 3) + "_" + user.last_name.substring(0, 3)

        res.json(user); // TODO test
        // User.create(user, function (err, result) {
        //     if (err) console.error(err),
        //     res.json(result);
        // })
    });
}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    //res.redirect('/login');
    return res.status(401).end();
}
