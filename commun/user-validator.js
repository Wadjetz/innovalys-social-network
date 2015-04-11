var validate = require("validate.js");
var moment = require('moment');
validate.moment = moment;

module.exports.signupValidator = function (newUser, callback) {
    // TODO Configure validator
    var constraints = {
        email: {
            presence: true,
        },
        first_name: {
            presence: true,
        },
        last_name: {
            presence: true,
        },
        birthday_date: {
            presence: true,
        },
        adress: {
            presence: true,
        },
        function: {
            presence: true,
        },
        description: {
            presence: true,
        },
        arrival_date: {
            presence: true,
        }
    };
    callback(validate(newUser, constraints));
};

module.exports.validateLogin = function (login, callback) {
    // TODO Configure validator
    var constraints = {
        email: {
            presence: true
        },
        password: {
            presence: true,
        }
    };
    callback(validate(login, constraints));
};
