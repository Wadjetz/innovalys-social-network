import _ from 'lodash';
import AppDispatcher from '../app/AppDispatcher';
import ChatActions, {
  SWITCH_ROOM,
  SEND_MESSAGE
} from './ChatActions';
import ChatApi from './ChatApi';
import Store from '../flux/Store';

const socket = window.io(document.location.host);

var _chatData = {
  messages: [],
  rooms: [],
  room: ""
};

var ChatStore = _.assign(Store, {
  connect: function () {
    socket.connect();
    socket.on('connect', function(){
      socket.emit('add_user');
    });
    
    socket.on('new_message', function (msg, room) {
      console.log("new_message", msg, room);
      _chatData.messages.push(msg)
      _chatData.messages = _.uniq(_chatData.messages, 'id');
      ChatStore.emitChange();
    });

    socket.on('update_chat', (type, message) => {
      console.log("Chat update_chat", type, message);
    });

    socket.on('update_rooms', (rooms, room) => {
      console.log("Chat update_rooms = ", rooms, room);
      _chatData.rooms = rooms;
      ChatStore.emitChange();
    });

    socket.on('update_room_messages', (messages, room) => {
      console.log("Chat update_room_messages = ", messages, room);
      _chatData.messages = messages;
      ChatStore.emitChange();
    });

    socket.on('chaterrors', (err) => {
      console.log("chaterrors", err);
    });

    socket.on('auth_errors', msg => {
      console.log("Chat error = ", msg);
      new Notification('Chat error', { 'body': msg });
    });
  },

  disconnect: function () {
    socket.disconnect();
  },

  getChatData: function () {
    return _chatData;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
      //_chatData.messages = _.uniq(_chatData.messages.concat(action.history), 'id');
      case SWITCH_ROOM:
        if (action.room) {
          _chatData.room = action.room;
          console.log("switch_room", _chatData.room);
          socket.emit('switch_room', _chatData.room);
          ChatStore.emitChange();
        } else {
          _chatData.room = action.room;
          ChatStore.emitChange();
          console.log("back");
        }
        break;

      case SEND_MESSAGE:
        console.log('SEND_MESSAGE', _chatData.room, action.message);
        socket.emit('send_message', action.message);
        break;
    }
    return true;
  })
});

export default ChatStore;
