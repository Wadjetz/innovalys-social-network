import AppDispatcher from '../app/AppDispatcher';

/**
 * SWITCH_ROOM Constants
 * @type {String}
 */
export const SWITCH_ROOM = 'SWITCH_ROOM';

/**
 * SEND_MESSAGE Constants
 * @type {String}
 */
export const SEND_MESSAGE = 'SEND_MESSAGE';

/**
 * JOIN_USER_ROOM Constants
 * @type {String}
 */
export const JOIN_USER_ROOM = 'JOIN_USER_ROOM';

/**
 * Chat Actions
 */
class ChatActions {
  /**
   * Send SWITCH_ROOM action
   * @return {void}
   */
  switchRoom(room) {
    AppDispatcher.handleViewAction({
      actionType: SWITCH_ROOM,
      room: room
    });
  }

  /**
   * Send SEND_MESSAGE action
   * @param  {String} message Chat message
   * @return {void}
   */
  sendMessage(message) {
    AppDispatcher.handleViewAction({
      actionType: SEND_MESSAGE,
      message: message
    });
  }

  /**
   * Send JOIN_USER_ROOM action
   * @param  {User} user User object
   * @return {void}
   */
  joinUserRoom(user) {
    AppDispatcher.handleViewAction({
      actionType: JOIN_USER_ROOM,
      user: user
    });
  }
}

export default new ChatActions();
