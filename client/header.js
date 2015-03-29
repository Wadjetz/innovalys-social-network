var m = require('mithril');

// TODO "Divisez ce machin en petits machins" by M. GOY

var Header = {
    controller: function () {
        // TODO
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
                            m('li',
                                m('a[href=#]', "Admin")),
                            m('li.dropdown', [
                                m('a[href=#].dropdown-toggle', {'data-toggle': "dropdown"}, "Options ", m('span.caret')),
                                m('ul.dropdown-menu', [
                                    m('li',
                                        m('a[href=#]', "L1")),
                                    m('li',
                                        m('a[href=#]', "L2")),
                                    m('li',
                                        m('a[href=#]', "L3"))
                                ])
                            ])
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