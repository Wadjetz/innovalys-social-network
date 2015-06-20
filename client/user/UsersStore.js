import _ from 'lodash'
import moment from 'moment'
import utils from '../../commun/utils'
import AppDispatcher from '../app/AppDispatcher'
import Store from '../flux/Store'
import AppActions from '../app/AppActions'
import UsersActions from './UsersActions'
import UsersApi from './UsersApi'
import UsersConstants from './UsersConstants'

var _data = {
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
  loginError: ""
};

const UsersStore = _.assign(Store, {
  getMe: function () {
    return _data.me;
  },
  isConnected: function () {
    return _data.connected;
  },
  getLoginError: function () {
    return _data.loginError;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
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
            if(err.status === 401) {
              _date.connected = false;
            }
            UsersStore.emitChange();
          });
        break;

      case UsersConstants.LOAD_ME:
        UsersApi.me()
          .then(me => {
            _data.me = me;
            _data.connected = true;
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
