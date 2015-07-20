import _ from 'lodash';
import AppDispatcher from '../app/AppDispatcher';
import { SWITCH_ROOM, SEND_MESSAGE, JOIN_USER_ROOM, LEAVE_ROOM } from './ChatActions';
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
    socket.on('connect', function() {
      socket.emit('get_rooms');
    });

    socket.on('update_rooms', (rooms) => {
      _chatData.rooms = rooms;
      ChatStore.emitChange();
    });

    socket.on('user_leave', user => {
      console.log('io receive user_leave', user);
      _chatData.messages.push({
        content: 'leave room',
        first_name: user.first_name,
        last_name: user.last_name
      });
      ChatStore.emitChange();
    });

    socket.on('new_message', function (message) {
      console.log("io receive new_message", message);
      _chatData.messages.push(message);
      //_chatData.messages = _.uniq(_chatData.messages, 'id');
      ChatStore.emitChange();
    });

    socket.on('update_chat', (type, message) => {
      //console.log("Chat update_chat", type, message);
    });

    

    socket.on('update_room_messages', (messages, room) => {
      //console.log("Chat update_room_messages = ", messages, room);
      _chatData.messages = messages;
      ChatStore.emitChange();
    });

    socket.on('update_chat', (type, msg) => {
      //console.log("update_chat", type, msg);
    });

    socket.on('chaterrors', (err) => {
      console.log("chaterrors", err);
    });

    socket.on('switch_room', room => {
      //console.log("switch_room", room);
    });

    socket.on('auth_errors', msg => {
      //console.log("Chat error = ", msg);
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
      case SWITCH_ROOM:
          console.log('SWITCH_ROOM', action.room);
          _chatData.room = action.room;
          _chatData.messages = [];
          socket.emit('switch_room', _chatData.room);
          socket.emit('get_room_messages', _chatData.room);
          ChatStore.emitChange();
        break;

      case LEAVE_ROOM:
        console.log('LEAVE_ROOM', _chatData.room);
        _chatData.room = "";
        _chatData.messages = [];
        socket.emit('get_rooms');
        socket.emit('leave_room');
        break;

      case SEND_MESSAGE:
        console.log('SEND_MESSAGE', _chatData.room, action.message);
        socket.emit('send_message', action.message);
        break;

      case JOIN_USER_ROOM:
        console.log("JOIN_ROOM", action.user);
        socket.emit('join_user_room', action.user);
        break;
    }
    return true;
  })
});

export default ChatStore;
