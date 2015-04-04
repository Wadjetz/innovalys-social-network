var Reflux = require('reflux');
var UsersActions = require('./UsersActions');
var UsersApi = require('./UsersApi');

var UsersStore = Reflux.createStore({
    init: function () {
        console.log("UsersStore", "init");
        this.listenTo(UsersActions.createUser, this.onCreateUser);
    },
    onCreateUser: function (user) {
        UsersApi.create(user, function (result) {
            console.log("UsersStore", "onCreateUser", "result", result, "user", user);
            this.trigger(result);
        }.bind(this));
    }
});

module.exports = UsersStore;