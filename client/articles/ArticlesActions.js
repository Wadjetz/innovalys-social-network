var Reflux = require('reflux');

var ArticlesActions = Reflux.createActions({
    "loadArticles": {},
    "createArticle": {},
    "updateArticle": {},
    "deleteArticle": {}
});

module.exports = ArticlesActions;
