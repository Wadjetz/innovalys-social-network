var Reflux = require('reflux');

var ArticlesActions = Reflux.createActions({
    'loadArticles': {},
    'loadSingleArticle': {
        children: [
            "completed",
            "failed"
        ]
    },
    'createArticle': {
        children: [
            "completed"
        ]
    },
    'updateArticle': {},
    'deleteArticle': {}
});

module.exports = ArticlesActions;
