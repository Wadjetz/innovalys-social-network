var Reflux = require('reflux');

var UsersActions = Reflux.createActions({
    "loadUsers": {},
    "createUser": {},
    "updateUser": {},
    "deleteUser": {}
});

module.exports = UsersActions;
