import AppDispatcher from '../app/AppDispatcher';
import ChatConstants from './ChatConstants';
import ChatApi from './ChatApi';

export default {
  loadMessages: function () {
    ChatApi
      .getAllMessages(0)
      .then(history => {
        AppDispatcher.handleViewAction({
          actionType: ChatConstants.LOAD_MESSAGES,
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
          actionType: ChatConstants.LOAD_CONVERSATIONS,
          conversations: conversations
        });
      })
      .fail(err => {
        console.log(err);
      });
  },
  sendMessage: function (message) {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.SEND_MESSAGE,
      message: message
    });
  }
};
