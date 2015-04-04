var m = require('mithril');
var Config = require('../services/config');

module.exports.create = function (newComments) {
    var config = Config.prepareRequest("POST", "/comments");
    config.data = newComments;
    return m.request(config);
};

module.exports.getAll = function (id, page) {
    var config = Config.prepareRequest("GET", "/comments/" + id + "?page=" + page);
    return m.request(config);
};
