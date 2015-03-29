var m = require('mithril');
var u = require('../utils/utils');
var markdown = require("markdown").markdown;
var CommentsAPI = require('./comments-api');
var CommentsForm = require('./comments-form');

var Comments = {
    vm: {
        articleId: m.prop(0),
        comments: m.prop([]),
        page: m.prop(0),
        init: function(articleId) {
            Comments.vm.articleId(articleId);
            console.log("article_id", articleId);
            CommentsAPI.getAll(articleId, Comments.vm.page()).then(function (comments) {
                Comments.vm.comments(comments);
            });
        }
    },
    controller: function (article) {
        console.log("Comments controller", article)
        Comments.vm.init(article);
    },
    view: function (ctrl) {
        console.log("Comments view", Comments.vm.comments());
        var commentsView = Comments.vm.comments().map(function (comment, i) {
            return m('.comment-title', comment.title); // TODO
        });
        return (
            u.row(u.col(12, 12, 12, 12, [
                m('h3.title', "Comments"),
                commentsView,
                CommentsForm.view(CommentsForm.controller(Comments.vm.articleId()))
            ]))
        );
    }
};

module.exports = Comments;