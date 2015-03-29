var m = require('mithril');
var u = require('./utils/utils');

var Login = {
    submit: function (ctrl) {
        console.log("login", ctrl.login(), "password", ctrl.password())
        // TODO connexion vers le server
        m.route("/")
    },
    controller: function () {
        return {
            login: m.prop(""),
            password: m.prop(""),
        };
    },
    view: function (ctrl) {
        return (
            m('.container', u.col(12, 12, 6, 6, [
                m('.form-login', [
                    m('.form-group', [
                        m('label[for=login]', "Login"),
                        m('input[type=text]#login.form-control', {
                            placeholder: "login",
                            onchange: m.withAttr("value", ctrl.login),
                            value: ctrl.login()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=password]', "Password"),
                        m('input[type=text]#password.form-control', {
                            placeholder: "password",
                            onchange: m.withAttr("value", ctrl.password),
                            value: ctrl.password()
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