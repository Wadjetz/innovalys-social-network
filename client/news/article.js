var m = require('mithril');
var u = require('../utils/utils');
var markdown = require("markdown").markdown;

var Article = {
    controller: function (article) {
        return {
            article: m.prop(article)
        };
    },
    view: function (ctrl) {
        console.log("Article view", ctrl.article());
        return (
            u.col(12, 8, 8, 8, [
                m('h1.title', [
                    m("a", {
                        href: "/news/" + ctrl.article().slug,
                        config: m.route
                    }, ctrl.article().title)
                ]),
                m('.body.markdown', m.trust(markdown.toHTML(ctrl.article().body)))
            ])
        );
    }
};

module.exports = Article;