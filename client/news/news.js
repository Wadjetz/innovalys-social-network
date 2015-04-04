var m = require('mithril');
var Article = require('./article');
var NewsAPI = require('./news-api');

//var Comments = require('../comments/comments');

var News = {
    controller: function () {
        return {
            slug: m.prop(m.route.param("slug"))
        }
    },
    view: function (ctrl) {
        //var newsView = (News.vm.articlesCtrl() !== null)? Article.view(News.vm.articlesCtrl()) : null;
        return (
            m('.container-fluid', [
                m('h1', "Articles" + ctrl.slug())
            ])
        );
    }
};

module.exports = News;