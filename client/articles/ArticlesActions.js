var Reflux = require('reflux');

var ArticlesActions = Reflux.createActions({
    "loadArticles": {},
    "loading": {},
    "createArticle": {},
    "updateArticle": {},
    "deleteArticle": {}
});

module.exports = ArticlesActions;
