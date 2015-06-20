import _ from 'lodash'
import moment from 'moment'
import utils from '../../commun/utils'
import AppDispatcher from '../app/AppDispatcher'
import Store from '../flux/Store'
import UsersActions from './UsersActions'
import UsersApi from './UsersApi'
import UsersConstants from './UsersConstants'

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

const UsersStore = _.assign(Store, {
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
        UsersApi.create(action.newUser)
          .then(createdUser => {
            _data.signupResult = createdUser;
            UsersStore.emitChange();
          })
          .fail(err => {
            _data.signupError = err;
            UsersStore.emitChange();
          });
        break;

      case UsersConstants.LOGIN:
        _data.connected = false;
        _data.loginError = "";
        UsersApi.login(action.login)
          .then(result => {
            _data.connected = true;
            UsersStore.emitChange();
          })
          .fail(err => {
            _data.loginError = err;
            UsersStore.emitChange();
          });
        break;

      case UsersConstants.LOAD_ME:
        UsersApi.me()
          .then(me => {
            _data.me = me;
            UsersStore.emitChange();
          })
          .fail(err => {
            console.error(err);
            UsersStore.emitChange();
          })
        break;

      case UsersConstants.LOAD_ROLES:
        UsersApi.roles()
          .then(roles => {
            _data.roles = roles;
            UsersStore.emitChange();
          })
          .fail(err => {
            console.error(err);
            UsersStore.emitChange();
          });
        break;
    }
    return true;
  })
});

export default UsersStore;
