var m = require('mithril');
var Article = require('./article');
var NewsAPI = require('./news-api');

var NewsList = {
    controller: function () {
        var articlesCtrl = m.prop([]);

        NewsAPI.getAllNews(0).then(function (news) {
            news.map(function (article) {
                var _articlesCtrl = articlesCtrl();
                _articlesCtrl.push(Article.controller(article))
                articlesCtrl(_articlesCtrl);
                console.log("articlesCtrl()", articlesCtrl(), "_articlesCtrl", _articlesCtrl);
            });
        });

        return {
            articlesCtrl: articlesCtrl
        };
    },
    view: function (ctrl) {
        console.log("ctrl", ctrl);
        var newsView = ctrl.articlesCtrl().map(function (articleCtrl, i) {
            return Article.view(articleCtrl);
        });
        return (
            m('.container-fluid', [
                newsView
            ])
        );
    }
};

module.exports = NewsList;