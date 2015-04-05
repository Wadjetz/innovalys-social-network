var Reflux = require('reflux');

var ArticlesActions = Reflux.createActions({
    'loadArticles': {},
    'loadSingleArticle': {
        children: [
            "completed",
            "failed"
        ]
    },
    'createArticle': {},
    'updateArticle': {},
    'deleteArticle': {}
});

module.exports = ArticlesActions;
