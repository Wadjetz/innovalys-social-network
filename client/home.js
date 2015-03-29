var m = require('mithril');
var Header = require('./header');
var NewsList = require('./news-list');


var Home = {
    headerCtrl: Header.controller(),
    newsListCtrl: NewsList.controller(),
    controller: function () {
        // TODO
    },
    view: function (ctrl) {
        return (
            m('div', [
                Header.view(Home.headerCtrl),
                NewsList.view(Home.newsListCtrl)
            ])
        );
    }
}

module.exports = Home;
