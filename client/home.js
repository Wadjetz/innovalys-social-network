var m = require('mithril');
var Header = require('./header');
var NewsList = require('./news/news-list');

var Home = {
    controller: function () {
        return {
            headerCtrl: Header.controller(),
            newsListCtrl: NewsList.controller()
        }
    },
    view: function (ctrl) {
        return (
            m('div', [
                Header.view(ctrl.headerCtrl),
                NewsList.view(ctrl.newsListCtrl)
            ])
        );
    }
}

module.exports = Home;
