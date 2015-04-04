var router = require("express").Router();
var bcrypt = require('bcrypt');
var generatePassword = require('password-generator');
var moment = require('moment');
var async = require('async');
var utils = require('../../commun/utils');
var userValidator = require('../../commun/user-validator');
var UserModel = require('./user-model');
var Auth = require('../config/auth');

function signupValidator(req, res, next) {
    var newUser = {
        email: req.body.email,
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday_date: req.body.birthday_date,
        adress: req.body.adress,
        function: req.body.function,
        description: req.body.description,
        arrival_date: req.body.arrival_date
    };

    userValidator.signupValidator(newUser, function (validatorRes) {
        if (validatorRes === undefined) {
            console.log("signupValidator", validatorRes, newUser);
            req._new_user = newUser;
            next();
        } else {
            res.json({
                error: true,
                message: validatorRes
            });
        }
    });
}

router.post('/signup', signupValidator, function (req, res) {
    var newUser = req._new_user;
    var generatedUsername = newUser.first_name.toLowerCase().substring(0, 3) + "-" + newUser.last_name.toLowerCase().substring(0, 3);
    var generatedPassword = generatePassword(8, false);
    newUser.username = generatedUsername;
    newUser.password = generatedPassword;

    async.parallel({
        isExist: function (callback) {
            UserModel.isExist(newUser.username, function (isExistErr, isExist) {
                if (isExistErr) console.error(isExistErr);
                callback(isExistErr, isExist);
            });
        },
        hash: function (callback) {
            bcrypt.genSalt(10, function (genSaltErr, salt) {
                if (genSaltErr) console.error(genSaltErr);
                bcrypt.hash(newUser.password, salt, function (hashError, hash) {
                    if (hashError) console.error(hashError);
                    callback(hashError, hash);
                });
            });
        }
    }, function(asyncErr, asyncRes) {
        console.log(asyncRes);
        if (asyncErr) console.error(asyncErr);
        if (asyncRes.isExist > 0) {
            res.json({
                error: true,
                message: "User already existe"
            });
        } else {
            newUser.password = asyncRes.hash;
            UserModel.create(newUser, function (createErr, createRes) {
                if (createErr) console.error(createErr);
                if (createRes.affectedRows > 0) {
                    res.json({
                        error: false,
                        access: {
                            login: generatedUsername,
                            password: generatedPassword
                        }
                    });
                } else {
                    res.json({
                        error: true,
                        message: "Error create user"
                    });
                }
            });
        }
    });
});

function loginValidator(req, res, next) {
    var login = {
        username: req.body.login,
        password: req.body.password
    };

    userValidator.validateLogin(login, function (validatorRes) {
        if (validatorRes === undefined) {
            console.log("loginValidator", validatorRes, login);
            req._login = login;
            next();
        } else {
            res.json({
                error: true,
                message: "Login ou password invalide"
            });
        }
    });
}

router.post('/login', loginValidator, function(req, res, next) {
    var user = req._login;
    var jsonError = {
        error: true,
        message: "Login ou password invalide"
    };

    UserModel.findOneByUserName(user.username.toLowerCase(), function (findError, findUser) {
        if (findError) console.error(findError);
        if (findUser.length === 0) {
            res.json(jsonError);
        } else {
            bcrypt.compare(user.password, findUser[0].password, function(compareErr, compareRes) {
                if (compareRes === true) {
                    req.session.username = findUser[0].username;
                    res.json({
                        error: false,
                        message: "Hello"
                    });
                } else {
                    res.json(jsonError);
                }
            });
        }
    });
});

router.get('/', Auth.withRole([UserModel.roles.RH]), function (req, res) {
    res.json({
        error: false,
        message: "",
        username: req.session.username,
        user: req.$user
    });
});

module.exports = router;
