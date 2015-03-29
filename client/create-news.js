var m = require('mithril');
var u = require('./utils/utils');
var NewsAPI = require('./services/news-api');
var moment = require('moment');
var Header = require('./header');
var markdown = require("markdown").markdown;

var CreateNews = {
    vm: {
        title: m.prop(""),
        body: m.prop(""),
        publish: m.prop(""),
        init: function () {
            console.log(this.publish());
        }
    },
    headerCtrl: Header.controller(),
    controller: function () {
        CreateNews.vm.init();
    },
    submit: function () {
        // TODO Validé les données
        var newArticle = {
            title: CreateNews.vm.title(),
            body: CreateNews.vm.body(),
            publish: CreateNews.vm.publish()
        };
        console.log("newArticle", newArticle);
        NewsAPI.create(newArticle).then(function (result) {
            // TODO geré le retour de la creation d'articles
            console.log("result", result);
        });
    },
    controller: function () {
        // body...
    },
    view: function (ctrl) {
        return (
            m('div', [
                Header.view(CreateNews.headerCtrl),
                m('.container-fluid', [
                    u.row([
                        u.col(12, 6, 6, 6, [
                            m('.new-article', [
                                m('h1', "Create News"),
                                m('.form-group', [
                                    m('label[for=title]', "Title"),
                                    m('input[type=text]#title.form-control', {
                                        placeholder: "Title",
                                        onchange: m.withAttr("value", CreateNews.vm.title),
                                        value: CreateNews.vm.title()
                                    })
                                ]),
                                m('.form-group', [
                                    m('label[for=body]', "Body"),
                                    m('textarea[rows="20"]#body.form-control', {
                                        placeholder: "body",
                                        onchange: m.withAttr("value", CreateNews.vm.body),
                                        value: CreateNews.vm.body()
                                    })
                                ]),
                                m('.form-group', [
                                    m('label[for=publish]', "Date de publication"),
                                    m('input[type=date]#publish.form-control', {
                                        onchange: m.withAttr("value", CreateNews.vm.publish),
                                        value: CreateNews.vm.publish()
                                    })
                                ]),
                                m('button.btn.btn-default', {
                                    onclick: this.submit
                                }, "Enregistrer")
                            ])
                        ]),
                        u.col(12, 6, 6, 6, [
                            m('h1', "Preview"),
                            m('h1', CreateNews.vm.title()),
                            m('.preview', [
                                m.trust(markdown.toHTML(CreateNews.vm.body()))
                            ])
                        ])
                    ])
                ])
            ])
        );
    }
};

module.exports = CreateNews;