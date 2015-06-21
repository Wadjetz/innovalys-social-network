import _ from 'lodash'
import AppDispatcher from '../app/AppDispatcher'
import ChatConstants from './ChatConstants'
import ChatActions from './ChatActions'
import ChatApi from './ChatApi'
import Store from '../flux/Store'

const socket = io(document.location.host);

let _data = {
  messages: []
};

const ChatStore = _.assign(Store, {
  connect: function () {
    socket.on('global_chat', (msg) => {
      _data.messages.push(msg);
      ChatStore.emitChange();
    });
  },
  getMessages: function () {
    return _data.messages;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
      case ChatConstants.LOAD_MESSAGES:
        ChatApi.getAllMessages(0)
          .then(history => {
            _data.messages = _.uniq(_data.messages.concat(history), 'id');
            ChatStore.emitChange();
          })
          .fail(err => console.error(err))
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
