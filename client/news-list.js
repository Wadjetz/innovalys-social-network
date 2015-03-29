var m = require('mithril');
var Article = require('./article');
var NewsAPI = require('./services/news-api');

var NewsList = {
    vm: {
        news: m.prop([]),
        init: function () {
            // TODO recuperes les news sur le server
            NewsAPI.getAllNews(0).then(function (news) {
                console.log(news);
                NewsList.vm.news(news.map(function (article, i) {
                    return Article.controller(article)
                }))
            });
        }
    },
    controller: function () {
        this.vm.init();
    },
    view: function (ctrl) {
        var newsView = NewsList.vm.news().map(function (articleCtrl, i) {
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