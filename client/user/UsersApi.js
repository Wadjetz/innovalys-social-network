var request = require('superagent');
var baseUrl = require('../conf').baseUrl;
var utils = require('../utils');

module.exports.getAll = function (callback) {
    request.get(baseUrl + '/users').end(function (err, res) {
        //console.log("UserApi", "getAll", "res", res, "err", err);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.me = function (callback) {
    request.get(baseUrl + '/users/me').end(function (err, res) {
        utils.handleErrors(err, res, callback);
    });
};

module.exports.create = function (user, callback) {
    request.post(baseUrl + '/users/signup').send(user).end(function (err, res) {
        //console.log("UserApi", "create", "res", res, "err", err, "user", user);
        callback(err, res.body);
    });
};

module.exports.login = function (user, callback) {
    request.post(baseUrl + '/users/login').send(user).end(function (err, res) {
        //console.log("UserApi", "login", "res", res, "err", err, "user", user);
        callback(res.body);
    });
};

module.exports.roles = function (callback) {
    request.get(baseUrl + '/users/roles').end(function (err, res) {
        callback(err, res.body);
    });
};
