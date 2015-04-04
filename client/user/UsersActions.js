var Reflux = require('reflux');

var UsersActions = Reflux.createActions({
    "loadUsers": {},
    "createUser": {},
    "login": {},
    "updateUser": {},
    "deleteUser": {}
});

module.exports = UsersActions;
