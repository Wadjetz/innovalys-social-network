var Reflux = require('reflux');
var UsersActions = require('./UsersActions');
var UsersApi = require('./UsersApi');

var UsersStore = Reflux.createStore({
    init: function () {
        console.log("UsersStore", "init");
        this.listenTo(UsersStore.createUser, this.onCreateUser);
    },
    onCreateUser: function (user) {
        UsersApi.create(user, function (result) {
            console.log("UsersStore", "onCreateUser", "result", result, "user", user);
            //this.trigger(article);
        })
    }
});

module.exports = UsersStore;
