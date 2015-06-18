const request = require('superagent');
const baseUrl = require('../conf').baseUrl;
const utils   = require('../utils/utils');

module.exports.getAll = function (callback) {
    request.get(baseUrl + '/users').end(function (err, res) {
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
        callback(err, res.body);
    });
};

module.exports.login = function (user, callback) {
    request.post(baseUrl + '/users/login').send(user).end(function (err, res) {
        callback(err, res.body);
    });
};

module.exports.roles = function (callback) {
    request.get(baseUrl + '/users/roles').end(function (err, res) {
        callback(err, res.body);
    });
};
