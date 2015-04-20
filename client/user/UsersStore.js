var Reflux = require('reflux');
var UsersActions = require('./UsersActions');
var UsersApi = require('./UsersApi');
var moment = require('moment');
var utils = require('../../commun/utils');

var UsersStore = Reflux.createStore({
    data: {
        me: null,
        roles: [],
        email: "email@domain.com",
        first_name: "john",
        last_name: "Doe",
        birthday_date: moment().format(utils.mysqlDateFormat),
        adress: "rue bidon",
        function: "esclave",
        description: "fait rien du tout",
        arrival_date: moment().format(utils.mysqlDateFormat),
        role: "user"
        createdResult: {
            error: false,
            message: ""
        },
        access: {
            email: "",
            password: ""
        }
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
        UsersApi.create(user, (result) => {
            //console.log("UsersStore", "onCreateUser", "result", result, "user", user);
            this.data.result = result;
            this.trigger(this.data);
        });
    },
    onLogin: function (user) {
        UsersApi.login(user, (result) => {
            //console.log("UsersStore", "onLogin", "result", result, "user", user);
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
