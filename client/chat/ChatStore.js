import _ from 'lodash';
import AppDispatcher from '../app/AppDispatcher';
import ChatActions, {
  LOAD_MESSAGES,
  LOAD_CONVERSATIONS,
  LOAD_GROUPS,
  SET_ROOM,
  SEND_MESSAGE
} from './ChatActions';
import ChatApi from './ChatApi';
import Store from '../flux/Store';

const socket = window.io(document.location.host);

var _chatData = {
  messages: [],
  conversations: [],
  myGroups: [],
  room: ""
};

var ChatStore = _.assign(Store, {
  connect: function () {
    socket.on('connect', function(){
      socket.emit('adduser', "");
    });
    // socket.on('global_chat', (msg) => {
    //   console.log(msg);
    //   _chatData.messages.push(msg);
    //   new Notification('Nouveaux message', { 'body': msg.content });
    //   ChatStore.emitChange();
    // });
    
    socket.on('sendchat', function (msg, user, room) {
      console.log("sendchat", msg, user, room);
    });

    socket.on('updatechat', (msg, user) => {
      console.log("Chat updatechat", msg, user);
    });

    socket.on('updaterooms', (msg, a) => {
      console.log("Chat updaterooms = ", msg, a);
    })

    socket.on('auth_errors', msg => {
      console.log("Chat error = ", msg);
      new Notification('Chat error', { 'body': msg });
    });
  },

  getChatData: function () {
    return _chatData;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {

      case LOAD_MESSAGES:
        _chatData.messages = _.uniq(_chatData.messages.concat(action.history), 'id');
        ChatStore.emitChange();
        break;

      case LOAD_CONVERSATIONS:
        _chatData.conversations = action.conversations;
        ChatStore.emitChange();
        break;

      case LOAD_GROUPS:
        _chatData.myGroups = action.myGroups;
        ChatStore.emitChange();
        break;

      case SET_ROOM:
        _chatData.room = action.room;
        console.log("switchroom", _chatData.room);
        socket.emit('switchroom', _chatData.room);
        ChatStore.emitChange();
        break;

      case SEND_MESSAGE:
        console.log('SEND_MESSAGE global_chat', action.message);
        socket.emit('sendchat', action.message);
        break;
    }
    return true;
  })
});

export default ChatStore;
