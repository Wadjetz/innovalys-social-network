const request = require('superagent');
const baseUrl = require('../conf').baseUrl;
const utils   = require('../utils/utils');

module.exports.findAll = function (callback) {
    request.get(baseUrl + '/news')
    .end(function (err, res) {
        //console.log("ArticleApi.getAll", "err", err, "res", res);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.get = function (slug, callback) {
    request.get(baseUrl + '/news/' + slug)
    .end(function (err, res) {
        //console.log("ArticleApi.get", "err", err, "res", res, "slug", slug);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.create = function (article, callback) {
    request.post(baseUrl + '/news')
    .send(article)
    .end(function (err, res) {
        //console.log("ArticleApi.create", "err", err, "res", res, "article", article);
        utils.handleErrors(err, res, callback);
    });
};
