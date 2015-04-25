const assign         = require('lodash/object/assign');
const moment         = require('moment');
const utils          = require('../../commun/utils');
const AppDispatcher  = require('../app/AppDispatcher');
const Store          = require('../flux/Store');
const UsersActions   = require('./UsersActions');
const UsersApi       = require('./UsersApi');
const UsersConstants = require('./UsersConstants');

var _data = {
     roles: [],
     me: {
        first_name: "User",
        role: "user",
        arrival_date: moment(),
        birthday_date: moment(),
        description: "",
        email: "",
        function: "",
        last_connection: moment(),
        status_connection: "",
        status_profile: ""
    },
    connected: false,
    loginError: "",
    signupResult: {
        access: {
            email: "",
            password: ""
        }
    },
    signupError: ""
};

const UsersStore = assign(Store, {
    getMe: function () {
        return _data.me;
    },
    getRoles: function () {
        return _data.roles;
    },
    isConnected: function () {
        return _data.connected;
    },
    getLoginError: function () {
        return _data.loginError;
    },
    getSignupResult: function () {
        return _data.signupResult;
    },
    getSignupError: function () {
        return _data.signupError;
    },
    dispatcherIndex: AppDispatcher.register((payload) => {
        let action = payload.action;
        switch(action.actionType) {
            
            case UsersConstants.CREATE_USER:
                _data.signupError = "";
                _data.signupResult= {access: { email: "",password: ""}}
                UsersApi.create(action.newUser, (err, createdUser) => {
                    console.debug("UsersStore.CREATE_USER", "action", action, "err", err, "createdUser", createdUser);
                    if (err) {
                        _data.signupError = err.response.body;
                    } else {
                        _data.signupResult = createdUser;
                    }
                    UsersStore.emitChange();
                });
                break;

            case UsersConstants.LOGIN:
                _data.connected = false;
                _data.loginError = "";
                UsersApi.login(action.login, (err, result) => {
                    console.debug("UsersStore.LOGIN", "action", action, "err", err, "result", result);
                    if (err) {
                        _data.loginError = err.response.body;
                    } else {
                        _data.connected = true;
                    }
                    UsersStore.emitChange();
                });
                break;

            case UsersConstants.LOAD_ME:
                UsersApi.me((err, me) => {
                    console.debug("UsersStore.LOAD_ME", "action", action, "err", err, "me", me);
                    _data.me = me;
                    UsersStore.emitChange();
                });
                break;

            case UsersConstants.LOAD_ROLES:
                UsersApi.roles((err, roles) => {
                    console.debug("UsersStore.LOAD_ROLES", "action", action, "err", err, "roles", roles);
                    _data.roles = roles;
                    UsersStore.emitChange();
                });
                break;
        }
        return true;
    })
});

module.exports = UsersStore;
