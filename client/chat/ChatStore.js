import _ from 'lodash';
import AppDispatcher from '../app/AppDispatcher';
import ChatConstants from './ChatConstants';
import ChatActions from './ChatActions';
import ChatApi from './ChatApi';
import Store from '../flux/Store';

const socket = window.io(document.location.host);

var _chatData = {
  messages: [],
  conversations: []
};

var ChatStore = _.assign(Store, {
  connect: function () {
    socket.on('global_chat', (msg) => {
      _chatData.messages.push(msg);
      ChatStore.emitChange();
    });
    socket.on('auth_errors', msg => {
      console.log("Chat error = ", msg);
    });
  },

  getChatData: function () {
    return _chatData;
  },

  getMessages: function () {
    return _chatData.messages;
  },

  getConversations: function () {
    return _chatData.conversations;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {

      case ChatConstants.LOAD_MESSAGES:
         _chatData.messages = _.uniq(_chatData.messages.concat(action.history), 'id');
        ChatStore.emitChange();
        break;

      case ChatConstants.LOAD_CONVERSATIONS:
        _chatData.conversations = action.conversations;
        ChatStore.emitChange();
        break;

      case ChatConstants.SEND_MESSAGE:
        console.log('SEND_MESSAGE global_chat', action.message);
        socket.emit('global_chat', action.message);
        break;
    }
    return true;
  })
});

export default ChatStore;
