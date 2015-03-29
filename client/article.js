var m = require('mithril');
var u = require('./utils/utils');

var Article = {
    vm: {
        article: m.prop({}),
        init: function(article) {
            console.log("article", article);
            Article.vm.article(article)
        }
    },
    controller: function (article) {
        Article.vm.init(article);
    },
    view: function (ctrl) {
        return (
            u.col(12, 8, 8, 8, [
                m('h1.title', Article.vm.article().title),
                m('.body.markdown', Article.vm.article().body)
            ])
        );
    }
};

module.exports = Article;