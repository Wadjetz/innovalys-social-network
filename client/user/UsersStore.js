var Reflux = require('reflux');
var UsersActions = require('./UsersActions');
var UsersApi = require('./UsersApi');

var UsersStore = Reflux.createStore({
    data: {
        me: null
    },
    init: function () {
        //console.log("UsersStore", "init");
        this.listenTo(UsersActions.createUser, this.onCreateUser);
        this.listenTo(UsersActions.login, this.onLogin);
        this.listenTo(UsersActions.loadMe, this.onLoadMe);
    },
    onCreateUser: function (user) {
        UsersApi.create(user, (result) => {
            //console.log("UsersStore", "onCreateUser", "result", result, "user", user);
            this.trigger(result);
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
            console.log("UsersStore.onLoadMe", "err", err, "me", me);
            this.data.me = me;
            this.trigger(this.data);
        });
    }
});

module.exports = UsersStore;
