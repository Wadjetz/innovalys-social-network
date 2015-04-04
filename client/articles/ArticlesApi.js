var request = require('superagent');
var baseUrl = require('../conf').baseUrl;

module.exports.getAll = function (callback) {
    request.get(baseUrl + '/news')
    .end(function (err, res) {
        console.log("ArticleApi.getAll", "err", err, "res", res);
        callback(err, res.body);
    });
};

module.exports.create = function (article, callback) {
    request.post(baseUrl + '/news')
    .send(article)
    .end(function (err, res) {
        console.log("ArticleApi.create", "err", err, "res", res, "article", article);
        callback(res.body);
    });
};
