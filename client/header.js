var m = require('mithril');
var UserRoles = require('./services/user-api').roles;
// TODO "Divisez ce machin en petits machins" by M. GOY

var Header = {
    role: m.prop(UserRoles.USER),
    controller: function () {
        // TODO get role from server
        Header.role(UserRoles.ADMIN)
    },
    view: function (ctrl) {
        return (
            m('.navbar.navbar-default', [
                m('.container-fluid', [
                    m('.navbar-header', [
                        m('button[type=button].navbar-toggle.collapsed', {"data-toggle": "collapse", "data-target" :"#bs-example-navbar-collapse-1"}, [
                            m('span.sr-only', 'Toggle navigation'),
                            m('span.icon-bar'),
                            m('span.icon-bar'),
                            m('span.icon-bar')
                        ]),
                        m('a[href=#].navbar-brand', "Innovalys Social Network")
                    ]),
                    m('#bs-example-navbar-collapse-1.collapse.navbar-collapse', [
                        m('ul.nav.navbar-nav', [
                            m('li.active',
                                m('a[href=#]', "Home")),
                            m('li',
                                m('a[href=#]', "Groups")),
                            m('li.dropdown', [
                                m('a[href=#].dropdown-toggle', {'data-toggle': "dropdown"}, UserRoles.ADMIN, m('span.caret')),
                                m('ul.dropdown-menu', [
                                    m('li',
                                        m("a[href='/signup']", {config: m.route}, "Enregistrer")),
                                    m('li',
                                        m('a[href=#]', "L2")),
                                    m('li',
                                        m('a[href=#]', "L3"))
                                ])
                            ]),
                            (((Header.role() === UserRoles.ADMIN) || (Header.role() === UserRoles.RH))
                                ? m('li', m("a[href='/news/create']", {config: m.route}, "New Article"))
                                : null
                            )
                        ]),
                        m('form.navbar-form.navbar-left', [
                            m('.form-group', [
                                m('input[type="text].form-control', { placeholder: "Search" })
                            ]),
                            m('button.btn.btn-default', "Search")
                        ]),
                        m('ul.nav.navbar-nav.navbar-right', [
                            m('li',
                                m('a[href=#]', "Profil")),
                            m('li.dropdown', [
                                m('a[href=#].dropdown-toggle', {'data-toggle': "dropdown"}, "Options ", m('span.caret')),
                                m('ul.dropdown-menu', [
                                    m('li',
                                        m('a[href=#]', "Parametres")),
                                    m('li',
                                        m('a[href=#]', "Deconexion"))
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        )
    }
};

module.exports = Header;