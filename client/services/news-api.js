var m = require('mithril');
var Config = require('./config');

module.exports.create = function (newArticle) {
    var config = Config.prepareRequest("POST", "/news");
    config.data = newArticle;
    return m.request(config);
}

module.exports.getAllNews = function (page) {
    var config = Config.prepareRequest("GET", "/news?page=" + page);
    return m.request(config);
}
