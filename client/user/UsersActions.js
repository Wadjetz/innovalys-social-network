var Reflux = require('reflux');

var UsersActions = Reflux.createActions({
    "loadUsers": {},
    "createUser": {},
    "login": {
        children: [
            "completed",
            "failed"
        ]
    },
    "updateUser": {},
    "deleteUser": {}
});

module.exports = UsersActions;
