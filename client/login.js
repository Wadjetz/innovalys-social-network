var m = require('mithril');
var u = require('./utils/utils');

var Login = {
    login: m.prop(""),
    password: m.prop(""),
    submit: function () {
        console.log("login", Login.login(), "password", Login.password())
        // TODO connexion vers le server
        m.route("/")
    }.bind(this),
    controller: function () {
        // body...
    },
    view: function () {
        return (
            m('.container', u.col(12, 12, 6, 6, [
                m('.form-login', [
                    m('.form-group', [
                        m('label[for=login]', "Login"),
                        m('input[type=text]#login.form-control', {
                            placeholder: "login",
                            onchange: m.withAttr("value", this.login),
                            value: this.login()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=password]', "Password"),
                        m('input[type=text]#password.form-control', {
                            placeholder: "password",
                            onchange: m.withAttr("value", this.password),
                            value: this.password()
                        })
                    ]),
                    m('button.btn.btn-default', {
                        onclick: this.submit
                    }, "Login")
                ])
            ]))
        );
    }
};

module.exports = Login;