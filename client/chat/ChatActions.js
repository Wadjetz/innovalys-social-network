import AppDispatcher from '../app/AppDispatcher';
import ChatApi from './ChatApi';
import GroupsService from '../groups/GroupsService';

export const SWITCH_ROOM = 'SWITCH_ROOM',
            SEND_MESSAGE = 'SEND_MESSAGE';

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
  }
};

