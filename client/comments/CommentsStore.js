const assign            = require('lodash/object/assign');
const AppDispatcher     = require('../app/AppDispatcher');
const CommentsConstants = require('./CommentsConstants');
const CommentsApi       = require('./CommentsApi');
const Store             = require('../flux/Store');

var _data = {
    comments: []
}

function addComment(comment) {
    _data.comments.push(comment);
}

const CommentsStore = assign(Store, {
    getComments: function () {
        return _data.comments;
    },
    dispatcherIndex: AppDispatcher.register((payload) => {
        let action = payload.action;
        switch(action.actionType) {
            case CommentsConstants.LOAD_COMMENTS:
                _data.comments = [];
                CommentsApi.getAllByNewsId(action.slug, (err, comments) => {
                    console.log("CommentsStore.dispatcherIndex.LOAD_COMMENTS", action, "comments", comments);
                    _data.comments = comments;
                    CommentsStore.emitChange();
                });
                break;
            case CommentsConstants.CREATE_COMMENT:
                CommentsApi.create(action.newComment, (err, createdComment) => {
                    console.log("CommentsStore.dispatcherIndex.CREATE_COMMENT", action, "createdComment", createdComment);
                    addComment(createdComment);
                    CommentsStore.emitChange();
                });
                break;
        }
        return true;
    })
});

module.exports = CommentsStore;
