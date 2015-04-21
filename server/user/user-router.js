var router = require("express").Router();
//var bcrypt = require('bcrypt');
var passwordHash = require('password-hash');
var validate = require("validate.js");
var generatePassword = require('password-generator');
var moment = require('moment');
var async = require('async');
var utils = require('../../commun/utils');
var userValidator = require('../../commun/user-validator');
var UserModel = require('./user-model');
var auth = require('../config/auth');

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
            //console.log("signupValidator", validatorRes, newUser);
            req._new_user = newUser;
            next();
        } else {
            res.status(400).json({ error: validatorRes });
        }
    });
}

router.post('/signup', signupValidator, function (req, res) {
    var newUser = req._new_user;
    var generatedPassword = generatePassword(8, false);
    newUser.password = generatedPassword;

    async.parallel({
        isExist: function (callback) {
            UserModel.isExist(newUser.email, function (isExistErr, isExist) {
                if (isExistErr) console.error(isExistErr);
                callback(isExistErr, isExist);
            });
        },
        hash: function (callback) {
            callback(null, passwordHash.generate(newUser.password));
            /*
            bcrypt.genSalt(10, function (genSaltErr, salt) {
                if (genSaltErr) console.error(genSaltErr);
                bcrypt.hash(newUser.password, salt, function (hashError, hash) {
                    if (hashError) console.error(hashError);
                    callback(hashError, hash);
                });
            });
            */
        }
    }, function(asyncErr, asyncRes) {
        //console.log(asyncRes);
        if (asyncErr) console.error(asyncErr);
        if (asyncRes.isExist > 0) {
            res.status(400).json({ error: "User already existe" });
        } else {
            newUser.password = asyncRes.hash;
            console.log("newUser", newUser);
            UserModel.create(newUser, function (createErr, createRes) {
                if (createErr) console.error(createErr);
                if (createRes) {
                    res.status(201).json({
                        access: {
                            email: newUser.email,
                            password: generatedPassword
                        }
                    });
                } else {
                    res.status(400).json({ error: "Error create user" });
                }
            });
        }
    });
});

function loginValidator(req, res, next) {
    var login = {
        email: req.body.email,
        password: req.body.password
    };

    var validatorRes = validate(login, userValidator.loginConstraints);
    if (validatorRes === undefined) {
        //console.log("loginValidator", validatorRes, "login", login);
        req._login = login;
        next();
    } else {
        res.status(400).json({ error: "Login ou password invalide", errors: validatorRes });
    }
}

router.post('/login', loginValidator, function(req, res, next) {
    var user = req._login;
    var jsonError = { error: "Login ou password invalide" };
    //console.log("user", user, "email.toLowerCase()", user.email.toLowerCase())

    UserModel.findOneByEmail(user.email.toLowerCase(), function (findError, findUser) {
        if (findError) console.error(findError);
        if (findUser) {
            //bcrypt.compare(user.password, findUser.password, function(compareErr, compareRes) {
                compareRes = passwordHash.verify(user.password, findUser.password);
                if (compareRes === true) {
                    req.session.email = findUser.email;
                    res.json({
                        message: "Hello"
                    });
                } else {
                    res.status(400).json(jsonError);
                }
            //});
        } else {
            res.status(400).json(jsonError);
        }
    });
});

router.get('/roles', function (req, res) {
    var roles = UserModel.roles;
    var result = [];
    for (key in roles) {
        result.push(roles[key]);
    }
    res.json(result);
});

router.get('/status-connection', function (req, res) {
    var statusConnection = UserModel.status_connection;
    var result = [];
    for (key in statusConnection) {
        result.push(statusConnection[key]);
    }
    res.json(result);
});

router.get('/me', auth.withRole([UserModel.roles.RH]), function (req, res) {
    var user = req.$user;
    res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        birthday_date: user.birthday_date, // TODO Calculate age
        status_profile: user.status_profile,
        status_connection: user.status_connection,
        function: user.function,
        description: user.description,
        arrival_date: user.arrival_date,
        last_connection: user.last_connection
    });
});

module.exports = router;
