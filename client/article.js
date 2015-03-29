var m = require('mithril');
var u = require('./utils/utils');
var markdown = require("markdown").markdown;

var Article = {
    vm: {
        article: m.prop({}),
        init: function(article) {
            console.log("article", article);
            Article.vm.article(article)
        }
    },
    controller: function (article) {
        console.log("Article controller", article)
        Article.vm.init(article);
    },
    view: function (ctrl) {
        console.log("Article view", Article.vm.article());
        return (
            u.col(12, 8, 8, 8, [
                m('h1.title', Article.vm.article().title),
                m('.body.markdown', m.trust(markdown.toHTML(Article.vm.article().body)))
            ])
        );
    }
};

module.exports = Article;