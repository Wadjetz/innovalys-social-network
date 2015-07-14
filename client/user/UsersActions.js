import AppDispatcher from '../app/AppDispatcher';
import UsersApi from './UsersApi';

/**
 * LOAD_USERS Constants
 * @type {String}
 */
export const LOAD_USERS = 'LOAD_USERS';

/**
 * LOAD_ME Constants
 * @type {String}
 */
export const LOAD_ME = 'LOAD_ME';

/**
 * LOAD_ROLES Constants
 * @type {String}
 */
export const LOAD_ROLES = 'LOAD_ROLES';

/**
 * CREATE_USER Constants
 * @type {String}
 */
export const CREATE_USER = 'CREATE_USER';

/**
 * LOGIN Constants
 * @type {String}
 */
export const LOGIN = 'LOGIN';

/**
 * LOGIN_ERROR Constants
 * @type {String}
 */
export const LOGIN_ERROR = 'LOGIN_ERROR';


/**
 * Users Actions
 */
class UsersActions {

  /**
   * Send LOAD_USERS action
   * @return {void}
   */
  loadUsers() {
    AppDispatcher.handleViewAction({
      actionType: LOAD_USERS
    });
  }

  /**
   * Send LOAD_ME action
   * @return {void}
   */
  loadMe() {
    AppDispatcher.handleViewAction({
      actionType: LOAD_ME
    });
  }

  /**
   * Send LOAD_ROLES action
   * @return {void}
   */
  loadRoles() {
    AppDispatcher.handleViewAction({
      actionType: LOAD_ROLES
    });
  }

  /**
   * Send CREATE_USER action
   * @param  {object} newUser New User
   * @return {void}
   */
  createUser(newUser) {
    AppDispatcher.handleViewAction({
      actionType: CREATE_USER,
      newUser: newUser
    });
  }

  /**
   * Call login api and send LOGIN or LOGIN_ERROR Action
   * @param  {object} login Login
   * @return {void}
   */
  login(login) {
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
  }
}

export default new UsersActions();
