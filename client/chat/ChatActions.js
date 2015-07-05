import AppDispatcher from '../app/AppDispatcher';
import ChatApi from './ChatApi';
import GroupsService from '../groups/GroupsService';

export const SWITCH_ROOM = 'SWITCH_ROOM',
            SEND_MESSAGE = 'SEND_MESSAGE',
          JOIN_USER_ROOM = 'JOIN_USER_ROOM';

export default {
  switchRoom: function (room) {
    AppDispatcher.handleViewAction({
      actionType: SWITCH_ROOM,
      room: room
    });
  },
  sendMessage: function (message) {
    AppDispatcher.handleViewAction({
      actionType: SEND_MESSAGE,
      message: message
    });
  },
  joinUserRoom: function (user) {
    AppDispatcher.handleViewAction({
      actionType: JOIN_USER_ROOM,
      user: user
    });
  }
};
