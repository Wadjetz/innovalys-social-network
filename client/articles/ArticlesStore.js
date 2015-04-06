var Reflux = require('reflux');
var ArticlesActions = require('./ArticlesActions');
var ArticlesApi = require('./ArticlesApi');
var utils = require('../utils');

var ArticlesStore = Reflux.createStore({
    data: {
        articles: [],
        singleArticle: null,
        loading: true
    },
    init: function () {
        this.listenTo(ArticlesActions.loadSingleArticle, this.onLoadSingleArticle);
        this.listenTo(ArticlesActions.loadArticles, this.onLoadArticles);
        this.listenTo(ArticlesActions.createArticle, this.onCreateArticle);
    },
    getInitialState: function () {
        return this.data;
    },
    onLoadSingleArticle: function (slug) {
        ArticlesApi.get(slug, function (err, article) {
            this.data.singleArticle = article;
            this.data.loading = false;
            this.trigger(this.data);
        }.bind(this));
    },
    onLoadArticles: function () {
        ArticlesApi.getAll(function (err, articles) {
            this.data.articles = articles;
            this.data.loading = false;
            this.trigger(this.data);
        }.bind(this));
    },
    onCreateArticle: function (article) {
        ArticlesApi.create(article, function (err, result) {
            ArticlesActions.createArticle.completed(err, result);
        });
    }
});

module.exports = ArticlesStore;
