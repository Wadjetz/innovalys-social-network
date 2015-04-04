var router = require("express").Router();
var UserModel = require('./user-model');
var moment = require('moment');
var utils = require('../../commun/utils');
var bcrypt = require('bcrypt');
var generatePassword = require('password-generator');

router.post('/signup', function (req, res) {
    // TODO Validate data
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
    }

    newUser.username = newUser.first_name.toLowerCase().substring(0, 3) + "_" + newUser.last_name.toLowerCase().substring(0, 3)
    newUser.password = generatePassword(6, false);


    console.log(newUser);
    UserModel.create(newUser, function (result) {
        res.json({
            error: result,
            newUser: newUser
        });
    });
});

router.post('/login', function(req, res, next) {
});

module.exports = router;
