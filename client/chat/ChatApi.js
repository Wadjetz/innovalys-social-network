var request = require('superagent');
var baseUrl = require('../conf').baseUrl;
var utils = require('../utils');

module.exports.getAllMessages = function (page, callback) {
    request.get(baseUrl + '/chat/global/history')
    .end(function (err, res) {
        //console.log("ChatApi.getAllMessages", "err", err, "res", res, "news_id", news_id);
        utils.handleErrors(err, res, callback);
    });
};
