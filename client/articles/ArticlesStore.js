var Reflux = require('reflux');
var ArticlesActions = require('./ArticlesActions');
var AppActions = require('../AppActions');
var ArticlesApi = require('./ArticlesApi');

var ArticlesStore = Reflux.createStore({
    init: function () {
        console.log("articlesStore", "init");
        this.listenTo(ArticlesActions.loadSingleArticle, this.onLoadSingleArticle);
        this.listenTo(ArticlesActions.loadArticles, this.onLoadArticles);
        this.listenTo(ArticlesActions.createArticle, this.onCreateArticle);
    },
    onLoadSingleArticle: function (slug) {
        console.log("ArticlesStore.onLoadSingleArticle", "slug", slug);
        ArticlesApi.get(slug, function (err, article) {
            console.log("ArticlesStore.onLoadSingleArticle.get", "article", article, "err", err);
            ArticlesActions.loadSingleArticle.completed(article)
        }.bind(this));
    },
    onLoadArticles: function () {
        //console.log("ArticlesStore", "onLoadArticles");
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
    onCreateArticle: function (article) {
        //console.log("ArticlesStore", "onCreateArticle", article);
        ArticlesApi.create(article, function (result) {
            console.log("ArticlesStore", "onCreateArticle", "create", result);
            //this.trigger(article);
        });
    }
});

module.exports = ArticlesStore;
