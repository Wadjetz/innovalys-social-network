import _ from 'lodash';
import moment from 'moment';
import AppDispatcher from '../app/AppDispatcher';
import Store from '../flux/Store';
import AppActions from '../app/AppActions';
import { LOAD_USERS, LOAD_ME, LOGIN, LOGIN_ERROR } from './UsersActions';
import UsersApi from './UsersApi';

var _usersData = {
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
  users: [],
  form: {
    
  }
};

var UsersStore = _.assign(Store, {
  getData: function () {
    return _usersData;
  },
  getMe: function () {
    return _usersData.me;
  },
  isConnected: function () {
    return _usersData.connected;
  },
  getLoginError: function () {
    return _usersData.loginError;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {

      case LOAD_USERS:
        UsersApi.getAllUsers()
          .then(users => {
            _usersData.users = users;
            UsersStore.emitChange();
          })
          .fail(err => {
            console.error(err);
          });
        break;

      case LOGIN:
        console.log(action.result);
        _usersData.connected = true;
        UsersStore.emitChange();
        break;
      case LOGIN_ERROR:
        _usersData.connected = false;
        _usersData.loginError = action.error;
        UsersStore.emitChange();
        break;

      case LOAD_ME:
        UsersApi.me()
          .then(me => {
            _usersData.me = me;
            _usersData.connected = true;
            UsersStore.emitChange();
          })
          .fail(err => {
            console.error(err);
            if (err.status === 401) { AppActions.unauthorized(); }
          });
        break;
    }
    return true;
  })
});

export default UsersStore;
