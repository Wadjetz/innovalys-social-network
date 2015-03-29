var m = require('mithril');
var Article = require('./article');
var NewsAPI = require('./services/news-api');
var _ = require('lodash');

var NewsList = {
    vm: {
        news: m.prop([]),
        _test: m.prop(""),
        init: function () {
            NewsAPI.getAllNews(0).then(function (news) {
                NewsList.vm.news(news);
            });
        }
    },
    controller: function () {
        console.log("NewsList controller", NewsList.vm.news());
        this.vm.init();
    },
    view: function (ctrl) {
        console.log("NewsList view", NewsList.vm.news());
        var newsView = NewsList.vm.news().map(function (article, i) {
            console.log("article", article)
            return Article.view(Article.controller(article)); // m('h1', article.title) //Article.view(articleCtrl);
        });
        return (
            m('.container-fluid', [
                newsView
            ])
        );
    }
};

module.exports = NewsList;