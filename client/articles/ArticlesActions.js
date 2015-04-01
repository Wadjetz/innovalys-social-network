var Reflux = require('reflux');

var ArticlesActions = Reflux.createActions({
    "loadArticles": {
      children: [
        "progressed",
        "completed",
        "failed"
      ]
    },
    "reloadArticles": {},
    "updateArticle": {},
    "deleteArticle": {},
    "createArticle": {}
});

module.exports = ArticlesActions;


