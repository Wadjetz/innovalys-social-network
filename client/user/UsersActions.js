var Reflux = require('reflux');

var UsersActions = Reflux.createActions({
    "loadUsers": {},
    "createUser": {
        children: [
            "completed",
            "failed"
        ]
    },
    "login": {
        children: [
            "completed",
            "failed"
        ]
    },
    "loadMe": {},
    "loadRoles": {},
    "updateUser": {},
    "deleteUser": {}
});

module.exports = UsersActions;
