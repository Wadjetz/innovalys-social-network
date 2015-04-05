var Reflux = require('reflux');

var AppActions      = require('../AppActions');
var CommentsActions = require('./CommentsActions');
var CommentsApi     = require('./CommentsApi');

var CommentsStore = Reflux.createStore({
    init: function () {
        console.log("CommentsStore", "init");
        this.listenTo(CommentsActions.loadComments, this.onLoadComments);
        this.listenTo(CommentsActions.createComment, this.onCreateComment);
    },
    onLoadComments: function (news_id) {
        console.log("CommentsStore", "onLoadComments");
        CommentsApi.getAllByNewsId(news_id, function (err, comments) {
            console.log("CommentsStore.onLoadComments.getAllByNewsId", "news_id", news_id, "comments", comments, "err", err);
            if (err) {
                if (err.status === 401) {
                    console.log("CommentsStore", "unauthorized");
                    AppActions.unauthorized();
                }
                if (err.status === 403) {
                    console.log("CommentsStore", "unauthorized");
                    AppActions.forbidden();
                }
            } else {
                this.trigger(comments);
            }
        }.bind(this));
    },
    onCreateComment: function (comment) {
        console.log("CommentsStore", "onCreateComment", comment);
        CommentsApi.create(comment, function (err, result) {
            console.log("CommentsStore", "onCreateComment", "create", result, "err", err);
            //this.trigger(article);
        });
    }
});

module.exports = CommentsStore;
