var request = require('superagent');
var baseUrl = require('../conf').baseUrl;
var utils = require('../utils');

module.exports.getAllByNewsId = function (news_id, callback) {
    request.get(baseUrl + '/comments/news/' + news_id)
    .end(function (err, res) {
        //console.log("CommentsApi.getAll", "err", err, "res", res, "news_id", news_id);
        utils.handleErrors(err, res, callback);
    });
};

module.exports.create = function (comment, callback) {
    request.post(baseUrl + '/comments')
    .send(comment)
    .end(function (err, res) {
        //console.log("CommentsApi.create", "err", err, "res", res, "comment", comment);
        utils.handleErrors(err, res, callback);
    });
};
