var m = require('mithril');
var Article = require('./article');

var NewsList = {
    vm: {
        news: m.prop([]),
        init: function () {
            // TODO recuperes les news sur le server
            NewsList.vm.news([
                Article.controller({
                    id: 1,
                    title: "Article 1",
                    body: "Super Article"
                }),
                Article.controller({
                    id: 2,
                    title: "Article 1",
                    body: "Super Article"
                })
            ]);
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