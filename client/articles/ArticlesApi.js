var request = require('superagent');
var baseUrl = require('../conf').baseUrl;

module.exports.getAll = function (callback) {
    request.get(baseUrl + '/news').end(function (err, res) {
        console.log("Api", "getAll", res, err);
        callback(res.body);
    });
};

module.exports.create = function (article, callback) {
    request.post(baseUrl + '/news').send(article).end(function (err, res) {
        console.log("Api", "create", res, err);
        callback(res.body);
    });
};
