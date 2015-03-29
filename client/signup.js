var m = require('mithril');
var u = require('./utils/utils');
var userClient = require('./services/user-api');

var Signup = {
    email: m.prop("egor@egor.fr"),
    role: m.prop("user"),
    first_name: m.prop("egor"),
    last_name: m.prop("ber"),
    birthday_date: m.prop("2000-03-04"),
    adress: m.prop("17 rue bidon"),
    function: m.prop("Dev"),
    description: m.prop("description"),
    arrival_date: m.prop("2015-03-04"),
    submit: function (e) {
        e.preventDefault();
        // TODO Verifications des données
        var newUser = {
            "email": Signup.email(),
            "role": Signup.role(),
            "first_name": Signup.first_name(),
            "last_name": Signup.last_name(),
            "birthday_date": Signup.birthday_date(),
            "adress": Signup.adress(),
            "function": Signup.function(),
            "description": Signup.description(),
            "arrival_date": Signup.arrival_date()
        }
        console.log(newUser);
        userClient.signup(newUser).then(function (result) {
            console.log("result", result);
        });
    },
    controller: function () {
        // body...
    },
    view: function () {
        return (
            m('.container', u.col(12, 12, 6, 6, [
                m('h1', "Enregistrer un nouvel utilisateur"),
                m('.form-login', [
                    m('.form-group', [
                        m('label[for=email]', "Email"),
                        m('input[type=text]#email.form-control', {
                            placeholder: "Email",
                            onchange: m.withAttr("value", this.email),
                            value: this.email()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=role]', "Role"),
                        m('input[type=text]#role.form-control', {
                            placeholder: "Role",
                            onchange: m.withAttr("value", this.role),
                            value: this.role()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=first_name]', "Prenom"),
                        m('input[type=text]#first_name.form-control', {
                            placeholder: "Prenom",
                            onchange: m.withAttr("value", this.first_name),
                            value: this.first_name()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=last_name]', "Nom"),
                        m('input[type=text]#last_name.form-control', {
                            placeholder: "Nom",
                            onchange: m.withAttr("value", this.last_name),
                            value: this.last_name()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=birthday_date]', "Date de naissance"),
                        m('input[type=date]#birthday_date.form-control', {
                            placeholder: "Date de naissance",
                            onchange: m.withAttr("value", this.birthday_date),
                            value: this.birthday_date()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=function]', "Poste"),
                        // TODO transformer en select
                        m('input[type=text]#function.form-control', {
                            placeholder: "Poste",
                            onchange: m.withAttr("value", this.function),
                            value: this.function()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=arrival_date]', "Date d'arrivée"),
                        m('input[type=date]#arrival_date.form-control', {
                            placeholder: "Date d'arrivée",
                            onchange: m.withAttr("value", this.arrival_date),
                            value: this.arrival_date()
                        })
                    ]),
                    m('.form-group', [
                        m('label[for=description]', "Description"),
                        m('textarea#description.form-control', {
                            placeholder: "Description",
                            onchange: m.withAttr("value", this.description),
                            value: this.description()
                        })
                    ]),
                    m('button.btn.btn-default', {
                        onclick: this.submit
                    }, "Enregestrer")
                ])
            ]))
        );
    }
};

module.exports = Signup;