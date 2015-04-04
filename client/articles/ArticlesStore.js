var Reflux = require('reflux');
var ArticlesActions = require('./ArticlesActions');
var AppActions = require('../AppActions');
var ArticlesApi = require('./ArticlesApi');

var ArticlesStore = Reflux.createStore({
    init: function () {
        console.log("articlesStore", "init");
        this.listenTo(ArticlesActions.loadArticles, this.onLoadArticles);
        this.listenTo(ArticlesActions.createArticle, this.onCreateArticle);
    },
    onCreateArticle: function (article) {
        console.log("articlesStore", "onCreateArticle", article);
        ArticlesApi.create(article, function (result) {
            console.log("articlesStore", "onCreateArticle", "create", result);
            //this.trigger(article);
        });
    },
    onLoadArticles: function () {
        console.log("articlesStore", "onLoadArticles");
        ArticlesApi.getAll(function (err, articles) {
            console.log("articlesStore", "onLoadArticles", "getAll", articles, "err", err);
            if (err) {
                if (err.status === 401) {
                    console.log("ArticlesStore", "unauthorized");
                    AppActions.unauthorized();
                }
                if (err.status === 403) {
                    console.log("ArticlesStore", "unauthorized");
                    AppActions.forbidden();
                }
            } else {
                this.trigger(articles);
            }
        }.bind(this));
    },
});

module.exports = ArticlesStore;
