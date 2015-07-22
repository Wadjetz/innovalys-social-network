import ChatDispatcher from './ChatDispatcher';

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
 * LEAVE_ROOM Constants
 * @type {String}
 */
export const LEAVE_ROOM = 'LEAVE_ROOM';

/**
 * Chat Actions
 */
class ChatActions {
  /**
   * Send SWITCH_ROOM action
   * @return {void}
   */
  switchRoom(room) {
    ChatDispatcher.handleChatAction({
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
    ChatDispatcher.handleChatAction({
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
    ChatDispatcher.handleChatAction({
      actionType: JOIN_USER_ROOM,
      user: user
    });
  }

  leaveRoom() {
    ChatDispatcher.handleChatAction({
      actionType: LEAVE_ROOM
    });
  }
}

export default new ChatActions();
