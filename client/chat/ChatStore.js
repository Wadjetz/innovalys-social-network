import _ from 'lodash';
import ChatDispatcher from './ChatDispatcher';
import ChatActions from './ChatActions';
import { SWITCH_ROOM, SEND_MESSAGE, JOIN_USER_ROOM, LEAVE_ROOM } from './ChatActions';
import Store from '../flux/Store';
import Events from '../flux/Events';

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
      //console.debug('io receive connect and send get_rooms');
      socket.emit('get_rooms');
    });

    socket.on('update_rooms', (rooms) => {
      //console.debug('io receive update_rooms', rooms);
      _chatData.rooms = rooms;
      ChatStore.emitEvent(Events.CHAT_EVENT);
    });

    socket.on('user_leave', user => {
      //console.debug('io receive user_leave', user);
      _chatData.messages.push({
        id: -(Math.random()),
        content: 'leave room',
        first_name: user.first_name,
        last_name: user.last_name
      });
      ChatStore.emitEvent(Events.CHAT_EVENT);
    });

    socket.on('new_message', function (message) {
      //console.debug("io receive new_message", message);
      _chatData.messages.push(message);
      ChatStore.emitEvent(Events.CHAT_EVENT);
    });

    socket.on('update_room_messages', (messages, room) => {
      //console.debug("io recive update_room_messages", messages, room);
      _chatData.messages = messages;
      ChatStore.emitEvent(Events.CHAT_EVENT);
    });

    socket.on('user_join_room', room => {
      //console.debug('io receive user_join_room', room);
      ChatActions.switchRoom(room);
    });

    socket.on('chaterrors', (err) => {
      //console.debug("chaterrors", err);
    });

    socket.on('auth_errors', err => {
      //console.debug("io receive auth_errors", err);
      new Notification('Chat error', { 'body': err });
    });
  },

  disconnect: function () {
    socket.disconnect();
  },

  getChatData: function () {
    return _chatData;
  },

  dispatcherIndex: ChatDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
      case SWITCH_ROOM:
          //console.debug('SWITCH_ROOM', action.room);
          _chatData.room = action.room;
          _chatData.messages = [];
          socket.emit('switch_room', _chatData.room);
          socket.emit('get_room_messages', _chatData.room);
          ChatStore.emitEvent(Events.CHAT_EVENT);
        break;

      case LEAVE_ROOM:
        //console.debug('LEAVE_ROOM', _chatData.room);
        _chatData.room = "";
        _chatData.messages = [];
        socket.emit('get_rooms');
        socket.emit('leave_room');
        break;

      case SEND_MESSAGE:
        //console.debug('SEND_MESSAGE', _chatData.room, action.message);
        socket.emit('send_message', action.message);
        break;

      case JOIN_USER_ROOM:
        //console.debug("JOIN_USER_ROOM io emit join_user_room", action.user);
        socket.emit('join_user_room', action.user);
        break;
    }
    return true;
  })
});

export default ChatStore;
