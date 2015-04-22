var Reflux = require('reflux');
var UsersActions = require('./UsersActions');
var UsersApi = require('./UsersApi');
var moment = require('moment');
var utils = require('../../commun/utils');

var UsersStore = Reflux.createStore({
    data: {
        me: {
            first_name: "User",
            role: "user"
        },
        roles: [],
    },
    init: function () {
        //console.log("UsersStore", "init");
        this.listenTo(UsersActions.createUser, this.onCreateUser);
        this.listenTo(UsersActions.login, this.onLogin);
        this.listenTo(UsersActions.loadMe, this.onLoadMe);
        this.listenTo(UsersActions.loadRoles, this.onLoadRoles);
    },
    getInitialState: function () {
        return this.data;
    },
    onCreateUser: function (user) {
        UsersApi.create(user, (err, result) => {
            console.debug("UsersStore", "onCreateUser", "err", err, "result", result, "user", user);
            if (err) {
                UsersActions.createUser.failed(err.response.body); 
            } else {
                UsersActions.createUser.completed({
                    error: true,
                    access: {
                        email: result.access.email,
                        password: result.access.password
                    }
                });
            }
        });
    },
    onLogin: function (user) {
        UsersApi.login(user, (result) => {
            console.debug("UsersStore", "onLogin", "result", result, "user", user);
            UsersActions.loadMe();
            this.trigger(result);
        });
    },
    onLoadMe: function () {
        UsersApi.me((err, me) => {
            //console.log("UsersStore.onLoadMe", "err", err, "me", me);
            this.data.me = me;
            this.trigger(this.data);
        });
    },
    onLoadRoles: function () {
        UsersApi.roles((err, roles) => {
            //console.log("UsersStore.onLoadRoles", "err", err, "me", me);
            this.data.roles = roles;
            this.trigger(this.data);
        });
    }
});

module.exports = UsersStore;
