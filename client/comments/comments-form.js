var m = require('mithril');
var u = require('../utils/utils');
var markdown = require("markdown").markdown;
var CommentsAPI = require('./comments-api');

var CommentsForm = {
    vm: {
        articleId: m.prop(-1),
        title: m.prop(""),
        body: m.prop(""),
        init: function(articleId) {
            CommentsForm.vm.articleId(articleId);
        }
    },
    submit: function (e) {
        // TODO Valider les données
        var newComments = {
            article_id: CommentsForm.vm.articleId(),
            title: CreateNews.vm.title(),
            body: CreateNews.vm.body()
        };
        console.log("newComments", newComments);
        CommentsAPI.create(newComments).then(function (result) {
            // TODO geré le retour de la creation d'articles
            console.log("result", result);
        });
    },
    controller: function (article) {
        console.log("CommentsForm controller", article)
        CommentsForm.vm.init(article);
    },
    view: function (ctrl) {
        return (
            u.row(u.col(12, 12, 12, 12, [
                m('.form-group', [
                    m('label[for=title]', "Title"),
                    m('input[type=text]#title.form-control', {
                        placeholder: "Title",
                        onchange: m.withAttr("value", CommentsForm.vm.title),
                        value: CommentsForm.vm.title()
                    })
                ]),
                m('.form-group', [
                    m('label[for=body]', "Comments"),
                    m('textarea[rows="5"]#body.form-control', {
                        placeholder: "Comments",
                        onchange: m.withAttr("value", CommentsForm.vm.body),
                        value: CommentsForm.vm.body()
                    })
                ]),
                m('button.btn.btn-default', {
                    onclick: CommentsForm.submit
                }, "Envoyer")
            ]))
        );
    }
};

module.exports = CommentsForm;