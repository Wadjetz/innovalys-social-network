import AppDispatcher from '../app/AppDispatcher'
import ChatConstants from './ChatConstants'

export default {
  loadMessages: function () {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.LOAD_MESSAGES
    });
  },
  sendMessage: function (message) {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.SEND_MESSAGE,
      message: message
    });
  }
};
