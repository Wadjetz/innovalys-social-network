import AppDispatcher from './AppDispatcher';

/**
 * NOT_FOUND Constants
 * @type {String}
 */
export const NOT_FOUND = 'NOT_FOUND';

/**
 * UNAUTHORIZED Constants
 * @type {String}
 */
export const UNAUTHORIZED = 'UNAUTHORIZED';

/**
 * FORBIDDEN Constants
 * @type {String}
 */
export const FORBIDDEN = 'FORBIDDEN';

/**
 * App Actions
 */
class AppActions {
  /**
   * Send not found action
   * @return {void}
   */
  notfound() {
    AppDispatcher.handleViewAction({
      actionType: NOT_FOUND
    });
  }

  /**
   * Send unauthorized action
   * @return {void}
   */
  unauthorized() {
    AppDispatcher.handleViewAction({
      actionType: UNAUTHORIZED
    });
  }

  /**
   * send forbidden action
   * @return {void}
   */
  forbidden() {
    AppDispatcher.handleViewAction({
      actionType: FORBIDDEN
    });
  }
}

export default new AppActions();
