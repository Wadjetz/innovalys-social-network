var request = require('superagent');
var baseUrl = require('../conf').baseUrl;
var utils = require('../utils');

module.exports.getAll = function (callback) {
    request.get(baseUrl + '/groups')
    .end(function (err, res) {
        console.log("GroupsApi.getAll", "err", err, "res", res);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.get = function (slug, callback) {
    request.get(baseUrl + '/groups/' + slug)
    .end(function (err, res) {
        console.log("GroupsApi.get", "err", err, "res", res, "slug", slug);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.create = function (group, callback) {
    request.post(baseUrl + '/groups')
    .send(group)
    .end(function (err, res) {
        console.log("GroupsApi.create", "err", err, "res", res, "group", group);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.join = function (group, callback) {
    request.post("/groups/members/join/" + group.slug).send().end(function (err, res) {
        console.debug("GroupsApi.join", "err", err, "res", "group", group);
        utils.handleErrors(err, res, callback);
    });
};

