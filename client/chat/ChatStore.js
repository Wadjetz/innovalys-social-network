import _ from 'lodash'
import AppDispatcher from '../app/AppDispatcher'
import ChatConstants from './ChatConstants'
import ChatActions from './ChatActions'
import ChatApi from './ChatApi'
import Store from '../flux/Store'

const socket = io(document.location.host);

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
        ChatApi
          .getAllMessages(0)
          .then(history => {
            _chatData.messages = _.uniq(_chatData.messages.concat(history), 'id');
            ChatStore.emitChange();
          })
          .fail(err => console.error(err))
        break;

      case ChatConstants.LOAD_CONVERSATIONS:
        ChatApi
          .getConversations()
          .then(conversations => {
            _chatData.conversations = conversations;
            ChatStore.emitChange();
          })
          .fail(err => {
            //console.log(err);
          });
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
