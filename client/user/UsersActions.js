const AppDispatcher  = require('../app/AppDispatcher');
const UsersConstants = require('./UsersConstants');

const UsersActions = {
    loadUsers: function () {
        AppDispatcher.handleViewAction({
            actionType: UsersConstants.LOAD_USERS
        });
    },
    loadMe: function () {
        AppDispatcher.handleViewAction({
            actionType: UsersConstants.LOAD_ME
        });
    },
    loadRoles: function () {
        AppDispatcher.handleViewAction({
            actionType: UsersConstants.LOAD_ROLES
        });
    },
    createUser: function (newUser) {
        AppDispatcher.handleViewAction({
            actionType: UsersConstants.CREATE_USER,
            newUser: newUser
        });
    },
    login: function (login) {
        AppDispatcher.handleViewAction({
            actionType: UsersConstants.LOGIN,
            login: login
        });
    },
};

module.exports = UsersActions;
