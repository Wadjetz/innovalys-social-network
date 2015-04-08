var Reflux = require('reflux');
var UsersActions = require('./UsersActions');
var UsersApi = require('./UsersApi');

var UsersStore = Reflux.createStore({
    init: function () {
        //console.log("UsersStore", "init");
        this.listenTo(UsersActions.createUser, this.onCreateUser);
        this.listenTo(UsersActions.login, this.onLogin);
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
    }
});

module.exports = UsersStore;
