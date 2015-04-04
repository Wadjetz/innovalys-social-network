var request = require('superagent');
var baseUrl = require('../conf').baseUrl;

module.exports.getAll = function (callback) {
    request.get(baseUrl + '/users').end(function (err, res) {
        console.log("UserApi", "getAll", "res", res, "err", err);
        callback(res.body);
    });
};

module.exports.create = function (user, callback) {
    request.post(baseUrl + '/users').send(user).end(function (err, res) {
        console.log("UserApi", "create", "res", res, "err", err, "user", user);
        callback(res.body);
    });
};
