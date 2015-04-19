var Reflux = require('reflux');

var CommentsActions = Reflux.createActions({
    'loadComments': {
        children: [
            "completed",
            "failed"
        ]
    },
    'createComment': {
        children: [
            "completed",
            "failed"
        ]
    },
    'updateComment': {},
    'deleteComment': {}
});

module.exports = CommentsActions;
