import _ from 'lodash';
import moment from 'moment';
import utils from '../../commun/utils';
import AppDispatcher from '../app/AppDispatcher';
import Store from '../flux/Store';
import AppActions from '../app/AppActions';
import UsersActions from './UsersActions';
import UsersApi from './UsersApi';
import UsersConstants from './UsersConstants';
import ChatStore from '../chat/ChatStore';

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
  users: []
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

      case UsersConstants.LOAD_USERS:
        UsersApi.getAllUsers()
          .then(users => {
            _usersData.users = users;
            UsersStore.emitChange();
          })
          .fail(err => {
            console.error(err);
          })
        break;

      case UsersConstants.LOGIN:
        _usersData.connected = false;
        _usersData.loginError = "";
        UsersApi.login(action.login)
          .then(result => {
            _usersData.connected = true;
            UsersStore.emitChange();
          })
          .fail(err => {
            _usersData.loginError = err;
            if(err.status === 401) {
              _date.connected = false;
            }
            ChatStore.connect();
            UsersStore.emitChange();
          });
        break;

      case UsersConstants.LOAD_ME:
        UsersApi.me()
          .then(me => {
            _usersData.me = me;
            _usersData.connected = true;
            UsersStore.emitChange();
          })
          .fail(err => {
            console.error(err);
            if (err.status === 401) { AppActions.unauthorized(); }
          })
        break;
    }
    return true;
  })
});

export default UsersStore;
