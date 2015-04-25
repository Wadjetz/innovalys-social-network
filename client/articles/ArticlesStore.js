const assign            = require('lodash/object/assign');
const AppDispatcher     = require('../app/AppDispatcher');
const ArticlesConstants = require('./ArticlesConstants');
const ArticlesApi       = require('./ArticlesApi');
const ArticlesActions   = require('./ArticlesActions');
const Store             = require('../flux/Store');
const CommentsActions   = require('../comments/CommentsActions');

var _data = {
    articles: [],
    singleArticle: {},
    loading: 0,
    createdArticle: {},
    createArticleError: {}
};

const ArticlesStore = assign(Store, {
    getArticles: function () {
        return _data.articles;
    },
    getSingleArticle: function () {
        return _data.singleArticle;
    },
    getLoading: function () {
        return _data.loading;
    },
    getCreatedArticle: function () {
        return _data.createdArticle;
    },
    getCreateArticleError: function () {
        return _data.createArticleError;
    },
    dispatcherIndex: AppDispatcher.register((payload) => {
        let action = payload.action;
        switch(action.actionType) {
            case ArticlesConstants.LOAD_ARTICLES:
                ArticlesApi.findAll((err, articles) => {
                    //console.log("ArticlesStore.dispatcherIndex.LOAD_ARTICLES articles=", articles);
                    _data.articles = articles;
                    ArticlesStore.emitChange();
                });
                break;
            case ArticlesConstants.LOAD_SINGLE_ARTICLE:
                ArticlesApi.get(action.slug, (err, singleArticle) => {
                    console.log("ArticlesStore.dispatcherIndex.LOAD_ARTICLES action", action, "singleArticle", singleArticle);
                    _data.singleArticle = singleArticle;
                    CommentsActions.loadComments(singleArticle.id)
                    ArticlesStore.emitChange();
                });
                break;
            case ArticlesConstants.CREATE_ARTICLE:
                ArticlesApi.create(action.newArticle, (err, createdArticle) => {
                    //console.log("ArticlesStore.dispatcherIndex.CREATE_ARTICLE action", action, "createdArticle", createdArticle);
                    if (err) {
                        ArticlesActions.createArticleFailed(err);
                    } else {
                        ArticlesActions.createArticleSuccessful(createdArticle);
                    }
                });
                break;
            case ArticlesConstants.CREATE_ARTICLE_SUCCESSFUL:
                //console.log("ArticlesStore.dispatcherIndex.CREATE_ARTICLE_SUCCESSFUL action", action);
                _data.createdArticle = {createdArticle: action.createdArticle};
                ArticlesStore.emitChange();
                break;
            case ArticlesConstants.CREATE_ARTICLE_FAILED:
                //console.log("ArticlesStore.dispatcherIndex.CREATE_ARTICLE_FAILED action", action);
                _data.createArticleError = action.error
                ArticlesStore.emitChange();
                break;
        }
        return true;
    })
});

module.exports = ArticlesStore;
