var User = require('../models/user');
var bcrypt = require('bcrypt');
var generatePassword = require('password-generator');
var NewsRouter = require('../news/news-router');
var CommentsRouter = require('../comments/comments-router');

module.exports = function (app, express, passport) {
    app.use('/news', NewsRouter);
    app.use('/comments', CommentsRouter);

    app.post('/login', function(req, res, next) {

    });

    app.post('/signup', function (req, res) {

    });
}

