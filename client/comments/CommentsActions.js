const CommentsConstants = require('./CommentsConstants');
const AppDispatcher     = require('../app/AppDispatcher');

const CommentsActions = {
    loadComments: function (slug) {
        console.debug("CommentsActions.loadComments slug", slug);
        AppDispatcher.handleViewAction({
            actionType: CommentsConstants.LOAD_COMMENTS,
            slug: slug
        });
    },
    createComment: function (newComment) {
        AppDispatcher.handleViewAction({
            actionType: CommentsConstants.CREATE_COMMENT,
            newComment: newComment
        });
    }
}

module.exports = CommentsActions;
