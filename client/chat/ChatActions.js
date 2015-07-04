import AppDispatcher from '../app/AppDispatcher';
import ChatApi from './ChatApi';
import GroupsService from '../groups/GroupsService';

export const LOAD_MESSAGES = 'LOAD_MESSAGES',
        LOAD_CONVERSATIONS = 'LOAD_CONVERSATIONS',
               LOAD_GROUPS = 'LOAD_GROUPS',
                  SET_ROOM = 'SET_ROOM',
              SEND_MESSAGE = 'SEND_MESSAGE';

export default {
  loadMessages: function () {
    ChatApi
      .getAllMessages(0)
      .then(history => {
        AppDispatcher.handleViewAction({
          actionType: LOAD_MESSAGES,
          history: history
        });
      })
      .fail(err => {
        console.error(err);
      });
  },
  loadConversations: function () {
    ChatApi
      .getConversations()
      .then(conversations => {
        AppDispatcher.handleViewAction({
          actionType: LOAD_CONVERSATIONS,
          conversations: conversations
        });
      })
      .fail(err => {
        console.log(err);
      });
  },
  loadGroups: function () {
    GroupsService
      .getMyGroups()
      .then(myGroups => {
        AppDispatcher.handleViewAction({
          actionType: LOAD_GROUPS,
          myGroups: myGroups
        });
      })
      .fail(err => {
        console.log(err);
      });
  },

  setRoom: function (room) {
    AppDispatcher.handleViewAction({
      actionType: SET_ROOM,
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

