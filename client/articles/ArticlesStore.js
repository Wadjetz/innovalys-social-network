var Reflux = require('reflux');
var actions = require('../actions.js');
var request = require('superagent');

var ArticlesActions = require('./ArticlesActions');

var articlesStore = Reflux.createStore({
    init: function () {
        console.log("articlesStore", "init");
        this.listenTo(actions.m1, this.onM1);
        this.listenTo(actions.m2, this.onM2);
        this.listenTo(ArticlesActions.loadArticles, this.onLoadArticles);
        this.listenTo(ArticlesActions.createArticle, this.onCreateArticle);
    },
    onCreateArticle: function (article) {
        this.trigger(article);
    },
    onLoadArticles: function (articles) {
        this.trigger([]);
    },
    onM1: function (m1) {
        console.log("articlesStore onM1", "m1", m1);

        this.trigger("yoyo")
    },
    onM2: function (m2) {
        console.log("articlesStore onM1", "m2", m2);
    },
});

module.exports = articlesStore;
