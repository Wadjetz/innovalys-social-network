import AppDispatcher from '../app/AppDispatcher';
import UsersApi from './UsersApi';

export const LOAD_USERS = 'LOAD_USERS',
                LOAD_ME = 'LOAD_ME',
             LOAD_ROLES = 'LOAD_ROLES',
            CREATE_USER = 'CREATE_USER',
                  LOGIN = 'LOGIN',
            LOGIN_ERROR = 'LOGIN_ERROR';

export default {
  loadUsers: function () {
    AppDispatcher.handleViewAction({
      actionType: LOAD_USERS
    });
  },
  loadMe: function () {
    AppDispatcher.handleViewAction({
      actionType: LOAD_ME
    });
  },
  loadRoles: function () {
    AppDispatcher.handleViewAction({
      actionType: LOAD_ROLES
    });
  },
  createUser: function (newUser) {
    AppDispatcher.handleViewAction({
      actionType: CREATE_USER,
      newUser: newUser
    });
  },
  login: function (login) {
    UsersApi.login(login).then(result => {
      AppDispatcher.handleViewAction({
        actionType: LOGIN,
        result: result
      });
    }).fail(err => {
      AppDispatcher.handleViewAction({
        actionType: LOGIN_ERROR,
        error: JSON.parse(err.responseText)
      });
    });
  },
};
