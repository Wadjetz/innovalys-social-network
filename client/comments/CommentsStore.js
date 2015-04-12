var Reflux = require('reflux');

var CommentsActions = require('./CommentsActions');
var CommentsApi     = require('./CommentsApi');

var CommentsStore = Reflux.createStore({
    data: {
        comments: [],
        loading: true
    },
    getInitialState: function () {
        return this.data;
    },
    init: function () {
        this.listenTo(CommentsActions.loadComments, this.onLoadComments);
        this.listenTo(CommentsActions.createComment, this.onCreateComment);
    },
    onLoadComments: function (news_id) {
        CommentsApi.getAllByNewsId(news_id, function (err, comments) {
            console.log("CommentsStore.onLoadComments.getAllByNewsId", "news_id", news_id, "comments", comments, "err", err);
            //CommentsActions.loadComments.completed(comments);
            this.data.comments = comments;
            this.data.loading = false;
            this.trigger(this.data);
        }.bind(this));
    },
    onCreateComment: function (comment) {
        CommentsApi.create(comment, function (err, result) {
            console.log("CommentsStore", "onCreateComment", "create", "comment", comment, "result", result, "err", err);
            if (result) {
                this.data.comments.push(result);
                this.trigger(this.data);
            }
        }.bind(this));
    },
    onRemoveComment: function (comment) {

    }
});

module.exports = CommentsStore;
