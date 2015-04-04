var Reflux = require('reflux');
var ArticlesActions = require('./ArticlesActions');
var ArticlesApi = require('./ArticlesApi');

var articlesStore = Reflux.createStore({
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
        })
    },
    onLoadArticles: function () {
        console.log("articlesStore", "onLoadArticles");
        ArticlesApi.getAll(function (articles) {
            console.log("articlesStore", "onLoadArticles", "getAll", articles);
            this.trigger(articles);
        }.bind(this));
    },
});

module.exports = articlesStore;
