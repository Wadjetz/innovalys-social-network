const ArticlesConstants = require('./ArticlesConstants');
const AppDispatcher     = require('../app/AppDispatcher');

const ArticlesActions = {
    loadArticles: function () {
        AppDispatcher.handleViewAction({
            actionType: ArticlesConstants.LOAD_ARTICLES
        });
    },
    loadSingleArticle: function (slug) {
        AppDispatcher.handleViewAction({
            actionType: ArticlesConstants.LOAD_SINGLE_ARTICLE,
            slug: slug
        });
    },
    createArticle: function (newArticle) {
        AppDispatcher.handleViewAction({
            actionType: ArticlesConstants.CREATE_ARTICLE,
            newArticle: newArticle
        });
    },
    createArticleSuccessful: function (createdArticle) {
        AppDispatcher.handleViewAction({
            actionType: ArticlesConstants.CREATE_ARTICLE_SUCCESSFUL,
            createdArticle: createdArticle
        });
    },
    createArticleFailed: function (error) {
        AppDispatcher.handleViewAction({
            actionType: ArticlesConstants.CREATE_ARTICLE_FAILED,
            error: error
        });
    }
};

module.exports = ArticlesActions;
